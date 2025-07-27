const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const emailService = require('../services/emailService');
const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                error: 'Order ID is required'
            });
        }

        // Get order details
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        if (order.paymentStatus === 'completed') {
            return res.status(400).json({
                error: 'Order has already been paid'
            });
        }

        // Create or retrieve customer
        let customer;
        if (order.stripeCustomerId) {
            customer = await stripe.customers.retrieve(order.stripeCustomerId);
        } else {
            customer = await stripe.customers.create({
                email: order.email,
                name: order.fullName,
                metadata: {
                    orderId: order._id.toString(),
                    orderNumber: order.orderNumber
                }
            });
            
            // Update order with customer ID
            order.stripeCustomerId = customer.id;
            await order.save();
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.packagePrice * 100), // Convert to cents
            currency: 'usd',
            customer: customer.id,
            metadata: {
                orderId: order._id.toString(),
                orderNumber: order.orderNumber,
                package: order.package
            },
            description: `Resume optimization service - ${order.package}`,
            receipt_email: order.email
        });

        // Update order with payment intent ID
        order.stripePaymentIntentId = paymentIntent.id;
        await order.save();

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                customerId: customer.id,
                amount: order.packagePrice
            }
        });

    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({
            error: 'Failed to create payment intent',
            message: 'Please try again later'
        });
    }
});

// Confirm payment
router.post('/confirm-payment', async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        if (!paymentIntentId) {
            return res.status(400).json({
                error: 'Payment intent ID is required'
            });
        }

        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({
                error: 'Payment not completed',
                status: paymentIntent.status
            });
        }

        // Find and update order
        const order = await Order.findOne({ stripePaymentIntentId: paymentIntentId });
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        // Update order status
        order.paymentStatus = 'completed';
        order.status = 'paid';
        order.paidAt = new Date();
        await order.save();

        // Send confirmation emails
        try {
            await emailService.sendStatusUpdate(order);
        } catch (emailError) {
            console.error('Payment confirmation email failed:', emailError);
        }

        res.json({
            success: true,
            message: 'Payment confirmed successfully',
            data: {
                orderNumber: order.orderNumber,
                status: order.status,
                paymentStatus: order.paymentStatus
            }
        });

    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({
            error: 'Failed to confirm payment',
            message: 'Please try again later'
        });
    }
});

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSucceeded(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;
            case 'customer.created':
                console.log('Customer created:', event.data.object.id);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

// Handle successful payment
async function handlePaymentSucceeded(paymentIntent) {
    try {
        const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
        
        if (!order) {
            console.error('Order not found for payment intent:', paymentIntent.id);
            return;
        }

        // Update order if not already updated
        if (order.paymentStatus !== 'completed') {
            order.paymentStatus = 'completed';
            order.status = 'paid';
            order.paidAt = new Date();
            await order.save();

            // Send notification emails
            await emailService.sendStatusUpdate(order);
            
            console.log('Payment processed successfully for order:', order.orderNumber);
        }
    } catch (error) {
        console.error('Error handling payment succeeded:', error);
    }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
    try {
        const order = await Order.findOne({ stripePaymentIntentId: paymentIntent.id });
        
        if (!order) {
            console.error('Order not found for failed payment:', paymentIntent.id);
            return;
        }

        order.paymentStatus = 'failed';
        await order.save();

        // Could send a payment failed email here
        console.log('Payment failed for order:', order.orderNumber);
    } catch (error) {
        console.error('Error handling payment failed:', error);
    }
}

// Get payment status
router.get('/status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        let paymentDetails = {
            paymentStatus: order.paymentStatus,
            amount: order.packagePrice,
            currency: 'USD'
        };

        // Get additional details from Stripe if payment intent exists
        if (order.stripePaymentIntentId) {
            try {
                const paymentIntent = await stripe.paymentIntents.retrieve(order.stripePaymentIntentId);
                paymentDetails.stripeStatus = paymentIntent.status;
                paymentDetails.lastPaymentError = paymentIntent.last_payment_error;
            } catch (stripeError) {
                console.error('Error retrieving payment intent:', stripeError);
            }
        }

        res.json({
            success: true,
            data: paymentDetails
        });

    } catch (error) {
        console.error('Payment status error:', error);
        res.status(500).json({
            error: 'Failed to get payment status',
            message: 'Please try again later'
        });
    }
});

// Refund payment (for admin use)
router.post('/refund', async (req, res) => {
    try {
        const { orderId, amount, reason } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        if (!order.stripePaymentIntentId) {
            return res.status(400).json({
                error: 'No payment found for this order'
            });
        }

        // Create refund
        const refund = await stripe.refunds.create({
            payment_intent: order.stripePaymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined, // Partial or full refund
            reason: reason || 'requested_by_customer',
            metadata: {
                orderId: order._id.toString(),
                orderNumber: order.orderNumber
            }
        });

        // Update order status
        order.paymentStatus = 'refunded';
        order.status = 'cancelled';
        await order.save();

        res.json({
            success: true,
            message: 'Refund processed successfully',
            data: {
                refundId: refund.id,
                amount: refund.amount / 100,
                status: refund.status
            }
        });

    } catch (error) {
        console.error('Refund error:', error);
        res.status(500).json({
            error: 'Failed to process refund',
            message: 'Please try again later'
        });
    }
});

module.exports = router;
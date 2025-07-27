const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const emailService = require('../services/emailService');
const router = express.Router();

// Validation middleware
const validateOrder = [
    body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone number must be less than 20 characters'),
    body('package').isIn(['Professional - $149', 'Executive - $249', 'Premium - $349']).withMessage('Invalid package selected'),
    body('industry').optional().trim().isLength({ max: 100 }).withMessage('Industry must be less than 100 characters'),
    body('position').optional().trim().isLength({ max: 100 }).withMessage('Position must be less than 100 characters'),
    body('additional-info').optional().trim().isLength({ max: 1000 }).withMessage('Additional info must be less than 1000 characters')
];

// Create new order
router.post('/', validateOrder, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        // Extract package price
        const packagePrices = {
            'Professional - $149': 149,
            'Executive - $249': 249,
            'Premium - $349': 349
        };

        const orderData = {
            fullName: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            package: req.body.package,
            packagePrice: packagePrices[req.body.package],
            targetIndustry: req.body.industry,
            targetPosition: req.body.position,
            additionalInfo: req.body['additional-info']
        };

        // Create new order
        const order = new Order(orderData);
        await order.save();

        // Send confirmation emails
        try {
            await emailService.sendOrderConfirmation(order);
            await emailService.sendAdminNotification(order);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the order creation if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: {
                orderNumber: order.orderNumber,
                orderId: order._id,
                packagePrice: order.packagePrice,
                status: order.status
            }
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            error: 'Failed to create order',
            message: 'Please try again later'
        });
    }
});

// Get order by order number or ID
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;
        
        // Try to find by order number first, then by ID
        let order = await Order.findOne({ orderNumber: identifier });
        if (!order) {
            order = await Order.findById(identifier);
        }

        if (!order) {
            return res.status(404).json({
                error: 'Order not found',
                message: 'No order found with the provided identifier'
            });
        }

        // Remove sensitive information
        const orderData = order.toObject();
        delete orderData.stripeCustomerId;
        delete orderData.stripePaymentIntentId;

        res.json({
            success: true,
            data: orderData
        });

    } catch (error) {
        console.error('Order retrieval error:', error);
        res.status(500).json({
            error: 'Failed to retrieve order',
            message: 'Please try again later'
        });
    }
});

// Update order status (for admin use)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'paid', 'in-progress', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                error: 'Invalid status',
                message: 'Status must be one of: ' + validStatuses.join(', ')
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { 
                status,
                ...(status === 'completed' && { completedAt: new Date() })
            },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        // Send status update email
        try {
            await emailService.sendStatusUpdate(order);
        } catch (emailError) {
            console.error('Status update email failed:', emailError);
        }

        res.json({
            success: true,
            message: 'Order status updated successfully',
            data: {
                orderNumber: order.orderNumber,
                status: order.status
            }
        });

    } catch (error) {
        console.error('Status update error:', error);
        res.status(500).json({
            error: 'Failed to update order status',
            message: 'Please try again later'
        });
    }
});

module.exports = router;
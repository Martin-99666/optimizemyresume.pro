const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Ensure environment variables are loaded
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    require('dotenv').config();
}

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    // Test email configuration
    async testConnection() {
        try {
            await this.transporter.verify();
            console.log('Email service is ready');
            return true;
        } catch (error) {
            console.error('Email service error:', error);
            return false;
        }
    }

    // Send order confirmation to customer
    async sendOrderConfirmation(order) {
        const emailTemplate = this.getOrderConfirmationTemplate(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            subject: `Order Confirmation - ${order.orderNumber} - OptimizeMyResume.pro`,
            html: emailTemplate
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Order confirmation email sent:', result.messageId);
            return result;
        } catch (error) {
            console.error('Failed to send order confirmation:', error);
            throw error;
        }
    }

    // Send admin notification
    async sendAdminNotification(order) {
        const emailTemplate = this.getAdminNotificationTemplate(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Order Received - ${order.orderNumber}`,
            html: emailTemplate
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Admin notification email sent:', result.messageId);
            return result;
        } catch (error) {
            console.error('Failed to send admin notification:', error);
            throw error;
        }
    }

    // Send status update to customer
    async sendStatusUpdate(order) {
        const emailTemplate = this.getStatusUpdateTemplate(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            subject: `Order Update - ${order.orderNumber} - OptimizeMyResume.pro`,
            html: emailTemplate
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Status update email sent:', result.messageId);
            return result;
        } catch (error) {
            console.error('Failed to send status update:', error);
            throw error;
        }
    }

    // Send delivery notification
    async sendDeliveryNotification(order) {
        const emailTemplate = this.getDeliveryNotificationTemplate(order);
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: order.email,
            subject: `Your Resume is Ready! - ${order.orderNumber} - OptimizeMyResume.pro`,
            html: emailTemplate
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Delivery notification email sent:', result.messageId);
            return result;
        } catch (error) {
            console.error('Failed to send delivery notification:', error);
            throw error;
        }
    }

    // Order confirmation email template
    getOrderConfirmationTemplate(order) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Confirmation</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background: #f9f9f9; }
                .order-details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                .button { background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You for Your Order!</h1>
                    <p>Your professional resume optimization is confirmed</p>
                </div>
                
                <div class="content">
                    <p>Dear ${order.fullName},</p>
                    
                    <p>Thank you for choosing OptimizeMyResume.pro! We have received your order and our team of certified resume writers will begin working on your professional resume shortly.</p>
                    
                    <div class="order-details">
                        <h3>Order Details</h3>
                        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                        <p><strong>Package:</strong> ${order.package}</p>
                        <p><strong>Amount:</strong> $${order.packagePrice}</p>
                        <p><strong>Target Industry:</strong> ${order.targetIndustry || 'Not specified'}</p>
                        <p><strong>Target Position:</strong> ${order.targetPosition || 'Not specified'}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <h3>What Happens Next?</h3>
                    <ol>
                        <li><strong>Payment Processing:</strong> You will receive payment instructions shortly</li>
                        <li><strong>Resume Review:</strong> Our team will analyze your current resume</li>
                        <li><strong>Professional Writing:</strong> We'll optimize your resume for ATS and recruiters</li>
                        <li><strong>Delivery:</strong> Your new resume will be delivered within 48 hours</li>
                    </ol>
                    
                    <p>We guarantee you'll get more interviews with your optimized resume, or we'll work with you until you do!</p>
                    
                    <a href="${process.env.FRONTEND_URL}/order/${order.orderNumber}" class="button">Track Your Order</a>
                </div>
                
                <div class="footer">
                    <p>Questions? Contact us at ${process.env.EMAIL_USER}</p>
                    <p>OptimizeMyResume.pro - Professional Resume Optimization</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Admin notification email template
    getAdminNotificationTemplate(order) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>New Order - ${order.orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
                .order-details { background: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px; }
                .urgent { background: #fef2f2; border-left: 4px solid #ef4444; padding: 10px; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Order Received!</h1>
                    <p>Order #${order.orderNumber}</p>
                </div>
                
                <div class="order-details">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> ${order.fullName}</p>
                    <p><strong>Email:</strong> ${order.email}</p>
                    <p><strong>Phone:</strong> ${order.phone || 'Not provided'}</p>
                    
                    <h3>Order Details</h3>
                    <p><strong>Package:</strong> ${order.package}</p>
                    <p><strong>Amount:</strong> $${order.packagePrice}</p>
                    <p><strong>Target Industry:</strong> ${order.targetIndustry || 'Not specified'}</p>
                    <p><strong>Target Position:</strong> ${order.targetPosition || 'Not specified'}</p>
                    <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                    
                    ${order.additionalInfo ? `
                    <h3>Additional Information</h3>
                    <p>${order.additionalInfo}</p>
                    ` : ''}
                    
                    ${order.resumeFile ? `
                    <h3>Resume File</h3>
                    <p><strong>File:</strong> ${order.resumeFile.originalName}</p>
                    <p><strong>Size:</strong> ${Math.round(order.resumeFile.size / 1024)} KB</p>
                    ` : '<div class="urgent">⚠️ No resume file uploaded yet</div>'}
                </div>
                
                <p><strong>Action Required:</strong> Process this order and send payment instructions to the customer.</p>
            </div>
        </body>
        </html>
        `;
    }

    // Status update email template
    getStatusUpdateTemplate(order) {
        const statusMessages = {
            'paid': 'Your payment has been confirmed and our team is starting work on your resume.',
            'in-progress': 'Our certified writers are currently working on your resume optimization.',
            'completed': 'Great news! Your optimized resume is ready for download.',
            'cancelled': 'Your order has been cancelled. If you have any questions, please contact us.'
        };

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Order Update - ${order.orderNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #10b981; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .status-badge { background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; margin: 10px 0; }
                .button { background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Order Status Update</h1>
                    <p>Order #${order.orderNumber}</p>
                </div>
                
                <div class="content">
                    <p>Dear ${order.fullName},</p>
                    
                    <p>We wanted to update you on the status of your resume optimization order.</p>
                    
                    <div class="status-badge">Status: ${order.status.toUpperCase()}</div>
                    
                    <p>${statusMessages[order.status] || 'Your order status has been updated.'}</p>
                    
                    ${order.status === 'completed' ? `
                    <p>Your professionally optimized resume is now available for download. We're confident it will help you land more interviews!</p>
                    <a href="${process.env.FRONTEND_URL}/order/${order.orderNumber}" class="button">Download Your Resume</a>
                    ` : ''}
                    
                    <p>You can track your order status anytime by visiting your order page.</p>
                    
                    <a href="${process.env.FRONTEND_URL}/order/${order.orderNumber}" class="button">View Order Details</a>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    // Delivery notification template
    getDeliveryNotificationTemplate(order) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Your Resume is Ready!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .success { background: #f0fdf4; border: 1px solid #10b981; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .button { background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
                .guarantee { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Your Resume is Ready!</h1>
                    <p>Professional optimization complete</p>
                </div>
                
                <div class="content">
                    <p>Dear ${order.fullName},</p>
                    
                    <div class="success">
                        <h3>✅ Order Completed Successfully!</h3>
                        <p>Your professionally optimized resume has been completed by our certified writers and is ready for download.</p>
                    </div>
                    
                    <h3>What You're Getting:</h3>
                    <ul>
                        <li>ATS-optimized resume that passes automated screening</li>
                        <li>Professional formatting that catches recruiters' attention</li>
                        <li>Industry-specific keywords for your target role</li>
                        <li>Compelling content that highlights your achievements</li>
                        ${order.package.includes('Executive') || order.package.includes('Premium') ? '<li>LinkedIn profile optimization</li><li>Professional cover letter</li>' : ''}
                        ${order.package.includes('Premium') ? '<li>Interview preparation guide</li><li>Thank you letter template</li>' : ''}
                    </ul>
                    
                    <a href="${process.env.FRONTEND_URL}/order/${order.orderNumber}" class="button">Download Your Files</a>
                    
                    <div class="guarantee">
                        <h3>🛡️ 60-Day Interview Guarantee</h3>
                        <p>We're so confident in your new resume that we guarantee you'll get more interviews within 60 days, or we'll revise it for free until you do!</p>
                    </div>
                    
                    <h3>Next Steps:</h3>
                    <ol>
                        <li>Download your optimized resume files</li>
                        <li>Start applying to your target positions</li>
                        <li>Watch the interview requests come in!</li>
                        <li>Contact us if you need any revisions within 60 days</li>
                    </ol>
                    
                    <p>Thank you for choosing OptimizeMyResume.pro. We wish you the best of luck in your job search!</p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

module.exports = new EmailService();
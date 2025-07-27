const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Customer Information
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        trim: true,
        maxlength: 20
    },
    
    // Package Information
    package: {
        type: String,
        required: true,
        enum: ['Professional - $149', 'Executive - $249', 'Premium - $349']
    },
    packagePrice: {
        type: Number,
        required: true,
        min: 0
    },
    
    // Job Information
    targetIndustry: {
        type: String,
        trim: true,
        maxlength: 100
    },
    targetPosition: {
        type: String,
        trim: true,
        maxlength: 100
    },
    additionalInfo: {
        type: String,
        trim: true,
        maxlength: 1000
    },
    
    // File Information
    resumeFile: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        path: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    },
    
    // Order Status
    status: {
        type: String,
        enum: ['pending', 'paid', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    
    // Payment Information
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    stripePaymentIntentId: String,
    stripeCustomerId: String,
    paidAt: Date,
    
    // Delivery Information
    deliveryDate: Date,
    completedAt: Date,
    deliveryFiles: [{
        filename: String,
        originalName: String,
        type: {
            type: String,
            enum: ['resume', 'cover-letter', 'linkedin-profile', 'other']
        },
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Communication
    notes: [{
        text: String,
        author: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Metadata
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Generate order number before saving
orderSchema.pre('save', function(next) {
    if (this.isNew) {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.orderNumber = `OMR-${timestamp.slice(-6)}-${random}`;
    }
    next();
});

// Index for better query performance
orderSchema.index({ email: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);
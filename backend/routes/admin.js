const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const emailService = require('../services/emailService');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Admin login
router.post('/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { email, password } = req.body;

        // Find admin user
        const admin = await Admin.findOne({ email, isActive: true });
        if (!admin) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: admin._id, 
                email: admin.email, 
                role: admin.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                admin: {
                    id: admin._id,
                    email: admin.email,
                    name: admin.name,
                    role: admin.role
                }
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            error: 'Login failed',
            message: 'Please try again later'
        });
    }
});

// Get dashboard statistics
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
    try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Aggregate statistics
        const [
            totalOrders,
            todayOrders,
            weekOrders,
            monthOrders,
            pendingOrders,
            inProgressOrders,
            completedOrders,
            totalRevenue,
            monthRevenue
        ] = await Promise.all([
            Order.countDocuments(),
            Order.countDocuments({ createdAt: { $gte: today.setHours(0, 0, 0, 0) } }),
            Order.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
            Order.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
            Order.countDocuments({ status: 'pending' }),
            Order.countDocuments({ status: 'in-progress' }),
            Order.countDocuments({ status: 'completed' }),
            Order.aggregate([
                { $match: { paymentStatus: 'completed' } },
                { $group: { _id: null, total: { $sum: '$packagePrice' } } }
            ]),
            Order.aggregate([
                { 
                    $match: { 
                        paymentStatus: 'completed',
                        createdAt: { $gte: thirtyDaysAgo }
                    }
                },
                { $group: { _id: null, total: { $sum: '$packagePrice' } } }
            ])
        ]);

        res.json({
            success: true,
            data: {
                orders: {
                    total: totalOrders,
                    today: todayOrders,
                    week: weekOrders,
                    month: monthOrders,
                    pending: pendingOrders,
                    inProgress: inProgressOrders,
                    completed: completedOrders
                },
                revenue: {
                    total: totalRevenue[0]?.total || 0,
                    month: monthRevenue[0]?.total || 0
                }
            }
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            error: 'Failed to load dashboard statistics'
        });
    }
});

// Get all orders with pagination and filtering
router.get('/orders', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        
        // Build filter object
        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
        if (req.query.package) filter.package = req.query.package;
        
        // Date range filter
        if (req.query.startDate || req.query.endDate) {
            filter.createdAt = {};
            if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate);
            if (req.query.endDate) filter.createdAt.$lte = new Date(req.query.endDate);
        }

        // Search by email or name
        if (req.query.search) {
            filter.$or = [
                { fullName: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
                { orderNumber: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        const [orders, totalCount] = await Promise.all([
            Order.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Order.countDocuments(filter)
        ]);

        res.json({
            success: true,
            data: {
                orders,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    pages: Math.ceil(totalCount / limit)
                }
            }
        });

    } catch (error) {
        console.error('Orders list error:', error);
        res.status(500).json({
            error: 'Failed to load orders'
        });
    }
});

// Get single order details
router.get('/orders/:id', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        res.json({
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Order details error:', error);
        res.status(500).json({
            error: 'Failed to load order details'
        });
    }
});

// Update order status
router.patch('/orders/:id/status', authenticateToken, [
    body('status').isIn(['pending', 'paid', 'in-progress', 'completed', 'cancelled'])
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Invalid status',
                details: errors.array()
            });
        }

        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        order.status = status;
        if (status === 'completed') {
            order.completedAt = new Date();
        }
        await order.save();

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
            error: 'Failed to update order status'
        });
    }
});

// Add note to order
router.post('/orders/:id/notes', authenticateToken, [
    body('text').trim().isLength({ min: 1, max: 500 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { text } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        const note = {
            text,
            author: req.user.email,
            createdAt: new Date()
        };

        order.notes = order.notes || [];
        order.notes.push(note);
        await order.save();

        res.json({
            success: true,
            message: 'Note added successfully',
            data: note
        });

    } catch (error) {
        console.error('Add note error:', error);
        res.status(500).json({
            error: 'Failed to add note'
        });
    }
});

// Create new admin user (super admin only)
router.post('/admins', authenticateToken, [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().isLength({ min: 1, max: 100 }),
    body('role').isIn(['admin', 'writer', 'manager'])
], async (req, res) => {
    try {
        // Check if user has permission (only admin role can create users)
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Insufficient permissions'
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation failed',
                details: errors.array()
            });
        }

        const { email, password, name, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                error: 'Admin with this email already exists'
            });
        }

        const admin = new Admin({
            email,
            password,
            name,
            role
        });

        await admin.save();

        res.status(201).json({
            success: true,
            message: 'Admin user created successfully',
            data: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });

    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({
            error: 'Failed to create admin user'
        });
    }
});

// Get analytics data
router.get('/analytics', authenticateToken, async (req, res) => {
    try {
        const { timeframe = '30d' } = req.query;
        
        let startDate;
        const endDate = new Date();
        
        switch (timeframe) {
            case '7d':
                startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '90d':
                startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        // Orders by day
        const ordersByDay = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$paymentStatus", "completed"] },
                                "$packagePrice",
                                0
                            ]
                        }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Package distribution
        const packageDistribution = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: "$package",
                    count: { $sum: 1 },
                    revenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$paymentStatus", "completed"] },
                                "$packagePrice",
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        res.json({
            success: true,
            data: {
                timeframe,
                ordersByDay,
                packageDistribution
            }
        });

    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({
            error: 'Failed to load analytics data'
        });
    }
});

module.exports = router;
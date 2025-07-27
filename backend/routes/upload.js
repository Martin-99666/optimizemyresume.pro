const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Order = require('../models/Order');
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, `resume-${uniqueSuffix}${extension}`);
    }
});

// File filter to accept only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 // 10MB default
    },
    fileFilter: fileFilter
});

// Upload resume file
router.post('/resume', upload.single('resume-file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: 'No file uploaded',
                message: 'Please select a file to upload'
            });
        }

        const { orderId } = req.body;
        
        if (!orderId) {
            // If no order ID provided, just return file info
            return res.json({
                success: true,
                message: 'File uploaded successfully',
                data: {
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype
                }
            });
        }

        // Update order with file information
        const order = await Order.findById(orderId);
        if (!order) {
            // Delete uploaded file if order not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({
                error: 'Order not found',
                message: 'Cannot associate file with order'
            });
        }

        // Update order with file info
        order.resumeFile = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            uploadedAt: new Date()
        };

        await order.save();

        res.json({
            success: true,
            message: 'Resume uploaded and associated with order successfully',
            data: {
                orderNumber: order.orderNumber,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            }
        });

    } catch (error) {
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error('File upload error:', error);
        
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File too large',
                message: 'File size must be less than 10MB'
            });
        }

        if (error.message.includes('Invalid file type')) {
            return res.status(400).json({
                error: 'Invalid file type',
                message: 'Only PDF, DOC, and DOCX files are allowed'
            });
        }

        res.status(500).json({
            error: 'Upload failed',
            message: 'Please try again later'
        });
    }
});

// Upload delivery files (for admin)
router.post('/delivery/:orderId', upload.array('files', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                error: 'No files uploaded',
                message: 'Please select files to upload'
            });
        }

        const { orderId } = req.params;
        const { fileTypes } = req.body; // Array of file types corresponding to each file

        const order = await Order.findById(orderId);
        if (!order) {
            // Clean up uploaded files
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
            
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        // Process uploaded files
        const deliveryFiles = req.files.map((file, index) => ({
            filename: file.filename,
            originalName: file.originalname,
            type: fileTypes && fileTypes[index] ? fileTypes[index] : 'other',
            uploadedAt: new Date()
        }));

        // Add to order's delivery files
        order.deliveryFiles = order.deliveryFiles || [];
        order.deliveryFiles.push(...deliveryFiles);
        
        // Update order status if not already completed
        if (order.status !== 'completed') {
            order.status = 'completed';
            order.completedAt = new Date();
        }

        await order.save();

        res.json({
            success: true,
            message: 'Delivery files uploaded successfully',
            data: {
                orderNumber: order.orderNumber,
                filesUploaded: deliveryFiles.length,
                status: order.status
            }
        });

    } catch (error) {
        // Clean up uploaded files on error
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }

        console.error('Delivery files upload error:', error);
        res.status(500).json({
            error: 'Upload failed',
            message: 'Please try again later'
        });
    }
});

// Download file
router.get('/download/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                error: 'File not found'
            });
        }

        // Security check: ensure filename doesn't contain path traversal
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({
                error: 'Invalid filename'
            });
        }

        // Set appropriate headers
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

    } catch (error) {
        console.error('File download error:', error);
        res.status(500).json({
            error: 'Download failed',
            message: 'Please try again later'
        });
    }
});

// Delete file (for admin)
router.delete('/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(uploadDir, filename);

        // Security check
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({
                error: 'Invalid filename'
            });
        }

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({
            success: true,
            message: 'File deleted successfully'
        });

    } catch (error) {
        console.error('File deletion error:', error);
        res.status(500).json({
            error: 'Deletion failed',
            message: 'Please try again later'
        });
    }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: 'File too large',
                message: 'File size must be less than 10MB'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: 'Too many files',
                message: 'Maximum 5 files allowed'
            });
        }
    }
    
    next(error);
});

module.exports = router;
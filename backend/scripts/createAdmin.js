const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createInitialAdmin() {
    try {
        // Build MongoDB URI using same logic as server.js
        const buildMongoURI = () => {
            const username = process.env.MONGODB_USERNAME;
            const password = process.env.MONGODB_PASSWORD;
            const cluster = process.env.MONGODB_CLUSTER;
            const database = process.env.MONGODB_DATABASE || 'optimizemyresume';
            
            if (username && password && cluster) {
                return `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${cluster}/${database}?retryWrites=true&w=majority&appName=OptimizeMyResume`;
            } else {
                return process.env.MONGODB_URI || 'mongodb://localhost:27017/optimizemyresume';
            }
        };

        // Connect to MongoDB
        const uri = buildMongoURI();
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create initial admin user
        const admin = new Admin({
            email: process.env.ADMIN_EMAIL || 'admin@optimizemyresume.pro',
            password: process.env.ADMIN_PASSWORD || 'admin123456',
            name: 'System Administrator',
            role: 'admin'
        });

        await admin.save();
        console.log('Initial admin user created successfully');
        console.log('Email:', admin.email);
        console.log('Please change the default password after first login');

    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

createInitialAdmin();
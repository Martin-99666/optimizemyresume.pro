const mongoose = require('mongoose');
require('dotenv').config();

async function startServer() {
    try {
        console.log('🚀 Starting OptimizeMyResume.pro Backend Server...');
        
        // Try to connect to MongoDB
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000,
                connectTimeoutMS: 10000,
            });
            console.log('✅ Connected to MongoDB successfully');
        } catch (dbError) {
            console.warn('⚠️  MongoDB connection failed:', dbError.message);
            console.log('📝 The server will start but database features will not work');
            console.log('🔧 Please check your MongoDB configuration in .env file\n');
        }

        // Start the Express server
        const app = require('./server');
        // Server will start from server.js
        
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down server...');
    try {
        await mongoose.disconnect();
        console.log('✅ MongoDB disconnected');
    } catch (error) {
        console.error('Error during shutdown:', error);
    }
    process.exit(0);
});

startServer();
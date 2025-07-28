const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        
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
        
        const uri = buildMongoURI();
        console.log('URI:', uri.replace(/:[^:@]*@/, ':***@'));
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000,
        });
        
        console.log('✅ Successfully connected to MongoDB Atlas!');
        
        // Test basic operations
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📦 Available collections:', collections.map(c => c.name));
        
        await mongoose.disconnect();
        console.log('✅ Connection test completed successfully');
        
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        if (error.code === 'ENOTFOUND') {
            console.log('\n🔧 Troubleshooting tips:');
            console.log('1. Check your internet connection');
            console.log('2. Verify the cluster URL is correct');
            console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
            console.log('4. Try using a different DNS server (8.8.8.8)');
        }
    }
    process.exit(0);
}

testConnection();
const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Testing MongoDB connection...');
        console.log('URI:', process.env.MONGODB_URI.replace(/:[^:@]*@/, ':***@'));
        
        await mongoose.connect(process.env.MONGODB_URI, {
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
const mongoose = require('mongoose');
const https = require('https');
require('dotenv').config();

async function diagnoseConnection() {
    console.log('🔍 MongoDB Atlas Connection Diagnostics\n');
    
    // Check current IP
    console.log('1. Checking your current IP address...');
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(`   Your current IP: ${data.ip}`);
        console.log(`   Make sure this IP is whitelisted in MongoDB Atlas\n`);
    } catch (error) {
        console.log('   Could not determine IP address\n');
    }
    
    // Test DNS resolution
    console.log('2. Testing DNS resolution...');
    const hosts = [
        'cluster0.zm8lql0.mongodb.net',
        'cluster0-shard-00-00.zm8lql0.mongodb.net',
        'cluster0-shard-00-01.zm8lql0.mongodb.net',
        'cluster0-shard-00-02.zm8lql0.mongodb.net'
    ];
    
    for (const host of hosts) {
        try {
            const dns = require('dns').promises;
            const addresses = await dns.lookup(host);
            console.log(`   ✅ ${host} -> ${addresses.address}`);
        } catch (error) {
            console.log(`   ❌ ${host} -> ${error.message}`);
        }
    }
    
    console.log('\n3. Testing MongoDB connection...');
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        
        console.log('   ✅ MongoDB connection successful!');
        
        // Test basic operations
        const admin = mongoose.connection.db.admin();
        const status = await admin.ping();
        console.log('   ✅ Database ping successful:', status);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`   📦 Collections found: ${collections.length}`);
        
        await mongoose.disconnect();
        console.log('   ✅ Connection test completed\n');
        
        console.log('🎉 All tests passed! Your MongoDB Atlas is ready to use.');
        
    } catch (error) {
        console.log(`   ❌ Connection failed: ${error.message}\n`);
        
        if (error.message.includes('IP') || error.message.includes('whitelist')) {
            console.log('🔧 Fix: Add your IP to MongoDB Atlas whitelist:');
            console.log('   1. Go to https://cloud.mongodb.com/');
            console.log('   2. Navigate to Network Access');
            console.log('   3. Click "ADD IP ADDRESS"');
            console.log('   4. Add your current IP or 0.0.0.0/0 for testing');
        } else if (error.message.includes('authentication')) {
            console.log('🔧 Fix: Check your username and password');
        } else {
            console.log('🔧 General troubleshooting:');
            console.log('   - Check your internet connection');
            console.log('   - Verify cluster is running');
            console.log('   - Check MongoDB Atlas status');
        }
    }
    
    process.exit(0);
}

diagnoseConnection();
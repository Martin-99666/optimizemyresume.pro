const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

async function createBackup() {
    try {
        console.log('🔄 Starting database backup...');
        
        // Connect to database
        const uri = buildMongoURI();
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('✅ Connected to MongoDB');
        
        // Create backup directory
        const backupDir = path.join(__dirname, '..', 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }
        
        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📦 Found ${collections.length} collections`);
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupData = {
            timestamp: new Date().toISOString(),
            database: process.env.MONGODB_DATABASE || 'optimizemyresume',
            collections: {}
        };
        
        // Backup each collection
        for (const collectionInfo of collections) {
            const collectionName = collectionInfo.name;
            console.log(`📥 Backing up collection: ${collectionName}`);
            
            const collection = mongoose.connection.db.collection(collectionName);
            const documents = await collection.find({}).toArray();
            
            backupData.collections[collectionName] = documents;
            console.log(`   ✅ ${documents.length} documents backed up`);
        }
        
        // Save backup file
        const backupFileName = `backup-${timestamp}.json`;
        const backupFilePath = path.join(backupDir, backupFileName);
        
        fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2));
        
        console.log(`💾 Backup completed successfully!`);
        console.log(`📁 Backup saved to: ${backupFilePath}`);
        console.log(`📊 Total collections: ${collections.length}`);
        console.log(`📋 Total documents: ${Object.values(backupData.collections).reduce((sum, docs) => sum + docs.length, 0)}`);
        
        await mongoose.disconnect();
        
    } catch (error) {
        console.error('❌ Backup failed:', error.message);
        process.exit(1);
    }
}

// Run backup if called directly
if (require.main === module) {
    createBackup()
        .then(() => {
            console.log('🎉 Backup process completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Backup process failed:', error.message);
            process.exit(1);
        });
}

module.exports = { createBackup };
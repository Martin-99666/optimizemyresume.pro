const express = require('express');
const app = express();
const PORT = 3001;

// Basic middleware
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Backend server is working!',
        timestamp: new Date().toISOString()
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        service: 'OptimizeMyResume.pro Backend',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`);
    console.log('📋 Available endpoints:');
    console.log(`   GET http://localhost:${PORT}/health`);
    console.log(`   GET http://localhost:${PORT}/test`);
    
    // Auto-test after 1 second
    setTimeout(async () => {
        try {
            const response = await fetch(`http://localhost:${PORT}/health`);
            const data = await response.json();
            console.log('🎉 Self-test passed:', data);
        } catch (error) {
            console.log('⚠️  Self-test failed:', error.message);
        }
    }, 1000);
});
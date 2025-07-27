const emailServiceModule = require('../services/emailService');
require('dotenv').config();

async function testEmailService() {
    console.log('📧 Testing Email Service Configuration...\n');
    
    // Check environment variables
    console.log('1. Checking email configuration...');
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailServiceType = process.env.EMAIL_SERVICE;
    
    if (!emailUser || !emailPass) {
        console.log('❌ Email configuration missing');
        console.log('   Please set EMAIL_USER and EMAIL_PASS in .env file');
        console.log('   See EMAIL_SETUP.md for detailed instructions');
        process.exit(1);
    }
    
    console.log(`   ✅ Email service: ${emailServiceType || 'gmail'}`);
    console.log(`   ✅ Email user: ${emailUser}`);
    console.log(`   ✅ Email password: ${'*'.repeat(emailPass.length)}`);
    
    // Test email service connection
    console.log('\n2. Testing email service connection...');
    try {
        const testResult = await emailServiceModule.testConnection();
        if (testResult) {
            console.log('   ✅ Email service connection successful');
        } else {
            console.log('   ❌ Email service connection failed');
            console.log('   Check your email credentials and configuration');
            process.exit(1);
        }
    } catch (error) {
        console.log('   ❌ Email service connection failed:', error.message);
        process.exit(1);
    }
    
    // Send test email
    console.log('\n3. Sending test email...');
    try {
        const testOrder = {
            fullName: 'Test User',
            email: emailUser, // Send to same email for testing
            orderNumber: 'TEST-123456',
            package: 'Professional - $149',
            packagePrice: 149,
            targetIndustry: 'Technology',
            targetPosition: 'Software Engineer',
            createdAt: new Date()
        };
        
        await emailServiceModule.sendOrderConfirmation(testOrder);
        console.log('   ✅ Test email sent successfully');
        console.log(`   📬 Check your inbox at ${emailUser}`);
        
    } catch (error) {
        console.log('   ❌ Failed to send test email:', error.message);
        
        if (error.message.includes('Invalid login')) {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Check if you\'re using an app password (not regular password)');
            console.log('   - Ensure two-factor authentication is enabled');
            console.log('   - Verify the email address is correct');
        }
    }
    
    console.log('\n🎉 Email service test completed!');
    process.exit(0);
}

testEmailService();
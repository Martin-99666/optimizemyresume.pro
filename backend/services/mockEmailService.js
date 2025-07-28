const nodemailer = require('nodemailer');

// Mock email service for testing
class MockEmailService {
    constructor() {
        this.sentEmails = [];
    }

    async sendEmail(to, subject, htmlContent, textContent = '') {
        console.log('📧 [MOCK EMAIL SERVICE] Email would be sent:');
        console.log(`📮 To: ${to}`);
        console.log(`📝 Subject: ${subject}`);
        console.log(`📄 Content: ${textContent || htmlContent.substring(0, 100)}...`);
        
        // Store email for testing
        this.sentEmails.push({
            to,
            subject,
            htmlContent,
            textContent,
            timestamp: new Date().toISOString()
        });
        
        return { success: true, messageId: `mock-${Date.now()}` };
    }

    getSentEmails() {
        return this.sentEmails;
    }

    clearSentEmails() {
        this.sentEmails = [];
    }
}

// Create transporter based on environment
function createEmailTransporter() {
    const isTestMode = process.env.NODE_ENV === 'development' && !process.env.EMAIL_PASS;
    
    if (isTestMode) {
        console.log('🧪 Using mock email service for testing');
        return new MockEmailService();
    }
    
    return nodemailer.createTransporter({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

module.exports = {
    createEmailTransporter,
    MockEmailService
};
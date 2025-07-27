const stripe = require('stripe');
require('dotenv').config();

async function testStripeService() {
    console.log('💳 Testing Stripe Payment Service...\n');
    
    // Check environment variables
    console.log('1. Checking Stripe configuration...');
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!stripeSecretKey || !stripePublishableKey) {
        console.log('❌ Stripe configuration missing');
        console.log('   Please set STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY in .env file');
        console.log('   See STRIPE_SETUP.md for detailed instructions');
        process.exit(1);
    }
    
    console.log(`   ✅ Secret key: ${stripeSecretKey.substring(0, 12)}...`);
    console.log(`   ✅ Publishable key: ${stripePublishableKey.substring(0, 12)}...`);
    console.log(`   ${stripeWebhookSecret ? '✅' : '⚠️'} Webhook secret: ${stripeWebhookSecret ? 'Configured' : 'Not configured'}`);
    
    // Test Stripe connection
    console.log('\n2. Testing Stripe API connection...');
    try {
        const stripeClient = stripe(stripeSecretKey);
        
        // Test API by retrieving account info
        const account = await stripeClient.accounts.retrieve();
        console.log('   ✅ Stripe API connection successful');
        console.log(`   📊 Account ID: ${account.id}`);
        console.log(`   🏢 Business type: ${account.business_type || 'Not specified'}`);
        console.log(`   🌍 Country: ${account.country}`);
        console.log(`   💰 Default currency: ${account.default_currency?.toUpperCase()}`);
        
    } catch (error) {
        console.log('   ❌ Stripe API connection failed:', error.message);
        
        if (error.type === 'StripeAuthenticationError') {
            console.log('\n🔧 Troubleshooting:');
            console.log('   - Check if your secret key is correct');
            console.log('   - Ensure you\'re using the right key for your environment (test/live)');
        }
        process.exit(1);
    }
    
    // Test payment intent creation
    console.log('\n3. Testing payment intent creation...');
    try {
        const stripeClient = stripe(stripeSecretKey);
        
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: 14900, // $149.00 in cents
            currency: 'usd',
            description: 'Test payment for OptimizeMyResume.pro',
            metadata: {
                test: 'true',
                service: 'resume_optimization'
            }
        });
        
        console.log('   ✅ Payment intent created successfully');
        console.log(`   🆔 Payment Intent ID: ${paymentIntent.id}`);
        console.log(`   💵 Amount: $${paymentIntent.amount / 100}`);
        console.log(`   📄 Status: ${paymentIntent.status}`);
        
        // Clean up test payment intent
        await stripeClient.paymentIntents.cancel(paymentIntent.id);
        console.log('   🗑️ Test payment intent cleaned up');
        
    } catch (error) {
        console.log('   ❌ Payment intent creation failed:', error.message);
        process.exit(1);
    }
    
    // Test customer creation
    console.log('\n4. Testing customer creation...');
    try {
        const stripeClient = stripe(stripeSecretKey);
        
        const customer = await stripeClient.customers.create({
            email: 'test@example.com',
            name: 'Test Customer',
            metadata: {
                test: 'true',
                source: 'api_test'
            }
        });
        
        console.log('   ✅ Customer created successfully');
        console.log(`   🆔 Customer ID: ${customer.id}`);
        console.log(`   📧 Email: ${customer.email}`);
        
        // Clean up test customer
        await stripeClient.customers.del(customer.id);
        console.log('   🗑️ Test customer cleaned up');
        
    } catch (error) {
        console.log('   ❌ Customer creation failed:', error.message);
    }
    
    // Webhook configuration check
    console.log('\n5. Checking webhook configuration...');
    if (!stripeWebhookSecret) {
        console.log('   ⚠️ Webhook secret not configured');
        console.log('   This is optional for testing but required for production');
        console.log('   See STRIPE_SETUP.md for webhook setup instructions');
    } else {
        console.log('   ✅ Webhook secret configured');
        console.log('   Your app can receive real-time payment updates');
    }
    
    console.log('\n🎉 Stripe service test completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Test the complete payment flow on the frontend');
    console.log('   2. Set up webhooks for production use');
    console.log('   3. Configure additional payment methods if needed');
    
    process.exit(0);
}

testStripeService();
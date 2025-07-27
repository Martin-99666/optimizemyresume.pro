#!/bin/bash

# OptimizeMyResume.pro Backend Setup Script

echo "🚀 Setting up OptimizeMyResume.pro Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can install MongoDB from: https://www.mongodb.com/try/download/community"
fi

# Navigate to backend directory
cd backend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before running the server"
else
    echo "✅ Environment file already exists"
fi

# Create uploads directory
mkdir -p uploads
echo "📁 Created uploads directory"

# Create admin user
echo "👤 Creating initial admin user..."
node scripts/createAdmin.js

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit the .env file with your configuration:"
echo "   - MongoDB URI"
echo "   - Email service credentials"
echo "   - Stripe API keys"
echo "   - JWT secret"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. The API will be available at: http://localhost:3001"
echo ""
echo "📚 Check README.md for detailed setup instructions"
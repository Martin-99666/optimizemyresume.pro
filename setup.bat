@echo off
REM OptimizeMyResume.pro Backend Setup Script for Windows

echo 🚀 Setting up OptimizeMyResume.pro Backend...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Copy environment file if it doesn't exist
if not exist .env (
    echo 📋 Creating environment file...
    copy .env.example .env
    echo ⚠️  Please edit .env file with your configuration before running the server
) else (
    echo ✅ Environment file already exists
)

REM Create uploads directory
if not exist uploads mkdir uploads
echo 📁 Created uploads directory

REM Create admin user
echo 👤 Creating initial admin user...
node scripts/createAdmin.js

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Edit the .env file with your configuration:
echo    - MongoDB URI
echo    - Email service credentials
echo    - Stripe API keys
echo    - JWT secret
echo.
echo 2. Start the development server:
echo    npm run dev
echo.
echo 3. The API will be available at: http://localhost:3001
echo.
echo 📚 Check README.md for detailed setup instructions

pause
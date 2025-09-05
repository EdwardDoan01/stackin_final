#!/bin/bash

# Railway Deployment Script for Stackin
echo "🚂 Deploying Stackin to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI is not installed. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    railway login
fi

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Copy frontend build to static files
echo "📁 Copying frontend build to Django static files..."
mkdir -p staticfiles
cp -r frontend/dist/* staticfiles/

# Deploy to Railway
echo "🚂 Deploying to Railway..."
railway up

echo "✅ Deployment completed!"
echo "🌐 Your app will be available at your Railway URL"
echo ""
echo "🔧 Don't forget to:"
echo "   1. Add PostgreSQL database in Railway dashboard"
echo "   2. Set environment variables (DEBUG=False, SECRET_KEY, etc.)"
echo "   3. Run migrations: railway run python manage.py migrate --settings=Stackin.settings_production"
echo "   4. Create superuser: railway run python manage.py createsuperuser --settings=Stackin.settings_production"

#!/bin/bash

# Build script for Railway deployment
echo "🔨 Building Stackin for Railway..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Copy frontend build to Django static files
echo "📁 Copying frontend build to Django static files..."
mkdir -p staticfiles
cp -r frontend/dist/* staticfiles/

# Collect static files
echo "📦 Collecting static files..."
python Stackin/manage.py collectstatic --noinput --settings=Stackin.settings_production

echo "✅ Build completed!"

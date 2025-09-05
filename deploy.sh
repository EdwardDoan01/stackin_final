#!/bin/bash

# Stackin Project Deployment Script
echo "🚀 Starting Stackin deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production settings before continuing."
    echo "Press Enter when ready to continue..."
    read
fi

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

# Build and start services
echo "🐳 Building and starting Docker containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 30

# Run migrations
echo "🗄️  Running database migrations..."
docker-compose exec web python manage.py migrate --settings=Stackin.settings_production

# Create superuser (optional)
echo "👤 Do you want to create a superuser? (y/n)"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    docker-compose exec web python manage.py createsuperuser --settings=Stackin.settings_production
fi

# Collect static files
echo "📦 Collecting static files..."
docker-compose exec web python manage.py collectstatic --noinput --settings=Stackin.settings_production

echo "✅ Deployment completed!"
echo "🌐 Your application is running at: http://localhost"
echo "📊 Admin panel: http://localhost/admin"
echo "🔍 Check logs with: docker-compose logs -f"

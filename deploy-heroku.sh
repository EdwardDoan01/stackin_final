#!/bin/bash

# Heroku Deployment Script for Stackin
echo "🚀 Deploying Stackin to Heroku..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed. Please install it first:"
    echo "   https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Check if user is logged in
if ! heroku auth:whoami &> /dev/null; then
    echo "🔐 Please login to Heroku first:"
    heroku login
fi

# Get app name
echo "📝 Enter your Heroku app name (or press Enter to create new):"
read -r app_name

if [ -z "$app_name" ]; then
    echo "Creating new Heroku app..."
    heroku create
    app_name=$(heroku apps --json | jq -r '.[0].name')
    echo "✅ Created app: $app_name"
else
    echo "Using existing app: $app_name"
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

# Set environment variables
echo "⚙️  Setting environment variables..."
heroku config:set DEBUG=False --app $app_name
heroku config:set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())') --app $app_name
heroku config:set ALLOWED_HOSTS=$app_name.herokuapp.com --app $app_name

# Add PostgreSQL database
echo "🗄️  Adding PostgreSQL database..."
heroku addons:create heroku-postgresql:mini --app $app_name

# Deploy
echo "🚀 Deploying to Heroku..."
git add .
git commit -m "Deploy to Heroku" || true
git push heroku main

# Run migrations
echo "🗄️  Running database migrations..."
heroku run python manage.py migrate --settings=Stackin.settings_production --app $app_name

# Collect static files
echo "📦 Collecting static files..."
heroku run python manage.py collectstatic --noinput --settings=Stackin.settings_production --app $app_name

echo "✅ Deployment completed!"
echo "🌐 Your app is live at: https://$app_name.herokuapp.com"
echo "📊 Admin panel: https://$app_name.herokuapp.com/admin"
echo ""
echo "🔧 To create a superuser, run:"
echo "   heroku run python manage.py createsuperuser --settings=Stackin.settings_production --app $app_name"

#!/bin/bash

# Start script for Railway deployment
echo "🚀 Starting Stackin on Railway..."

# Change to Django directory
cd Stackin

# Start Gunicorn
exec gunicorn Stackin.wsgi:application --bind 0.0.0.0:$PORT

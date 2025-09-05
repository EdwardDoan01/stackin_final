# Use official Python slim image
FROM python:3.11-slim

# Prevent Python from writing .pyc files and enable stdout/stderr flush
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies (minimal for PyMySQL)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip install -r /app/requirements.txt

# Install Node.js for frontend build
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy package.json and install frontend dependencies
COPY frontend/package*.json /app/frontend/
RUN cd frontend && npm install

# Copy the whole project
COPY . /app

# Build frontend
RUN cd frontend && npm run build

# Switch to project folder where manage.py lives
WORKDIR /app/Stackin

# Collect static files
RUN python manage.py collectstatic --noinput --settings=Stackin.settings_production || true

# Expose port and start gunicorn using Railway $PORT env
EXPOSE 8000
CMD ["bash", "-c", "gunicorn Stackin.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]

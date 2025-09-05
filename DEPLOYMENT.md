# 🚀 Stackin Project Deployment Guide

This guide will help you deploy your Django + React Stackin project to production.

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed
- A domain name (optional, for production)
- MySQL database (or use Docker MySQL)

## 🛠️ Deployment Options

### Option 1: Docker Deployment (Recommended)

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd Django_project
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your production settings
   ```

3. **Deploy**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

### Option 2: Manual Deployment

1. **Build frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

2. **Setup Django**:
   ```bash
   pip install -r requirements-prod.txt
   python manage.py migrate --settings=Stackin.settings_production
   python manage.py collectstatic --noinput --settings=Stackin.settings_production
   ```

3. **Run with Gunicorn**:
   ```bash
   gunicorn --bind 0.0.0.0:8000 Stackin.wsgi:application
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with these variables:

```env
DEBUG=False
SECRET_KEY=your-super-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=mysql://user:password@host:port/database
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Database Setup

For production, consider using:
- **MySQL**: Already configured
- **PostgreSQL**: Change DATABASE_URL to postgres://...
- **Cloud databases**: AWS RDS, Google Cloud SQL, etc.

## 🌐 Domain and SSL

1. **Point your domain** to your server IP
2. **Update ALLOWED_HOSTS** in .env
3. **Setup SSL** with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## 📊 Monitoring and Logs

- **View logs**: `docker-compose logs -f`
- **Check status**: `docker-compose ps`
- **Restart services**: `docker-compose restart`

## 🔄 Updates

To update your deployment:

```bash
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
docker-compose exec web python manage.py migrate --settings=Stackin.settings_production
```

## 🚨 Troubleshooting

### Common Issues:

1. **Database connection failed**:
   - Check DATABASE_URL in .env
   - Ensure database is running
   - Verify credentials

2. **Static files not loading**:
   - Run `python manage.py collectstatic`
   - Check STATIC_ROOT path
   - Verify nginx configuration

3. **CORS errors**:
   - Update CORS_ALLOWED_ORIGINS
   - Check frontend API base URL

4. **Permission denied**:
   - Check file permissions
   - Ensure Docker has proper access

## 📈 Performance Optimization

1. **Enable caching**:
   - Redis for session storage
   - Database query caching
   - Static file caching

2. **Database optimization**:
   - Add database indexes
   - Use connection pooling
   - Regular backups

3. **Frontend optimization**:
   - Enable gzip compression
   - Use CDN for static files
   - Optimize images

## 🔒 Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Set DEBUG=False
- [ ] Configure ALLOWED_HOSTS
- [ ] Setup HTTPS/SSL
- [ ] Regular security updates
- [ ] Database backups
- [ ] Monitor logs for errors

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify configuration files
3. Test database connectivity
4. Check network/firewall settings

---

**Happy Deploying! 🎉**

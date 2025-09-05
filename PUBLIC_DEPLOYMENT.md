# 🌐 Public Deployment Guide for Stackin

This guide will help you deploy your Stackin project to the public so people can access your website.

## 🚀 **Quick Deploy Options (Choose One)**

### Option 1: Heroku (Easiest - Free Tier Available)

**Step 1: Prepare your project**
```bash
# Make sure you're in the project directory
cd Django_project

# Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli
```

**Step 2: Deploy to Heroku**
```bash
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-stackin-app

# Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
heroku config:set ALLOWED_HOSTS=your-stackin-app.herokuapp.com

# Add PostgreSQL database
heroku addons:create heroku-postgresql:mini

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Run migrations
heroku run python manage.py migrate --settings=Stackin.settings_production

# Create superuser
heroku run python manage.py createsuperuser --settings=Stackin.settings_production
```

**Step 3: Access your app**
- Your app will be available at: `https://your-stackin-app.herokuapp.com`
- Admin panel: `https://your-stackin-app.herokuapp.com/admin`

---

### Option 2: Railway (Modern & Fast)

**Step 1: Prepare your project**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

**Step 2: Deploy to Railway**
```bash
# Initialize Railway project
railway init

# Deploy
railway up

# Set environment variables
railway variables set DEBUG=False
railway variables set SECRET_KEY=your-secret-key-here
railway variables set ALLOWED_HOSTS=your-app.up.railway.app
```

**Step 3: Access your app**
- Your app will be available at: `https://your-app.up.railway.app`

---

### Option 3: Render (Free Tier Available)

**Step 1: Connect your GitHub repository**
1. Go to [render.com](https://render.com)
2. Sign up and connect your GitHub account
3. Import your repository

**Step 2: Deploy**
1. Click "New Web Service"
2. Connect your repository
3. Use these settings:
   - **Build Command**: `pip install -r requirements.txt && cd frontend && npm install && npm run build && cd .. && python manage.py migrate --settings=Stackin.settings_production && python manage.py collectstatic --noinput --settings=Stackin.settings_production`
   - **Start Command**: `gunicorn Stackin.wsgi:application`
   - **Environment**: Python 3

**Step 3: Set environment variables**
- `DEBUG`: `False`
- `SECRET_KEY`: Generate a new one
- `ALLOWED_HOSTS`: `your-app-name.onrender.com`

---

## 🔧 **Before Deploying - Important Steps**

### 1. Update your frontend API configuration

Update `frontend/src/lib/api.ts` to use your production URL:

```typescript
// Change this line:
const API_BASE_URL = '/api'

// To this (replace with your actual domain):
const API_BASE_URL = 'https://your-stackin-app.herokuapp.com/api'
```

### 2. Build your frontend for production
```bash
cd frontend
npm install
npm run build
cd ..
```

### 3. Test locally with production settings
```bash
python manage.py runserver --settings=Stackin.settings_production
```

---

## 🌍 **Domain Setup (Optional)**

### Custom Domain
1. **Buy a domain** from providers like Namecheap, GoDaddy, etc.
2. **Point DNS** to your hosting platform
3. **Update ALLOWED_HOSTS** in your environment variables
4. **Setup SSL** (usually automatic on these platforms)

### Example DNS Configuration:
- **A Record**: `@` → `your-server-ip`
- **CNAME**: `www` → `your-app.herokuapp.com`

---

## 📊 **Post-Deployment Checklist**

- [ ] ✅ App is accessible via public URL
- [ ] ✅ Admin panel works (`/admin`)
- [ ] ✅ Frontend loads correctly
- [ ] ✅ API endpoints respond
- [ ] ✅ Database migrations applied
- [ ] ✅ Static files served correctly
- [ ] ✅ User registration works
- [ ] ✅ AI Chatbot functions
- [ ] ✅ All pages load without errors

---

## 🔍 **Troubleshooting**

### Common Issues:

1. **"DisallowedHost" Error**:
   - Add your domain to `ALLOWED_HOSTS`
   - Check environment variables

2. **Static Files Not Loading**:
   - Run `python manage.py collectstatic`
   - Check `STATIC_ROOT` setting

3. **Database Connection Failed**:
   - Check `DATABASE_URL` environment variable
   - Ensure database service is running

4. **Frontend Not Loading**:
   - Check if frontend build is in `staticfiles/`
   - Verify API base URL in frontend

### Debug Commands:
```bash
# Check logs
heroku logs --tail

# Check environment variables
heroku config

# Run Django shell
heroku run python manage.py shell --settings=Stackin.settings_production
```

---

## 🎉 **You're Live!**

Once deployed, your Stackin platform will be accessible to users worldwide at your chosen URL!

**Share your app**: `https://your-stackin-app.herokuapp.com`

---

## 💡 **Pro Tips**

1. **Monitor Performance**: Use platform dashboards to monitor your app
2. **Regular Backups**: Set up automated database backups
3. **Security Updates**: Keep dependencies updated
4. **Custom Domain**: Get a professional domain name
5. **SSL Certificate**: Ensure HTTPS is enabled
6. **Error Monitoring**: Consider adding Sentry for error tracking

**Happy Deploying! 🚀**
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file

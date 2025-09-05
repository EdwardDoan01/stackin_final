# 🚂 Railway Deployment Guide for Stackin

This guide will help you deploy your Stackin project to Railway, which is a modern and easy-to-use deployment platform.

## 🚀 **Quick Deploy to Railway**

### Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Fix Railway deployment - update MySQL client packages"
   git push origin main
   ```

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your Stackin repository**
6. **Railway will automatically detect it's a Django project**

### Step 3: Configure Environment Variables

In your Railway project dashboard, go to **Variables** tab and add:

```env
DEBUG=False
SECRET_KEY=your-super-secret-key-here
ALLOWED_HOSTS=your-app.up.railway.app
DATABASE_URL=postgresql://postgres:password@localhost:5432/railway
```

**To get your DATABASE_URL:**
1. Go to your Railway project
2. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
3. Railway will automatically set the `DATABASE_URL` variable

### Step 4: Update Your Frontend API URL

Update `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.up.railway.app/api'  // Replace with your actual Railway URL
  : '/api'
```

### Step 5: Deploy

1. **Railway will automatically build and deploy** your project
2. **Wait for the build to complete** (usually 2-3 minutes)
3. **Your app will be live** at `https://your-app.up.railway.app`

## 🔧 **Troubleshooting Railway Issues**

### Common Issues and Solutions:

#### 1. **MySQL Client Error (Fixed)**
- ✅ **Fixed**: Updated Dockerfile to use `libmariadb-dev` instead of `libmysqlclient-dev`
- ✅ **Added**: `nixpacks.toml` for Railway-specific configuration

#### 2. **Build Fails**
- Check the build logs in Railway dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify frontend build completes successfully

#### 3. **Database Connection Issues**
- Ensure PostgreSQL database is added to your project
- Check `DATABASE_URL` environment variable
- Verify database is running

#### 4. **Static Files Not Loading**
- Railway automatically handles static files
- Check if `collectstatic` runs during build
- Verify `STATIC_ROOT` setting

#### 5. **CORS Issues**
- Update `CORS_ALLOWED_ORIGINS` in settings
- Add your Railway domain to allowed hosts

## 📊 **Railway-Specific Features**

### Automatic Deployments
- **GitHub Integration**: Every push to main branch triggers deployment
- **Preview Deployments**: Pull requests get preview URLs
- **Rollback**: Easy rollback to previous deployments

### Monitoring
- **Logs**: Real-time logs in Railway dashboard
- **Metrics**: CPU, memory, and network usage
- **Health Checks**: Automatic health monitoring

### Scaling
- **Auto-scaling**: Automatically scales based on traffic
- **Custom Domains**: Add your own domain name
- **SSL**: Automatic HTTPS certificates

## 🎯 **Post-Deployment Steps**

1. **Create Superuser**:
   ```bash
   # In Railway dashboard, go to your service
   # Click "Connect" → "Open Shell"
   python manage.py createsuperuser --settings=Stackin.settings_production
   ```

2. **Run Migrations** (if needed):
   ```bash
   python manage.py migrate --settings=Stackin.settings_production
   ```

3. **Test Your App**:
   - Visit your Railway URL
   - Test user registration
   - Test all features
   - Check admin panel

## 🌐 **Custom Domain (Optional)**

1. **In Railway dashboard**:
   - Go to your project
   - Click on your service
   - Go to **Settings** → **Domains**
   - Add your custom domain

2. **Update Environment Variables**:
   - Add your domain to `ALLOWED_HOSTS`
   - Update frontend API URL

## 💡 **Pro Tips for Railway**

1. **Use Railway's PostgreSQL**: It's free and automatically configured
2. **Monitor Logs**: Check logs regularly for any issues
3. **Environment Variables**: Keep sensitive data in Railway's environment variables
4. **Auto-deploy**: Enable automatic deployments from GitHub
5. **Health Checks**: Railway automatically monitors your app health

## 🚨 **If Deployment Still Fails**

1. **Check Build Logs**: Look for specific error messages
2. **Verify Dependencies**: Ensure all packages are compatible
3. **Test Locally**: Run with production settings locally first
4. **Contact Support**: Railway has excellent support documentation

---

**Your Stackin app should now be live on Railway! 🎉**

**URL**: `https://your-app.up.railway.app`

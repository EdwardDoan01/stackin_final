# 🚂 Simple Railway Deployment Guide

This is the **simplest** way to deploy your Stackin project to Railway without any Docker complications.

## 🚀 **Step-by-Step Deployment**

### Step 1: Prepare Your Code

1. **Make sure your code is pushed to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your Stackin repository**
6. **Railway will automatically detect it's a Python project**

### Step 3: Configure Environment Variables

In your Railway project dashboard, go to **Variables** and add:

```env
DEBUG=False
SECRET_KEY=your-super-secret-key-here
ALLOWED_HOSTS=your-app.up.railway.app
```

### Step 4: Add Database

1. **In Railway dashboard**, click **"+ New"**
2. **Select "Database"** → **"PostgreSQL"**
3. **Railway will automatically set DATABASE_URL**

### Step 5: Update Frontend API URL

Update `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.up.railway.app/api'  // Replace with your actual Railway URL
  : '/api'
```

### Step 6: Build and Deploy

1. **Railway will automatically build and deploy**
2. **Wait for completion** (usually 2-3 minutes)
3. **Your app will be live** at `https://your-app.up.railway.app`

## 🔧 **Post-Deployment Setup**

### Run Migrations

In Railway dashboard:
1. Go to your service
2. Click **"Connect"** → **"Open Shell"**
3. Run: `python Stackin/manage.py migrate --settings=Stackin.settings_production`

### Create Superuser

In the same shell:
```bash
python Stackin/manage.py createsuperuser --settings=Stackin.settings_production
```

### Collect Static Files

```bash
python Stackin/manage.py collectstatic --noinput --settings=Stackin.settings_production
```

## 🎯 **Why This Works**

- **No Docker**: Uses Railway's native Python support
- **PyMySQL**: Pure Python MySQL client (no system dependencies)
- **Automatic Detection**: Railway detects Python project automatically
- **Simple Configuration**: Minimal configuration needed

## 🚨 **If It Still Fails**

1. **Check the build logs** in Railway dashboard
2. **Verify environment variables** are set correctly
3. **Make sure database is added** before deployment
4. **Check that your GitHub repo is up to date**

## ✅ **Success Checklist**

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Environment variables set
- [ ] PostgreSQL database added
- [ ] Frontend API URL updated
- [ ] Migrations run
- [ ] Superuser created
- [ ] Static files collected

---

**Your Stackin app should now be live! 🎉**

**URL**: `https://your-app.up.railway.app`

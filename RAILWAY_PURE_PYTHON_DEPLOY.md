# 🚂 Pure Python Railway Deployment

This guide uses **pure Python** deployment without any Docker or complex configurations.

## 🚀 **Step-by-Step Deployment**

### Step 1: Delete Current Railway Project
1. **Go to Railway dashboard**
2. **Delete the current "stackin_final" project**
3. **This removes all problematic configurations**

### Step 2: Create Fresh Railway Project
1. **Go to [railway.app](https://railway.app)**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your Stackin repository**
5. **Railway will auto-detect Python project**

### Step 3: Let Railway Auto-Detect Everything
Railway will automatically detect:
- **Python project** (from `requirements.txt`, `setup.py`, `pyproject.toml`)
- **Node.js project** (from `package.json`)
- **Django project** (from `manage.py`)

### Step 4: Set Environment Variables
In Railway dashboard, go to **Variables** and add:

```env
DEBUG=False
SECRET_KEY=your-super-secret-key-here
ALLOWED_HOSTS=your-app.up.railway.app
```

### Step 5: Add PostgreSQL Database
1. **In Railway dashboard**, click **"+ New"**
2. **Select "Database"** → **"PostgreSQL"**
3. **Railway will set DATABASE_URL automatically**

### Step 6: Update Frontend API URL
Update `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.up.railway.app/api'
  : '/api'
```

### Step 7: Deploy
1. **Railway will automatically build and deploy**
2. **Wait for completion** (usually 2-3 minutes)
3. **Your app will be live** at `https://your-app.up.railway.app`

## 🔧 **Post-Deployment Setup**

### Run Migrations
In Railway shell:
```bash
python Stackin/manage.py migrate --settings=Stackin.settings_production
```

### Create Superuser
```bash
python Stackin/manage.py createsuperuser --settings=Stackin.settings_production
```

### Collect Static Files
```bash
python Stackin/manage.py collectstatic --noinput --settings=Stackin.settings_production
```

## 🎯 **Why This Will Work**

- **Pure Python**: No Docker, no Nix issues
- **Auto-Detection**: Railway detects Python + Node.js automatically
- **Standard Files**: Uses `requirements.txt`, `setup.py`, `pyproject.toml`
- **No Custom Scripts**: Railway handles everything

## ✅ **Success Checklist**

- [ ] Old Railway project deleted
- [ ] New Railway project created
- [ ] Environment variables set
- [ ] PostgreSQL database added
- [ ] Frontend API URL updated
- [ ] Build completes automatically
- [ ] App starts successfully
- [ ] Migrations run
- [ ] Superuser created

---

**This pure Python approach should work perfectly! 🚂✨**

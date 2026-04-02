# 🚨 NETLIFY DEPLOYMENT FIX

## Issues Found in Your Deployment:

### 1. ✅ FIXED: Node Version
- **Error**: eslint requires Node 20+, but Netlify was using Node 18
- **Fix**: Updated `netlify.toml` to use Node 20

### 2. ✅ FIXED: Publish Directory
- **Error**: Path was `/opt/build/repo/frontend/frontend/dist` (double frontend)
- **Fix**: Corrected to `frontend/dist` in `netlify.toml`

### 3. ⚠️ REQUIRED: Environment Variables
Your Netlify build is looking for OLD Supabase variables:
- ❌ `VITE_SUPABASE_ANON_KEY` (remove this)
- ❌ `VITE_SUPABASE_URL` (remove this)

**You need to set the CORRECT variable:**

---

## 🔧 ACTION REQUIRED: Update Netlify Environment Variables

### Step 1: Go to Netlify Dashboard
1. Open your site in Netlify
2. Go to **Site settings** → **Environment variables**

### Step 2: Remove Old Variables
Delete these if they exist:
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_URL`

### Step 3: Add New Variable
Add this environment variable:

| Key | Value |
|-----|-------|
| `VITE_REACT_APP_BACKEND_URL` | `https://your-backend.up.railway.app` |

⚠️ **Important**: Replace `https://your-backend.up.railway.app` with your actual Railway backend URL!

### Step 4: Trigger Redeploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**

---

## 🚀 Complete Deployment Steps

### Backend First (Railway):

1. **Deploy to Railway**: https://railway.app/
   - New Project → Deploy from GitHub
   - Select your repo
   - Add MongoDB database
   - Set environment variables:
     ```
     MONGO_URL=mongodb://[auto-provided-by-railway]
     DB_NAME=chembio_lab
     SECRET_KEY=[generate-random-32-char-string]
     ALLOWED_ORIGINS=*
     ```

2. **Get Backend URL**:
   - Railway will give you a URL like: `https://chembiolab-backend.up.railway.app`
   - Copy this URL

3. **Run Seed Script** (to create admin user):
   - In Railway dashboard, go to your backend service
   - Open **Settings** → **Variables** → Verify all are set
   - You can run seed via Railway CLI or wait until after deployment to create users manually

---

### Frontend Second (Netlify):

1. **Update Environment Variable**:
   - Go to Netlify site settings
   - Environment variables
   - Add: `VITE_REACT_APP_BACKEND_URL` = `[your-railway-url]`

2. **Update Files** (if not done):
   - Push the updated `netlify.toml` (Node 20)
   - This is already in your repo

3. **Deploy**:
   - Netlify will auto-deploy from GitHub
   - Or click **Trigger deploy**

4. **Verify**:
   - Visit your Netlify URL
   - Check browser console (F12) for errors
   - Try logging in

---

## 📋 Environment Variables Checklist

### ✅ Backend (Railway)
```bash
MONGO_URL=mongodb://[railway-mongodb-url]
DB_NAME=chembio_lab
SECRET_KEY=[32-character-random-string]
ALLOWED_ORIGINS=*
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### ✅ Frontend (Netlify)
```bash
VITE_REACT_APP_BACKEND_URL=https://your-backend.up.railway.app
```

---

## 🧪 After Deployment Testing

1. **Backend Health Check**:
   ```bash
   curl https://your-backend.up.railway.app/api/health
   ```
   Should return: `{"status":"healthy","service":"ChemBioSystems Lab API"}`

2. **Frontend**:
   - Visit your Netlify URL
   - Open browser console (F12)
   - Check for CORS errors
   - Try to login

3. **Create Admin User** (if needed):
   - SSH into Railway backend
   - Run: `python seed_admin.py`
   - Or create user via `/login` signup

---

## 🐛 Common Issues & Fixes

### "Failed to fetch" or CORS Error
**Problem**: Backend ALLOWED_ORIGINS not set correctly
**Fix**: 
1. Go to Railway environment variables
2. Update `ALLOWED_ORIGINS` to include your Netlify URL:
   ```
   ALLOWED_ORIGINS=https://your-site.netlify.app,http://localhost:3000
   ```
3. Redeploy backend

### "VITE_REACT_APP_BACKEND_URL is required"
**Problem**: Environment variable not set in Netlify
**Fix**: 
1. Netlify → Site settings → Environment variables
2. Add `VITE_REACT_APP_BACKEND_URL` with your Railway URL
3. Redeploy

### Build fails with Node version error
**Problem**: Old netlify.toml cached
**Fix**: 
1. Push updated netlify.toml (already done)
2. Clear build cache in Netlify:
   - Site settings → Build & deploy → Clear cache and deploy

---

## ✅ Final Checklist

Before going live:

- [ ] Backend deployed to Railway with MongoDB
- [ ] Backend environment variables set correctly
- [ ] Backend health check returns 200 OK
- [ ] Frontend deployed to Netlify
- [ ] `VITE_REACT_APP_BACKEND_URL` set in Netlify
- [ ] Frontend loads without console errors
- [ ] Can login with test credentials
- [ ] CORS working (no errors in console)
- [ ] Admin user created

---

## 🎉 Success!

Once all green:
1. Visit your Netlify URL
2. Login with: `admin@chembiolab.com` / `admin123`
3. Change admin password
4. Start using your app!

---

## 📞 Quick Reference

**Backend URL**: `https://[your-project].up.railway.app`
**Frontend URL**: `https://[your-site].netlify.app`

**Test Credentials**:
- Email: `admin@chembiolab.com`
- Password: `admin123`

---

Need help? Check the error logs:
- **Netlify**: Deploy log in Netlify dashboard
- **Railway**: Logs tab in Railway service dashboard

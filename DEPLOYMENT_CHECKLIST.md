# 🚀 Netlify Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Code is Ready
- [x] Backend API built (FastAPI + MongoDB)
- [x] Frontend built successfully (React + Vite)
- [x] All Supabase references removed
- [x] API integration complete
- [x] Build tested locally (`yarn build` ✅)
- [x] Configuration files created

### 2. Files Created for Deployment
- [x] `/app/netlify.toml` - Netlify configuration
- [x] `/app/frontend/public/_redirects` - SPA routing
- [x] `/app/backend/railway.json` - Railway configuration
- [x] `/app/backend/Procfile` - Heroku/Railway start command
- [x] `/app/render.yaml` - Render.com configuration
- [x] `/app/.env.production.template` - Environment variables template
- [x] `/app/NETLIFY_DEPLOY.md` - Full deployment guide

---

## 🎯 Step-by-Step Deployment

### STEP 1: Push to GitHub ⬆️

Use the **"Save to Github"** button in the chat to push your code.

**What will be saved:**
```
✓ Backend code (FastAPI server)
✓ Frontend code (React app)
✓ Configuration files
✓ Documentation
```

---

### STEP 2: Deploy Backend to Railway 🚂

1. **Go to**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Select** your repository
5. **Root Directory**: `/backend`
6. **Add MongoDB**: 
   - Click "+ New"
   - Select "Database" → "MongoDB"
7. **Environment Variables** (in Railway dashboard):
   ```
   MONGO_URL=mongodb://mongo.[your-railway-url]:27017/chembio_lab
   SECRET_KEY=[generate-random-key]
   ALLOWED_ORIGINS=https://your-site.netlify.app
   ```
   > To generate SECRET_KEY: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
   
8. **Deploy!**
9. **Copy the backend URL** (e.g., `https://chembiolab-backend.up.railway.app`)

---

### STEP 3: Deploy Frontend to Netlify 🌐

1. **Go to**: https://app.netlify.com/
2. **New site from Git** → Connect to GitHub
3. **Select your repository**
4. **Build Settings** (should auto-detect from netlify.toml):
   - Base directory: `frontend`
   - Build command: `yarn install && yarn build`
   - Publish directory: `frontend/dist`
5. **Environment Variables** (Site settings → Environment variables):
   ```
   VITE_REACT_APP_BACKEND_URL=https://your-backend-url.up.railway.app
   ```
6. **Deploy!**
7. **Get your Netlify URL** (e.g., `https://chembiolab.netlify.app`)

---

### STEP 4: Update CORS 🔒

Go back to **Railway** and update the environment variable:

```
ALLOWED_ORIGINS=https://chembiolab.netlify.app,http://localhost:3000
```

Then **redeploy** the backend.

---

### STEP 5: Create Admin User 👤

SSH into your Railway backend or use Railway CLI:

```bash
railway run python seed_admin.py
```

This creates:
- Email: `admin@chembiolab.com`
- Password: `admin123`

---

### STEP 6: Test Your Deployment 🧪

1. **Backend Health Check**:
   ```bash
   curl https://your-backend.up.railway.app/api/health
   ```
   Should return: `{"status":"healthy","service":"ChemBioSystems Lab API"}`

2. **Frontend**:
   - Visit `https://your-site.netlify.app`
   - Should load homepage

3. **Login**:
   - Go to `/login`
   - Use admin credentials
   - Should redirect to dashboard

4. **API Integration**:
   - Open browser console (F12)
   - Check for no CORS errors
   - Create a test project/publication

---

## 📋 Post-Deployment Tasks

### Immediate Tasks
- [ ] Change admin password
- [ ] Update CORS to only allow your domain (remove localhost)
- [ ] Add custom domain (optional)
- [ ] Set up SSL (automatic on both Netlify & Railway)

### Optional Enhancements
- [ ] Set up monitoring (Railway has built-in)
- [ ] Configure database backups
- [ ] Add error tracking (Sentry)
- [ ] Set up CI/CD pipeline
- [ ] Configure environment-specific builds

---

## 🔧 Environment Variables Reference

### Backend (Railway)
```bash
MONGO_URL=mongodb://...           # Provided by Railway MongoDB
SECRET_KEY=your-secret-key        # Generate securely
ALLOWED_ORIGINS=https://...       # Your Netlify URL
```

### Frontend (Netlify)
```bash
VITE_REACT_APP_BACKEND_URL=https://...  # Your Railway backend URL
```

---

## 💰 Cost Estimate

| Service | Plan | Cost |
|---------|------|------|
| Netlify | Free | $0/month |
| Railway | Hobby | $5/month |
| **Total** | | **$5/month** |

---

## 🐛 Troubleshooting

### "CORS Error"
- Check `ALLOWED_ORIGINS` in Railway includes your Netlify URL
- Verify backend is deployed and running

### "API calls failing"
- Check `VITE_REACT_APP_BACKEND_URL` is set in Netlify
- Test backend health endpoint directly
- Check browser network tab for exact error

### "Build failed"
- Check build logs in Netlify
- Verify `netlify.toml` is in repository root
- Check Node version (should be 18+)

### "Database connection error"
- Verify MongoDB is running on Railway
- Check `MONGO_URL` is set correctly
- Review Railway logs

---

## 📞 Support Links

- **Railway Docs**: https://docs.railway.app/
- **Netlify Docs**: https://docs.netlify.com/
- **Your GitHub Repo**: https://github.com/[your-username]/[repo-name]

---

## ✅ Deployment Status

After completing all steps, you should have:

- ✅ Backend running on Railway with MongoDB
- ✅ Frontend deployed on Netlify
- ✅ CORS configured correctly
- ✅ Admin user created
- ✅ Application fully functional
- ✅ HTTPS enabled on both services

---

## 🎉 Success!

Your ChemBioSystems Lab website is now live!

**Access your app**: https://your-site.netlify.app

**Login**: admin@chembiolab.com / admin123

**Remember to**: Change the admin password after first login!

---

## 📝 Quick Commands

### Generate Secret Key
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Test Backend
```bash
curl https://your-backend.up.railway.app/api/health
```

### View Railway Logs
```bash
railway logs
```

### Redeploy Netlify
```bash
netlify deploy --prod
```

---

Need help? Check `/app/NETLIFY_DEPLOY.md` for detailed instructions!

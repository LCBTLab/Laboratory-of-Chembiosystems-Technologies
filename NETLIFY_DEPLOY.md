# Netlify Deployment Guide for ChemBioSystems Lab

## 🚀 Deployment Architecture

Since this is a **full-stack application**, you need TWO deployments:

```
┌─────────────────┐         ┌──────────────────┐
│   Frontend      │────────→│     Backend      │
│   (Netlify)     │         │  (Railway/Render)│
│   React + Vite  │         │  FastAPI + Mongo │
└─────────────────┘         └──────────────────┘
```

## 📦 Option 1: Netlify (Frontend) + Railway (Backend) - RECOMMENDED

### Step 1: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app/
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository**
5. **Add MongoDB**: Click "New" → "Database" → "MongoDB"
6. **Configure Backend Service**:
   - Root Directory: `/backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
7. **Add Environment Variables**:
   ```
   MONGO_URL=mongodb://[railway-mongo-url]
   SECRET_KEY=chembio-secret-key-change-in-production-2024
   ```
8. **Deploy** and copy the backend URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Deploy Frontend to Netlify

1. **Go to Netlify**: https://app.netlify.com/
2. **New site from Git** → Choose your GitHub repository
3. **Build settings**:
   - Base directory: `frontend`
   - Build command: `yarn install && yarn build`
   - Publish directory: `frontend/dist`
4. **Environment Variables** (Site settings → Environment variables):
   ```
   VITE_REACT_APP_BACKEND_URL=https://your-app.up.railway.app
   ```
5. **Deploy**!

---

## 📦 Option 2: Render (Both Frontend & Backend)

Render can host both in one place:

1. **Go to Render**: https://render.com/
2. **New Web Service** for Backend:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python server.py`
   - Add MongoDB (Render has built-in MongoDB)
3. **New Static Site** for Frontend:
   - Build Command: `cd frontend && yarn install && yarn build`
   - Publish Directory: `frontend/dist`

---

## 📦 Option 3: Vercel (Frontend Only)

Similar to Netlify:

1. **Go to Vercel**: https://vercel.com/
2. **Import your Git repository**
3. **Framework**: Vite
4. **Root Directory**: `frontend`
5. **Build Command**: `yarn build`
6. **Output Directory**: `dist`
7. **Environment Variables**:
   ```
   VITE_REACT_APP_BACKEND_URL=https://your-backend-url.com
   ```

---

## 🔧 Pre-Deployment Checklist

### Frontend Changes Needed:

✅ Already configured in your project:
- [x] `netlify.toml` created
- [x] `_redirects` file for SPA routing
- [x] Environment variable setup in `vite.config.ts`
- [x] API URL from environment variable

### Backend Changes Needed:

1. **Update CORS in `/app/backend/server.py`** to allow your Netlify domain:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-site.netlify.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **Set Production SECRET_KEY**: Change in Railway/Render environment variables

---

## 🎯 Quick Deploy Commands

### Test Production Build Locally:

```bash
# Build frontend
cd /app/frontend
yarn build
yarn preview

# The build will be in /app/frontend/dist
```

### Environment Variables Summary:

**Frontend (.env.production)**:
```env
VITE_REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

**Backend (Railway/Render)**:
```env
MONGO_URL=mongodb://[provided-by-service]
SECRET_KEY=your-production-secret-key-here
```

---

## 📝 Netlify-Specific Setup

### Using Netlify CLI (Optional):

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from /app directory
netlify deploy --prod

# Follow prompts:
# - Build command: cd frontend && yarn install && yarn build
# - Publish directory: frontend/dist
```

### Netlify Environment Variables:

After creating your site, add in **Site settings → Environment variables**:

| Key | Value |
|-----|-------|
| `VITE_REACT_APP_BACKEND_URL` | Your backend URL |
| `NODE_VERSION` | `18` |

---

## 🔒 Security Recommendations

1. **Update CORS**: Only allow your actual domain
2. **Change SECRET_KEY**: Use a strong random key in production
3. **Change Admin Password**: After first deployment
4. **Enable HTTPS**: Both Netlify and Railway provide this by default
5. **Set MongoDB Authentication**: Use Railway's or Render's managed MongoDB

---

## 🐛 Troubleshooting

### "API calls failing"
- Check `VITE_REACT_APP_BACKEND_URL` is set correctly
- Verify backend CORS includes your Netlify domain
- Check backend is running (visit backend-url/api/health)

### "Build failed on Netlify"
- Ensure `netlify.toml` is in project root
- Check Node version (should be 18+)
- Review build logs for missing dependencies

### "Routes not working"
- Ensure `_redirects` file is in `frontend/public/`
- Netlify should serve index.html for all routes

---

## 📊 Deployment Status Check

After deployment, verify:

1. **Frontend**: `https://your-site.netlify.app` → Should load homepage
2. **Backend**: `https://your-backend.railway.app/api/health` → Should return JSON
3. **Login**: Try logging in with admin credentials
4. **API Calls**: Check browser console for errors

---

## 💰 Cost Estimate

- **Netlify**: Free tier (100GB bandwidth/month)
- **Railway**: $5/month (500 hours, includes database)
- **Render**: Free tier available (spins down after inactivity)
- **Vercel**: Free tier (similar to Netlify)

---

## 🎉 Recommended: Netlify + Railway

**Best combination for your app:**
1. ✅ Frontend on Netlify (free, fast, CDN)
2. ✅ Backend on Railway (cheap, includes MongoDB, always-on)
3. ✅ Total cost: ~$5/month

---

## 📞 Next Steps

1. **Push code to GitHub** (use "Save to Github" button)
2. **Choose deployment option** (Netlify + Railway recommended)
3. **Deploy backend first** (get the URL)
4. **Deploy frontend** (with backend URL in env vars)
5. **Test the app**
6. **Update CORS and secrets**

Need help with any step? Let me know!

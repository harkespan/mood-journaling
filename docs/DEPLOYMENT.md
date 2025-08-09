# 🚀 Deployment Guide

Panduan lengkap untuk deploy aplikasi Mood Journal ke berbagai platform hosting.

## 🎯 Overview

Aplikasi Mood Journal adalah static web application yang dapat di-deploy ke berbagai platform hosting tanpa memerlukan server backend. Guide ini mencakup deployment ke platform populer seperti Netlify, Vercel, dan GitHub Pages.

## 📋 Pre-Deployment Checklist

### 1. Build Preparation
- [ ] Semua fitur sudah ditest di local environment
- [ ] Google OAuth Client ID sudah dikonfigurasi untuk production domain
- [ ] Environment variables sudah disetup (jika diperlukan)
- [ ] Dependencies sudah up-to-date dan secure
- [ ] Build command berjalan tanpa error

### 2. Production Considerations
- [ ] HTTPS certificate (otomatis di platform hosting modern)
- [ ] Domain configuration untuk Google OAuth
- [ ] Performance optimization enabled
- [ ] Error tracking setup (optional)

## 🔧 Build Configuration

### Standard Build Process
```bash
# Install dependencies
npm install

# Run production build  
npm run build

# Preview build locally (optional)
npm run preview
```

### Build Output
Setelah build, file static akan tersedia di folder `dist/`:
```
dist/
├── index.html          # Main HTML file
├── assets/            # Compiled CSS & JS
│   ├── index-[hash].js
│   └── index-[hash].css
└── favicon.ico        # App icon
```

## 🌐 Platform Deployment

## 1. Netlify Deployment (Recommended)

### Method A: Git Integration (Recommended)

#### Step 1: Push ke Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/mood-journaling.git
git push -u origin main
```

#### Step 2: Connect Netlify
1. Login ke [netlify.com](https://netlify.com)
2. Klik **"New site from Git"**
3. Connect ke GitHub/GitLab/Bitbucket
4. Pilih repository **mood-journaling**
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `20.x` (di Environment Variables)

#### Step 3: Deploy
1. Klik **"Deploy site"**
2. Tunggu build process selesai (~2-3 menit)
3. Dapatkan URL deployment: `https://random-name.netlify.app`

### Method B: Manual Upload

#### Step 1: Build Local
```bash
npm run build
```

#### Step 2: Manual Deploy
1. Login ke [netlify.com](https://netlify.com)  
2. Drag & drop folder `dist/` ke Netlify dashboard
3. Site akan langsung live

### Netlify Configuration File
Buat `netlify.toml` di root project (optional):
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

---

## 2. Vercel Deployment

### Method A: Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login & Deploy
```bash
# Login to Vercel
vercel login

# Deploy (run from project root)
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Link to existing project? No  
# - Project name: mood-journaling
# - Directory: ./
# - Override build command? No
```

#### Step 3: Production Deployment
```bash
vercel --prod
```

### Method B: Git Integration

1. Push code ke GitHub repository
2. Login ke [vercel.com](https://vercel.com)
3. Klik **"New Project"**
4. Import dari Git repository
5. Configure:
   - **Framework**: Vue.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Klik **"Deploy"**

### Vercel Configuration
Buat `vercel.json` (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vue",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 3. GitHub Pages Deployment

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/mood-journaling"
}
```

### Step 3: Update vite.config.js
```javascript
export default {
  base: '/mood-journaling/', // Repository name
  // ... other config
}
```

### Step 4: Deploy
```bash
# Build and deploy
npm run deploy

# Or manual steps:
npm run build
npx gh-pages -d dist
```

### Step 5: Enable GitHub Pages
1. Pergi ke repository GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages` / root

---

## 4. Firebase Hosting

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Firebase Setup
```bash
# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Choose:
# - Use existing project or create new one
# - Public directory: dist
# - Single page app: Yes
# - Overwrite index.html: No
```

### Step 3: Deploy
```bash
# Build first
npm run build

# Deploy
firebase deploy
```

---

## 🔐 Google OAuth Production Setup

### Update OAuth Client Configuration

#### 1. Google Cloud Console Setup
1. Pergi ke [Google Cloud Console](https://console.cloud.google.com/)
2. Select project Anda
3. APIs & Services → Credentials
4. Edit OAuth 2.0 Client ID

#### 2. Add Production Domains
**Authorized JavaScript Origins:**
```
https://your-app-name.netlify.app
https://your-app-name.vercel.app  
https://yourusername.github.io
https://your-custom-domain.com
```

**Authorized Redirect URIs:**
- Biasanya tidak diperlukan untuk web app sederhana
- Biarkan kosong atau sesuai platform requirements

#### 3. Update Client ID di Code

**Option A: Hard-coded (Simple)**
```javascript
// src/services/auth.js
const CLIENT_ID = 'your-production-client-id.apps.googleusercontent.com';
```

**Option B: Environment Variables (Recommended)**

**Netlify:**
- Site Settings → Environment Variables
- Add: `VITE_GOOGLE_CLIENT_ID=your-client-id`

**Vercel:**  
- Project Settings → Environment Variables
- Add: `VITE_GOOGLE_CLIENT_ID=your-client-id`

**Update Code:**
```javascript
// src/services/auth.js
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'fallback-client-id';
```

---

## 🔧 Custom Domain Setup

### 1. Netlify Custom Domain
1. Site Settings → Domain Management
2. Add custom domain: `yourdomain.com`
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```
4. SSL certificate auto-generated

### 2. Vercel Custom Domain
1. Project Settings → Domains
2. Add domain: `yourdomain.com`
3. Configure DNS (varies by provider):
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### 3. Update Google OAuth
Setelah custom domain active, tambahkan ke Google OAuth:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

---

## 📊 Performance Optimization

### 1. Build Optimizations

#### Vite Configuration
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          google: ['@google-cloud/local-auth', 'googleapis']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}
```

### 2. CDN & Caching
Most hosting platforms automatically provide:
- **Global CDN**: Fast content delivery
- **Auto-caching**: Static assets cached at edge locations
- **Compression**: Gzip/Brotli compression enabled
- **HTTP/2**: Modern protocol support

### 3. Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --report

# Or use bundle analyzer
npm install --save-dev rollup-plugin-analyzer
```

---

## 📈 Monitoring & Analytics

### 1. Basic Monitoring

#### Netlify Analytics
- Site Overview → Analytics
- Page views, unique visitors, bandwidth

#### Vercel Analytics  
- Project → Analytics tab
- Performance metrics, visitor data

### 2. Error Tracking (Optional)

#### Sentry Integration
```bash
npm install @sentry/vue @sentry/tracing
```

```javascript
// main.js
import * as Sentry from "@sentry/vue";

Sentry.init({
  app,
  dsn: "YOUR_DSN_HERE",
  environment: "production"
});
```

### 3. Performance Monitoring

#### Web Vitals
```javascript
// Track Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_GOOGLE_CLIENT_ID: ${{ secrets.GOOGLE_CLIENT_ID }}
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. OAuth "redirect_uri_mismatch"
**Problem:** Domain tidak terdaftar di Google OAuth
**Solution:** 
- Tambahkan domain ke Google Cloud Console
- Pastikan https:// prefix untuk production
- Wait 5-10 menit untuk propagasi

#### 2. Build Fails with "Module not found"
**Problem:** Missing dependencies atau import paths
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check import paths di semua files
```

#### 3. Blank Page After Deploy
**Problem:** Routing issue atau base path config
**Solution:**
```javascript
// vite.config.js - set correct base path
export default {
  base: '/your-repo-name/', // For GitHub Pages
  base: '/', // For custom domains
}
```

#### 4. Environment Variables Not Working
**Problem:** VITE_ prefix missing atau platform configuration
**Solution:**
- Ensure `VITE_` prefix untuk environment variables
- Check platform-specific env var configuration
- Redeploy setelah adding env vars

#### 5. Slow Loading Times
**Problem:** Large bundle size atau network issues
**Solution:**
- Enable code splitting
- Optimize images dan assets
- Use bundle analyzer untuk identify issues

---

## ✅ Post-Deployment Checklist

### Functional Testing
- [ ] Login dengan Google OAuth works
- [ ] Mood selection saves correctly
- [ ] Journal entries persist across sessions
- [ ] History view shows past entries
- [ ] Responsive design works di mobile
- [ ] All routes accessible (/, /history)

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Mobile-friendly test passes
- [ ] Core Web Vitals in good range

### Security Testing
- [ ] HTTPS enabled dan enforced
- [ ] OAuth flow secure (no sensitive data di console)
- [ ] XSS protection di place
- [ ] Content Security Policy (CSP) configured (optional)

---

## 🎉 Success! 

Aplikasi Mood Journal Anda sekarang sudah live dan dapat diakses oleh users di seluruh dunia. Jangan lupa untuk:

1. **Share URL** dengan friends untuk testing
2. **Monitor performance** dan user feedback
3. **Regular updates** untuk bug fixes dan new features
4. **Backup data** (consider export feature untuk users)

Selamat! 🚀✨
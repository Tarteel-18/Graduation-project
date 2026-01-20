# 🚀 Complete Deployment Guide - Netlify + Render

This guide will walk you through deploying your project to production:
- **Frontend (Vue.js)** → Netlify
- **Backend (Python FastAPI)** → Render

**No prior deployment experience needed!** Follow step by step.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Create Accounts](#step-1-create-accounts)
3. [Step 2: Prepare Backend for Production](#step-2-prepare-backend-for-production)
4. [Step 3: Deploy Backend to Render](#step-3-deploy-backend-to-render)
5. [Step 4: Prepare Frontend for Production](#step-4-prepare-frontend-for-production)
6. [Step 5: Deploy Frontend to Netlify](#step-5-deploy-frontend-to-netlify)
7. [Step 6: Connect Frontend to Backend](#step-6-connect-frontend-to-backend)
8. [Step 7: Test Your Deployment](#step-7-test-your-deployment)
9. [Troubleshooting](#troubleshooting)

---

## 📦 Prerequisites

Before starting, make sure you have:

- ✅ Your project code committed to GitHub
- ✅ A GitHub account (we'll create one if needed)
- ✅ Your OpenAI API key ready
- ✅ About 30-45 minutes for the full deployment

---

## Step 1: Create Accounts

### 1.1 Create GitHub Account (if you don't have one)

1. Go to: https://github.com/signup
2. Enter your email, create a password
3. Verify your email
4. Complete the setup

**✅ Done when:** You can log into GitHub

### 1.2 Create Render Account

1. Go to: https://render.com
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (recommended - easier!)
4. Authorize Render to access your GitHub account
5. Complete your profile

**✅ Done when:** You're logged into Render dashboard

### 1.3 Create Netlify Account

1. Go to: https://www.netlify.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (recommended!)
4. Authorize Netlify to access your GitHub account
5. Complete your profile

**✅ Done when:** You're logged into Netlify dashboard

---

## Step 2: Prepare Backend for Production

### 2.1 Update Backend Configuration

We need to update the backend to:
- Allow requests from your Netlify frontend
- Use environment variables for the API key
- Set up proper CORS

**File to edit:** `chatbot-backend/app/config.py`

Find this section (around line 14-19):

```python
# CORS settings
CORS_ORIGINS: list[str] = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative frontend port
    "http://127.0.0.1:5173",
]
```

**Replace it with:**

```python
# CORS settings
CORS_ORIGINS: list[str] = [
    "http://localhost:5173",  # Vite dev server (for local development)
    "http://localhost:3000",  # Alternative frontend port
    "http://127.0.0.1:5173",
    # Add your Netlify URL here after deployment (we'll update this in Step 6)
    # Example: "https://your-app-name.netlify.app"
]
```

**Save the file!**

### 2.2 Create Render Configuration File

Create a new file: `chatbot-backend/render.yaml`

**File path:** `chatbot-backend/render.yaml`

**Content:**

```yaml
services:
  - type: web
    name: chatbot-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: python -m app.main
    envVars:
      - key: OPENAI_API_KEY
        sync: false  # We'll set this manually in Render dashboard
      - key: USE_CLOUD_EMBEDDINGS
        value: "True"
      - key: OPENAI_EMBEDDING_MODEL
        value: "text-embedding-3-small"
      - key: OPENAI_MODEL
        value: "gpt-4o"
      - key: USE_RERANKING
        value: "False"
      - key: PORT
        value: "10000"  # Render uses port 10000
      - key: HOST
        value: "0.0.0.0"
```

**Save this file!**

### 2.3 Update Backend Port Configuration

**File to edit:** `chatbot-backend/app/config.py`

Find this line (around line 11):

```python
PORT: int = 8001  # Changed from 8000 to avoid conflicts
```

**Change it to:**

```python
PORT: int = int(os.getenv("PORT", "8001"))  # Use PORT from environment (Render uses 10000)
```

**Add this import at the top of the file** (after line 3):

```python
import os
```

**Save the file!**

### 2.4 Commit Your Changes

```bash
git add chatbot-backend/app/config.py chatbot-backend/render.yaml
git commit -m "Prepare backend for Render deployment"
git push origin master
```

**✅ Done when:** Changes are pushed to GitHub

---

## Step 3: Deploy Backend to Render

### 3.1 Create New Web Service

1. Go to: https://dashboard.render.com
2. Click **"New +"** button (top right)
3. Select **"Web Service"**

### 3.2 Connect Your Repository

1. If this is your first time:
   - Click **"Connect account"** next to GitHub
   - Authorize Render to access your repositories
   - Select the repositories you want to deploy

2. Find your repository: `Tarteel-18/Graduation-project`
3. Click **"Connect"**

### 3.3 Configure the Service

Fill in these settings:

**Basic Settings:**
- **Name:** `chatbot-backend` (or any name you like)
- **Region:** Choose closest to your users (e.g., `Oregon (US West)`)
- **Branch:** `master` (or `main` if that's your default)
- **Root Directory:** `chatbot-backend` ⚠️ **IMPORTANT!**
- **Runtime:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `python -m app.main`

**Advanced Settings:**
- **Environment:** `Python 3`
- **Python Version:** `3.11` or `3.12` (not 3.13 - avoid compilation issues)

### 3.4 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

1. **OPENAI_API_KEY**
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key (starts with `sk-proj-...`)
   - Click **"Save"**

2. **USE_CLOUD_EMBEDDINGS**
   - Key: `USE_CLOUD_EMBEDDINGS`
   - Value: `True`
   - Click **"Save"**

3. **OPENAI_EMBEDDING_MODEL**
   - Key: `OPENAI_EMBEDDING_MODEL`
   - Value: `text-embedding-3-small`
   - Click **"Save"**

4. **OPENAI_MODEL**
   - Key: `OPENAI_MODEL`
   - Value: `gpt-4o`
   - Click **"Save"**

5. **USE_RERANKING**
   - Key: `USE_RERANKING`
   - Value: `False`
   - Click **"Save"**

6. **PORT**
   - Key: `PORT`
   - Value: `10000`
   - Click **"Save"**

7. **HOST**
   - Key: `HOST`
   - Value: `0.0.0.0`
   - Click **"Save"**

### 3.5 Create the Service

1. Scroll down
2. Click **"Create Web Service"**
3. Wait for deployment (5-10 minutes)

**What's happening:**
- Render is installing Python dependencies
- Building your application
- Starting the server

### 3.6 Get Your Backend URL

Once deployment is complete:

1. Look for **"Your service is live at"** message
2. Copy the URL (looks like: `https://chatbot-backend-xxxx.onrender.com`)
3. **Save this URL!** You'll need it in Step 6

**✅ Done when:** You see "Your service is live" and have the URL

### 3.7 Test Your Backend

1. Open the URL in your browser
2. You should see: `{"status":"ok","message":"Chatbot Backend API is running"}`
3. Try the health endpoint: `https://your-backend-url.onrender.com/health`

**✅ Done when:** Backend responds correctly

---

## Step 4: Prepare Frontend for Production

### 4.1 Update Frontend API URL

We need to make the frontend use environment variables for the API URL.

**File to edit:** `src/components/ChatWidget.vue`

Find this line (around line 139):

```javascript
const API_BASE_URL = 'http://localhost:8001'
```

**Replace it with:**

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'
```

This allows:
- Production: Uses `VITE_API_BASE_URL` from environment
- Development: Falls back to `localhost:8001`

**Save the file!**

### 4.2 Create Netlify Configuration

Create a new file: `netlify.toml` in the **root** of your project

**File path:** `netlify.toml` (in project root, same level as `package.json`)

**Content:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Save this file!**

### 4.3 Commit Your Changes

```bash
git add src/components/ChatWidget.vue netlify.toml
git commit -m "Prepare frontend for Netlify deployment with environment variables"
git push origin master
```

**✅ Done when:** Changes are pushed to GitHub

---

## Step 5: Deploy Frontend to Netlify

### 5.1 Create New Site

1. Go to: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify if prompted

### 5.2 Select Your Repository

1. Find your repository: `Tarteel-18/Graduation-project`
2. Click on it

### 5.3 Configure Build Settings

Netlify should auto-detect, but verify:

- **Base directory:** (leave empty - root is fine)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

If these aren't auto-filled, enter them manually.

### 5.4 Add Environment Variables

Before deploying, click **"Show advanced"** → **"New variable"**

Add this variable:

- **Key:** `VITE_API_BASE_URL`
- **Value:** Your Render backend URL (from Step 3.6)
  - Example: `https://chatbot-backend-xxxx.onrender.com`
- Click **"Add variable"**

### 5.5 Deploy

1. Click **"Deploy site"**
2. Wait for deployment (3-5 minutes)

**What's happening:**
- Netlify is installing Node.js dependencies
- Building your Vue.js app
- Deploying to CDN

### 5.6 Get Your Frontend URL

Once deployment is complete:

1. Look for **"Site is live"** message
2. Your site URL will be: `https://random-name-xxxxx.netlify.app`
3. You can change this name later in site settings

**✅ Done when:** You see "Site is live" and have the URL

---

## Step 6: Connect Frontend to Backend

### 6.1 Update Backend CORS

Now that you have your Netlify URL, update the backend to allow requests from it.

**File to edit:** `chatbot-backend/app/config.py`

Find the CORS_ORIGINS section and add your Netlify URL:

```python
CORS_ORIGINS: list[str] = [
    "http://localhost:5173",  # Vite dev server (for local development)
    "http://localhost:3000",  # Alternative frontend port
    "http://127.0.0.1:5173",
    "https://your-netlify-url.netlify.app",  # Add your actual Netlify URL here
]
```

**Replace `your-netlify-url` with your actual Netlify URL!**

**Save the file!**

### 6.2 Update Render Environment Variable

1. Go back to Render dashboard
2. Click on your backend service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key:** `CORS_ORIGINS`
   - **Value:** `https://your-netlify-url.netlify.app` (your actual URL)
   - Click **"Save Changes"**

**OR** update the existing CORS_ORIGINS if you set it up differently.

### 6.3 Redeploy Backend

1. In Render dashboard, click **"Manual Deploy"** → **"Deploy latest commit"**
2. Wait for redeployment (2-3 minutes)

**✅ Done when:** Backend is redeployed with new CORS settings

---

## Step 7: Test Your Deployment

### 7.1 Test Frontend

1. Open your Netlify URL in browser
2. The website should load
3. Look for the chat widget (bottom-left corner)

### 7.2 Test Chatbot

1. Click the chat widget icon
2. Type a question in Arabic (e.g., "ما هي الخدمات المتوفرة؟")
3. Press Enter
4. You should get a response!

**✅ Success when:** Chatbot responds correctly

### 7.3 Check Browser Console

1. Press `F12` to open developer tools
2. Go to **"Console"** tab
3. Look for any errors (red text)
4. If you see CORS errors, go back to Step 6

---

## 🔧 Troubleshooting

### Problem: Backend deployment fails

**Check:**
- Root directory is set to `chatbot-backend` (not root)
- Python version is 3.11 or 3.12 (not 3.13)
- All environment variables are set correctly
- Check Render logs: Click on your service → "Logs" tab

**Solution:**
- Check the error in Render logs
- Common issue: Missing `OPENAI_API_KEY` → Add it in Environment tab

### Problem: Frontend can't connect to backend

**Symptoms:**
- Chat widget shows error
- Browser console shows CORS errors

**Solution:**
1. Verify `VITE_API_BASE_URL` is set in Netlify environment variables
2. Verify backend CORS includes your Netlify URL
3. Redeploy both frontend and backend

### Problem: "Module not found" errors

**Solution:**
- Make sure `requirements.txt` has all dependencies
- Check Render build logs for missing packages

### Problem: Backend times out

**Solution:**
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds (cold start)
- This is normal for free tier
- Consider upgrading to paid plan for always-on service

### Problem: Frontend shows blank page

**Solution:**
- Check Netlify build logs
- Verify `dist` folder is being created
- Check browser console for errors

---

## 🎉 Success Checklist

- [ ] Backend deployed to Render and responding
- [ ] Frontend deployed to Netlify and loading
- [ ] Chat widget appears on frontend
- [ ] Chatbot responds to questions
- [ ] No CORS errors in browser console
- [ ] Both URLs are accessible

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- Service spins down after 15 min inactivity
- Cold start takes ~30 seconds
- 750 hours/month free
- Good for testing/development

**Netlify Free Tier:**
- 100 GB bandwidth/month
- Unlimited sites
- Perfect for frontend hosting

### Upgrading (Optional)

If you need:
- Always-on backend → Upgrade Render to paid plan ($7/month)
- Custom domain → Available in both services
- More resources → Upgrade as needed

### Security

- ✅ Never commit API keys to GitHub
- ✅ Use environment variables for secrets
- ✅ CORS is configured to only allow your frontend
- ✅ Backend is protected by HTTPS

---

## 🚀 Next Steps

1. **Custom Domain:** Add your own domain in Netlify/Render settings
2. **Monitoring:** Set up error tracking (optional)
3. **Analytics:** Add analytics to track usage (optional)
4. **Backup:** Regular backups of your FAQ data

---

**Congratulations! Your application is now live! 🎉**

If you encounter any issues, check the troubleshooting section or the service logs.



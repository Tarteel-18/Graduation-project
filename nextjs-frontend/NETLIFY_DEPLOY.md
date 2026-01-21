# 🚀 Deploying Next.js Frontend to Netlify

## Strategy: Test Next.js Version Separately

**Recommended Approach:**
1. Deploy `next` branch to a **separate Netlify site** (e.g., `your-app-next.netlify.app`)
2. Test it thoroughly
3. Once confirmed working, merge `next` → `master`
4. Update the main Netlify site to use the merged code

---

## Option 1: Deploy Next.js Branch to Separate Netlify Site (Recommended for Testing)

### Step 1: Create New Netlify Site for Next.js

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub repository
4. Configure:
   - **Branch to deploy:** `next`
   - **Base directory:** `nextjs-frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (Next.js default)

### Step 2: Configure Environment Variables

In Netlify site settings → Environment variables:
- `NEXT_PUBLIC_API_BASE_URL` = `https://graduation-project-w0wk.onrender.com`

### Step 3: Deploy

Netlify will automatically build and deploy from the `next` branch.

**✅ Test URL:** `https://your-site-next.netlify.app`

---

## Option 2: Merge to Master (After Testing)

Once the Next.js version is tested and working:

1. **Merge `next` into `master`:**
   ```bash
   git checkout master
   git merge next
   git push origin master
   ```

2. **Update Netlify to use Next.js:**
   - Go to your existing Netlify site settings
   - Update build settings:
     - **Base directory:** `nextjs-frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
   - Redeploy

---

## Netlify Configuration for Next.js

Create `netlify.toml` in `nextjs-frontend/` directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

---

## Important Notes

- **Backend is already deployed** on Render and working
- **Next.js frontend** will connect to the same Render backend
- **Test thoroughly** on the separate site before merging to master
- **Keep Vue.js on master** until Next.js is fully tested


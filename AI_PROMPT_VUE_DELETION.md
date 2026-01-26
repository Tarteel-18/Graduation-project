# AI Prompt: Safely Delete Vue Frontend After Next.js Migration

## Context
This repository has been migrated from Vue.js to Next.js. The Vue frontend code is now obsolete and should be safely deleted. The Next.js frontend is fully functional and independent.

## Your Task
Analyze the codebase and safely delete all Vue frontend files, ensuring no functionality is broken.

## Step 1: Verify Current State

1. **Check current branch:**
   ```bash
   git branch --show-current
   ```

2. **Verify Next.js frontend is working:**
   - Check that `nextjs-frontend/` (or similar) directory exists
   - Verify Next.js has its own `package.json` and `node_modules`
   - Confirm Next.js frontend runs independently

3. **Check for dependencies:**
   - Search for any imports from Vue `src/` directory in Next.js code
   - Verify Next.js doesn't reference root-level Vue config files
   - Confirm backend doesn't depend on Vue-specific files

## Step 2: Identify Files to Delete

### Must Delete (Vue Frontend Source):
- ✅ `src/` directory (entire Vue frontend)
- ✅ `vite.config.js` (Vite/Vue build config)
- ✅ `index.html` (Vue entry point)
- ✅ Root `package.json` (Vue dependencies - if separate from Next.js)
- ✅ Root `package-lock.json` (Vue lock file - if separate from Next.js)
- ✅ Root `tailwind.config.js` (Vue Tailwind config - if separate from Next.js)
- ✅ Root `postcss.config.js` (Vue PostCSS config - if separate from Next.js)
- ✅ Root `netlify.toml` (Vue build config - if separate from Next.js)
- ✅ `start-frontend.sh` or similar Vue startup scripts
- ✅ Root `public/` directory (if not used by Next.js - Next.js has its own `public/`)

### Verify Before Deleting:
- Check if Next.js uses root `public/` directory (usually Next.js has its own `nextjs-frontend/public/`)
- Check if there are shared assets (usually not - Next.js has its own assets)

### Do NOT Delete:
- ❌ `nextjs-frontend/` directory (or whatever the Next.js frontend is named)
- ❌ `chatbot-backend/` or backend directory
- ❌ Documentation files (README.md, etc. - user said not important to update)
- ❌ `start-all.sh` or similar scripts (user said not important to update)
- ❌ Backend configuration files

## Step 3: Pre-Deletion Verification

Run these checks:

```bash
# 1. Verify Next.js frontend doesn't import from Vue src/
grep -r "from.*['\"]\.\./\.\./src\|from.*['\"]\.\./src" nextjs-frontend/ || echo "No imports from Vue src/"

# 2. Verify Next.js has its own package.json
ls nextjs-frontend/package.json && echo "Next.js has own package.json"

# 3. Check if root public/ is used by Next.js
grep -r "/public/\|/logo\.svg\|/vite\.svg" nextjs-frontend/ || echo "Root public/ not used by Next.js"
```

## Step 4: Delete Vue Files

Execute deletion commands:

```bash
# Navigate to project root
cd /path/to/project

# Delete Vue frontend source
rm -rf src/

# Delete Vue build configuration
rm -f vite.config.js index.html

# Delete Vue startup scripts
rm -f start-frontend.sh  # or whatever the Vue startup script is named

# Delete root public/ if Next.js has its own
# (Check first: Next.js usually has nextjs-frontend/public/)
rm -rf public/  # Only if Next.js doesn't use it

# Delete root package files (only if Next.js has its own)
# Verify Next.js has its own package.json first!
rm -f package.json package-lock.json  # Only if separate from Next.js

# Delete root config files (only if Next.js has its own)
rm -f tailwind.config.js postcss.config.js  # Only if separate from Next.js
rm -f netlify.toml  # Only if separate from Next.js
```

## Step 5: Verify Deletion

```bash
# Check Vue files are gone
ls -la | grep -E "src|vite|index.html|package.json|tailwind|postcss|netlify|start-frontend|public" || echo "Vue files successfully removed"

# Verify git status
git status --short
```

## Step 6: Final Verification

1. **Check git status** - should show deleted files
2. **Verify Next.js still works:**
   ```bash
   cd nextjs-frontend
   npm run build  # Should build successfully
   ```
3. **Confirm no broken imports** - Next.js should have no references to deleted files

## Important Notes

1. **Backend Compatibility:**
   - Backend should already support Next.js port (usually 3000)
   - Check `chatbot-backend/app/config.py` or similar for CORS settings
   - Should include `http://localhost:3000` (Next.js default)

2. **Shared Assets:**
   - Usually there are NO shared assets between Vue and Next.js
   - Next.js has its own `public/` directory
   - If unsure, check Next.js code for references to root `public/`

3. **Documentation:**
   - User said documentation updates are NOT important
   - Do NOT update README.md, deployment guides, etc.
   - Focus only on deleting Vue files

4. **Scripts:**
   - User said script updates are NOT important
   - Do NOT update `start-all.sh` or similar scripts
   - Focus only on deleting Vue files

## Expected Outcome

After deletion:
- ✅ Vue frontend files are completely removed
- ✅ Next.js frontend still works independently
- ✅ Backend is unaffected
- ✅ Git shows deleted files in status
- ✅ No broken imports or dependencies

## Safety Checks

Before proceeding, confirm:
- [ ] Next.js frontend is in a separate directory (e.g., `nextjs-frontend/`)
- [ ] Next.js has its own `package.json` and `node_modules`
- [ ] No imports from Vue `src/` in Next.js code
- [ ] Backend doesn't reference Vue files
- [ ] You're on the correct branch (usually `next` or similar)

## If Something Goes Wrong

- All files are tracked in git, so they can be recovered:
  ```bash
  git checkout HEAD -- src/  # Restore deleted files
  ```
- Check git log to see what was deleted
- Verify Next.js still works before committing

## Final Command Summary

```bash
# Navigate to project root
cd /path/to/project

# Delete all Vue frontend files
rm -rf src/ vite.config.js index.html start-frontend.sh public/ package.json package-lock.json tailwind.config.js postcss.config.js netlify.toml

# Verify deletion
git status --short
```

---

**Remember:** The user wants you to DELETE Vue files, NOT update documentation or scripts. Focus only on safe deletion of obsolete Vue frontend code.


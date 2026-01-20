# 🧪 Local Testing Guide

This guide will help you test the Next.js frontend locally.

## Prerequisites

- **Node.js** 18+ installed
- **Backend running** (optional, for chatbot testing)

## Step 1: Install Dependencies

```bash
cd nextjs-frontend
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the `nextjs-frontend` directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set your backend URL:

```env
# For local backend (if running locally)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001

# OR for production backend
NEXT_PUBLIC_API_BASE_URL=https://graduation-project-w0wk.onrender.com
```

## Step 3: Start the Development Server

```bash
npm run dev
```

The app will start on: **http://localhost:3000**

## Step 4: Test the Application

### ✅ What to Test:

1. **Navigation (AppHeader)**
   - Click logo → should go to home
   - Hover over "عن الهيئة" → dropdown should appear
   - Hover over "قسم الإعلام والتوعية" → dropdown should appear
   - Click dark mode toggle → should switch themes
   - On mobile: click hamburger menu → mobile menu should open

2. **Chat Widget**
   - Click chat icon (bottom-left) → chat window should open
   - Type a message and send → should connect to backend
   - Try suggested questions → should work
   - Test maximize/minimize buttons

3. **Footer (AppFooter)**
   - Scroll to bottom → footer should be visible
   - Click links → should navigate (once pages are converted)
   - Social media icons should be visible

4. **Dark Mode**
   - Click dark mode toggle in header
   - Page should switch to dark theme
   - Theme should persist (check sessionStorage)

5. **Responsive Design**
   - Resize browser window
   - Mobile menu should appear on small screens
   - Layout should adapt

## Step 5: Test with Backend (Optional)

If you want to test the chatbot with a local backend:

### Terminal 1 - Backend:
```bash
cd ../chatbot-backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m app.main
```

Wait for: `INFO:     Uvicorn running on http://0.0.0.0:8001`

### Terminal 2 - Frontend:
```bash
cd nextjs-frontend
npm run dev
```

Now the chatbot should connect to your local backend.

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or use a different port:
```bash
npm run dev -- -p 3001
```

### Components Not Rendering

- Check browser console for errors (F12)
- Verify all dependencies are installed: `npm install`
- Clear Next.js cache: `rm -rf .next`

### Chat Widget Not Connecting

- Check `.env.local` has correct `NEXT_PUBLIC_API_BASE_URL`
- Verify backend is running (if using local backend)
- Check browser console for CORS errors
- Restart dev server after changing `.env.local`

### Dark Mode Not Working

- Check browser console for errors
- Verify `sessionStorage` is enabled
- Try clearing browser cache

### Images Not Loading

- Verify `public/assets/` directory exists
- Check image paths in components
- Use Next.js Image component (already implemented)

## Build for Production

To test the production build:

```bash
npm run build
npm start
```

This will:
1. Build the optimized production bundle
2. Start the production server on port 3000

## Next Steps

Once components are tested:
1. Convert all pages (30+ pages)
2. Set up routing structure
3. Implement authentication guards
4. Test full application flow

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Check what's running
lsof -ti:3000            # Check port 3000 (Linux/Mac)
netstat -ano | findstr :3000  # Check port 3000 (Windows)
```


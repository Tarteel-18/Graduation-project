# Next.js Frontend - Quick Start

## 🚀 Quick Test

```bash
# 1. Install dependencies
cd nextjs-frontend
npm install

# 2. Create environment file (optional - for local backend)
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8001" > .env.local

# 3. Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

## 📋 What's Included

✅ All components converted from Vue.js to Next.js/React
- AppHeader, AppFooter, ChatWidget
- All card components
- All form components
- BaseLayout

## 🔧 Environment Variables

Create `.env.local` file:

```env
# For local backend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001

# OR for production backend (default)
NEXT_PUBLIC_API_BASE_URL=https://graduation-project-w0wk.onrender.com
```

## 📝 Testing Checklist

- [ ] Navigation header works
- [ ] Dark mode toggle works
- [ ] Mobile menu opens/closes
- [ ] Chat widget opens and connects
- [ ] Footer displays correctly
- [ ] Responsive design works

## 📚 More Info

See [LOCAL_TESTING.md](./LOCAL_TESTING.md) for detailed testing instructions.

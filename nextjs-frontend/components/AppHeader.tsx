'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function AppHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn } = useAuth()
  const [isDark, setIsDark] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  const aboutMenuRef = useRef<HTMLDivElement>(null)
  const mediaMenuRef = useRef<HTMLDivElement>(null)

  const headColor = isDark ? '#E5F4F7' : '#185974'
  const linkColor = isDark ? '#38BDF8' : '#27AEB9'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('theme')
      if (saved === 'dark') {
        setIsDark(true)
      } else if (saved === 'light') {
        setIsDark(false)
      } else {
        setIsDark(false)
        sessionStorage.setItem('theme', 'light')
      }
      applyDarkMode()
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const els = [aboutMenuRef.current, mediaMenuRef.current]
      if (!els.some(el => el && el.contains(e.target as Node))) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggle = (which: string) => {
    setOpenMenu(openMenu === which ? null : which)
  }

  const toggleDark = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    }
    applyDarkMode()
  }

  const applyDarkMode = () => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      if (isDark) html.classList.add('dark')
      else html.classList.remove('dark')
    }
  }

  const goToRegisterProjectForm = () => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/form/small-project-register')
    } else {
      router.push('/form/small-project-register')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#0f172a] border-b border-gray-100 dark:border-slate-700">
      <nav className="mx-auto max-w-[1380px] px-4 h-20 flex items-center justify-between gap-6">
        {/* الشعار */}
        <Link href="/" className="flex items-center gap-2 shrink-0 select-none cursor-pointer">
          <Image src="/assets/logo.png" alt="شعار الهيئة" width={60} height={60} className="h-[60px] w-auto" />
        </Link>

        {/* روابط الديسكتوب */}
        <ul className="hidden lg:flex items-center gap-4 font-medium text-[16px]" style={{ color: headColor }}>
          {/* عن الهيئة */}
          <li className="relative whitespace-nowrap flex items-center">
            <div className="flex items-center gap-1">
              <Link
                href="/about"
                className="nav-link cursor-pointer hover:opacity-80"
              >
                عن الهيئة
              </Link>
              <button
                className="nav-link cursor-pointer hover:opacity-80 flex items-center"
                onClick={(e) => {
                  e.stopPropagation()
                  toggle('about')
                }}
              >
                <svg
                  className={`w-4 h-4 transition-transform ${openMenu === 'about' ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
                </svg>
              </button>
            </div>

            {openMenu === 'about' && (
              <div
                ref={aboutMenuRef}
                className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2 transition-opacity duration-150"
              >
                <Link className="dd-item" href="/about" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  من نحن
                </Link>
                <Link className="dd-item" href="/faq" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  الأسئلة الشائعة
                </Link>
                <Link className="dd-item" href="/partners" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  الشركاء
                </Link>
                <Link className="dd-item" href="/studies" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  الدراسات
                </Link>
                <Link className="dd-item" href="/contact" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  تواصل معنا
                </Link>
              </div>
            )}
          </li>

          {/* الخدمات */}
          <li>
            <Link className="nav-link hover:opacity-80" href="/services">
              الخدمات
            </Link>
          </li>

          {/* التسهيلات الحكومية */}
          <li>
            <Link className="nav-link hover:opacity-80" href="/gov-facilities">
              التسهيلات الحكومية
            </Link>
          </li>

          {/* الإعلام والتوعية */}
          <li className="relative whitespace-nowrap flex items-center">
            <button
              className="nav-link hover:opacity-80 flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation()
                toggle('media')
              }}
            >
              <Link href="/media" className="inline-flex items-center gap-1">
                <span>قسم الإعلام والتوعية</span>
              </Link>
              <svg
                className={`w-4 h-4 transition-transform ${openMenu === 'media' ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
              </svg>
            </button>

            {openMenu === 'media' && (
              <div
                ref={mediaMenuRef}
                className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2 transition-opacity duration-150"
              >
                <Link className="dd-item" href="/media/flashes" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  فلاشات توعوية
                </Link>
                <Link className="dd-item" href="/news" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  أخبار
                </Link>
                <Link className="dd-item" href="/media/stories" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  قصص نجاح
                </Link>
                <Link className="dd-item" href="/media/radio" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  حلقات إذاعية
                </Link>
                <Link className="dd-item" href="/media/nasheed" onClick={() => setOpenMenu(null)} style={{ color: headColor }}>
                  أناشيد
                </Link>
              </div>
            )}
          </li>

          {/* روابط أخرى */}
          <li>
            <Link className="nav-link hover:opacity-80" href="/projects">
              المشاريع
            </Link>
          </li>
          <li>
            <Link className="nav-link hover:opacity-80" href="/ads">
              الإعلانات
            </Link>
          </li>
          <li>
            <Link className="nav-link hover:opacity-80" href="/start">
              روج لمشروعك
            </Link>
          </li>
        </ul>

        {/* أزرار يسار */}
        <div className="flex items-center gap-2">
          {/* زر سجّل مشروعك */}
          <button
            onClick={goToRegisterProjectForm}
            className="hidden md:inline-block px-3.5 py-1.5 rounded-xl text-white whitespace-nowrap"
            style={{ backgroundColor: linkColor }}
          >
            سجّل مشروعك
          </button>

          {/* زر الدارك مود */}
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-[#020617] dark:border-slate-600 dark:text-slate-100"
            style={{ borderColor: linkColor, color: linkColor }}
            onClick={toggleDark}
          >
            {!isDark ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path stroke="currentColor" strokeWidth="1.8" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 2v2.5M12 19.5V22M4.22 4.22 5.8 5.8M18.2 18.2l1.58 1.58M2 12h2.5M19.5 12H22M4.22 19.78 5.8 18.2M18.2 5.8 19.78 4.22" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            )}
          </button>

          {/* زر الحساب */}
          <Link
            href={isLoggedIn ? '/profile' : '/login'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
            style={{ borderColor: linkColor, color: linkColor }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="1.8" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 1 0-14 0" />
            </svg>
          </Link>

          {/* زر منيو الموبايل */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
            style={{ borderColor: linkColor, color: linkColor }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* منيو الموبايل */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-start bg-white/60 dark:bg-[#0f172a]/70 backdrop-blur-sm">
          <div
            className="relative w-[78%] max-w-xs h-full bg-white/90 dark:bg-[#0f172a]/95 border-r border-slate-100 dark:border-slate-700 pt-6 pb-8 px-4 space-y-4"
            style={{ color: headColor }}
            dir="rtl"
          >
            {/* الشعار في أعلى المنيو */}
            <div className="flex items-center justify-between mb-6">
              <Image src="/assets/logo.png" alt="شعار الهيئة" width={40} height={40} className="h-10 w-auto" />
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 text-slate-500"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* الروابط */}
            <div className="space-y-2 text-[16px]">
              <details className="mobile-item">
                <summary>
                  <span>عن الهيئة</span>
                  <span className="circle-arrow">
                    <span className="chevron"></span>
                  </span>
                </summary>
                <div className="children">
                  <Link className="block py-1" href="/about" onClick={() => setMobileOpen(false)}>من نحن</Link>
                  <Link className="block py-1" href="/faq" onClick={() => setMobileOpen(false)}>الأسئلة الشائعة</Link>
                  <Link className="block py-1" href="/partners" onClick={() => setMobileOpen(false)}>الشركاء</Link>
                  <Link className="block py-1" href="/studies" onClick={() => setMobileOpen(false)}>الدراسات</Link>
                  <Link className="block py-1" href="/contact" onClick={() => setMobileOpen(false)}>تواصل معنا</Link>
                </div>
              </details>

              <Link className="mobile-link" href="/services" onClick={() => setMobileOpen(false)}>
                الخدمات
              </Link>

              <Link className="mobile-link" href="/gov-facilities" onClick={() => setMobileOpen(false)}>
                التسهيلات الحكومية
              </Link>

              <details className="mobile-item">
                <summary>
                  <span>قسم الإعلام والتوعية</span>
                  <span className="circle-arrow">
                    <span className="chevron"></span>
                  </span>
                </summary>
                <div className="children">
                  <Link className="block py-1" href="/media/flashes" onClick={() => setMobileOpen(false)}>فلاشات توعوية</Link>
                  <Link className="block py-1" href="/news" onClick={() => setMobileOpen(false)}>أخبار</Link>
                  <Link className="block py-1" href="/media/stories" onClick={() => setMobileOpen(false)}>قصص نجاح</Link>
                  <Link className="block py-1" href="/media/radio" onClick={() => setMobileOpen(false)}>حلقات إذاعية</Link>
                  <Link className="block py-1" href="/media/nasheed" onClick={() => setMobileOpen(false)}>أناشيد</Link>
                </div>
              </details>

              <Link className="mobile-link" href="/projects" onClick={() => setMobileOpen(false)}>
                المشاريع
              </Link>
              <Link className="mobile-link" href="/ads" onClick={() => setMobileOpen(false)}>
                الإعلانات
              </Link>
              <Link className="mobile-link" href="/start" onClick={() => setMobileOpen(false)}>
                روج لمشروعك
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


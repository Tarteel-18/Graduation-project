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

  // ألوان للتحكم بالرابط النشط أو حدود الأزرار فقط
  const linkColor = isDark ? '#38BDF8' : '#27AEB9'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('theme')
      const shouldBeDark = saved === 'dark'
      setIsDark(shouldBeDark)
      const html = document.documentElement
      if (shouldBeDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const els = [aboutMenuRef.current, mediaMenuRef.current]
      const isInsideMenu = els.some(el => el && el.contains(target))
      const targetEl = target as HTMLElement
      const isToggleButton = targetEl && targetEl.closest && targetEl.closest('button[data-toggle]')
      if (!isInsideMenu && !isToggleButton) {
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
      const html = document.documentElement
      if (newIsDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  }

  const goToRegisterProjectForm = () => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/form/small-project-register')
    } else {
      router.push('/form/small-project-register')
    }
  }

  // كلاس موحد للنصوص لسهولة القراءة والتعديل
  // هذا الكلاس يعطي اللون العادي، واللون في الدارك مود، ويتغير لونه عند الماوس
  const navItemClass = "text-[#185974] dark:text-[#E5F4F7] hover:text-[#27AEB9] dark:hover:text-[#38BDF8] transition-colors duration-200"

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#0f172a] border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
      <nav className="mx-auto max-w-[1380px] px-4 h-20 flex items-center justify-between gap-6">
        {/* الشعار */}
        <Link href="/" className="flex items-center gap-2 shrink-0 select-none cursor-pointer">
          <Image src="/assets/logo.png" alt="شعار الهيئة" width={60} height={60} className="h-[60px] w-auto" />
        </Link>

        {/* روابط الديسكتوب */}
        <ul className="hidden lg:flex items-center gap-4 font-medium text-[16px]">
          
          {/* --- عن الهيئة --- */}
          <li className="relative whitespace-nowrap flex items-center">
            <button
              className={`nav-link cursor-pointer flex items-center gap-1 ${navItemClass}`}
              onClick={(e) => {
                e.stopPropagation()
                toggle('about')
              }}
              data-toggle="about"
            >
              <span>عن الهيئة</span>
              <svg
                className={`w-4 h-4 transition-transform ${openMenu === 'about' ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
              </svg>
            </button>

            {openMenu === 'about' && (
              <div
                ref={aboutMenuRef}
                className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2 transition-opacity duration-150"
              >
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/about" onClick={() => setOpenMenu(null)}>
                  من نحن
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/faq" onClick={() => setOpenMenu(null)}>
                  الأسئلة الشائعة
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/partners" onClick={() => setOpenMenu(null)}>
                  الشركاء
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/studies" onClick={() => setOpenMenu(null)}>
                  الدراسات
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/contact" onClick={() => setOpenMenu(null)}>
                  تواصل معنا
                </Link>
              </div>
            )}
          </li>

          {/* الخدمات */}
          <li>
            <Link className={`nav-link ${navItemClass}`} href="/services">
              الخدمات
            </Link>
          </li>

          {/* التسهيلات الحكومية */}
          <li>
            <Link className={`nav-link ${navItemClass}`} href="/gov-facilities">
              التسهيلات الحكومية
            </Link>
          </li>

          {/* --- الإعلام والتوعية --- */}
          <li className="relative whitespace-nowrap flex items-center">
            {/* الرابط النصي */}
            <Link 
              href="/media" 
              className={`nav-link flex items-center ${navItemClass}`}
            >
              <span>قسم الإعلام والتوعية</span>
            </Link>

            {/* زر السهم */}
            <button
              className={`p-1 mr-[-2px] ${navItemClass}`}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                toggle('media')
              }}
              data-toggle="media"
              aria-label="فتح القائمة"
            >
              <svg
                className={`w-4 h-4 transition-transform ${openMenu === 'media' ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
              </svg>
            </button>

            {/* القائمة */}
            {openMenu === 'media' && (
              <div
                ref={mediaMenuRef}
                className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2 transition-opacity duration-150 z-50"
              >
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/media/flashes" onClick={() => setOpenMenu(null)}>
                  فلاشات توعوية
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/news" onClick={() => setOpenMenu(null)}>
                  أخبار
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/media/stories" onClick={() => setOpenMenu(null)}>
                  قصص نجاح
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/media/radio" onClick={() => setOpenMenu(null)}>
                  حلقات إذاعية
                </Link>
                <Link className={`dd-item block px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 ${navItemClass}`} href="/media/nasheed" onClick={() => setOpenMenu(null)}>
                  أناشيد
                </Link>
              </div>
            )}
          </li>

          {/* روابط أخرى */}
          <li>
            <Link className={`nav-link ${navItemClass}`} href="/projects">
              المشاريع
            </Link>
          </li>
          <li>
            <Link className={`nav-link ${navItemClass}`} href="/ads">
              الإعلانات
            </Link>
          </li>
          <li>
            <Link className={`nav-link ${navItemClass}`} href="/start">
              روج لمشروعك
            </Link>
          </li>
        </ul>

        {/* أزرار يسار */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToRegisterProjectForm}
            className="hidden md:inline-block px-3.5 py-1.5 rounded-xl text-white whitespace-nowrap transition-opacity hover:opacity-90"
            style={{ backgroundColor: linkColor }}
          >
            سجّل مشروعك
          </button>

          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-[#020617] dark:border-slate-600 dark:text-slate-100 transition-colors"
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

          <Link
            href={isLoggedIn ? '/profile' : '/login'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100 transition-colors"
            style={{ borderColor: linkColor, color: linkColor }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path stroke="currentColor" strokeWidth="1.8" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 1 0-14 0" />
            </svg>
          </Link>

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

      {/* منيو الموبايل (كما هو) */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-start bg-white/60 dark:bg-[#020617]/90 backdrop-blur-sm">
          <div
            className={`relative w-[78%] max-w-xs h-full bg-white dark:bg-[#020617] border-r border-slate-200 dark:border-slate-700 pt-6 pb-8 px-4 space-y-4 text-[#185974] dark:text-[#E5F4F7]`}
            dir="rtl"
          >
            <div className="flex items-center justify-between mb-6">
              <Image src="/assets/logo.png" alt="شعار الهيئة" width={40} height={40} className="h-10 w-auto" />
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-600 text-slate-500"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-[16px]">
              <details className="mobile-item group">
                <summary className="cursor-pointer hover:text-[#27AEB9] dark:hover:text-[#38BDF8]">
                  <span>عن الهيئة</span>
                  <span className="circle-arrow">
                    <span className="chevron"></span>
                  </span>
                </summary>
                <div className="children ps-4 mt-2 space-y-2 border-r border-gray-100 dark:border-slate-800 mr-2">
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/about" onClick={() => setMobileOpen(false)}>من نحن</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/faq" onClick={() => setMobileOpen(false)}>الأسئلة الشائعة</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/partners" onClick={() => setMobileOpen(false)}>الشركاء</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/studies" onClick={() => setMobileOpen(false)}>الدراسات</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/contact" onClick={() => setMobileOpen(false)}>تواصل معنا</Link>
                </div>
              </details>

              <Link className="mobile-link block hover:text-[#27AEB9] dark:hover:text-[#38BDF8]" href="/services" onClick={() => setMobileOpen(false)}>
                الخدمات
              </Link>
              <Link className="mobile-link block hover:text-[#27AEB9] dark:hover:text-[#38BDF8]" href="/gov-facilities" onClick={() => setMobileOpen(false)}>
                التسهيلات الحكومية
              </Link>
              
              <details className="mobile-item group">
                <summary className="cursor-pointer hover:text-[#27AEB9] dark:hover:text-[#38BDF8]">
                  <span>قسم الإعلام والتوعية</span>
                  <span className="circle-arrow">
                    <span className="chevron"></span>
                  </span>
                </summary>
                <div className="children ps-4 mt-2 space-y-2 border-r border-gray-100 dark:border-slate-800 mr-2">
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/media/flashes" onClick={() => setMobileOpen(false)}>فلاشات توعوية</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/news" onClick={() => setMobileOpen(false)}>أخبار</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/media/stories" onClick={() => setMobileOpen(false)}>قصص نجاح</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/media/radio" onClick={() => setMobileOpen(false)}>حلقات إذاعية</Link>
                  <Link className="block py-1 hover:text-[#27AEB9]" href="/media/nasheed" onClick={() => setMobileOpen(false)}>أناشيد</Link>
                </div>
              </details>
              
              <Link className="mobile-link block hover:text-[#27AEB9] dark:hover:text-[#38BDF8]" href="/projects" onClick={() => setMobileOpen(false)}>
                المشاريع
              </Link>
              <Link className="mobile-link block hover:text-[#27AEB9] dark:hover:text-[#38BDF8]" href="/ads" onClick={() => setMobileOpen(false)}>
                الإعلانات
              </Link>
              <Link className="mobile-link block hover:text-[#27AEB9] dark:hover:text-[#38BDF8]" href="/start" onClick={() => setMobileOpen(false)}>
                روج لمشروعك
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
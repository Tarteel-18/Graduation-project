'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import ChatWidget from './ChatWidget'

const noChromePaths = ['/splash', '/login', '/register']

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const isFormPage = pathname?.startsWith('/form/') || false
  const isNoChrome = noChromePaths.includes(pathname || '') || isFormPage
  const hideFooter = pathname === '/profile' || isNoChrome

  // Handle splash screen logic
  useEffect(() => {
    if (pathname === '/') {
      const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true'
      if (!hasSeenSplash) {
        sessionStorage.setItem('hasSeenSplash', 'true')
        router.push('/splash')
      }
    }
  }, [pathname, router])

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F6F9F9] dark:bg-[#020617] text-slate-800 dark:text-slate-100 transition-colors duration-300`}
      dir="rtl"
    >
      {/* الهيدر */}
      {!isNoChrome && <AppHeader />}

      {/* محتوى الصفحات */}
      <main className={`min-h-[70vh] flex-1 pb-24 ${isNoChrome ? '' : 'pt-14'}`}>
        {children}
      </main>

      {/* الفوتر: مخفي في البروفايل وكل صفحات noChrome */}
      {!hideFooter && <AppFooter />}

      {/* الشات */}
      {!isNoChrome && <ChatWidget />}
    </div>
  )
}


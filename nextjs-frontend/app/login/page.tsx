'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    localStorage.setItem('token', 'demo-token')
    localStorage.setItem('userLogged', '1') // Ensure this is set
    const redirect = searchParams.get('redirect') || '/'
    
    // Small delay to ensure localStorage is set and auth state updates
    setTimeout(() => {
      router.push(redirect)
    }, 50)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F9F9] dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-[32px] px-10 py-10 w-full max-w-[650px] border border-[#DDE7EA] dark:border-slate-700">
        <div className="text-center mb-6">
          <Image src="/assets/logo.png" alt="logo" width={80} height={80} className="mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300">تسجيل الدخول</h1>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full border border-[#BFD0D3] dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl py-3 pr-12 pl-4 text-right focus:border-[#165C75] dark:focus:border-cyan-400 outline-none transition-colors duration-200"
            />
            <Image
              src="/assets/icons/mail.png"
              alt=""
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
            />
          </div>

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full border border-[#BFD0D3] dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl py-3 pr-12 pl-12 text-right focus:border-[#165C75] dark:focus:border-cyan-400 outline-none transition-colors duration-200"
            />
            <Image
              src="/assets/icons/lock.png"
              alt=""
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
            />
          </div>

          <p className="text-left text-sm text-[#165C75] dark:text-cyan-300 cursor-pointer hover:underline">
            هل نسيت كلمة المرور؟
          </p>

          <button
            type="submit"
            className="w-full bg-[#165C75] hover:bg-[#0e4257] text-white py-3 rounded-xl text-lg font-semibold transition-colors duration-200"
          >
            تسجيل الدخول
          </button>

          <div className="text-center mt-2">
            <span className="text-gray-600 dark:text-slate-300 text-sm">ليس لديك حساب؟</span>
            <a
              href="/register"
              className="text-[#165C75] dark:text-cyan-300 font-semibold hover:underline text-sm ml-1"
            >
              إنشاء حساب
            </a>
          </div>

          <div className="flex items-center gap-4 my-3">
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
            <span className="text-gray-500 dark:text-slate-300">او</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
          </div>

          <div className="flex justify-center gap-6 text-4xl">
            <Image src="/assets/icons/google.png" alt="Google" width={40} height={40} className="cursor-pointer" />
            <Image src="/assets/icons/facebook.png" alt="Facebook" width={40} height={40} className="cursor-pointer" />
            <Image src="/assets/icons/apple.png" alt="Apple" width={40} height={40} className="cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <LoginForm />
    </Suspense>
  )
}


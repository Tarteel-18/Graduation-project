'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Register() {
  const [showPass, setShowPass] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F9F9] dark:bg-[#020617] py-10 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 shadow-xl rounded-[32px] px-10 py-10 w-full max-w-[650px] border border-[#DDE7EA] dark:border-slate-700">
        <div className="text-center mb-6">
          <Image src="/assets/logo.png" alt="logo" width={80} height={80} className="mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300">إنشاء حساب</h1>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="الاسم الكامل"
              className="w-full border border-[#BFD0D3] dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl py-3 pr-12 pl-4 text-right focus:border-[#165C75] dark:focus:border-cyan-400 outline-none transition-colors duration-200"
            />
            <Image
              src="/assets/icons/user.png"
              alt=""
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
            />
          </div>

          <div className="relative">
            <input
              type="email"
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
              type="tel"
              placeholder="رقم الهاتف"
              className="w-full border border-[#BFD0D3] dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl py-3 pr-12 pl-4 text-right focus:border-[#165C75] dark:focus:border-cyan-400 outline-none transition-colors duration-200"
            />
            <Image
              src="/assets/icons/phone.png"
              alt=""
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
            />
          </div>

          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
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

          <div className="relative">
            <input
              type={showPass2 ? 'text' : 'password'}
              placeholder="تأكيد كلمة المرور"
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

          <button
            type="submit"
            className="w-full bg-[#165C75] hover:bg-[#0e4257] text-white py-3 rounded-xl text-lg font-semibold transition-colors duration-200"
          >
            إنشاء حساب
          </button>

          <div className="text-center mt-2">
            <span className="text-gray-600 dark:text-slate-300 text-sm">لديك حساب بالفعل؟</span>
            <a
              href="/login"
              className="text-[#165C75] dark:text-cyan-300 font-semibold hover:underline text-sm ml-1"
            >
              تسجيل الدخول
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}


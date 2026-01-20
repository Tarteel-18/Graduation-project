'use client'

import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function UserProfile() {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    router.push('/')
  }

  const user = {
    avatar: '/assets/images/user-avatar.png',
    name: 'اسم المستخدم',
    email: 'user@example.com',
    phone: '+967 123 456 789',
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الصفحة الشخصية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-right"></div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#F97373] text-[#F97373] bg-white dark:bg-slate-900 text-sm font-semibold hover:bg-[#F97373] hover:text-white shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"
              />
            </svg>
            <span>خروج من الحساب</span>
          </button>
        </div>

        <section className="mx-auto max-w-[1300px] mb-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-l from-[#0E607C] via-[#137A90] to-[#1BA4B6] text-white shadow-lg">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative px-8 pt-10 pb-12 flex flex-col lg:flex-row gap-10 lg:items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-[160px] h-[160px] rounded-[28px] overflow-hidden border border-white/40 shadow-lg bg-white/20 backdrop-blur-md">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-right">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h2>
                <p className="text-white/90 mb-1">{user.email}</p>
                <p className="text-white/90">{user.phone}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1300px]">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8">
            <h3 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
              معلومات الحساب
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  className="w-full border border-slate-300 dark:border-slate-600 rounded-xl px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}


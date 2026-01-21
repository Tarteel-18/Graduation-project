'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function UserProfile() {
  const router = useRouter()
  const { logout } = useAuth()
  const [tab, setTab] = useState('overview')

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    router.push('/')
  }

  const tabs = [
    { label: 'نظرة عامة', value: 'overview' },
    { label: 'طلباتي', value: 'requests' },
    { label: 'مشاريعي', value: 'projects' },
    { label: 'الإعدادات', value: 'settings' },
  ]

  const [user, setUser] = useState({
    name: 'محمد إسماعيل',
    email: 'moh@gmail.com',
    phone: '777777777',
    avatar: '/assets/images/profile-demo.jpg',
    projectsCount: 3,
    pendingRequests: 2,
    rejectedRequests: 1,
  })

  const lastRequest = {
    type: 'دعم فني',
    daysAgo: 3,
  }

  const lastProject = {
    name: 'المشغل اليدوي',
    location: 'صنعاء — السبعين',
  }

  const requests = [
    { id: 1, type: 'دعم فني', desc: 'استشارة فنية', date: '2025-07-12', status: 'pending', statusLabel: 'قيد المراجعة' },
    { id: 2, type: 'مذكرة', desc: 'مطابقة مواصفات', date: '2025-07-12', status: 'approved', statusLabel: 'مقبول' },
  ]

  const projects = [
    { id: 1, name: 'المشغل اليدوي', shortDesc: 'إنتاج جلابيات', size: 'صغير', city: 'صنعاء', district: 'السبعين' },
    { id: 2, name: 'المشغل اليدوي', shortDesc: 'إنتاج جلابيات', size: 'صغير', city: 'صنعاء', district: 'السبعين' },
  ]

  const statusBadgeClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: 'bg-[#FFEED1] text-[#C7780A]',
      approved: 'bg-[#D8F4DF] text-[#1B7A35]',
      rejected: 'bg-[#FBD5D5] text-[#B91C1C]',
    }
    return classes[status] || 'bg-gray-100 text-gray-600'
  }

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setUser({ ...user, avatar: url })
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الصفحة الشخصية' },
          ]}
        />

        {/* زر الخروج */}
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

        {/* بطاقة رأس الصفحة */}
        <section className="mx-auto max-w-[1300px] mb-8">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-l from-[#0E607C] via-[#137A90] to-[#1BA4B6] text-white shadow-lg">
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="relative px-8 pt-10 pb-12 flex flex-col lg:flex-row gap-10 lg:items-center">
              {/* صورة المستخدم */}
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

                {/* زر تغيير الصورة */}
                <label className="relative inline-flex items-center justify-center px-7 py-2 rounded-full bg-white/15 text-white text-xs font-semibold cursor-pointer border border-white/40 backdrop-blur-sm hover:bg-white/25 hover:border-white/70 tracking-wide transition-all duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={onAvatarChange}
                  />
                  تغيير الصورة الشخصية
                </label>
              </div>

              {/* بيانات المستخدم */}
              <div className="flex-1 text-right space-y-4">
                <h2 className="text-3xl font-bold">{user.name}</h2>

                <div className="space-y-1 text-[15px] text-slate-50/90">
                  <p>البريد: <span className="font-semibold">{user.email}</span></p>
                  <p>رقم الهاتف: <span className="font-semibold">{user.phone}</span></p>
                </div>

                {/* إحصائيات */}
                <div className="flex flex-wrap gap-3 pt-3 text-[13px]">
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                    {user.projectsCount} مشاريع
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                    {user.pendingRequests} طلبات قيد المراجعة
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-300"></span>
                    {user.rejectedRequests} طلبات غير مقبولة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mx-auto max-w-[1300px] px-1 flex flex-wrap gap-3 mb-8">
          {tabs.map((item) => (
            <button
              key={item.value}
              onClick={() => setTab(item.value)}
              className={`px-8 py-2 rounded-full text-sm font-semibold transition border ${
                tab === item.value
                  ? 'bg-[#165C75] text-white shadow border-transparent dark:bg-cyan-500'
                  : 'bg-white border-[#BFD0D3] text-[#165C75] dark:bg-slate-900 dark:text-cyan-200 dark:border-slate-700 hover:bg-[#F3FBFC] hover:border-[#7BB6C6]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* نظرة عامة */}
        {tab === 'overview' && (
          <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
                <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">حالة الحساب</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-4">
                  يمكنك متابعة طلباتك وآخر التحديثات من هنا.
                </p>
                <div className="h-2 rounded-full bg-[#D9EEF2] dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-[#27AEB9]" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
                <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">أحدث طلب</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">
                  نوع: {lastRequest.type}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  تم التقديم منذ {lastRequest.daysAgo} أيام
                </p>
                <button className="px-5 py-1.5 rounded-full bg-[#FFEED1] text-[#C7780A] text-sm font-semibold">
                  قيد المراجعة
                </button>
              </div>

              <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
                <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">أحدث مشروع</h3>
                <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">{lastProject.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  الموقع: {lastProject.location}
                </p>
                <button className="px-5 py-1.5 rounded-full bg-[#D8F4DF] text-[#1B7A35] text-sm font-semibold">
                  مقبول
                </button>
              </div>
            </div>
          </section>
        )}

        {/* طلباتي */}
        {tab === 'requests' && (
          <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8">
            <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-xl mb-4">قائمة الطلبات</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-right">
                <thead>
                  <tr className="border-b bg-[#F4FBFB] dark:bg-slate-800">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">النوع</th>
                    <th className="py-3 px-4">الوصف</th>
                    <th className="py-3 px-4">التاريخ</th>
                    <th className="py-3 px-4">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, i) => (
                    <tr
                      key={req.id}
                      className="border-b hover:bg-[#F9FBFC] dark:hover:bg-slate-800"
                    >
                      <td className="py-3 px-4">{i + 1}</td>
                      <td className="py-3 px-4">{req.type}</td>
                      <td className="py-3 px-4">{req.desc}</td>
                      <td className="py-3 px-4">{req.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeClass(req.status)}`}
                        >
                          {req.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* مشاريعي */}
        {tab === 'projects' && (
          <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8">
            <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-xl mb-4">مشاريعي</h3>

            <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-8 py-6">
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="bg-white dark:bg-slate-900 rounded-[22px] px-6 py-5 shadow-sm"
                  >
                    <h4 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-2">
                      {proj.name}
                    </h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200 mb-1">
                      {proj.shortDesc}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                      الحجم: {proj.size}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-300 mb-1">
                      المدينة: {proj.city} — {proj.district}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* الإعدادات */}
        {tab === 'settings' && (
          <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* تغيير كلمة المرور */}
              <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
                <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-4">
                  تغيير كلمة المرور
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      className="w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#165C75] dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      className="w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#165C75] dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <button className="mt-2 w-full md:w-auto px-8 py-2 rounded-xl bg-[#165C75] text-white text-sm font-semibold hover:bg-[#0e4257] dark:bg-cyan-500 dark:hover:bg-cyan-400">
                    حفظ
                  </button>
                </div>
              </div>

              {/* بيانات الحساب */}
              <div className="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
                <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-4">
                  بيانات الحساب
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#165C75] dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#165C75] dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      className="w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:border-[#165C75] dark:focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <button className="mt-2 w-full md:w-auto px-8 py-2 rounded-xl bg-[#165C75] text-white text-sm font-semibold hover:bg-[#0e4257] dark:bg-cyan-500 dark:hover:bg-cyan-400">
                    تحديث البيانات
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </BaseLayout>
  )
}

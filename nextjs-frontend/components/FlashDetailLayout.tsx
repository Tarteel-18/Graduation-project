import Link from 'next/link'
import { ReactNode } from 'react'

interface FlashDetailLayoutProps {
  video: {
    title: string
    description?: string
    categoryLabel: string
    videoUrl: string
  }
  children?: ReactNode
}

export default function FlashDetailLayout({ video, children }: FlashDetailLayoutProps) {
  return (
    <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
      {/* 🧭 Breadcrumb */}
      <nav className="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mb-4">
        <Link href="/" className="hover:text-[#165C75] dark:hover:text-cyan-300">
          الرئيسية
        </Link>
        <span>›</span>
        <Link href="/media" className="hover:text-[#165C75] dark:hover:text-cyan-300">
          قسم الإعلام والتوعية
        </Link>
        <span>›</span>
        <Link href="/media/flashes" className="hover:text-[#165C75] dark:hover:text-cyan-300">
          الفلاشات التوعوية
        </Link>
        <span>›</span>
        <span className="text-[#000000] dark:text-cyan-300 font-semibold">
          {video.categoryLabel}
        </span>
      </nav>

      {/* 🟦 العنوان + الوصف */}
      <div className="mx-auto max-w-[1300px] px-4 mb-6 text-right">
        <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3">
          {video.title}
        </h1>
        {video.description && (
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto">
            {video.description}
          </p>
        )}
      </div>

      {/* 🟩 الكارد الأبيض للفلاش التوعوي */}
      <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10">
        <div className="max-w-[1100px] mx-auto bg-white dark:bg-slate-800 rounded-[26px] overflow-hidden shadow border border-[#E5EDF0] dark:border-slate-700">
          <video controls className="w-full">
            <source src={video.videoUrl} type="video/mp4" />
            المتصفح لا يدعم تشغيل الفيديو.
          </video>
        </div>
      </div>

      {children}
    </div>
  )
}




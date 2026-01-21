import Link from 'next/link'
import { ReactNode } from 'react'

interface FlashCardProps {
  title: string
  subtitle?: string
  link: string
  icon?: ReactNode
}

export default function FlashCard({ title, subtitle = '', link, icon }: FlashCardProps) {
  return (
    <Link
      href={link}
      className="group flex items-center justify-between gap-4 rounded-[22px] px-5 py-4 bg-gradient-to-l from-[#E0F4F7] to-[#F4FCFD] dark:from-slate-800 dark:to-slate-900 border border-[#D8EDEE] dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* النص */}
      <div className="flex flex-col text-right">
        <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {/* الأيقونة الدائرية */}
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#27AEB9] text-white group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
        {icon || (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        )}
      </div>
    </Link>
  )
}


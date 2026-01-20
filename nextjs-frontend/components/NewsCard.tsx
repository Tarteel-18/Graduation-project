import Link from 'next/link'
import Image from 'next/image'

interface NewsCardProps {
  title: string
  desc: string
  date?: string
  image: string
  link: string
}

export default function NewsCard({ title, desc, date, image, link }: NewsCardProps) {
  return (
    <Link
      href={link}
      className="ad-card group rounded-[24px] overflow-hidden bg-[#E9F5F6] dark:bg-slate-800 border border-[#D8EDEE] dark:border-slate-700 flex flex-col text-right"
    >
      {/* الصورة */}
      <Image src={image} alt={title} width={400} height={190} className="w-full h-[190px] object-cover" />

      {/* النص + الزر */}
      <div className="p-5 flex-1 flex flex-col gap-2">
        {/* التاريخ (اختياري) */}
        {date && (
          <p className="text-xs text-[#165C75] dark:text-cyan-300 font-semibold opacity-80">
            التاريخ: {date}
          </p>
        )}

        {/* العنوان */}
        <h2 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg leading-snug">
          {title}
        </h2>

        {/* الوصف */}
        <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed line-clamp-3">
          {desc}
        </p>

        {/* الزر */}
        <span className="btn btn-solid w-full mt-4 inline-block text-center">
          معرفة المزيد
        </span>
      </div>
    </Link>
  )
}


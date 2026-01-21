import Link from 'next/link'
import Image from 'next/image'

interface ServiceCardProps {
  image: string
  title: string
  desc: string
  link: string
}

export default function ServiceCard({ image, title, desc, link }: ServiceCardProps) {
  return (
    <Link
      href={link}
      className="service-card group bg-[#E9F5F6] dark:bg-slate-800 border border-[#D8EDEE] dark:border-slate-700 rounded-[24px] p-5 w-full flex flex-col gap-3 cursor-pointer"
    >
      {/* صورة */}
      <Image src={image} alt={title} width={400} height={140} className="w-full h-[140px] object-cover rounded-[16px]" />

      {/* عنوان */}
      <h3 className="text-[#165C75] dark:text-cyan-300 font-bold text-lg mt-1">
        {title}
      </h3>

      {/* وصف */}
      <p className="text-slate-600 dark:text-slate-300 leading-7 text-[15px] break-words flex-1">
        {desc}
      </p>

      {/* زر قراءة المزيد */}
      <div className="mt-3">
        <span className="btn btn-solid w-full mt-4">
          قراءة المزيد
        </span>
      </div>
    </Link>
  )
}


import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import BaseLayout from './BaseLayout'
import Breadcrumb from './Breadcrumb'

interface Video {
  id: number
  slug: string
  title: string
  image: string
  duration?: string
}

interface FlashesCategoryLayoutProps {
  title: string
  breadcrumbLabel: string
  description?: string
  videos: Video[]
  categorySlug: string
}

const FlashesCategoryLayout: React.FC<FlashesCategoryLayoutProps> = ({
  title,
  breadcrumbLabel,
  description = '',
  videos,
  categorySlug,
}) => {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'فلاشات توعوية', href: '/media/flashes' },
            { label: breadcrumbLabel },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6 text-right">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={`/media/flashes/${categorySlug}/${video.slug}`}
                className="group relative rounded-3xl overflow-hidden bg-slate-900/80 shadow-sm border border-[#E3EFF1] dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
              >
                <Image
                  src={video.image}
                  alt={video.title}
                  width={600}
                  height={280}
                  className="w-full h-[260px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 flex flex-col justify-between">
                  <div className="flex justify-end items-start p-3 text-xs text-white/80">
                    {video.duration && (
                      <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur">
                        {video.duration}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-[#165C75] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-2xl transition-transform duration-300">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path d="M9 7v10l8-5-8-5Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 pt-3 pb-2 bg-gradient-to-t from-black/60 to-black/0">
                    <h3 className="text-white font-bold text-xl md:text-2xl leading-8 line-clamp-2 group-hover:text-[#7BD4FF] transition-colors mb-0">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default FlashesCategoryLayout

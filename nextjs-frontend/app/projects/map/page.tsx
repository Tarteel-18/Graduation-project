'use client'

import { useEffect, useRef } from 'react'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function ProjectsMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Leaflet map initialization would go here
    // For now, using iframe as placeholder
  }, [])

  const projects = [
    {
      id: 1,
      name: 'مشروع حاضنات المشاريع الصغيرة',
      location: 'مركز صنعاء - صنعاء',
      lat: 15.3694,
      lng: 44.1910,
      image: '/images/projects/incubator.jpg',
    },
    {
      id: 2,
      name: 'مشروع دعم الشباب الريادي – تعز',
      location: 'مدينة تعز',
      lat: 13.5789,
      lng: 44.0170,
      image: '/images/projects/riyadi-taiz.jpg',
    },
    {
      id: 3,
      name: 'مشروع تطوير المنتجات الزراعية – إب',
      location: 'محافظة إب',
      lat: 14.0049,
      lng: 44.2479,
      image: '/images/projects/agri-ibb.jpg',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-10 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'مشاريعنا حسب المحافظات' },
          ]}
        />

        <header className="mb-6 text-right">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2">
            مشاريعنا حسب المحافظات
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-[15px]">
            هنا توضح الخريطة التفاعلية للمشاريع حسب المحافظة (قيد التنفيذ).
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-[28px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm overflow-hidden">
          <div id="projects-map" ref={mapRef} className="w-full h-[420px] md:h-[520px]">
            <iframe
              className="w-full h-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.0,10.0,55.0,20.5&layer=mapnik&marker=15.5,48.5"
              style={{ border: 0 }}
            ></iframe>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-5 py-4 bg-[#F5FAFB] dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-300 text-right">
              حرّك المؤشر فوق علامة المشروع في الخريطة لعرض اسمه وصورته.
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


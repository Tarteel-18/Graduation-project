'use client'

import { useEffect, useRef } from 'react'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import 'leaflet/dist/leaflet.css'
// نستورد النوع فقط حتى لا يحدث خطأ في السيرفر
import type { Map } from 'leaflet'

// ---------------------------------------------------------
// الحل لمشكلة الـ Dependency:
// نقلنا البيانات خارج المكون لأنها ثابتة ولا تعتمد على state
// ---------------------------------------------------------
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

export default function ProjectsMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  // الحل لمشكلة any في الـ ref
  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const L = (await import('leaflet')).default

      if (mapInstanceRef.current) return

      // الحل لمشكلة any في البروتوتايب:
      // نستخدم هذا التعليق لإخبار الـ Linter بتجاهل هذا السطر فقط لأنه hack ضروري
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      })

      if (mapContainerRef.current) {
        mapInstanceRef.current = L.map(mapContainerRef.current).setView([15.5, 44.5], 6)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap',
        }).addTo(mapInstanceRef.current)

        projects.forEach((p) => {
          // التأكد من وجود الخريطة قبل الإضافة
          if (!mapInstanceRef.current) return;

          const marker = L.marker([p.lat, p.lng]).addTo(mapInstanceRef.current)

          const popupHtml = `
            <div style="direction:rtl; text-align:right; max-width:280px;">
              <div style="display:flex; gap:12px; align-items:center;">
                <div style="flex:1;">
                  <strong style="display:block; margin-bottom:4px; font-size:14px; color:#1e293b;">
                    ${p.name}
                  </strong>
                  <span style="font-size:12px; color:#64748b;">${p.location}</span>
                </div>
                ${
                  p.image
                    ? `
                <div style="width:110px; height:70px; overflow:hidden; border-radius:10px; border:1px solid #e2e8f0;">
                  <img src="${p.image}" style="width:100%; height:100%; object-fit:cover;" />
                </div>`
                    : ''
                }
              </div>
            </div>
          `

          marker.bindPopup(popupHtml)

          marker.on('mouseover', () => {
            marker.openPopup()
          })
          
          marker.on('mouseout', () => {
            marker.closePopup()
          })
        })
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
    // لم نعد بحاجة لإضافة projects هنا لأنها معرفة خارج المكون وتعتبر ثابتة
  }, [])

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-10 pb-20" dir="rtl">
        <div className="mt-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'الرئيسية', href: '/' },
              { label: 'مشاريعنا حسب المحافظات' },
            ]}
          />
        </div>

        <header className="mb-6 text-right">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2">
            مشاريعنا حسب المحافظات
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-[15px]">
            هنا توضح الخريطة التفاعلية للمشاريع حسب المحافظة (قيد التنفيذ).
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-[28px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm overflow-hidden">
          
          <div 
            id="projects-map" 
            ref={mapContainerRef} 
            // تجاهل تحذيرات Tailwind لأننا نريد هذه المقاسات المحددة للتطابق مع التصميم
            className="w-full h-[420px] md:h-[520px] z-0 relative"
          ></div>

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
'use client'

import { useState } from 'react'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function Faq() {
  const [active, setActive] = useState<Record<number, boolean>>({})

  const toggle = (index: number) => {
    setActive((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const faq = [
    { q: 'هل الهيئة تمول؟', a: 'نعم، الهيئة تقدم قروض بيضاء عبر الجمعيات الشريكة...' },
    { q: 'كيف تخدمون المشاريع الصغيرة؟', a: 'تقدم الهيئة برامج تدريبية وتمويلية...' },
    { q: 'كيف أقدم على برامج الهيئة التدريبية؟', a: 'عبر التسجيل في البرامج المفتوحة...' },
    { q: 'كيف أقدم على قرض؟', a: 'التقديم يتم عن طريق الجمعيات التمويلية...' },
    { q: 'ما نوع التمويل المقدم؟', a: 'تمويل بدون فوائد عبر برنامج القرض الحسن...' },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الأسئلة الشائعة' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#1A1A1A] dark:text-slate-50 mb-2 text-right">
            الأسئلة الشائعة
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
            هنا تجد إجابات لأكثر الأسئلة شيوعًا حول خدمات وبرامج الهيئة العامة لتنمية
            المشاريع الصغيرة والأصغر.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8 md:p-10">
          <div className="w-full mx-auto">
            {faq.map((item, index) => (
              <div key={index} className="mb-4">
                <div
                  onClick={() => toggle(index)}
                  className="cursor-pointer bg-[#DFF1F4] dark:bg-slate-800 hover:bg-[#d7edf0] dark:hover:bg-slate-700 transition-all rounded-xl px-5 py-4 border border-[#cae6ea] dark:border-slate-700 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[#165C75] dark:text-cyan-300 font-semibold text-lg">
                      {item.q}
                    </span>
                    <svg
                      className={`w-6 h-6 text-[#165C75] dark:text-cyan-300 transition-transform ${
                        active[index] ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    active[index] ? 'max-h-[300px]' : 'max-h-0'
                  }`}
                >
                  <div className="bg-[#F7FCFD] dark:bg-slate-800 rounded-xl px-5 py-4 mt-2 border border-[#D6E8EB] dark:border-slate-700">
                    <p className="text-slate-700 dark:text-slate-100 leading-7 text-[16px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


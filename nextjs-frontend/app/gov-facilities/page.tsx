'use client'

import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function GovFacilities() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const goToSpecsForm = () => {
    const target = '/form/specs-memo-request'
    if (!isLoggedIn) {
      router.push(`/login?redirect=${target}`)
    } else {
      router.push(target)
    }
  }

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'التسهيلات الحكومية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
            التسهيلات الحكومية
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
            نوفر لك دليلاً شاملاً للتسهيلات والخدمات الحكومية التي تساعد رواد الأعمال وأصحاب المشاريع
            الصغيرة والأصغر على الانطلاق والنمو بسهولة، مع شرح مبسط للإجراءات والمتطلبات.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10">
          <div className="gov-card bg-[#E9F5F6] dark:bg-slate-800 border border-[#D8EDEE] dark:border-slate-700 rounded-[24px] p-8 w-full flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/assets/icons/gov-icon.png"
                alt="أيقونة التسهيلات الحكومية"
                width={36}
                height={36}
                className="object-contain"
              />
              <h2 className="text-xl md:text-2xl font-bold text-[#165C75] dark:text-cyan-300">
                مذكرة المواصفات والمقاييس
              </h2>
            </div>

            <p className="text-slate-700 dark:text-slate-100 leading-8 text-[16px] md:text-[17px]">
              تصدر الهيئة العامة لتنمية المشاريع الصغيرة والأصغر مذكرات رسمية موجهة إلى الجهات الحكومية
              ذات العلاقة، ومنها الهيئة اليمنية للمواصفات والمقاييس وضبط الجودة، وذلك لتسهيل إجراءات تسجيل
              وترخيص المشاريع الصغيرة والأصغر، وتمكينها من الحصول على الدعم اللوجستي والخدمات وفق الأنظمة
              المعتمدة. تمثل هذه المذكرات أداة هامة لدعم رواد الأعمال وتعزيز استدامة المشاريع الإنتاجية
              الصغيرة.
            </p>

            <div className="mt-4 flex justify-center">
              <button type="button" onClick={goToSpecsForm} className="btn-long-full">
                اطلب الخدمة
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


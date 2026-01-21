'use client'

import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function ServiceFunding() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const goToFundingForm = () => {
    const target = '/form/small-project-register'
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(target)}`)
    } else {
      router.push(target)
    }
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الخدمات', href: '/services' },
            { label: 'خدمة التمويل' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
            خدمة التمويل
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
            تقدم الهيئة قروضاً بيضاء عبر الجمعيات الشريكة لدعم المشاريع الصغيرة والأصغر.
          </p>
        </div>

        <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="w-full rounded-[32px] overflow-hidden bg-black mb-8">
            <Image
              src="/assets/images/training.jpg"
              alt="خدمة التمويل"
              width={1200}
              height={420}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <section className="mb-8 text-right">
            <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
              نبذة عن خدمة التمويل
            </h2>
            <p className="text-slate-700 dark:text-slate-200 text-[17px] leading-[2.2]">
              تقدم الهيئة قروضاً بيضاء (بدون فوائد) عبر الجمعيات التمويلية الشريكة لدعم
              المشاريع الصغيرة والأصغر في مختلف القطاعات، مع تسهيل الإجراءات وتوفير الدعم
              اللازم لضمان نجاح المشاريع.
            </p>
          </section>

          <div className="mt-4 flex justify-center">
            <button type="button" onClick={goToFundingForm} className="btn-long-full">
              اطلب الخدمة
            </button>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}


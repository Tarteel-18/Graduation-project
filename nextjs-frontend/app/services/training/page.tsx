'use client'

import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function ServiceTraining() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const goToTrainingForm = () => {
    const target = '/form/training-program'
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
            { label: 'خدمة التدريب' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
            خدمة التدريب
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
            من خلال خدمة التدريب، تقدم الهيئة برامج تدريبية متخصصة لتأهيل رواد
            الأعمال وأصحاب المشاريع الصغيرة والأصغر ضمن سلاسل قيمة معتمدة.
          </p>
        </div>

        <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="w-full rounded-[32px] overflow-hidden bg-black mb-8">
            <Image
              src="/assets/images/training.jpg"
              alt="خدمة التدريب"
              width={1200}
              height={420}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <section className="mb-8 text-right">
            <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
              نبذة عن خدمة التدريب
            </h2>
            <p className="text-slate-700 dark:text-slate-200 text-[17px] leading-[2.2]">
              تقدم الهيئة العامة لتنمية المشاريع الصغيرة والأصغر برامج تدريبية متخصصة في
              مجالات التصنيع الغذائي، الخياطة، الحرف اليدوية، ريادة الأعمال والتدريب
              المهني والمعرفي، ضمن منهجية "تدريب – تمكين – تسويق".
            </p>
          </section>

          <section className="mb-8 text-right">
            <h3 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
              أهداف الخدمة
            </h3>
            <ul className="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
              <li>رفع كفاءة رواد الأعمال وأصحاب المشاريع في الجوانب الفنية والإدارية.</li>
              <li>تمكين المستفيدين من إنشاء وإدارة مشاريع مستدامة ومجدية اقتصاديًا.</li>
              <li>ربط التدريب بفرص التمويل والتسويق ضمن سلاسل قيمة متكاملة.</li>
            </ul>
          </section>

          <section className="mb-8 text-right">
            <h3 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
              الفئات المستهدفة
            </h3>
            <ul className="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
              <li>رواد الأعمال الشباب من الجنسين.</li>
              <li>أصحاب المشاريع الصغيرة والأصغر القائمة.</li>
              <li>المبادرون الذين لديهم أفكار مشاريع قابلة للتنفيذ.</li>
            </ul>
          </section>

          <div className="mt-4 flex justify-center">
            <button type="button" onClick={goToTrainingForm} className="btn-long-full">
              اطلب الخدمة
            </button>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}


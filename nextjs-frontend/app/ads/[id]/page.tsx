'use client'

import { useRouter, useParams } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

type Ad = {
  id: number
  type: string
  date: string
  location: string
  title: string
  image: string
  description: string
  benefits: string[]
  conditions: string[]
  registration: string[]
  slug?: string
}

const adsData: Ad[] = [
  {
    id: 1,
    type: 'تدريب',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تدريب جديدة',
    image: '/assets/images/news-1.jpg',
    description:
      'برنامج تدريبي متخصص يستهدف الشباب في مجال التصنيع الغذائي...',
    benefits: ['شهادة معتمدة', 'جلسات تدريبية عملية', 'ترشيح المشاريع المميزة'],
    conditions: ['وجود مشروع أو فكرة واضحة', 'الالتزام بالحضور الكامل'],
    registration: ['التسجيل عبر الموقع الرسمي', 'متابعة البريد الإلكتروني للتأكيد'],
    slug: 'training-ad',
  },
  {
    id: 2,
    type: 'تطوع',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تطوع جديدة',
    image: '/assets/images/news-1.jpg',
    description:
      'تعلن الهيئة عن فتح باب التطوع في عدد من البرامج والفعاليات...',
    benefits: ['خبرة ميدانية', 'شهادة تطوع من الهيئة'],
    conditions: [
      'القدرة على الالتزام بالفترة المحددة',
      'الالتزام بسلوكيات العمل التطوعي',
    ],
    registration: ['التسجيل عبر نموذج التطوع في الموقع'],
    slug: 'volunteer-program',
  },
  {
    id: 3,
    type: 'تعاقد',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تعاقد جديدة',
    image: '/assets/images/news-1.jpg',
    description:
      'ترغب الهيئة في التعاقد مع جهات مختصة لتنفيذ مشاريع تنموية...',
    benefits: [],
    conditions: [
      'تقديم عرض فني ومالي مفصل',
      'توفر خبرة سابقة في نفس المجال',
    ],
    registration: ['إرسال العرض عبر البريد الرسمي للهيئة'],
    slug: 'contract-opportunity',
  },
]

export default function AdDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isLoggedIn } = useAuth()
  const id = Number(params.id)
  const ad = adsData.find((a) => a.id === id)

  const goToAdForm = () => {
    if (!ad?.slug) return

    const targetPath = `/form/${ad.slug}`

    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(targetPath)}`)
    } else {
      router.push(targetPath)
    }
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الإعلانات', href: '/ads' },
            { label: ad ? ad.title : 'تفاصيل الإعلان' },
          ]}
        />

        {ad ? (
          <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8 md:p-10">
            <div className="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px] border border-[#D8EDEE] dark:border-slate-700 shadow p-8 md:p-10">
              <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-center mb-3">
                {ad.title}
              </h1>

              <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
                نوع الإعلان: {ad.type} | التاريخ: {ad.date} | الموقع: {ad.location}
              </p>

              <Image
                src={ad.image}
                alt={ad.title}
                width={1200}
                height={380}
                className="w-full h-[380px] object-cover rounded-[22px] mb-10"
              />

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
                  تفاصيل البرنامج:
                </h2>
                <p className="text-slate-700 dark:text-slate-200 text-lg leading-8">
                  {ad.description}
                </p>
              </section>

              {ad.benefits && ad.benefits.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
                    مزايا البرنامج:
                  </h2>
                  <ul className="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg">
                    {ad.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </section>
              )}

              {ad.conditions && ad.conditions.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
                    شروط الالتحاق:
                  </h2>
                  <ul className="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg">
                    {ad.conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </section>
              )}

              {ad.registration && ad.registration.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
                    طريقة التسجيل:
                  </h2>
                  <ul className="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg">
                    {ad.registration.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>
              )}

              {ad.slug && (
                <button onClick={goToAdForm} className="btn-long-full">
                  سجل الآن
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#F1C0C0] dark:border-rose-500/60 shadow-sm p-8 mt-10 text-center text-red-600 dark:text-rose-300">
            لم يتم العثور على الإعلان المطلوب.
          </div>
        )}
      </div>
    </BaseLayout>
  )
}

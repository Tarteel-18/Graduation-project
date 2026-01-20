import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'

export default function AdDetail({ params }: { params: { id: string } }) {
  // In a real app, fetch ad by ID from API
  const ad = {
    id: params.id,
    title: 'فرصة تدريب جديدة',
    type: 'تدريب',
    date: '15 أغسطس 2025',
    location: 'صنعاء',
    image: '/assets/images/news-1.jpg',
    description: 'تفاصيل الإعلان الكاملة...',
    benefits: ['ميزة 1', 'ميزة 2', 'ميزة 3'],
  }

  if (!ad) {
    return (
      <BaseLayout>
        <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
          <div className="text-center text-slate-500 dark:text-slate-400 mt-20">
            لم يتم العثور على الإعلان المطلوب.
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الإعلانات', href: '/ads' },
            { label: ad.title },
          ]}
        />

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
                  {ad.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


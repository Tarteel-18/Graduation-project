import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsDetail({ params }: { params: { id: string } }) {
  // In a real app, fetch news by ID from API
  const newsItem = {
    id: params.id,
    title: 'خبر جديد',
    date: '25 يوليو 2025',
    location: 'صنعاء',
    image: '/assets/images/news-1.jpg',
    fullText: 'هذا نص الخبر الكامل...',
  }

  if (!newsItem) {
    return (
      <BaseLayout>
        <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">
          <div className="text-center text-slate-500 dark:text-slate-400 mt-20">
            لم يتم العثور على الخبر المطلوب.
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'الأخبار', href: '/news' },
            { label: newsItem.title },
          ]}
        />

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8 md:p-10">
          <div className="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px] border border-[#D8EDEE] dark:border-slate-700 shadow p-8 md:p-10">
            <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300 mb-3 text-right">
              {newsItem.title}
            </h1>

            <p className="text-slate-600 dark:text-slate-300 mb-6 text-right text-[15px]">
              التاريخ: {newsItem.date} | الموقع: {newsItem.location}
            </p>

            <Image
              src={newsItem.image}
              alt={newsItem.title}
              width={1200}
              height={380}
              className="w-full h-[380px] object-cover rounded-[22px] mb-10"
            />

            <section className="mb-8">
              <p className="text-slate-700 dark:text-slate-200 text-lg leading-8 text-right">
                {newsItem.fullText}
              </p>
            </section>

            <div className="flex justify-center mt-8">
              <Link href="/news" className="w-full md:w-[260px]">
                <button className="w-full bg-[#27AEB9] text-white py-3.5 rounded-xl text-lg hover:bg-[#1d8b94] dark:hover:bg-cyan-500 transition">
                  العودة إلى الأخبار
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


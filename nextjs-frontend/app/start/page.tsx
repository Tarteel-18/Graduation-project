'use client'

import { useRouter } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

export default function StartProject() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const goToPromoteForm = () => {
    const target = '/form/promote-project'
    if (!isLoggedIn) {
      router.push(`/login?redirect=${target}`)
    } else {
      router.push(target)
    }
  }

  const posts = [
    {
      id: 1,
      date: '08 أغسطس 2025',
      title: 'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
      owner: 'أم يوسف',
      type: 'تسويق',
      links: '@@@@@@s',
      imageLeft: 'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg',
    },
    {
      id: 2,
      date: '08 أغسطس 2025',
      title: 'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
      owner: 'أم يوسف',
      type: 'تسويق',
      links: '@@@@@@s',
      imageLeft: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'روج لمشروعك' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3">
              روج لمشروعك
            </h1>
            <p className="text-gray-600 dark:text-slate-300 mb-0 leading-relaxed max-w-[850px]">
              منصة لعرض وتسويق منتجات المشاريع الصغيرة والأصغر.
            </p>
          </div>

          <button
            onClick={goToPromoteForm}
            className="bg-[#165C75] text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-[#124c60] whitespace-nowrap dark:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors"
          >
            سجل الآن لترويج مشروعك
          </button>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10">
          <div className="max-w-[1100px] mx-auto space-y-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-[#E9F4F5] dark:bg-slate-800 rounded-[30px] border border-[#D0E6E8] dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={post.imageLeft}
                    alt={post.title}
                    width={1200}
                    height={320}
                    className="w-full h-[260px] md:h-[320px] object-cover"
                  />
                </div>

                <div className="px-8 py-6 text-right">
                  <h2 className="text-lg md:text-xl text-[#165C75] dark:text-cyan-300 font-bold mb-3 leading-relaxed">
                    {post.title}
                  </h2>

                  <div className="grid gap-2 text-[14px] md:text-[15px] text-slate-700 dark:text-slate-200">
                    <p>
                      <span className="font-semibold text-[#165C75] dark:text-cyan-300">الجهة / المالك:</span>
                      <span className="mr-1"> {post.owner}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-[#165C75] dark:text-cyan-300">التصنيف:</span>
                      <span className="mr-1"> {post.type}</span>
                    </p>
                    {post.links && (
                      <p>
                        <span className="font-semibold text-[#165C75] dark:text-cyan-300">روابط التواصل:</span>
                        <span className="mr-1 break-all"> {post.links}</span>
                      </p>
                    )}
                    <p className="text-slate-500 dark:text-slate-400 text-[13px] mt-1">
                      <span className="font-semibold text-[#165C75] dark:text-cyan-300">التاريخ:</span>
                      <span className="mr-1"> {post.date}</span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


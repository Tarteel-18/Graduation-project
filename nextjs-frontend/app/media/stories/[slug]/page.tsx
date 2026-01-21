import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import { successStories } from '@/data/successStories'

export default async function StoryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = successStories.find((s) => s.slug === slug)

  if (!story) {
    return (
      <BaseLayout>
        <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
          <div className="text-center text-slate-500 dark:text-slate-400 mt-20">
            لم يتم العثور على القصة المطلوبة.
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
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'قصص النجاح', href: '/media/stories' },
            { label: story.title },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6 text-right">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3">
            {story.title}
          </h1>
          {story.summary && (
            <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto">
              {story.summary}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="w-full rounded-[32px] overflow-hidden bg-black mb-6">
            <video className="w-full h-[420px] object-cover" controls src={story.videoUrl}>
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>

          <div className="text-right space-y-2">
            <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300">
              تفاصيل قصة النجاح
            </h2>
            <p className="text-slate-700 dark:text-slate-200 leading-8">{story.content}</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


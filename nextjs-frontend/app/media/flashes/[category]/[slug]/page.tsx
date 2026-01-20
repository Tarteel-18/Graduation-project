import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import { flashVideos } from '@/data/flashVideos'

export default function MediaFlashVideoDetail({
  params,
}: {
  params: { category: string; slug: string }
}) {
  const video = flashVideos.find(
    (v) => v.category === params.category && v.slug === params.slug
  )

  if (!video) {
    return (
      <BaseLayout>
        <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
          <div className="text-center text-slate-500 dark:text-slate-400 mt-20">
            لم يتم العثور على الفيديو المطلوب.
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
            { label: 'الفلاشات التوعوية', href: '/media/flashes' },
            { label: video.categoryLabel },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6 text-right">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3">
            {video.title}
          </h1>
          {video.description && (
            <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto">
              {video.description}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="w-full rounded-[32px] overflow-hidden bg-black mb-6">
            <video className="w-full h-[420px] object-cover" controls src={video.videoUrl}>
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>

          <div className="text-right space-y-2">
            <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300">
              معلومات عن الفلاش التوعوي
            </h2>
            <p className="text-slate-700 dark:text-slate-200 leading-8">{video.description}</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


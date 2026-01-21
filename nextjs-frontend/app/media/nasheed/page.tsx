import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function MediaNasheed() {
  const nasheed = {
    id: 1,
    title: 'كليب ربيعك يا طه (المولد النبوي الشريف)',
    videoUrl: '/assets/videos/splash.mp4',
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'أناشيد' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-right">
            الأناشيد
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10">
          <div className="max-w-[1100px] mx-auto bg-white dark:bg-slate-800 rounded-[26px] overflow-hidden shadow border border-[#E5EDF0] dark:border-slate-700">
            <video
              className="w-full h-[380px] md:h-[460px] object-cover bg-black"
              controls
              src={nasheed.videoUrl}
            >
              متصفحك لا يدعم تشغيل الفيديو.
            </video>

            <div className="bg-[#D9EEF2] dark:bg-slate-700 px-4 py-5 text-center">
              <h2 className="text-[#165C75] dark:text-cyan-300 font-bold text-xl leading-relaxed">
                {nasheed.title}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import MediaCard from '@/components/MediaCard'

export default function MediaIndex() {
  const mediaItems = [
    { id: 1, title: 'الفلاشات التوعوية', image: '/assets/images/training.jpg', link: '/media/flashes' },
    { id: 2, title: 'الأخبار', image: '/assets/images/training.jpg', link: '/news' },
    { id: 3, title: 'الحلقات الإذاعية', image: '/assets/images/training.jpg', link: '/media/radio' },
    { id: 4, title: 'قصص النجاح', image: '/assets/images/training.jpg', link: '/media/stories' },
    { id: 5, title: 'الأناشيد', image: '/assets/images/training.jpg', link: '/media/nasheed' },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            قسم الإعلام والتوعية
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            تابع المواد الإعلامية المتنوعة من أخبار وفلاشات توعوية وحلقات إذاعية وقصص نجاح وأناشيد.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {mediaItems.map((item) => (
              <MediaCard key={item.id} title={item.title} image={item.image} link={item.link} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


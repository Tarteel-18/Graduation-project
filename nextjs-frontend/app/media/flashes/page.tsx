import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import MediaCard from '@/components/MediaCard'

export default function MediaFlashes() {
  const flashes = [
    {
      id: 1,
      title: 'فيديوهات توعوية (الصناعات المنزلية)',
      image: '/assets/images/flash-1.png',
      link: '/media/flashes/home-industry',
    },
    {
      id: 2,
      title: 'فلاشات توعوية (الصحة الحيوانية)',
      image: '/assets/images/flash-1.png',
      link: '/media/flashes/animal-health',
    },
    {
      id: 3,
      title: 'سلسلة تعلم في دقيقة',
      image: '/assets/images/flash-1.png',
      link: '/media/flashes/learn-in-a-minute',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'الفلاشات التوعوية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            الفلاشات التوعوية
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="flex flex-col gap-8">
            {flashes.map((item) => (
              <MediaCard key={item.id} title={item.title} image={item.image} link={item.link} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


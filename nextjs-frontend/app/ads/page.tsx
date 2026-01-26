import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import AdvertisementCard from '@/components/AdvertisementCard'

export default function AdsIndex() {
  const ads = [
    {
      id: 1,
      type: 'تدريب',
      date: '15 أغسطس 2025',
      title: 'فرصة تدريب جديدة',
      desc: 'تطوير مهارات المشاركين في مجال التصنيع الغذائي وتمكينهم من دخول سوق العمل.',
      image: '/assets/images/news-1.jpg',
    },
    {
      id: 2,
      type: 'تطوع',
      date: '15 أغسطس 2025',
      title: 'فرصة تطوع جديدة',
      desc: 'تعلن الهيئة العامة لتنمية المشاريع الصغيرة والأصغر عن فتح باب التطوع.',
      image: '/assets/images/news-1.jpg',
    },
    {
      id: 3,
      type: 'تعاقد',
      date: '15 أغسطس 2025',
      title: 'فرصة تعاقد جديدة',
      desc: 'تعلن الهيئة رغبتها في التعاقد مع جهات لتنفيذ مشاريع جديدة.',
      image: '/assets/images/news-1.jpg',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الإعلانات' },
          ]}
        />

        <h1 className="text-2xl md:text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
          الإعلانات
        </h1>

        <p className="text-slate-600 dark:text-slate-300 leading-8 mb-8 max-w-[900px] text-right">
          تابع أحدث الإعلانات المتعلقة بالتدريب، الفرص، والتعاقدات التي تعلن عنها الهيئة.
        </p>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-5 md:px-8 py-8 mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            {ads.map((item) => (
              <AdvertisementCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                desc={item.desc}
                type={item.type}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}




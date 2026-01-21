import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import NewsCard from '@/components/NewsCard'

export default function NewsIndex() {
  const news = [
    {
      id: 1,
      title: 'خبر جديد 1',
      desc: 'نص مختصر عن محتوى الخبر الأول نص تجريبي بسيط...',
      date: '١ ديسمبر ٢٠٢٥',
      image: '/assets/images/news-1.jpg',
      link: '/news/1',
    },
    {
      id: 2,
      title: 'خبر جديد 2',
      desc: 'نص مختصر عن محتوى الخبر الثاني نص تجريبي بسيط...',
      date: '٢ ديسمبر ٢٠٢٥',
      image: '/assets/images/news-1.jpg',
      link: '/news/2',
    },
    {
      id: 3,
      title: 'خبر جديد 3',
      desc: 'نص مختصر عن محتوى الخبر الثالث نص تجريبي بسيط...',
      date: '٣ ديسمبر ٢٠٢٥',
      image: '/assets/images/news-1.jpg',
      link: '/news/3',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'الأخبار' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            الأخبار
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            تابع آخر أخبار وبرامج الهيئة العامة لتنمية المشاريع الصغيرة والأصغر،
            والفعاليات والأنشطة التي تُنَفَّذ لخدمة رواد الأعمال وأصحاب المشاريع.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                desc={item.desc}
                date={item.date}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


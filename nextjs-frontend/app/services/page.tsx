import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import ServiceCard from '@/components/ServiceCard'

export default function Services() {
  const services = [
    {
      id: 1,
      image: '/assets/images/logo.png',
      title: 'خدمة التدريب',
      desc: 'تقدم الهيئة برامج تدريبية متخصصة تهدف إلى تطوير مهارات رواد الأعمال...',
      link: '/services/training',
    },
    {
      id: 2,
      image: '/assets/services/marketing.jpg',
      title: 'خدمة التسويق',
      desc: 'نسعى لتسويق منتجات المشاريع الصغيرة عبر المعارض والفعاليات...',
      link: '/services/marketing',
    },
    {
      id: 3,
      image: '/assets/services/funding.jpg',
      title: 'خدمة التمويل',
      desc: 'تقدم الهيئة قروضاً بيضاء عبر الجمعيات الشريكة لدعم المشاريع...',
      link: '/services/funding',
    },
    {
      id: 4,
      image: '/assets/services/consulting.jpg',
      title: 'خدمة الاستشارات',
      desc: 'نقدم استشارات متخصصة تساعد أصحاب المشاريع على النمو...',
      link: '/services/consulting',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الخدمات' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            خدمات الهيئة
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            في الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، نعمل على تقديم مجموعة متكاملة من الخدمات
            التي تهدف إلى دعم أصحاب المشاريع في جميع المراحل.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10">
          <div className="grid md:grid-cols-3 gap-x-6 gap-y-8 justify-items-center">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                desc={service.desc}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


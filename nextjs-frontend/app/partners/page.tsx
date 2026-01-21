import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'

export default function Partners() {
  const partners = [
    {
      title: 'الشركاء الممولون',
      link: '/partners/funders',
      desc: 'نعتز بشركائنا الممولين الذين أسهموا في دعم وتمويل البرامج والمشاريع...',
    },
    {
      title: 'الشركاء المنفذون',
      link: '/partners/executors',
      desc: 'شركاؤنا المنفذون هم الذراع التنفيذية التي حولت الرؤى إلى واقع ملموس...',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الشركاء' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-4">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right">
            شركاؤنا
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <p className="text-right max-w-[900px] ml-auto text-slate-600 dark:text-slate-300 leading-8 text-[17px]">
            نفخر بشراكاتنا الإستراتيجية مع مؤسسات محلية ودولية بارزة، تسهم معنا في دعم المشاريع
            الصغيرة والأصغر وتعزيز بيئة ريادة الأعمال. وإن تعاوننا مع شركائنا يفتح آفاقاً واسعة
            للإبتكار، ويوفر فرصاً أكبر للنمو والاستدامة، لنصبح معاً نحو مستقبل أكثر إشراقاً.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-800 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-8 md:p-10 mt-4">
          <div className="w-full grid md:grid-cols-2 gap-8">
            {partners.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="partner-card bg-[#E6F3F5] dark:bg-slate-700 rounded-3xl p-8 border border-[#D6E8EB] dark:border-slate-600 shadow-sm block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Image src="/assets/images/hand-icon.png" alt="" width={48} height={48} />
                  <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300">
                    {item.title}
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-100 leading-8 text-[17px]">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


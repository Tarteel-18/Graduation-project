import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'

export default function PartnersExecutors() {
  const partners = [
    { id: 1, name: 'شريك 1', logo: '/assets/logo.png' },
    { id: 2, name: 'شريك 2', logo: '/assets/logo2.png' },
    { id: 3, name: 'شريك 3', logo: '/assets/logo.png' },
    { id: 4, name: 'شريك 4', logo: '/assets/logo2.png' },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الشركاء', href: '/partners' },
            { label: 'الشركاء المنفذون' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right mb-3">
            الشركاء المنفذون
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10">
          <div className="max-w-[1100px] mx-auto grid gap-8 md:grid-cols-2 xl:grid-cols-4 justify-items-center">
            {partners.map((partner) => (
              <article
                key={partner.id}
                className="partner-logo-card w-full max-w-[260px] h-[200px] bg-[#E6F3F5] dark:bg-slate-800 rounded-[26px] border border-[#D6E8EB] dark:border-slate-700 shadow-sm flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={200}
                  height={150}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}




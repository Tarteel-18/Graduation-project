import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'

export default function PartnersFunded() {
  const logos = [
    '/assets/logo.png',
    '/assets/logo2.png',
    '/assets/logo.png',
    '/assets/logo2.png',
    '/assets/logo.png',
    '/assets/logo2.png',
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الشركاء', href: '/partners' },
            { label: 'الشركاء الممولون' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right mb-3">
            الشركاء الممولون
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10 mb-10">
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-8 justify-items-center">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="partner-logo-card bg-[#E6F3F5] dark:bg-slate-800 border border-[#D6E8EB] dark:border-slate-700 shadow-sm rounded-[32px] p-8 flex items-center justify-center w-full h-[200px]"
              >
                <Image
                  src={logo}
                  alt={`شريك ${i + 1}`}
                  width={200}
                  height={150}
                  className="max-w-[80%] max-h-[80%] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'

export default function Studies() {
  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'الدراسات' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-4">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right">
            الدراسات
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <p className="text-right max-w-[900px] ml-auto text-slate-600 dark:text-slate-300 leading-8 text-[17px]">
            تصفح دراساتنا الحديثة التي تسلط الضوء على المشاريع المحلية والتنمية الاقتصادية في اليمن،
            واكتشف كيف تسهم هذه الدراسات في تعزيز المعرفة والوعي ودعم اتخاذ القرار في مختلف المجالات.
          </p>
        </div>

        <div className="mx-auto max-w-[1100px] bg-white dark:bg-slate-800 rounded-[32px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-6 py-5">
          <div className="study-card flex flex-col md:flex-row items-stretch bg-[#E9F5F6] dark:bg-slate-700 rounded-[24px] overflow-hidden">
            <div className="w-full md:w-[32%] mb-4 md:mb-0">
              <Image
                src="/assets/images/news-1.jpg"
                alt="صورة الدراسة"
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-2xl md:rounded-none"
              />
            </div>

            <div className="flex-1 px-4 md:px-8 py-3 md:py-5 text-right flex flex-col justify-center gap-3">
              <h2 className="text-xl md:text-[22px] font-bold text-[#165C75] dark:text-cyan-300">
                تحليل سلسلة قيمة إنتاج الملابس المحلية
              </h2>

              <p className="text-slate-600 dark:text-slate-100 leading-7 text-[15px] md:text-[16px]">
                دراسة "سلسلة القيمة للملابس المحلية" تسلط الضوء على رحلة المنتجين الصغار في أمانة العاصمة،
                من التحديات إلى الفرص، وتطرح رؤية عملية لتطوير الجودة، وتوسيع الأسواق، وتعزيز حضور
                الملابس المحلية كمنافس قوي في السوق.
              </p>

              <div className="mt-2">
                <button type="button" className="btn btn-solid px-6 py-2 text-sm md:text-[15px]">
                  تحميل الدراسة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


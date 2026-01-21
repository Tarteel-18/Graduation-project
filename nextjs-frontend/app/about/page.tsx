import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Image from 'next/image'

export default function About() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة' },
            { label: 'من نحن' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            من نحن
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            تعرف على الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، رؤيتها ورسالتها وأهدافها وقيمها التي
            تخدم رواد الأعمال وأصحاب المشاريع الصغيرة.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10 space-y-10">
          {/* من نحن */}
          <section>
            <div className="about-card bg-[#E6F4F7] dark:bg-slate-700 rounded-3xl p-6 md:p-8 border border-[#EAF4F5] dark:border-slate-600" dir="rtl">
              <h2 className="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF] mb-3 flex items-center gap-2">
                <Image src="/assets/images/icon-hex.png" alt="" width={24} height={24} />
                من نحن
              </h2>
              <p className="text-slate-600 dark:text-slate-100 leading-7">
                تأسست الهيئة العامة لتنمية المشاريع الصغيرة والأصغر في مارس 2021 بهدف تنظيم وتنمية قطاع المشاريع الصغيرة...
              </p>
            </div>
          </section>

          {/* الرؤية والرسالة */}
          <section className="grid md:grid-cols-2 gap-6" dir="rtl">
            <div className="about-card bg-[#E6F4F7] dark:bg-slate-700 p-6 rounded-3xl border border-[#EAF4F5] dark:border-slate-600">
              <h3 className="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF] mb-3 flex items-center gap-2">
                <Image src="/assets/images/icon-hex.png" alt="" width={24} height={24} />
                الرؤية
              </h3>
              <p className="text-slate-600 dark:text-slate-100 leading-7">
                مجتمع منتج قادر على توظيف موارده بما يعزز الاقتصاد الوطني.
              </p>
            </div>

            <div className="about-card bg-[#E6F4F7] dark:bg-slate-700 p-6 rounded-3xl border border-[#D0E7EB] dark:border-slate-600">
              <h3 className="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF] mb-3 flex items-center gap-2">
                <Image src="/assets/images/icon-hex.png" alt="" width={24} height={24} />
                الرسالة
              </h3>
              <p className="text-slate-600 dark:text-slate-100 leading-7">
                تنمية المشاريع الصغيرة والأصغر من خلال توفير البيئة الداعمة...
              </p>
            </div>
          </section>

          {/* الأهداف */}
          <section>
            <div className="about-card bg-[#E6F4F7] dark:bg-slate-700 rounded-3xl p-6 md:p-8 border border-[#D0E7EB] dark:border-slate-600" dir="rtl">
              <h2 className="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF] mb-4 flex items-center gap-2">
                <Image src="/assets/images/icon-hex.png" alt="" width={24} height={24} />
                الأهداف
              </h2>
              <ol className="list-decimal pr-4 text-slate-600 dark:text-slate-100 leading-8">
                <li>توفير بيئة داعمة تساعد على تنمية المشاريع الصغيرة...</li>
                <li>وضع الاستراتيجيات والسياسات الوطنية الداعمة...</li>
                <li>نشر المعرفة بما يحقق الفاعلية والاستدامة...</li>
                <li>دعم نفاذ منتجات المشاريع الصغيرة...</li>
              </ol>
            </div>
          </section>

          {/* قيمنا */}
          <section className="mt-4" dir="rtl">
            <div className="about-card bg-[#E9F5F6] dark:bg-slate-700 rounded-[32px] px-10 py-8 border border-[#D8EDEE] dark:border-slate-600">
              <h3 className="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF] mb-6 flex items-center gap-2">
                <Image src="/assets/images/icon-hex.png" alt="" width={24} height={24} />
                قيمنا
              </h3>

              <div className="grid md:grid-cols-3 gap-y-16 gap-x-10">
                {[
                  { title: 'النزاهة', desc: 'تنفيذ كافة المهام والالتزامات بأمانة وصدق والالتزام بكل ما هو أخلاقي.' },
                  { title: 'الشفافية', desc: 'الإفصاح عن نتائج العمليات بشكل مستمر ومنتظم وتمكين الجميع من الحصول على المعلومات.' },
                  { title: 'المرونة', desc: 'القدرة على التكيّف مع المتغيرات لتحقيق أداء مستقر.' },
                  { title: 'الشمول', desc: 'وصول الخدمات المالية وغير المالية لكل المناطق والمحافظات.' },
                  { title: 'التكامل', desc: 'توحيد جهود العاملين لتحقيق سلسلة أهداف متكاملة.' },
                  { title: 'الابتكار', desc: 'تقديم حلول مبتكرة تدعم تطوير المشاريع الصغيرة والأصغر.' },
                ].map((value, i) => (
                  <div key={i} className="relative px-10 py-6 text-center">
                    <Image
                      src="/assets/images/value-corner.svg"
                      alt=""
                      width={32}
                      height={38}
                      className="absolute right-4 top-3"
                    />
                    <Image
                      src="/assets/images/value-corner.svg"
                      alt=""
                      width={32}
                      height={38}
                      className="absolute left-4 bottom-3 rotate-180"
                    />
                    <h3 className="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                      {value.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </BaseLayout>
  )
}


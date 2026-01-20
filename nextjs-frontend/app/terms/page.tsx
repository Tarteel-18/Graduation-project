import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function TermsPage() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سياسة الاستخدام' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            سياسة الاستخدام
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            يرجى قراءة شروط الاستخدام هذه بعناية قبل استخدام موقعنا. باستخدام الموقع، فإنك توافق على الالتزام بهذه الشروط.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="text-right space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                1. قبول الشروط
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                من خلال الوصول إلى هذا الموقع واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام الاستخدام هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، فيجب عليك عدم استخدام الموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                2. استخدام الموقع
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                يمكنك استخدام موقعنا للأغراض القانونية فقط. لا يجوز لك استخدام الموقع بأي طريقة قد تضر أو تعطل أو تضعف الموقع أو تتداخل مع استخدام أي شخص آخر للموقع.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                3. المحتوى
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                جميع المحتويات الموجودة على هذا الموقع، بما في ذلك النصوص والرسومات والصور والبرامج، هي ملك للهيئة العامة لتنمية المشاريع الصغيرة والأصغر ومحمية بموجب قوانين حقوق النشر.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                4. دقة المعلومات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                نسعى جاهدين لضمان دقة المعلومات على موقعنا، ولكننا لا نضمن اكتمالها أو دقتها. قد تحتوي المعلومات على أخطاء أو أخطاء مطبعية وقد يتم تحديثها في أي وقت دون إشعار.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                5. الروابط الخارجية
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن محتوى أو ممارسات الخصوصية لهذه المواقع الخارجية.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                6. التعديلات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                نحتفظ بالحق في تعديل أو تحديث شروط الاستخدام هذه في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة، ويستمر استخدامك للموقع بعد نشر التغييرات يشكل قبولك للشروط المعدلة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                7. الاتصال بنا
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا عبر البريد الإلكتروني: info@gasmed.gov.ye
              </p>
            </section>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


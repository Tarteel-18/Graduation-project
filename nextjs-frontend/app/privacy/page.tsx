import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function PrivacyPage() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'سياسة الخصوصية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            سياسة الخصوصية
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية. تشرح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="text-right space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                1. جمع المعلومات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                نجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل أو استخدام خدماتنا، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف والمعلومات الأخرى المطلوبة لتقديم الخدمات.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                2. استخدام المعلومات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                نستخدم المعلومات التي نجمعها لتقديم وتحسين خدماتنا، والرد على استفساراتك، وإرسال التحديثات المهمة المتعلقة بخدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                3. حماية المعلومات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                نتخذ إجراءات أمنية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                4. مشاركة المعلومات
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط مع شركائنا الموثوقين الذين يساعدوننا في تشغيل موقعنا أو تقديم خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                5. حقوقك
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها في أي وقت. يمكنك الاتصال بنا لممارسة هذه الحقوق.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                6. التغييرات على السياسة
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                قد نحدث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات مهمة عن طريق نشر السياسة الجديدة على هذه الصفحة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                7. الاتصال بنا
              </h2>
              <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر البريد الإلكتروني: info@gasmed.gov.ye
              </p>
            </section>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function StructurePage() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الهيكل التنظيمي' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            الهيكل التنظيمي
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            يتكون الهيكل التنظيمي للهيئة العامة لتنمية المشاريع الصغيرة والأصغر من عدة إدارات وأقسام تعمل بشكل متكامل لتحقيق أهداف الهيئة.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="text-right space-y-6">
            <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
              الهيكل التنظيمي للهيئة مصمم لضمان التكامل والتناسق في العمل بين مختلف الإدارات والأقسام، 
              مما يضمن تقديم خدمات متكاملة وفعالة لأصحاب المشاريع الصغيرة والأصغر في جميع أنحاء الجمهورية.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                الإدارات الرئيسية
              </h2>
              <ul className="list-disc pr-6 space-y-2 text-slate-700 dark:text-slate-200 leading-7">
                <li>إدارة التخطيط والتطوير</li>
                <li>إدارة البرامج والخدمات</li>
                <li>إدارة الشؤون المالية والإدارية</li>
                <li>إدارة العلاقات العامة والإعلام</li>
                <li>إدارة المتابعة والتقييم</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


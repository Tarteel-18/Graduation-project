import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'

export default function TeamPage() {
  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'عن الهيئة', href: '/about' },
            { label: 'الفريق التنفيذي' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            الفريق التنفيذي
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right">
            الفريق التنفيذي هو المسؤول عن تنفيذ السياسات والخطط التي يضعها مجلس الإدارة، ويشرف على العمليات اليومية للهيئة.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="text-right space-y-6">
            <p className="text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
              يتكون الفريق التنفيذي من مجموعة من المختصين والخبراء في مختلف المجالات، والذين يعملون على تنفيذ 
              برامج ومشاريع الهيئة بشكل يومي، وضمان تقديم أفضل الخدمات لأصحاب المشاريع الصغيرة والأصغر.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-4">
                مهام الفريق التنفيذي
              </h2>
              <ul className="list-disc pr-6 space-y-2 text-slate-700 dark:text-slate-200 leading-7">
                <li>تنفيذ السياسات والخطط المعتمدة من مجلس الإدارة</li>
                <li>إدارة العمليات اليومية للهيئة</li>
                <li>تنسيق العمل بين مختلف الإدارات والأقسام</li>
                <li>متابعة تنفيذ البرامج والمشاريع</li>
                <li>تقديم التقارير الدورية لمجلس الإدارة</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


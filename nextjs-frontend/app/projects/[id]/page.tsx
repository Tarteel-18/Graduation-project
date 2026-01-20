import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // In a real app, fetch project by ID from API
  const project = {
    id: params.id,
    title: 'مشروع تدريب المدربات في خياطة القطنيات بطرق صناعية',
    image: '/assets/images/project1.png',
    videoUrl: null,
    content: '<p>محتوى المشروع الكامل...</p>',
  }

  if (!project) {
    return (
      <BaseLayout>
        <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
          <div className="text-center text-slate-600 dark:text-slate-200">
            المشروع غير موجود.
          </div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشاريع', href: '/projects' },
            { label: project.title },
          ]}
        />

        <section className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="w-full rounded-[32px] overflow-hidden bg-black mb-8">
            {project.videoUrl ? (
              <video className="w-full h-[520px] object-cover" controls src={project.videoUrl}>
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={520}
                className="w-full h-[520px] object-cover"
              />
            )}
          </div>

          <div
            className="text-right text-[17px] leading-[2.2] text-slate-700 dark:text-slate-200 mb-8"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />

          <div className="mt-4">
            <Link href="/projects" className="btn-long-full">
              الرجوع لصفحة المشاريع
            </Link>
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}


import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'
import Image from 'next/image'

import projectImg from '@/public/assets/images/Training.png'

type Project = {
  id: string
  title: string
  image: string
  videoUrl?: string
  content: string
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'مشروع تدريب المدرّبات في خياطة القطنيات بطرق صناعية',
    image: projectImg.src,
    videoUrl: '/assets/videos/project-1.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يهدف هذا المشروع إلى تدريب مجموعة من المدربات في مجال خياطة القطنيات
        وفق أساليب حديثة وأقرب للطرق الصناعية، بما يساهم في تحسين جودة المنتجات
        وفتح فرص عمل جديدة للنساء في المجتمع.
      </p>
      <p class="mb-4">
        يشمل البرنامج التدريبي مراحل متعددة من التصميم، القص، الخياطة، التشطيب،
        بالإضافة إلى مهارات التسعير والتسويق وإدارة الطلبات.
      </p>
      <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-xl mt-6 mb-2">
        أهداف المشروع:
      </h3>
      <ul class="list-disc pr-6 space-y-1">
        <li>تمكين النساء من امتلاك مهارات مهنية مستدامة.</li>
        <li>رفع جودة المنتجات القطنية المحلية.</li>
        <li>خلق فرص دخل إضافية للأسر المستهدفة.</li>
      </ul>
    `,
  },
  {
    id: '2',
    title: 'مشروع دعم سلاسل الإمداد الغذائية',
    image: projectImg.src,
    videoUrl: '/assets/videos/project-2.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يستهدف هذا المشروع تحسين سلاسل الإمداد في القطاع الغذائي من خلال دعم
        المنتجين الصغار وربطهم بالأسواق المحلية والخارجية.
      </p>
      <p class="mb-4">
        يشمل المشروع تقديم استشارات فنية، تحسين أساليب التخزين والنقل، بالإضافة
        إلى دعم التسويق والتغليف بما يتناسب مع المعايير الحديثة.
      </p>
    `,
  },
  {
    id: '3',
    title: 'برنامج تمكين رواد الأعمال الشباب',
    image: projectImg.src,
    videoUrl: '/assets/videos/project-3.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يهدف البرنامج إلى تمكين الشباب من إطلاق مشاريعهم الخاصة عبر حزمة من
        الخدمات تشمل التدريب، التوجيه، وربطهم بفرص التمويل المتاحة.
      </p>
      <p class="mb-4">
        يتضمن البرنامج مخيمات ريادية، جلسات إرشاد فردية، ومسابقات لأفضل
        الأفكار والمشاريع الناشئة.
      </p>
    `,
  },
]

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projectsData.find((p) => p.id === String(id))

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
              <video 
                className="w-full h-[520px] object-cover" 
                controls 
                src={project.videoUrl}
                preload="metadata"
              >
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


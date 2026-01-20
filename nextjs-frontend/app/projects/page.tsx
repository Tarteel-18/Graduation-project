import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import ProjectCard from '@/components/ProjectCard'

export default function Projects() {
  const projects = [
    {
      title: 'مشروع تدريب المدربات في خياطة القطنيات بطرق صناعية',
      image: '/assets/images/project1.png',
      link: '/projects/1',
    },
    {
      title: 'دعم سلاسل الإمداد الغذائية',
      image: '/assets/images/project1.png',
      link: '/projects/2',
    },
    {
      title: 'برنامج تمكين رواد الأعمال',
      image: '/assets/images/project1.png',
      link: '/projects/3',
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'المشاريع' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
            مشاريع الهيئة
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
            تستعرض الهيئة أهم المشاريع المنفذة والمدعومة عبر برامج متنوعة في مختلف المحافظات.
          </p>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10">
          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={i} image={p.image} title={p.title} link={p.link} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


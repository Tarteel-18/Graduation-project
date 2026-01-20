import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import RadioCard from '@/components/RadioCard'

export default function MediaRadio() {
  const radios = [
    {
      id: 1,
      title: 'الحلقة الأولى',
      description: 'وصف الحلقة الإذاعية الأولى',
      audioUrl: '/assets/audio/episode1.mp3',
      main: true,
    },
    {
      id: 2,
      title: 'الحلقة الثانية',
      description: 'وصف الحلقة الإذاعية الثانية',
      audioUrl: '/assets/audio/episode2.mp3',
      main: false,
    },
    {
      id: 3,
      title: 'الحلقة الثالثة',
      description: 'وصف الحلقة الإذاعية الثالثة',
      audioUrl: '/assets/audio/episode3.mp3',
      main: false,
    },
  ]

  return (
    <BaseLayout>
      <div className="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'الحلقات الإذاعية' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-right">
            الحلقات الإذاعية
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10">
          <div className="flex flex-col gap-10">
            {radios.length > 0 && (
              <RadioCard
                title={radios[0].title}
                description={radios[0].description}
                audioUrl={radios[0].audioUrl}
                main={true}
              />
            )}

            {radios.slice(1).map((radio) => (
              <RadioCard
                key={radio.id}
                title={radio.title}
                description={radio.description}
                audioUrl={radio.audioUrl}
                main={false}
              />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


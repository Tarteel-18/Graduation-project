import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import MediaCard from '@/components/MediaCard'
import { successStories } from '@/data/successStories'

export default function MediaStories() {
  const stories = successStories.map((story, index) => ({
    id: index + 1,
    title: story.title,
    image: '/assets/images/STORY.png',
    link: `/media/stories/${story.slug}`,
  }))

  return (
    <BaseLayout>
      <div className="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
        <Breadcrumb
          items={[
            { label: 'الرئيسية', href: '/' },
            { label: 'قسم الإعلام والتوعية', href: '/media' },
            { label: 'قصص النجاح' },
          ]}
        />

        <div className="mx-auto max-w-[1300px] px-4 mb-6">
          <h1 className="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
            قصص النجاح
          </h1>
        </div>

        <div className="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px] border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-6 md:px-10 py-10">
          <div className="flex flex-col gap-8">
            {stories.map((story) => (
              <MediaCard key={story.id} title={story.title} image={story.image} link={story.link} />
            ))}
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}


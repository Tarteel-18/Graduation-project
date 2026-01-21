import BaseLayout from '@/components/BaseLayout'
import Breadcrumb from '@/components/Breadcrumb'
import FlashesCategoryLayout from '@/components/FlashesCategoryLayout'

export default async function MediaFlashesCategory({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  
  const CATEGORIES: Record<string, any> = {
    'home-industry': {
      breadcrumbLabel: 'فيديوهات توعوية (الصناعات المنزلية)',
      title: 'فيديوهات توعوية (الصناعات المنزلية)',
      description: 'مجموعة فيديوهات توضح خطوات الصناعات الغذائية المنزلية بطريقة آمنة وسهلة.',
      videos: [
        { id: 1, slug: 'cream-cheese', title: 'إنتاج الجبن السائل (الكريمي) في البيت', image: '/assets/images/home-vid-1.png' },
        { id: 2, slug: 'salty-cheese', title: 'إنتاج الجبن المالح في البيت', image: '/assets/images/home-vid-1.png' },
        { id: 3, slug: 'milk-powder', title: 'إنتاج الزبادي من الحليب البودرة في المنزل', image: '/assets/images/home-vid-1.png' },
        { id: 4, slug: 'apple-jam', title: 'إنتاج مربى التفاح الطبيعي في البيت', image: '/assets/images/home-vid-1.png' },
        { id: 5, slug: 'strawberry-jam', title: 'إنتاج مربى الفراولة الطبيعي في البيت', image: '/assets/images/home-vid-1.png' },
        { id: 6, slug: 'dry-tomato', title: 'تجفيف الطماطم خلال مواسم الوفرة', image: '/assets/images/home-vid-1.png' },
      ],
    },
    'animal-health': {
      breadcrumbLabel: 'فلاشات توعوية (الصحة الحيوانية)',
      title: 'فلاشات توعوية (الصحة الحيوانية)',
      description: 'مواد مرئية توعوية للحفاظ على صحة المواشي وتحسين الإنتاج.',
      videos: [
        { id: 1, slug: 'msg-1', title: 'رسالة توعوية لمربي المواشي 1', image: '/assets/images/home-vid-1.png' },
        { id: 2, slug: 'msg-2', title: 'رسالة توعوية لمربي المواشي 2', image: '/assets/images/home-vid-1.png' },
        { id: 3, slug: 'msg-3', title: 'رسالة توعوية لمربي المواشي 3', image: '/assets/images/home-vid-1.png' },
      ],
    },
    'learn-in-a-minute': {
      breadcrumbLabel: 'سلسلة تعلّم في دقيقة',
      title: 'سلسلة تعلّم في دقيقة',
      description: 'فيديوهات سريعة تسلط الضوء على مهارات ونصائح لأصحاب المشاريع الصغيرة.',
      videos: [
        { id: 1, slug: 'skill-1', title: 'مهارة 1', image: '/assets/images/home-vid-1.png' },
        { id: 2, slug: 'skill-2', title: 'مهارة 2', image: '/assets/images/home-vid-1.png' },
        { id: 3, slug: 'skill-3', title: 'مهارة 3', image: '/assets/images/home-vid-1.png' },
        { id: 4, slug: 'skill-4', title: 'مهارة 4', image: '/assets/images/home-vid-1.png' },
        { id: 5, slug: 'skill-5', title: 'مهارة 5', image: '/assets/images/home-vid-1.png' },
        { id: 6, slug: 'skill-6', title: 'مهارة 6', image: '/assets/images/home-vid-1.png' },
      ],
    },
  }

  const current = CATEGORIES[category] || CATEGORIES['home-industry']

  return (
    <BaseLayout>
      <FlashesCategoryLayout
        title={current.title}
        breadcrumbLabel={current.breadcrumbLabel}
        description={current.description}
        videos={current.videos}
        categorySlug={category}
      />
    </BaseLayout>
  )
}


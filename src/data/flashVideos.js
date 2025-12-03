// src/data/flashVideos.js
export const flashVideos = [
  // 🟦 فديوهات الصناعات المنزلية
  {
    category: 'home-industry',
    categoryLabel: 'فيديوهات توعوية (الصناعات المنزلية)',
    slug: 'strawberry-jam',
    title: 'إنتاج مربى الفراولة في البيت',
    videoUrl: '/videos/flash-home-strawberry.mp4',
    thumb:  require('@/assets/images/home-strawberry.jpg'),
    description:
      'شرح خطوات إعداد مربى الفراولة في المنزل مع مراعاة شروط الصحة والسلامة الغذائية.',
  },
  {
    category: 'home-industry',
    categoryLabel: 'فيديوهات توعوية (الصناعات المنزلية)',
    slug: 'cream-cheese',
    title: 'إنتاج الجبن السائل (الكريمي) في البيت',
    videoUrl: '/videos/flash-home-cream-cheese.mp4',
    thumb:  require('@/assets/images/home-cream-cheese.jpg'),
    description:
      'طريقة تحضير الجبن الكريمي في المنزل باستخدام مكونات بسيطة ومتوفرة.',
  },
  // ... كمّلي بنفس الشكل لبقية فديوهات الصناعات المنزلية

  // 🟩 فديوهات الصحة الحيوانية
  {
    category: 'animal-health',
    categoryLabel: 'فلاشات توعوية (الصحة الحيوانية)',
    slug: 'animal-nutrition',
    title: 'التغذية السليمة للمواشي',
    videoUrl: '/videos/flash-animal-nutrition.mp4',
    thumb:  require('@/assets/images/animal-nutrition.jpg'),
    description:
      'إرشادات حول تغذية المواشي بطريقة صحية تقلل الأمراض وتزيد الإنتاجية.',
  },
  // ... كمّلي لباقي فديوهات الصحة الحيوانية

  // 🟧 سلسلة تعلّم في دقيقة
  {
    category: 'learn-minute',
    categoryLabel: 'سلسلة تعلّم في دقيقة',
    slug: 'minute-entrepreneurship',
    title: 'مدخل إلى ريادة الأعمال في دقيقة',
    videoUrl: '/videos/flash-minute-entrepreneurship.mp4',
    thumb:  require('@/assets/images/minute-entrepreneurship.jpg'),
    description:
      'تعريف سريع بريادة الأعمال وأهميتها لأصحاب المشاريع الصغيرة.',
  },
  // ... بقية السلسلة
]

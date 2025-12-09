<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- ✅ Breadcrumb (نفس تواصل معنا بالألوان) -->
    <nav
      class="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm
             flex items-center gap-2 mb-4"
    >
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        الرئيسية
      </RouterLink>
      <span>›</span>
      <RouterLink
        to="/media"
        class="hover:text-[#165C75] dark:hover:text-cyan-300"
      >
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        الفلاشات التوعوية
      </span>
    </nav>

    <!-- ✅ العنوان + الوصف (بنفس نمط تواصل معنا، بدون وصف هنا لو مش محتاجة) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right"
      >
        الفلاشات التوعوية
      </h1>
    </div>

    <!-- ✅ الكارد الأبيض (عرض + مسافات مثل تواصل معنا) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <div class="flex flex-col gap-8">
        <MediaCard
          v-for="item in flashes"
          :key="item.id"
          :title="item.title"
          :image="item.image"
          :link="item.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MediaCard from '@/components/MediaCard.vue'

import img1 from '@/assets/images/flash-1.png'
import img2 from '@/assets/images/flash-1.png'
import img3 from '@/assets/images/flash-1.png'

const flashes = [
  {
    id: 1,
    title: 'فيديوهات توعوية (الصناعات المنزلية)',
    image: img1,
    link: '/media/flashes/home-industry',
  },
  {
    id: 2,
    title: 'فلاشات توعوية (الصحة الحيوانية)',
    image: img2,
    link: '/media/flashes/animal-health',
  },
  {
    id: 3,
    title: 'سلسلة تعلم في دقيقة',
    image: img3,
    link: '/media/flashes/learn-in-a-minute',
  },
]
</script>

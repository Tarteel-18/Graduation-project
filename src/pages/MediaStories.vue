<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- ✅ Breadcrumb (نفس فلاشات وتواصل معنا) -->
    <nav
      class="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm
             flex items-center gap-2 mb-4"
    >
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        الرئيسية
      </RouterLink>
      <span>›</span>
      <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        قصص النجاح
      </span>
    </nav>

    <!-- ✅ العنوان (نفس النمط) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right"
      >
        قصص النجاح
      </h1>
    </div>

    <!-- ✅ الكارد الأبيض (نفس فلاشات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <div class="flex flex-col gap-8">
        <MediaCard
          v-for="story in stories"
          :key="story.id"
          :title="story.title"
          :image="story.image"
          :link="story.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import MediaCard from '@/components/MediaCard.vue'

import story1 from '@/assets/images/flash-1.png'
import story2 from '@/assets/images/flash-1.png'
import story3 from '@/assets/images/flash-1.png'

const stories = [
  {
    id: 1,
    title: 'قصة أثر',
    image: story1,
    link: '/media/stories/story-1',
  },
  {
    id: 2,
    title: 'قصة ملهم',
    image: story2,
    link: '/media/stories/story-2',
  },
  {
    id: 3,
    title: 'مبادرة برايد كميونتي',
    image: story3,
    link: '/media/stories/story-3',
  },
]
</script>

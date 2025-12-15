<template>
   <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">

  <!-- Breadcrumb -->
  <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
    <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">المشاريع</span>
    </nav>
  </div>

  <!-- عنوان ووصف الصفحة -->
  <div class="mx-auto max-w-[1300px] px-4 mb-6">
    <h1
      class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right"
    >
      مشاريع الهيئة
    </h1>

    <p class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
      تستعرض الهيئة أهم المشاريع المنفذة والمدعومة عبر برامج متنوعة في مختلف المحافظات.
    </p>
  </div>


    <!-- 🟦 الكارد الأبيض (نفس صفحة الدراسات والشركاء 100%) -->
   <div
  class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
         border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10"
>
      <!-- GRID الكروت -->
      <div class="grid gap-8 md:grid-cols-3">
        <ProjectCard
          v-for="(p, i) in projects"
          :key="i"
          :image="p.image"
          :title="p.title"
          :link="p.link"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ProjectCard from '@/components/ProjectCard.vue'

import img1 from '@/assets/images/project1.png'
import img2 from '@/assets/images/project1.png'
import img3 from '@/assets/images/project1.png'

const projects = [
  {
    title: "مشروع تدريب المدربات في خياطة القطنيات بطرق صناعية",
    image: img1,
    link: "/projects/1"
  },
  {
    title: "دعم سلاسل الإمداد الغذائية",
    image: img2,
    link: "/projects/2"
  },
  {
    title: "برنامج تمكين رواد الأعمال",
    image: img3,
    link: "/projects/3"
  }
]
</script>

<style scoped>
</style>

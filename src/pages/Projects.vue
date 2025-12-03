<template>
  <!-- نفس عرض صفحة الخدمات / الشركاء -->
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">

    <!-- breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">المشاريع</span>
    </nav>

    <!-- عنوان الصفحة -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-4 text-right">
      مشاريع الهيئة
    </h1>

    <!-- وصف -->
    <p class="text-slate-600 leading-8 mb-8 max-w-[900px] text-right">
      تستعرض الهيئة أهم المشاريع المنفذة والمدعومة عبر برامج متنوعة في مختلف المحافظات.
    </p>

    <!-- 🟦 الكارد الأبيض (نفس صفحة الدراسات والشركاء 100%) -->
    <div
      class="bg-white rounded-[40px] border border-[#E5EDF0] shadow-sm p-10 max-w-[1300px] mx-auto"
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

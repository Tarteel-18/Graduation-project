<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">

   <!-- ✅ Breadcrumb -->
<div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
  <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
    <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
      الرئيسية
    </RouterLink>
    <span>›</span>
    <span class="text-[#000000] dark:text-cyan-300 font-semibold">
      قسم الإعلام والتوعية
    </span>
  </nav>
</div>

<!-- ✅ العنوان + الوصف -->
<div class="mx-auto max-w-[1300px] px-4 mb-6">
  <h1
    class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right"
  >
    قسم الإعلام والتوعية
  </h1>

  <p
    class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right"
  >
    تابع المواد الإعلامية المتنوعة من أخبار وفلاشات توعوية وحلقات إذاعية وقصص نجاح وأناشيد.
  </p>
</div>


    <!-- ✅ الكارد الأبيض + دارك مود -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

        <MediaCard
          v-for="item in mediaItems"
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
import { RouterLink } from "vue-router";
import MediaCard from "@/components/MediaCard.vue";

import img1 from "@/assets/images/training.jpg";
import img2 from "@/assets/images/training.jpg";
import img3 from "@/assets/images/training.jpg";
import img4 from "@/assets/images/training.jpg";
import img5 from "@/assets/images/training.jpg";

const mediaItems = [
  { id: 1, title: "الفلاشات التوعوية", image: img1, link: "/media/flashes" },
{ id: 2, title: "الأخبار", image: img2, link: "/news" },
  { id: 3, title: "الحلقات الإذاعية", image: img3, link: "/media/radio" },
  { id: 4, title: "قصص النجاح", image: img4, link: "/media/stories" },
  { id: 5, title: "الأناشيد", image: img5, link: "/media/nasheed" },
];
</script>

<style scoped>
</style>
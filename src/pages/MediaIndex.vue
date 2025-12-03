<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">
    <!-- 🧭 breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">قسم الإعلام والتوعية</span>
    </nav>

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-4 text-right">
      قسم الإعلام والتوعية
    </h1>

    <!-- وصف بسيط -->
    <p class="text-slate-600 leading-8 mb-8 max-w-[900px] text-right">
      تابع المواد الإعلامية المتنوعة من أخبار وفلاشات توعوية وحلقات إذاعية وقصص نجاح وأناشيد.
    </p>

    <!-- الكارد الأبيض العريض -->
    <div
      class="w-full bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-8 md:p-10"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  { id: 2, title: "الأخبار", image: img2, link: "/media/news" },
  { id: 3, title: "الحلقات الإذاعية", image: img3, link: "/media/radio" },
  { id: 4, title: "قصص النجاح", image: img4, link: "/media/stories" },
  { id: 5, title: "الأناشيد", image: img5, link: "/media/nasheed" },
];
</script>

<style scoped></style>

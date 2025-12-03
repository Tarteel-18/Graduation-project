<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">

    <!-- breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span>قسم الإعلام والتوعية</span>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">الفلاشات التوعوية</span>
    </nav>

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-6 text-right">
      الفلاشات التوعوية
    </h1>

    <!-- الكارد الأبيض العريض -->
    <div
      class="w-full bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm px-6 md:px-10 py-10"
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
import { RouterLink } from "vue-router";
import MediaCard from "@/components/MediaCard.vue";

import img1 from "@/assets/images/flash-1.png";
import img2 from "@/assets/images/flash-1.png";
import img3 from "@/assets/images/flash-1.png";

const flashes = [
  {
    id: 1,
    title: "فيديوهات توعوية (الصناعات المنزلية)",
    image: img1,
    link: "/media/flashes/home-industry",   // ✅ يفتح MediaFlashesHome.vue
  },
  {
    id: 2,
    title: "فلاشات توعوية (الصحة الحيوانية)",
    image: img2,
    link: "/media/flashes/animal-health",   // ✅ يفتح MediaFlashesAnimalHealth.vue
  },
  {
    id: 3,
    title: "سلسلة تعلم في دقيقة",
    image: img3,
    link: "/media/flashes/learn-in-a-minute", // ✅ يفتح MediaFlashesLearnMinute.vue
  },
];

</script>

<style scoped></style>

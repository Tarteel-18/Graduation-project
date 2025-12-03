<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">

    <!-- breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span>قسم الإعلام والتوعية</span>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">قصص النجاح</span>
    </nav>

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-6 text-right">
      قصص النجاح
    </h1>

    <!-- الكارد الأبيض العريض -->
    <div
      class="w-full bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm px-6 md:px-10 py-10"
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
import { RouterLink } from "vue-router";
import MediaCard from "@/components/MediaCard.vue";

import story1 from "@/assets/images/flash-1.png";
import story2 from "@/assets/images/flash-1.png";
import story3 from "@/assets/images/flash-1.png";

const stories = [
  {
    id: 1,
    title: "قصة أثر",
    image: story1,
    link: "/media/stories/story-1",
  },
  {
    id: 2,
    title: "قصة ملهم",
    image: story2,
    link: "/media/stories/story-2",
  },
  {
    id: 3,
    title: "مبادرة برايد كميونتي",
    image: story3,
    link: "/media/stories/story-3",
  },
];
</script>

<style scoped></style>

<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- 🧭 breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <RouterLink to="/media" class="hover:text-[#165C75]">
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
      <span class="text-[#1A1A1A] font-semibold">حلقات إذاعية</span>
    </nav>

    <!-- العنوان الرئيسي -->
<h1 class="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 text-right">
  الحلقات الإذاعية
</h1>

    <!-- 🟦 الكارد الأبيض (نفس عرض قسم الإعلام والتوعية = 1300px) -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm px-4 md:px-10 py-10"
    >
      <div class="flex flex-col gap-10">
        
        <!-- ⭐ الحلقة الرئيسية -->
        <div
          v-if="radios.length"
          class="bg-[#ECF6F7] rounded-[26px] border border-[#D8EDEE] shadow p-6"
        >
          <h2 class="text-[#165C75] text-xl md:text-2xl font-bold mb-2">
            {{ radios[0].title }}
          </h2>

          <p class="text-slate-600 mb-4">
            {{ radios[0].description }}
          </p>

          <audio controls class="w-full mt-3">
            <source :src="radios[0].audioUrl" type="audio/mpeg" />
          </audio>
        </div>

        <!-- ⭐ باقي الحلقات -->
        <div
          v-for="(item, idx) in radios.slice(1)"
          :key="item.id || idx"
          class="bg-[#ECF6F7] rounded-[26px] border border-[#D8EDEE] shadow p-6"
        >
          <h3 class="text-[#165C75] text-lg md:text-xl font-bold mb-2">
            {{ item.title }}
          </h3>

          <p class="text-slate-600 mb-4">
            {{ item.description }}
          </p>

          <audio controls class="w-full mt-3">
            <source :src="item.audioUrl" type="audio/mpeg" />
          </audio>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const radios = ref([
  {
    id: 1,
    title: "حلقة 1: نكتفي لنرتقي",
    description: "تسهيلات حكومية للمشاريع الصغيرة.",
    audioUrl: "/audio/episode1.mp3",
  },
  {
    id: 2,
    title: "حلقة 2: طريق النجاح",
    description: "تمكين رواد الأعمال وتحفيز المشاريع الإنتاجية.",
    audioUrl: "/audio/episode2.mp3",
  },
  {
    id: 3,
    title: "حلقة 3: وطن ينتج",
    description: "قصة نجاح ملهمة لمشروع صغير أصبح علامة تجارية.",
    audioUrl: "/audio/episode3.mp3",
  },
]);
</script>

<style scoped></style>

<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">

    <!-- ✅ Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          قسم الإعلام والتوعية
        </RouterLink>
        <span>›</span>
        <span class="text-[#165C75] dark:text-cyan-300 font-semibold">
          الحلقات الإذاعية
        </span>
      </nav>
    </div>

    <!-- ✅ العنوان -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-right">
        الحلقات الإذاعية
      </h1>
    </div>

    <!-- ✅ الكارد الأبيض -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-4 md:px-10 py-10"
    >
      <div class="flex flex-col gap-10">

        <!-- ⭐️ الحلقة الرئيسية -->
        <div
          v-if="radios.length"
          class="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px]
                 border border-[#D8EDEE] dark:border-slate-700 shadow p-6"
        >
          <h2 class="text-[#165C75] dark:text-cyan-300 text-xl md:text-2xl font-bold mb-2">
            {{ radios[0].title }}
          </h2>
          <p class="text-slate-600 dark:text-slate-300 mb-4">
            {{ radios[0].description }}
          </p>
          <audio controls class="w-full mt-3">
            <source :src="radios[0].audioUrl" type="audio/mpeg" />
          </audio>
        </div>

        <div
          v-for="(item, idx) in radios.slice(1)"
          :key="item.id || idx"
          class="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px]
                 border border-[#D8EDEE] dark:border-slate-700 shadow p-6"
        >
          <h3 class="text-[#165C75] dark:text-cyan-300 text-lg md:text-xl font-bold mb-2">
            {{ item.title }}
          </h3>
          <p class="text-slate-600 dark:text-slate-300 mb-4">
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

<style scoped>
</style>
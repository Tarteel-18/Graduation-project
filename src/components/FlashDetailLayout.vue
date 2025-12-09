<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb (توحيد ألوان ومسافات) -->
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
      <RouterLink to="/media/flashes" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        الفلاشات التوعوية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        {{ video.categoryLabel }}
      </span>
    </nav>

    <!-- 🟦 العنوان + الوصف (نفس تواصل معنا) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6 text-right">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3"
      >
        {{ video.title }}
      </h1>
      <p
        v-if="video.description"
        class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto"
      >
        {{ video.description }}
      </p>
    </div>

    <!-- 🟩 الكارد الأبيض للفلاش التوعوي (عرض ومسافات موحّدة) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-4 md:px-10 py-10"
    >
      <div
        class="max-w-[1100px] mx-auto bg-white dark:bg-slate-800 rounded-[26px]
               overflow-hidden shadow border border-[#E5EDF0] dark:border-slate-700"
      >
        <video
          class="w-full h-[380px] md:h-[460px] object-cover bg-black"
          controls
          :src="video.videoUrl"
        >
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        <div class="bg-[#D9EEF2] dark:bg-slate-700 px-4 py-5 text-center">
          <h2
            class="text-[#165C75] dark:text-cyan-300 font-bold text-xl leading-relaxed"
          >
            {{ video.title }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  video: {
    type: Object,
    required: true, // { title, description, videoUrl, categoryLabel, ... }
  },
})
</script>

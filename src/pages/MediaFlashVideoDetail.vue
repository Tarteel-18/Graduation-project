<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb (مثل تواصل معنا/الإعلام) -->
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
        {{ video?.categoryLabel }}
      </span>
    </nav>

    <!-- 🟦 العنوان + الوصف (نفس نمط تواصل معنا) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6 text-right">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3"
      >
        {{ video?.title }}
      </h1>

      <p
        v-if="video?.description"
        class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto"
      >
        {{ video.description }}
      </p>
    </div>

    <!-- 🟩 الكارد الأبيض (عرض/مسافات مثل بقية الصفحات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm px-6 md:px-10 py-10"
    >
      <!-- الفيديو -->
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-6">
        <video
          v-if="video"
          class="w-full h-[420px] object-cover"
          controls
          :src="video.videoUrl"
        >
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      </div>

      <!-- معلومات إضافية -->
      <div class="text-right space-y-2" v-if="video">
        <h2 class="text-xl font-bold text-[#165C75] dark:text-cyan-300">
          معلومات عن الفلاش التوعوي
        </h2>
        <p class="text-slate-700 dark:text-slate-200 leading-8">
          {{ video.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { flashVideos } from '@/data/flashVideos'

const route = useRoute()

const video = computed(() => {
  const category = route.params.category
  const slug = route.params.slug
  return flashVideos.find((v) => v.category === category && v.slug === slug)
})
</script>

<!-- src/pages/MediaFlashVideoDetail.vue -->
<template>
  <div class="bg-[#F8FBFC] pb-20">
    <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">
      <!-- 🧭 Breadcrumb -->
      <div class="mb-4">
        <nav class="text-slate-500 text-sm flex items-center gap-2">
          <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
          <span>›</span>
          <RouterLink to="/media" class="hover:text-[#165C75]">
            قسم الإعلام والتوعية
          </RouterLink>
          <span>›</span>
          <RouterLink to="/media/flashes" class="hover:text-[#165C75]">
            الفلاشات التوعوية
          </RouterLink>
          <span>›</span>
          <span class="text-[#165C75] font-semibold">
            {{ video?.categoryLabel }}
          </span>
        </nav>
      </div>

      <!-- 🟦 عنوان الصفحة -->
      <div class="mb-6 text-right">
        <h1 class="text-3xl font-bold text-[#165C75] mb-2">
          {{ video?.title }}
        </h1>
        <p v-if="video?.description"
           class="text-slate-600 text-lg leading-8 max-w-[900px]">
          {{ video.description }}
        </p>
      </div>

      <!-- 🟩 الكارد الأبيض (تصميم واحد لكل الفديوهات) -->
      <div
        class="bg-white rounded-[40px] border border-[#E5EDF0]
               shadow-sm p-6 md:p-10"
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

        <!-- معلومات إضافية (لو حبيتِ توسّعي لاحقاً) -->
        <div class="text-right space-y-2">
          <h2 class="text-xl font-bold text-[#165C75]">
            معلومات عن الفلاش التوعوي
          </h2>
          <p class="text-slate-700 leading-8">
            {{ video?.description }}
          </p>
        </div>
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
  return flashVideos.find(
    (v) => v.category === category && v.slug === slug
  )
})
</script>

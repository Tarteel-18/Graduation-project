<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb (موحّد الألوان والمسافات) -->
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
      <RouterLink to="/media/stories" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        قصص النجاح
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        {{ story?.title }}
      </span>
    </nav>

    <!-- العنوان + الوصف (نفس نمط تواصل معنا) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6 text-right">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3"
      >
        {{ story?.title }}
      </h1>
      <p
        v-if="story?.summary"
        class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto"
      >
        {{ story.summary }}
      </p>
    </div>

    <!-- الكارد الأبيض للفيديو والتفاصيل -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <!-- الفيديو -->
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-6">
        <video
          v-if="story"
          class="w-full h-[420px] object-cover"
          controls
          :src="story.videoUrl"
        >
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      </div>

      <!-- تفاصيل النص -->
      <div class="text-right space-y-2" v-if="story">
        <h2 class="text-xl font-bold text-[#165C75] dark:text-cyan-300">
          تفاصيل قصة النجاح
        </h2>
        <p class="text-slate-700 dark:text-slate-200 leading-8">
          {{ story.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { successStories } from '@/data/successStories'

const route = useRoute()

const story = computed(() =>
  successStories.find((s) => s.slug === route.params.slug)
)
</script>

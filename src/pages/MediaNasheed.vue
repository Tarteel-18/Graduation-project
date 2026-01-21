<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">

    <!-- ✅ Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          قسم الإعلام والتوعية
        </RouterLink>
        <span>›</span>
        <span class="text-[#165C75] dark:text-cyan-300 font-semibold">أناشيد</span>
      </nav>
    </div>

    <!-- ✅ العنوان -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-right">
        الأناشيد
      </h1>
    </div>

    <!-- ✅ الكارد الأبيض -->
    <div class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
                border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-10 py-10">

      <div class="max-w-[1100px] mx-auto bg-white dark:bg-slate-800 rounded-[26px]
                  overflow-hidden shadow border border-[#E5EDF0] dark:border-slate-700">

        <video class="w-full h-[380px] md:h-[460px] object-cover bg-black"
               controls :src="nasheed.videoUrl">
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        <div class="bg-[#D9EEF2] dark:bg-slate-700 px-4 py-5 text-center">
          <h2 class="text-[#165C75] dark:text-cyan-300 font-bold text-xl leading-relaxed">
            {{ nasheed.title }}
          </h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import splashVideo from '@/assets/videos/splash.mp4'

const nasheed = {
  id: 1,
  title: "كليب ربيعك يا طه (المولد النبوي الشريف)",
  videoUrl: splashVideo,
}
</script>
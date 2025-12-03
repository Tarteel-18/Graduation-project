<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- 🧭 Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/media" class="hover:text-[#165C75]">قسم الإعلام والتوعية</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">أناشيد</span>
      </nav>
    </div>

    <!-- 🟦 عنوان الصفحة -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#165C75] text-right">
        الأناشيد
      </h1>
    </div>

    <!-- 🟩 الكارد الأبيض الكبير -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm px-4 md:px-10 py-10"
    >

      <!-- 🎵 الفيديو مباشرة بدون بوستر -->
      <div
        class="max-w-[1100px] mx-auto bg-white rounded-[26px] overflow-hidden shadow
               border border-[#E5EDF0]"
      >

        <!-- الفيديو -->
        <video
          class="w-full h-[380px] md:h-[460px] object-cover bg-black"
          controls
          :src="nasheed.videoUrl"
        >
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        <!-- شريط العنوان الأزرق -->
        <div class="bg-[#D9EEF2] px-4 py-5 text-center">
          <h2 class="text-[#165C75] font-bold text-xl leading-relaxed">
            {{ nasheed.title }}
          </h2>
        </div>

      </div>
    </div>

  </div>
</template>

<<script setup>
import { RouterLink } from 'vue-router'

// 👇 استيراد الفيديو من مجلد assets
import splashVideo from '@/assets/videos/splash.mp4'

const nasheed = {
  id: 1,
  title: "كليب ربيعك يا طه (المولد النبوي الشريف)",
  videoUrl: splashVideo, // ← الآن يعمل 100% 
}
</script>


<style scoped></style>

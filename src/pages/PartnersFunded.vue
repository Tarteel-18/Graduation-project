<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          الرئيسية
        </RouterLink>
        <span>›</span>
        <RouterLink to="/about" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          عن الهيئة
        </RouterLink>
        <span>›</span>
        <RouterLink to="/partners" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          الشركاء
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          الشركاء الممولون
        </span>
      </nav>
    </div>

    <!-- العنوان -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right mb-3"
      >
        الشركاء الممولون
      </h1>
    </div>

    <!-- 🟦 الكارد الأبيض الكبير (مع الدارك) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm px-4 md:px-10 py-10 mb-10"
    >
      <!-- شبكة الشعارات -->
      <div
        class="max-w-[1100px] mx-auto grid md:grid-cols-3 gap-8 justify-items-center"
      >
        <div
          v-for="(logo, i) in logos"
          :key="i"
          class="partner-logo-card
                 bg-[#E6F3F5] dark:bg-slate-800
                 border border-[#D6E8EB] dark:border-slate-700
                 shadow-sm rounded-[32px]
                 p-8 flex items-center justify-center
                 w-full max-w-[260px] h-[200px]"
        >
          <img :src="logo" class="max-h-[140px] max-w-[90%] object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import logo1 from '@/assets/images/partner-ex-1.png'
import logo2 from '@/assets/images/partner-ex-1.png'
import logo3 from '@/assets/images/partner-ex-1.png'
import logo4 from '@/assets/images/partner-ex-1.png'
import logo5 from '@/assets/images/partner-ex-1.png'

const logos = [logo1, logo2, logo3, logo4, logo5]
</script>

<style scoped>
.partner-logo-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.partner-logo-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 36px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>

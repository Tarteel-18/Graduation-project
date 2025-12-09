<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- breadcrumb -->
    <nav
      class="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm
             flex items-center gap-2 mb-4"
    >
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        الرئيسية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        تواصل معنا
      </span>
    </nav>

    <!-- العنوان + الوصف -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right"
      >
        تواصل معنا
      </h1>

      <p
        class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right"
      >
        نحن هنا لدعمك والإجابة على استفساراتك حول المشاريع الصغيرة والأصغر.
        يسعدنا التواصل معك في حال كان لديك سؤال أو اقتراح.
      </p>
    </div>

    <!-- الكارد الأبيض -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- اتصل بنا -->
        <div class="box hover-card">
          <div class="icon-box ml-auto">
            <img :src="iconPhone" class="icon" />
          </div>
          <h3 class="title">اتصل بنا</h3>
          <p class="text">
            780040072 :رقم العلاقات العامة <br />
            780040073 :رقم الإعلام <br />
            783888781 :نافذة المقترحات
          </p>
        </div>

 <!-- نموذج تواصل -->
<div class="box hover-card flex items-center justify-between gap-3">
  <div class="flex flex-col text-right">
    <div class="icon-box ml-auto">
      <img :src="iconForm" class="icon" />
    </div>
    <h3 class="title flex items-center gap-2">
      نموذج تواصل
      <!-- سهم بسيط بدون خلفية -->
      <RouterLink
        :to="{ name: 'dynamic-form', params: { slug: 'contact-form' } }"
        class="text-[#27AEB9] hover:text-[#165C75] transition-colors"
        aria-label="فتح نموذج التواصل"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
    </h3>
    <p class="text">
      السبت – الأربعاء<br />
      8:00 صباحًا – 1:00 مساءً
    </p>
  </div>
</div>



        <!-- العنوان -->
        <div class="box hover-card">
          <div class="icon-box ml-auto">
            <img :src="iconLocation" class="icon" />
          </div>
          <h3 class="title">العنوان</h3>
          <p class="text">
            صنعاء – الدائري – جولة غزة (كنتاكي سابقاً) <br />
            عمارة المعتلي
          </p>
        </div>

        <!-- السوشال -->
        <div class="box hover-card">
          <div class="icon-box ml-auto">
            <img :src="iconSocial" class="icon" />
          </div>

          <h3 class="title">وسائل التواصل الاجتماعي</h3>

          <p class="text mb-3">
            حساباتنا الرسمية على مواقع التواصل
          </p>

          <div class="flex gap-3 justify-end">
            <slot name="social"></slot>
          </div>
        </div>

        <!-- البريد -->
        <div class="box hover-card">
          <div class="icon-box ml-auto">
            <img :src="iconEmail" class="icon" />
          </div>
          <h3 class="title">البريد الإلكتروني</h3>
          <p class="text">
            info@gasmed.gov.ye
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import iconForm from '@/assets/images/icon4.png'
import iconPhone from '@/assets/images/icon1.png'
import iconLocation from '@/assets/images/icon5.png'
import iconSocial from '@/assets/images/icon2.png'
import iconEmail from '@/assets/images/icon3.png'
</script>

<style scoped>
.box {
  @apply bg-[#ECF6F7] dark:bg-slate-800 rounded-3xl p-6 text-right
         shadow border border-[#D8EDEE] dark:border-slate-700
         transition-all duration-300;
}

/* هوفر موحّد مع بقية الكروت */
.hover-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 36px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}

.hover-card:active {
  transform: scale(0.97);
}

.icon-box {
  @apply w-14 h-14 rounded-full bg-white flex items-center justify-center mb-4;
}
.icon {
  @apply w-7 h-7;
}
.title {
  @apply text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2;
}
.text {
  @apply text-gray-700 dark:text-slate-200 leading-relaxed;
}
</style>

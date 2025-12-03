<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4">


    <!-- breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-4">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">اتصل بنا</span>
    </nav>

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-3">اتصل بنا</h1>

    <p class="text-gray-600 mb-10 leading-relaxed max-w-[850px]">
      نحن هنا لدعمك والإجابة على استفساراتك حول المشاريع الصغيرة والأصغر.
      يسعدنا التواصل معك في حال كان لديك سؤال أو اقتراح.
    </p>

    <!-- الكارد الأبيض (الآن بعرض الحاوية بالكامل) -->
    <div class="bg-white rounded-[40px] border border-[#E5EDF0] shadow-sm p-10 w-full">

      <!-- الكروت (3 في الصف) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <!-- كرت -->
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
        <div class="box hover-card">
          <div class="icon-box ml-auto">
            <img :src="iconForm" class="icon" />
          </div>
          <h3 class="title">نموذج تواصل</h3>
          <p class="text">
            السبت – الأربعاء<br />
            8:00 صباحًا – 1:00 مساءً
          </p>
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
  @apply bg-[#ECF6F7] rounded-3xl p-6 text-right shadow border border-[#D8EDEE] transition-all duration-300;
}

/* هوفر ناعم للكروت */
.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  border-color: #cfe7ea;
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
  @apply text-xl font-bold text-[#165C75] mb-2;
}
.text {
  @apply text-gray-700 leading-relaxed;
}
</style>

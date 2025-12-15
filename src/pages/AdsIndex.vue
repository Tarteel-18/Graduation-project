<template>
  <!-- بدون لون هنا، نخلي الخلفية من الـ layout العام -->
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- breadcrumb -->
    <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#0B4870] dark:hover:text-cyan-300">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">الإعلانات</span>
    </nav>

    <!-- عنوان -->
    <h1 class="text-2xl md:text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right">
      الإعلانات
    </h1>

    <!-- وصف خفيف -->
    <p class="text-slate-600 dark:text-slate-300 leading-8 mb-8 max-w-[900px] text-right">
      تابع أحدث الإعلانات المتعلقة بالتدريب، الفرص، والتعاقدات التي تعلن عنها الهيئة.
    </p>

    <!-- المربع الأبيض الكبير -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm px-5 md:px-8 py-8 mt-6"
    >
      <div class="grid gap-8 md:grid-cols-3">
        <AdvertisementCard
          v-for="item in ads"
          :key="item.id"
          :id="item.id"
          :image="item.image"
          :title="item.title"
          :desc="item.desc"
          :type="item.type"
          :date="item.date"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AdvertisementCard from '@/components/AdvertisementCard.vue'

import ad1 from '@/assets/images/news-1.jpg'
import ad2 from '@/assets/images/news-1.jpg'
import ad3 from '@/assets/images/news-1.jpg'

const ads = [
  {
    id: 1,
    type: 'تدريب',
    date: '15 أغسطس 2025',
    title: 'فرصة تدريب جديدة',
    desc: 'تطوير مهارات المشاركين في مجال التصنيع الغذائي وتمكينهم من دخول سوق العمل.',
    image: ad1,
  },
  {
    id: 2,
    type: 'تطوع',
    date: '15 أغسطس 2025',
    title: 'فرصة تطوع جديدة',
    desc: 'تعلن الهيئة العامة لتنمية المشاريع الصغيرة والأصغر عن فتح باب التطوع.',
    image: ad2,
  },
  {
    id: 3,
    type: 'تعاقد',
    date: '15 أغسطس 2025',
    title: 'فرصة تعاقد جديدة',
    desc: 'تعلن الهيئة رغبتها في التعاقد مع جهات لتنفيذ مشاريع جديدة.',
    image: ad3,
  },
]
</script>

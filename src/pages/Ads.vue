<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4">

    <!-- breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#0B4870]">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">الإعلانات</span>
    </nav>

    <!-- عنوان -->
    <h1 class="text-2xl md:text-3xl font-bold text-[#165C75] mb-3 text-right">
      الإعلانات
    </h1>

    <!-- وصف خفيف -->
    <p class="text-slate-600 leading-8 mb-8 max-w-[900px] text-right">
      تابع أحدث الإعلانات المتعلقة بالتدريب، الفرص، والتعاقدات التي تعلن عنها الهيئة.
    </p>

    <!-- المربع الأبيض الكبير (تم توسيعه مثل صفحة المشاريع) -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[32px] border border-[#E5EDF0]
             shadow-sm px-5 md:px-8 py-8"
    >

      <!-- شبكة الإعلانات -->
      <div class="grid gap-8 md:grid-cols-3">

        <!-- الكومبوننت -->
        <AdvertisementCard
          v-for="(item, idx) in ads"
          :key="idx"
          :image="item.image"
          :title="item.title"
          :desc="item.desc"
          :type="item.type"
          :date="item.date"
          :link="item.link"
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
    type: "تدريب",
    date: "15 أغسطس 2025",
    title: "فرصة تدريب جديدة",
    desc: "تطوير مهارات المشاركين في مجال التصنيع الغذائي وتمكينهم من دخول سوق العمل.",
    image: ad1,
    link: "/ads/1",
  },
  {
    type: "تطوع",
    date: "15 أغسطس 2025",
    title: "فرصة تطوع جديدة",
    desc: "تعلن الهيئة العامة لتنمية المشاريع الصغيرة والأصغر عن فتح باب التطوع.",
    image: ad2,
    link: "/ads/2",
  },
  {
    type: "تعاقد",
    date: "15 أغسطس 2025",
    title: "فرصة تعاقد جديدة",
    desc: "تعلن الهيئة رغبتها في التعاقد مع جهات لتنفيذ مشاريع جديدة.",
    image: ad3,
    link: "/ads/3",
  },

]
</script>

<style scoped>
</style>

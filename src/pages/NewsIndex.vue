<template>
 <div
  class="mx-auto max-w-[1300px] px-4 mt-12 pb-24"
  dir="rtl"
>
  <!-- 🧭 breadcrumb -->
  <div class="mx-auto max-w-[1300px] px-4 mt-4 mb-4">
    <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
      <span>›</span>
      <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">الأخبار</span>
      
    </nav>
  </div>

  <!-- العنوان + الوصف -->
  <div class="mx-auto max-w-[1300px] px-4 mb-6">
    <h1
      class="text-3xl font-bold text-[#000000] dark:text-cyan-300
             mb-3 text-right"
    >
      الأخبار
    </h1>
    <p
      class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed
             max-w-[850px] text-right"
    >
      تابع آخر أخبار وبرامج الهيئة العامة لتنمية المشاريع الصغيرة والأصغر،
      والفعاليات والأنشطة التي تُنَفَّذ لخدمة رواد الأعمال وأصحاب المشاريع.
    </p>
  </div>



    <!-- الكارد الأبيض الكبير -->
    <div
      class="mx-auto max-w-[1300px]
             bg-white dark:bg-slate-900
             rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm p-6 md:p-10"
    >
      <!-- شبكة الأخبار -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard
          v-for="(item, idx) in news"
          :key="idx"
          :title="item.title"
          :desc="item.desc"
          :date="item.date"
          :image="item.image"
          :link="item.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import NewsCard from '@/components/NewsCard.vue'

// استيراد الصور
import img1 from '@/assets/images/news-1.jpg'
import img2 from '@/assets/images/news-1.jpg'
import img3 from '@/assets/images/news-1.jpg'

const news = [
  {
    id: 1,
    title: 'خبر جديد 1',
    desc: 'نص مختصر عن محتوى الخبر الأول نص تجريبي بسيط...',
    date: '١ ديسمبر ٢٠٢٥',
    image: img1,
    link: '/news/1',
  },
  {
    id: 2,
    title: 'خبر جديد 2',
    desc: 'نص مختصر عن محتوى الخبر الثاني نص تجريبي بسيط...',
    date: '٢ ديسمبر ٢٠٢٥',
    image: img2,
    link: '/news/2',
  },
  {
    id: 3,
    title: 'خبر جديد 3',
    desc: 'نص مختصر عن محتوى الخبر الثالث نص تجريبي بسيط...',
    date: '٣ ديسمبر ٢٠٢٥',
    image: img3,
    link: '/news/3',
  },
]
</script>

<style scoped></style>

<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">
    <!-- لو الخبر غير موجود -->
    <div v-if="!newsItem" class="text-center text-slate-500 dark:text-slate-400 mt-20">
      لم يتم العثور على الخبر المطلوب.
    </div>

    <template v-else>
     <!-- breadcrumb -->
<nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mb-6">
  <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
  <span>›</span>
      <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
  <RouterLink to="/news" class="hover:text-[#165C75] dark:hover:text-cyan-300">الأخبار</RouterLink>
  <span>›</span>
  <span class="text-[#000000] dark:text-cyan-300 font-semibold">
    {{ newsItem.title }}
  </span>
</nav>


      <!-- الكارد الأبيض العريض -->
      <div
        class="mx-auto max-w-[1300px]
               bg-white dark:bg-slate-900
               rounded-[32px]
               border border-[#E5EDF0] dark:border-slate-700
               shadow-sm p-8 md:p-10"
      >
        <!-- الكارد الداخلي السماوي -->
        <div
          class="bg-[#ECF6F7] dark:bg-slate-800
                 rounded-[26px]
                 border border-[#D8EDEE] dark:border-slate-700
                 shadow p-8 md:p-10"
        >
          <!-- العنوان + التاريخ -->
          <h1 class="text-3xl font-bold text-[#165C75] dark:text-cyan-300 mb-3 text-right">
            {{ newsItem.title }}
          </h1>

          <p class="text-slate-600 dark:text-slate-300 mb-6 text-right text-[15px]">
            التاريخ: {{ newsItem.date }} | الموقع: {{ newsItem.location }}
          </p>

          <!-- الصورة -->
          <img
            :src="newsItem.image"
            :alt="newsItem.title"
            class="w-full h-[380px] object-cover rounded-[22px] mb-10"
          />

          <!-- نص الخبر الكامل -->
          <section class="mb-8">
            <p class="text-slate-700 dark:text-slate-200 text-lg leading-8 text-right">
              {{ newsItem.fullText }}
            </p>
          </section>

          <!-- زر رجوع -->
          <div class="flex justify-center mt-8">
            <RouterLink to="/news" class="w-full md:w-[260px]">
              <button
                class="w-full bg-[#27AEB9] text-white py-3.5 rounded-xl text-lg
                       hover:bg-[#1d8b94] dark:hover:bg-cyan-500 transition"
              >
                العودة إلى الأخبار
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

import img1 from '@/assets/images/news-1.jpg'
import img2 from '@/assets/images/news-1.jpg'
import img3 from '@/assets/images/news-1.jpg'

const route = useRoute()
const id = Number(route.params.id)

const allNews = [
  {
    id: 1,
    date: '10 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'الهيئة تختتم أسبوع التمويل بمشاركة أكثر من 60 جهة ممولة',
    image: img1,
    fullText:
      'نص كامل مفصل عن الخبر الأول... يمكنك لاحقاً جلب هذا النص من الـ API بدلاً من كتابته هنا.',
  },
  {
    id: 2,
    date: '12 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'إطلاق برنامج دعم رواد الأعمال في المحافظات',
    image: img2,
    fullText:
      'نص كامل مفصل عن الخبر الثاني... هنا تعرض التفاصيل الكاملة للبرنامج والفعاليات المرتبطة به.',
  },
  {
    id: 3,
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'توقيع مذكرة تعاون مع عدد من الشركاء',
    image: img3,
    fullText:
      'نص كامل مفصل عن الخبر الثالث... مثلاً تفاصيل الاتفاقية والشركاء المستهدفين.',
  },
]

const newsItem = computed(() => allNews.find((n) => n.id === id))
</script>

<style scoped></style>

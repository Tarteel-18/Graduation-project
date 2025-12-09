<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb (نفس تواصل معنا) -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          الرئيسية
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          روج لمشروعك
        </span>
      </nav>
    </div>

    <!-- 🟦 العنوان + الزر (ألوان ومسافات موحدة) -->
    <div
      class="mx-auto max-w-[1300px] px-4 mb-6 flex items-center justify-between gap-4 flex-wrap"
    >
      <div class="text-right">
        <h1
          class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3"
        >
          روج لمشروعك
        </h1>
        <p
          class="text-gray-600 dark:text-slate-300 mb-0 leading-relaxed max-w-[850px]"
        >
          منصة لعرض وتسويق منتجات المشاريع الصغيرة والأصغر.
        </p>
      </div>

      <button
        @click="goToPromoteForm"
        class="bg-[#165C75] text-white px-6 py-3 rounded-xl font-semibold text-[15px]
               hover:bg-[#124c60] whitespace-nowrap
               dark:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors"
      >
        سجل الآن لترويج مشروعك
      </button>
    </div>

    <!-- 🟦 الكارد الأبيض الموحد مثل صفحة الخدمات -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10"
    >
      <div class="max-w-[1100px] mx-auto space-y-10">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-[#E9F4F5] dark:bg-slate-800 rounded-[30px]
                 border border-[#D0E6E8] dark:border-slate-700
                 shadow-sm overflow-hidden"
        >
          <!-- الصورة -->
          <div class="relative">
            <img
              :src="post.imageLeft"
              class="w-full h-[260px] md:h-[320px] object-cover"
            />
          </div>

          <!-- المحتوى النصي -->
          <div class="px-8 py-6 text-right">
            <h2
              class="text-lg md:text-xl text-[#165C75] dark:text-cyan-300 font-bold mb-3 leading-relaxed"
            >
              {{ post.title }}
            </h2>

            <div
              class="grid gap-2 text-[14px] md:text-[15px] text-slate-700 dark:text-slate-200"
            >
              <p>
                <span
                  class="font-semibold text-[#165C75] dark:text-cyan-300"
                  >الجهة / المالك:</span
                >
                <span class="mr-1">{{ post.owner }}</span>
              </p>

              <p>
                <span
                  class="font-semibold text-[#165C75] dark:text-cyan-300"
                  >التصنيف:</span
                >
                <span class="mr-1">{{ post.type }}</span>
              </p>

              <p v-if="post.links">
                <span
                  class="font-semibold text-[#165C75] dark:text-cyan-300"
                  >روابط التواصل:</span
                >
                <span class="mr-1 break-all">{{ post.links }}</span>
              </p>

              <p
                class="text-slate-500 dark:text-slate-400 text-[13px] mt-1"
              >
                <span
                  class="font-semibold text-[#165C75] dark:text-cyan-300"
                  >التاريخ:</span
                >
                <span class="mr-1">{{ post.date }}</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

const posts = [
  {
    id: 1,
    date: '08 أغسطس 2025',
    title:
      'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
    owner: 'أم يوسف',
    type: 'تسويق',
    links: '@@@@@@s',
    imageLeft:
      'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg',
  },
  {
    id: 2,
    date: '08 أغسطس 2025',
    title:
      'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
    owner: 'أم يوسف',
    type: 'تسويق',
    links: '@@@@@@s',
    imageLeft:
      'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg',
  },
]

function goToPromoteForm() {
  const target = { name: 'dynamic-form', params: { slug: 'promote-project' } }

  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
      // نخزن الهدف كـ href كامل، مش بس string ثابت
      query: { redirect: router.resolve(target).href },
    })
  } else {
    router.push(target)
  }
}

</script>

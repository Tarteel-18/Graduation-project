<template>
  <div class="bg-[#F8FBFC] pb-24 pt-10" dir="rtl">

    <!-- 🧭 Breadcrumb -->
    <div class="max-w-[1280px] mx-auto px-6 mb-6">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">روج لمشروعك</span>
      </nav>
    </div>

    <!-- 🟦 العنوان + الزر -->
    <div class="max-w-[1280px] mx-auto px-6 flex items-center justify-between mb-10 gap-4 flex-wrap">
      <div>
        <h1 class="text-3xl font-bold text-[#165C75] mb-2">
          روج لمشروعك
        </h1>
        <p class="text-slate-600 text-lg leading-8">
          منصة لعرض وتسويق منتجات المشاريع الصغيرة والأصغر.
        </p>
      </div>

      <button
        @click="goToPromoteForm"
        class="bg-[#165C75] text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-[#124c60] whitespace-nowrap"
      >
        سجل الآن لترويج مشروعك
      </button>
    </div>

    <!-- 🟩 بوستات المشاريع بدون الكارد الأبيض -->
    <!-- 🟩 بوستات المشاريع بكارد سماوي بنفس عرض الكارد الأبيض القديم -->
<div
  class="max-w-[1300px] mx-auto px-6 bg-[#E9F4F5] rounded-[40px]
         border border-[#D0E6E8] shadow-sm p-10"
>
  <div class="max-w-[1100px] mx-auto space-y-10">

    <article
      v-for="post in posts"
      :key="post.id"
      class="bg-white/60 rounded-[30px] border border-[#D0E6E8]
             shadow-sm overflow-hidden"
    >
      <!-- الصورة + البادج -->
      <div class="relative">
        <img
          :src="post.imageLeft"
          class="w-full h-[260px] md:h-[320px] object-cover"
        />

        <!-- بادج التصنيف -->
        <div
          class="absolute top-4 right-4 bg-[#165C75]/90 text-white text-xs
                 px-3 py-1 rounded-full shadow-sm"
        >
          {{ post.category }}
        </div>
      </div>

      <!-- المحتوى النصي -->
      <div class="px-8 py-6 text-right">

        <h2 class="text-lg md:text-xl text-[#165C75] font-bold mb-3 leading-relaxed">
          {{ post.title }}
        </h2>

        <div class="grid gap-2 text-[14px] md:text-[15px] text-slate-700">

          <p>
            <span class="font-semibold text-[#165C75]">الجهة / المالك:</span>
            <span class="mr-1">{{ post.owner }}</span>
          </p>

          <p>
            <span class="font-semibold text-[#165C75]">التصنيف:</span>
            <span class="mr-1">{{ post.type }}</span>
          </p>

          <p v-if="post.links">
            <span class="font-semibold text-[#165C75]">روابط التواصل:</span>
            <span class="mr-1 break-all">{{ post.links }}</span>
          </p>

          <p class="text-slate-500 text-[13px] mt-1">
            <span class="font-semibold text-[#165C75]">التاريخ:</span>
            <span class="mr-1">{{ post.date }}</span>
          </p>

        </div>

      </div>
    </article>

  </div>
</div>


  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

const posts = [
  {
    id: 1,
    category: 'منتجات حرفية يمنية',
    date: '08 أغسطس 2025',
    title: 'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
    owner: 'أم يوسف',
    type: 'تسويق',
    links: '@@@@@@s',
    imageLeft: 'https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg',
  },
  {
    id: 2,
    category: 'منتجات حرفية يمنية',
    date: '08 أغسطس 2025',
    title: 'منتجات يدوية تقليدية مصنوعة بأيدي محلية. نبيع سلات، مفارش وأعمال فنية.',
    owner: 'أم يوسف',
    type: 'تسويق',
    links: '@@@@@@s',
    imageLeft: 'https://images.pexels.com/photos/256576/pexels-photo-256576.jpeg',
  },
]

function goToPromoteForm() {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
      query: { redirect: '/forms/promote-project' },
    })
  } else {
    router.push({
      name: 'dynamic-form',
      params: { slug: 'promote-project' },
    })
  }
}
</script>

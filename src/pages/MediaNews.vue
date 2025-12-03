<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- 🧭 breadcrumb (نفس خدمات) -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">الأخبار</span>
      </nav>
    </div>

    <!-- 🔹 العنوان + وصف بسيط -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#1A1A1A] mb-2 text-right">
        الأخبار
      </h1>
      <p class="text-slate-600 text-lg leading-8 w-full md:w-[85%] text-right">
        تابع آخر أخبار وبرامج الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، 
        والفعاليات والأنشطة التي تُنَفَّذ لخدمة رواد الأعمال وأصحاب المشاريع.
      </p>
    </div>

    <!-- 🟦 الكارد الأبيض الكبير الموحد (نفس صفحة الخدمات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-6 md:p-10"
    >
      <!-- شبكة الأخبار -->
      <div class="grid md:grid-cols-2 gap-10">
        <div
          v-for="(item, idx) in news"
          :key="idx"
          class="bg-white rounded-[26px] border border-[#D8EDEE] shadow p-5
                 hover:shadow-md transition duration-300 cursor-pointer"
        >
          <!-- الصورة -->
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-[200px] rounded-[18px] object-cover mb-4"
          />

          <!-- النص -->
          <h3 class="text-[#165C75] text-xl font-bold mb-2">
            {{ item.title }}
          </h3>

          <p class="text-slate-600 leading-relaxed text-[15px] mb-3">
            {{ item.desc }}
          </p>

          <!-- رابط قراءة المزيد -->
          <RouterLink
            :to="item.link"
            class="text-[#27AEB9] font-semibold hover:underline"
          >
            قراءة المزيد →
          </RouterLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink } from "vue-router"

// استيراد الصور
import img1 from "@/assets/images/news-1.jpg"
import img2 from "@/assets/images/news-1.jpg"
import img3 from "@/assets/images/news-1.jpg"

const news = [
  {
    title: "خبر جديد 1",
    desc: "نص مختصر عن محتوى الخبر...",
    image: img1,
    link: "/news/1"
  },
  {
    title: "خبر جديد 2",
    desc: "نص مختصر عن محتوى الخبر...",
    image: img2,
    link: "/news/2"
  },
  {
    title: "خبر جديد 3",
    desc: "نص مختصر عن محتوى الخبر...",
    image: img3,
    link: "/news/3"
  }
]
</script>

<style scoped></style>

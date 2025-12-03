<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav
        class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2"
      >
        <RouterLink
          to="/"
          class="hover:text-[#165C75] dark:hover:text-cyan-300"
        >
          الرئيسية
        </RouterLink>
        <span>›</span>
        <span class="text-[#165C75] dark:text-cyan-300 font-semibold">
          الخدمات
        </span>
      </nav>
    </div>

    <!-- Page Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#1A1A1A] dark:text-slate-50 mb-2 text-right"
      >
        خدمات الهيئة
      </h1>
      <p
        class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right"
      >
        في الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، نعمل على تقديم مجموعة
        متكاملة من الخدمات التي تهدف إلى دعم أصحاب المشاريع في جميع المراحل.
      </p>
    </div>

    <!-- 🟦 الكارد الأبيض الموحد -->
    <div
      class="mx-auto max-w-[1300px]
             bg-white dark:bg-slate-900
             rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm p-10"
    >
      <!-- GRID: 3 كروت -->
      <div class="grid md:grid-cols-3 gap-x-6 gap-y-8 justify-items-center">
        <RouterLink
          v-for="service in services"
          :key="service.id"
          :to="service.link"
          class="bg-[#E9F5F6] dark:bg-slate-800
                 border border-[#D8EDEE] dark:border-slate-700
                 rounded-[20px]
                 p-5 shadow-sm hover:shadow-md
                 transition-all duration-300
                 w-full flex flex-col gap-3 cursor-pointer block"
        >
          <!-- صورة -->
          <img
            :src="service.image"
            class="w-full h-[140px] object-cover rounded-[14px]"
          />

          <!-- عنوان -->
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg">
            {{ service.title }}
          </h3>

          <!-- وصف (مع break-words) -->
          <p
            class="text-slate-600 dark:text-slate-300
                   leading-7 text-[15px] break-words"
          >
            {{ service.desc }}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const services = [
  {
    id: 1,
    image: '/assets/images/logo.png',
    title: 'خدمة التدريب',
    desc: 'تقدم الهيئة برامج تدريبية متخصصة تهدف إلى تطوير مهارات رواد الأعمال...',
    link: '/services/training',
  },
  {
    id: 2,
    image: '/assets/services/marketing.jpg',
    title: 'خدمة التسويق',
    desc: 'نسعى لتسويق منتجات المشاريع الصغيرة عبر المعارض والفعاليات...',
    link: '/services/marketing',
  },
  {
    id: 3,
    image: '/assets/services/funding.jpg',
    title: 'خدمة التمويل',
    desc: 'تقدم الهيئة قروضاً بيضاء عبر الجمعيات الشريكة لدعم المشاريع...',
    link: '/services/funding',
  },
  {
    id: 4,
    image: '/assets/services/consulting.jpg',
    title: 'خدمة الاستشارات',
    desc: 'نقدم استشارات متخصصة تساعد أصحاب المشاريع على النمو...',
    link: '/services/consulting',
  },
]
</script>

<style scoped>
</style>
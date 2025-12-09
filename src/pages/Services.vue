<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- Breadcrumb -->
<div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
  <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
    <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
      الرئيسية
    </RouterLink>
    <span>›</span>
    <span class="text-[#000000] dark:text-cyan-300 font-semibold">
      الخدمات
    </span>
  </nav>
</div>

<!-- Page Title -->
<div class="mx-auto max-w-[1300px] px-4 mb-6">
  <h1
    class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3 text-right"
  >
    خدمات الهيئة
  </h1>

  <p
    class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] text-right"
  >
    في الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، نعمل على تقديم مجموعة متكاملة من الخدمات
    التي تهدف إلى دعم أصحاب المشاريع في جميع المراحل.
  </p>
</div>


    <!-- الكارد الأبيض الموحد -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm p-10"
    >
      <div class="grid md:grid-cols-3 gap-x-6 gap-y-8 justify-items-center">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :image="service.image"
          :title="service.title"
          :desc="service.desc"
          :link="service.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ServiceCard from '@/components/ServiceCard.vue'

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
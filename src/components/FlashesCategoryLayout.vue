<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- 🧭 Breadcrumb (نفس نمط تواصل معنا/الإعلام) -->
    <nav
      class="mx-auto max-w-[1300px] px-4 text-slate-500 dark:text-slate-400 text-sm
             flex items-center gap-2 mb-4"
    >
      <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        الرئيسية
      </RouterLink>
      <span>›</span>
      <RouterLink to="/media" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        قسم الإعلام والتوعية
      </RouterLink>
      <span>›</span>
      <RouterLink to="/media/flashes" class="hover:text-[#165C75] dark:hover:text-cyan-300">
        فلاشات توعوية
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        {{ breadcrumbLabel }}
      </span>
    </nav>

    <!-- 🟦 العنوان + الوصف (نفس تواصل معنا) -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6 text-right">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-3"
      >
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-[850px] ml-auto"
      >
        {{ description }}
      </p>
    </div>

    <!-- 🟩 الكارد الأبيض الكبير (نفس العرض والمسافات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm px-6 md:px-10 py-10"
    >
      <!-- شبكة الفيديوهات -->
      <div class="grid md:grid-cols-2 gap-8">
        <RouterLink
          v-for="video in videos"
          :key="video.id"
          :to="{
            name: 'media-flash-detail',
            params: { category: categorySlug, slug: video.slug }
          }"
          class="group relative rounded-3xl overflow-hidden
                 bg-slate-900/80 shadow-sm border border-[#E3EFF1] dark:border-slate-700
                 hover:shadow-xl hover:-translate-y-1
                 transition-all duration-300 block"
        >
          <!-- الخلفية (الصورة) -->
          <img
            :src="video.image"
            :alt="video.title"
            class="w-full h-[260px] md:h-[280px] object-cover
                   group-hover:scale-105 transition-transform duration-500"
          />

          <!-- طبقة التعتيم + أيقونة التشغيل -->
          <div
            class="absolute inset-0 bg-black/35 group-hover:bg-black/45
                   flex flex-col justify-between"
          >
            <!-- أعلى: مدة -->
            <div class="flex justify-end items-start p-3 text-xs text-white/80">
              <span
                v-if="video.duration"
                class="px-2 py-1 rounded-full bg-black/40 backdrop-blur"
              >
                {{ video.duration }}
              </span>
            </div>

            <!-- منتصف: أيقونة تشغيل -->
            <div class="flex-1 flex items-center justify-center">
              <div
                class="w-14 h-14 rounded-full bg-white/90 text-[#165C75]
                       flex items-center justify-center
                       shadow-lg group-hover:scale-110 group-hover:shadow-2xl
                       transition-transform duration-300"
              >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M9 7v10l8-5-8-5Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            <!-- أسفل: عنوان الفيديو -->
            <div class="p-4 pt-3 pb-2 bg-gradient-to-t from-black/60 to-black/0">
              <h3
                class="text-white font-bold text-xl md:text-2xl leading-8 line-clamp-2
                       group-hover:text-[#7BD4FF] transition-colors mb-0"
              >
                {{ video.title }}
              </h3>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  breadcrumbLabel: { type: String, required: true },
  description: { type: String, default: '' },
  // videos: [{id,title,image,slug,duration?}]
  videos: { type: Array, required: true },
  categorySlug: { type: String, required: true },
})
</script>

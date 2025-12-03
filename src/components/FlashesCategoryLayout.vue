<template>
  <div class="bg-[#F8FBFC] pb-20">
    <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

      <!-- 🧭 Breadcrumb -->
      <div class="mx-auto max-w-[1300px] px-4 mt-4 mb-4">
        <nav class="text-slate-500 text-sm flex items-center gap-2">
          <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
          <span>›</span>
          <RouterLink to="/media" class="hover:text-[#165C75]">
            قسم الإعلام والتوعية
          </RouterLink>
          <span>›</span>
          <RouterLink to="/media/flashes" class="hover:text-[#165C75]">
            فلاشات توعوية
          </RouterLink>
          
          <span>›</span>
          <span class="text-[#165C75] font-semibold">
            {{ breadcrumbLabel }}
          </span>
        </nav>
      </div>

      <!-- 🟦 عنوان الصفحة (يمين زي ما تحبي) -->
      <div class="mx-auto max-w-[1300px] px-4 mb-6 text-right">
        <h1 class="text-3xl font-bold text-[#165C75] mb-2">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="text-slate-600 text-lg leading-8 w-full md:w-[80%] ml-auto"
        >
          {{ description }}
        </p>
      </div>

      <!-- 🟩 الكارد الأبيض الكبير -->
      <div
        class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
               shadow-sm p-6 md:p-10"
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
            class="bg-white rounded-[32px] border border-[#E3EFF1] shadow-sm
                   overflow-hidden cursor-pointer hover:shadow-md
                   transition-shadow duration-200 block"
          >
            <!-- البوستر -->
            <div class="w-full h-[260px] md:h-[280px] overflow-hidden">
              <img
                :src="video.image"
                :alt="video.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- شريط العنوان السماوي -->
            <div class="bg-[#D9F2F4] px-6 py-4 flex items-center justify-center">
              <h3
                class="text-[#165C75] text-lg md:text-xl font-bold leading-8 text-center"
              >
                {{ video.title }}
              </h3>
            </div>
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: { type: String, required: true },
  breadcrumbLabel: { type: String, required: true },
  description: { type: String, default: '' },
  videos: { type: Array, required: true }, // [{id,title,image,slug}]
  categorySlug: { type: String, required: true }, // 👈 جاي من MediaFlashesCategory.vue
})
</script>

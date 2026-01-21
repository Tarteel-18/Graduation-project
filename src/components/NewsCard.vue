<template>
  <RouterLink
    :to="link"
    class="ad-card group rounded-[24px] overflow-hidden
           bg-[#E9F5F6] dark:bg-slate-800
           border border-[#D8EDEE] dark:border-slate-700
           flex flex-col text-right"
  >
    <!-- الصورة -->
    <img
      :src="image"
      :alt="title"
      class="w-full h-[190px] object-cover"
    />

    <!-- النص + الزر -->
    <div class="p-5 flex-1 flex flex-col gap-2">
      <!-- التاريخ (اختياري) -->
      <p
        v-if="date"
        class="text-xs text-[#165C75] dark:text-cyan-300 font-semibold opacity-80"
      >
        التاريخ: {{ date }}
      </p>

      <!-- العنوان -->
      <h2 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg leading-snug">
        {{ title }}
      </h2>

      <!-- الوصف -->
      <p class="text-slate-600 dark:text-slate-200 text-sm leading-relaxed line-clamp-3">
        {{ desc }}
      </p>

      <!-- الزر -->
      <RouterLink
        :to="link"
        class="btn btn-solid w-full mt-4"
      >
        معرفة المزيد
      </RouterLink>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  date:  { type: String, default: '' },
  image: { type: String, required: true },
  link:  { type: [String, Object], required: true },
})
</script>

<style scoped>
.ad-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.ad-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>

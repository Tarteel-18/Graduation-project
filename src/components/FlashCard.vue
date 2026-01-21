<template>
  <RouterLink
    :to="link"
    class="group flex items-center justify-between gap-4
           rounded-[22px] px-5 py-4
           bg-gradient-to-l from-[#E0F4F7] to-[#F4FCFD]
           dark:from-slate-800 dark:to-slate-900
           border border-[#D8EDEE] dark:border-slate-700
           shadow-sm hover:shadow-md
           transition-all duration-300 hover:-translate-y-1"
  >
    <!-- النص -->
    <div class="flex flex-col text-right">
      <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-1">
        {{ title }}
      </h3>
      <p class="text-slate-600 dark:text-slate-300 text-sm">
        {{ subtitle }}
      </p>
    </div>

    <!-- الأيقونة الدائرية -->
    <div
      class="w-12 h-12 rounded-2xl flex items-center justify-center
             bg-[#27AEB9] text-white
             group-hover:scale-110 group-hover:rotate-3
             transition-transform duration-300"
    >
      <slot name="icon">
        <!-- أيقونة افتراضية -->
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.8" />
        </svg>
      </slot>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: String,
  subtitle: {
    type: String,
    default: '',
  },
  link: {
    type: [String, Object],
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="link"
    class="group rounded-[24px] overflow-hidden bg-[#E9F5F6]
           border border-[#D8EDEE] shadow-sm hover:shadow-md
           transition-all duration-300 flex flex-col"
  >
    <!-- الصورة -->
    <img
      :src="image"
      :alt="title"
      class="w-full h-[190px] object-cover"
    />

    <!-- النص + الزر -->
    <div class="p-4 flex-1 flex flex-col gap-2 text-right">
      <p class="text-xs text-[#165C75] font-semibold opacity-80">
        نوع: {{ type }} | التاريخ: {{ date }}
      </p>

      <h2 class="text-[#165C75] font-bold text-lg leading-snug">
        {{ title }}
      </h2>

      <p class="text-slate-600 text-sm leading-relaxed line-clamp-3">
        {{ desc }}
      </p>

      <!-- زر معرفة المزيد بنفس اللون — انحناء فقط -->
      <button
        class="mt-4 bg-[#27AEB9] text-white w-full py-3
               rounded-[16px] text-[15px] font-semibold
               hover:opacity-90 transition"
      >
        معرفة المزيد
      </button>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  image: String,
  title: String,
  desc: String,
  date: String,
  type: String,
  link: String,
});
</script>

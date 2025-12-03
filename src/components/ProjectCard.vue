<template>
  <RouterLink
    :to="link"
    class="group rounded-[24px] overflow-hidden bg-white
           border border-[#DEDFE1] shadow-sm hover:shadow-md
           transition-all duration-300 block"
  >
    <!-- صورة المشروع -->
    <div class="relative w-full h-[250px]">
      <img
        :src="image"
        class="w-full h-full object-cover"
      />

      <!-- عتمة فوق الصورة -->
      <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

      <!-- عنوان المشروع في المنتصف -->
      <div class="absolute inset-0 flex items-center justify-center px-6 text-center">
        <h2 class="text-white text-xl font-bold leading-relaxed">
          {{ title }}
        </h2>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  image: String,
  title: String,
  link: String,
});
</script>

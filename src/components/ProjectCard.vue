<template>
  <RouterLink
    :to="link"
    class="project-card group rounded-[24px] overflow-hidden bg-white
           border border-[#DEDFE1] shadow-sm block"
  >
    <!-- صورة المشروع -->
    <div class="relative w-full h-[250px]">
      <img
        :src="image"
        class="w-full h-full object-cover"
      />

      <!-- عتمة فوق الصورة -->
      <div
        class="absolute inset-0 bg-black/35
               transition-all duration-300
               group-hover:bg-black/55"
      ></div>

      <!-- عنوان المشروع في المنتصف -->
      <div
        class="absolute inset-0 flex items-center justify-center px-6 text-center
               transition-transform duration-300
               translate-y-2 group-hover:translate-y-0"
      >
        <h2 class="text-white text-xl font-bold leading-relaxed">
          {{ title }}
        </h2>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  image: String,
  title: String,
  link: String,
})
</script>

<style scoped>
.project-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>

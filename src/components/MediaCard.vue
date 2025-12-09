<template>
  <RouterLink
    :to="link"
    class="media-card relative rounded-[24px] overflow-hidden group cursor-pointer h-[230px]"
  >
    <!-- الصورة -->
    <img
      :src="image"
      :alt="title"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <div
      class="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300"
    ></div>

    <!-- النص -->
    <div class="absolute inset-0 flex items-center justify-center z-10">
      <h2 class="text-white text-2xl font-bold tracking-wide">
        {{ title }}
      </h2>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: String,
  image: String,
  link: String,
})
</script>

<style scoped>
.media-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.media-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
}
</style>

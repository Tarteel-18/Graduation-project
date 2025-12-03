<template>
  <RouterLink
    :to="link"
    class="relative rounded-[24px] overflow-hidden group cursor-pointer h-[230px]"
  >
    <!-- الصورة -->
    <img
      :src="image"
      :alt="title"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <!-- التعتيم -->
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
import { RouterLink } from "vue-router";

defineProps({
  title: String,
  image: String,
  link: String,
});
</script>

<style scoped></style>

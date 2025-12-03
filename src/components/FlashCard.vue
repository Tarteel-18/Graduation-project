<!-- src/components/FlashCard.vue -->
<template>
  <RouterLink
    :to="link"
    class="group block rounded-[26px] overflow-hidden shadow bg-white
           hover:shadow-lg transition"
  >
    <div class="relative">
      <!-- الصورة -->
      <img
        :src="image"
        :alt="title"
        class="w-full h-[260px] object-cover"
      />

      <!-- الطبقة الغامقة + العنوان -->
      <div
        class="absolute inset-0 bg-black/40 flex items-center justify-center
               group-hover:bg-black/50 transition"
      >
        <h2
          class="text-white text-2xl md:text-3xl font-bold tracking-wide"
        >
          {{ title }}
        </h2>
      </div>
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

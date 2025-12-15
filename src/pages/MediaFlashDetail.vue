<template>
  <FlashDetailLayout v-if="video" :video="video" />
  <div v-else class="text-center text-slate-600 dark:text-slate-300 py-20">
    الفلاش غير موجود.
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FlashDetailLayout from '@/components/FlashDetailLayout.vue'
import { flashVideos } from '@/data/flashVideos' // نفس الملف اللي تستخدمه للقائمة

const route = useRoute()

const video = computed(() => {
  const category = route.params.category
  const slug = route.params.slug
  return flashVideos.find(
    (v) => v.category === category && v.slug === slug
  )
})
</script>

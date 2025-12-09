<template>
  <BaseLayout>
    <!-- يظهر فقط لو الانتقال بطئ -->
    <AppLoader v-if="showLoader" />
    <RouterView />
  </BaseLayout>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import BaseLayout from './layouts/BaseLayout.vue'
import AppLoader from '@/components/AppLoader.vue'

const router = useRouter()
const showLoader = ref(false)
let timerId = null

router.beforeEach((to, from, next) => {
  // لا نعرضه في صفحة السبلاش
  if (to.name === 'splash') {
    showLoader.value = false
    next()
    return
  }

  showLoader.value = false
  clearTimeout(timerId)

  // لو التحميل عدّى 600ms ولسّه ما خلص الانتقال، أظهر اللودنق
  timerId = setTimeout(() => {
    showLoader.value = true
  }, 600)

  next()
})

router.afterEach(() => {
  // أول ما تكمّل الصفحة نخفي اللودنق ونلغي المؤقت
  clearTimeout(timerId)
  setTimeout(() => {
    showLoader.value = false
  }, 100) // وقت صغير لتفادي فلاش سريع
})
</script>

<template>
  <BaseLayout>
    <!-- يظهر فقط لو الانتقال بطئ -->
    <AppLoader v-if="showLoader" />

    <!-- إخفاء الفوتر في صفحة البروفايل عبر prop لليّاوت -->
    <RouterView />
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import BaseLayout from './layouts/BaseLayout.vue'
import AppLoader from '@/components/AppLoader.vue'

const router = useRouter()
const route = useRoute()

const showLoader = ref(false)
let timerId = null

// لو حاب تستخدم هذا computed داخل BaseLayout عبر prop:
const isProfilePage = computed(() => route.name === 'profile')

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
  clearTimeout(timerId)
  setTimeout(() => {
    showLoader.value = false
  }, 100)
})
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center relative overflow-hidden">
    <video
      ref="videoEl"
      class="w-full h-full object-cover"
      :src="splashVideo"
      autoplay
      muted
      playsinline
      disablepictureinpicture
      controlslist="nodownload noplaybackrate noremoteplayback"
    ></video>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import splashVideo from '@/assets/videos/splash.mp4'

const router = useRouter()
const videoEl = ref(null)
let timeoutId = null

onMounted(() => {
  // اقفل السكورل فقط أثناء السبلاش
  document.body.style.overflow = 'hidden'

  timeoutId = setTimeout(() => {
    router.replace({ name: 'home' })
  }, 6000)

  if (videoEl.value) {
    videoEl.value.onended = () => {
      clearTimeout(timeoutId)
      router.replace({ name: 'home' })
    }
  }
})

onBeforeUnmount(() => {
  if (timeoutId) clearTimeout(timeoutId)
  // رجّع السكورل طبيعي
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ما نحتاج أي overflow هنا */
</style>


<template>
  <!-- الغلاف الرئيسي للموقع كله -->
  <div
    class="min-h-screen flex flex-col
           bg-[#F6F9F9] dark:bg-[#020617]
           text-slate-800 dark:text-slate-100
           transition-colors duration-300"
  >
    <!-- الهيدر -->
    <AppHeader v-if="!hideChrome" />

    <!-- محتوى الصفحات -->
    <main
      class="min-h-[70vh] flex-1 pb-24"
      :class="hideChrome ? '' : 'pt-14'"
    >
      <slot />
    </main>

    <!-- الفوتر -->
    <AppFooter v-if="!hideChrome" />

    <!-- الشات -->
    <ChatWidget v-if="!hideChrome" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import ChatWidget from '../components/ChatWidget.vue'

const route = useRoute()

// ✅ الصفحات اللي نخبّي فيها الهيدر + الفوتر + الشات
const hideChrome = computed(() => {
  const noLayoutPaths = ['/login', '/register']
  const byPath = noLayoutPaths.includes(route.path)
  const byMeta = route.meta.hideLayout === true   // هنا نقرأ meta من الراوتر
  return byPath || byMeta
})
</script>

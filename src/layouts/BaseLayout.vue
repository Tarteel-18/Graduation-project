<template>
  <!-- الغلاف الرئيسي للموقع كله -->
  <div
    class="min-h-screen flex flex-col
           bg-[#F6F9F9] dark:bg-[#020617]
           text-slate-800 dark:text-slate-100
           transition-colors duration-300"
  >
    <!-- الهيدر (مخفي في السبلاش فقط) -->
    <AppHeader v-if="!isSplash" />

    <!-- محتوى الصفحات -->
    <main
      class="min-h-[70vh] flex-1 pb-24"
      :class="isSplash ? '' : 'pt-14'"
    >
      <slot />
    </main>

    <!-- الفوتر: مخفي في البروفايل والسبلاش -->
    <AppFooter v-if="!hideFooter" />

    <!-- الشات: مخفي في السبلاش فقط -->
    <ChatWidget v-if="!isSplash" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import ChatWidget from '../components/ChatWidget.vue'

const route = useRoute()

// صفحة السبلاش (عدّل المسار لو مختلف)
const isSplash = computed(() => route.path === '/splash')

// إخفاء الفوتر في البروفايل والسبلاش
const hideFooter = computed(() =>
  route.path === '/profile' || isSplash.value
)
</script>

<template>
  <!-- الغلاف الرئيسي للموقع كله -->
  <div
    class="min-h-screen flex flex-col
           bg-[#F6F9F9] dark:bg-[#020617]
           text-slate-800 dark:text-slate-100
           transition-colors duration-300"
  >
    <!-- الهيدر -->
    <AppHeader v-if="!isNoChrome" />

    <!-- محتوى الصفحات -->
    <main
      class="min-h-[70vh] flex-1 pb-24"
      :class="isNoChrome ? '' : 'pt-14'"
    >
      <slot />
    </main>

    <!-- الفوتر: مخفي في البروفايل وكل صفحات noChrome -->
    <AppFooter v-if="!hideFooter" />

    <!-- الشات -->
    <ChatWidget v-if="!isNoChrome" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import ChatWidget from '../components/ChatWidget.vue'

const route = useRoute()

// الصفحات اللي تريد تخفي فيها الهيدر + الفوتر + الشات
const noChromePaths = ['/splash', '/login', '/register']

// كل ما كان المسار من نوع /form/... اعتبره بدون واجهة
const isFormPage = computed(() => route.path.startsWith('/form/'))

const isNoChrome = computed(
  () => noChromePaths.includes(route.path) || isFormPage.value
)

// إخفاء الفوتر في البروفايل + كل صفحات noChrome
const hideFooter = computed(
  () => route.path === '/profile' || isNoChrome.value
)
</script>


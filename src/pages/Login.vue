<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-[#F6F9F9] dark:bg-slate-950
           py-10 transition-colors duration-300"
  >
    <div
      class="bg-white dark:bg-slate-900 shadow-xl rounded-[32px]
             px-10 py-10 w-full max-w-[650px]
             border border-[#DDE7EA] dark:border-slate-700"
    >
      <!-- اللوجو -->
      <div class="text-center mb-6">
        <img src="@/assets/logo.png" alt="logo" class="mx-auto h-20 mb-3" />
        <h1 class="text-3xl font-bold text-[#165C75] dark:text-cyan-300">
          تسجيل الدخول
        </h1>
      </div>

      <!-- فورم -->
      <form class="space-y-6" @submit.prevent="onSubmit">
        <!-- حقل الايميل -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="البريد الإلكتروني"
            class="w-full border border-[#BFD0D3] dark:border-slate-600
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-slate-100
                   rounded-xl py-3 pr-12 pl-4 text-right
                   focus:border-[#165C75] dark:focus:border-cyan-400
                   outline-none transition-colors duration-200"
          />
          <img
            src="@/assets/icons/mail.png"
            class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        <!-- حقل كلمة المرور -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            placeholder="كلمة المرور"
            class="w-full border border-[#BFD0D3] dark:border-slate-600
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-slate-100
                   rounded-xl py-3 pr-12 pl-12 text-right
                   focus:border-[#165C75] dark:focus:border-cyan-400
                   outline-none transition-colors duration-200"
          />
          <img
            src="@/assets/icons/lock.png"
            class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        <p class="text-left text-sm text-[#165C75] dark:text-cyan-300 cursor-pointer hover:underline">
          هل نسيت كلمة المرور؟
        </p>

        <!-- زر تسجيل الدخول -->
        <button
          type="submit"
          class="w-full bg-[#165C75] hover:bg-[#0e4257]
                 text-white py-3 rounded-xl text-lg font-semibold
                 transition-colors duration-200"
        >
          تسجيل الدخول
        </button>

        <!-- زر إنشاء حساب -->
        <div class="text-center mt-2">
          <span class="text-gray-600 dark:text-slate-300 text-sm">ليس لديك حساب؟</span>
          <RouterLink
            to="/register"
            class="text-[#165C75] dark:text-cyan-300 font-semibold hover:underline text-sm ml-1"
          >
            إنشاء حساب
          </RouterLink>
        </div>

        <div class="flex items-center gap-4 my-3">
          <div class="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
          <span class="text-gray-500 dark:text-slate-300">او</span>
          <div class="flex-1 h-px bg-gray-300 dark:bg-slate-700"></div>
        </div>

        <!-- تسجيل بوسائل أخرى -->
        <div class="flex justify-center gap-6 text-4xl">
          <img src="@/assets/icons/google.png" class="w-10 cursor-pointer">
          <img src="@/assets/icons/facebook.png" class="w-10 cursor-pointer">
          <img src="@/assets/icons/apple.png" class="w-10 cursor-pointer">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const showPass = ref(false)
const email = ref('')
const password = ref('')

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

function onSubmit() {
  login()
  localStorage.setItem('token', 'demo-token')
  const redirect = route.query.redirect || { name: 'home' }
  router.push(redirect)
}
</script>

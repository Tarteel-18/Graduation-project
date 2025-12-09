<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F6F9F9] py-10">

    <div class="bg-white shadow-xl rounded-[32px] px-10 py-10 w-full max-w-[650px]">

      <!-- اللوجو -->
      <div class="text-center mb-6">
        <img src="@/assets/logo.png" alt="logo" class="mx-auto h-20 mb-3" />
        <h1 class="text-[#165C75] text-3xl font-bold">تسجيل الدخول</h1>
      </div>

      <!-- فورم -->
      <form class="space-y-6" @submit.prevent="onSubmit">

        <!-- حقل الايميل -->
        <div class="relative">
          <input
            v-model="email"
            type="email"
            placeholder="البريد الإلكتروني"
            class="w-full border border-[#BFD0D3] rounded-xl py-3 pr-12 pl-4 text-right focus:border-[#165C75] outline-none"
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
            class="w-full border border-[#BFD0D3] rounded-xl py-3 pr-12 pl-12 text-right focus:border-[#165C75] outline-none"
          />

          <img
            src="@/assets/icons/lock.png"
            class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        <p class="text-left text-sm text-[#165C75] cursor-pointer hover:underline">
          هل نسيت كلمة المرور؟
        </p>

        <!-- زر تسجيل الدخول -->
        <button
          type="submit"
          class="w-full bg-[#165C75] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#0e4257]"
        >
          تسجيل الدخول
        </button>

        <!-- زر إنشاء حساب -->
        <div class="text-center mt-2">
          <span class="text-gray-600 text-sm">ليس لديك حساب؟</span>
          <RouterLink
            to="/register"
            class="text-[#165C75] font-semibold hover:underline text-sm ml-1"
          >
            إنشاء حساب
          </RouterLink>
        </div>

        <div class="flex items-center gap-4 my-3">
          <div class="flex-1 h-px bg-gray-300"></div>
          <span class="text-gray-500">او</span>
          <div class="flex-1 h-px bg-gray-300"></div>
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
  // استدعاء منطق الأوث (لو عندك)
  login()

  // حفظ توكن تجريبي يكفي ليمر حارس الراوتر
  localStorage.setItem('token', 'demo-token')

  // الرجوع إما للصفحة المطلوبة (مثلاً الفورم) أو الرئيسية
  const redirect = route.query.redirect || { name: 'home' }
  router.push(redirect)
}
</script>


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
          إنشاء حساب
        </h1>
      </div>

      <!-- الفورم -->
      <form class="space-y-6" @submit.prevent="onSubmit">
        <!-- الاسم الكامل -->
        <div class="relative">
          <input
            type="text"
            placeholder="الاسم الكامل"
            class="w-full border border-[#BFD0D3] dark:border-slate-600
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-slate-100
                   rounded-xl py-3 pr-12 pl-4 text-right
                   focus:border-[#165C75] dark:focus:border-cyan-400
                   outline-none transition-colors duration-200"
          />
          <img
            src="@/assets/icons/user.png"
            class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        <!-- البريد الإلكتروني -->
        <div class="relative">
          <input
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

        <!-- رقم الهاتف -->
        <div class="relative">
          <input
            type="tel"
            placeholder="رقم الهاتف"
            class="w-full border border-[#BFD0D3] dark:border-slate-600
                   bg-white dark:bg-slate-800
                   text-slate-900 dark:text-slate-100
                   rounded-xl py-3 pr-12 pl-4 text-right
                   focus:border-[#165C75] dark:focus:border-cyan-400
                   outline-none transition-colors duration-200"
          />
          <img
            src="@/assets/icons/phone.png"
            class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-60"
          />
        </div>

        <!-- كلمة المرور -->
        <div class="relative">
          <input
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

        <!-- تأكيد كلمة المرور -->
        <div class="relative">
          <input
            :type="showPass2 ? 'text' : 'password'"
            placeholder="تأكيد كلمة المرور"
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

        <!-- زر التسجيل -->
        <button
          type="submit"
          class="w-full bg-[#165C75] hover:bg-[#0e4257]
                 text-white py-3 rounded-xl text-lg font-semibold
                 transition-colors duration-200"
        >
          إنشاء حساب
        </button>

        <!-- رابط تسجيل الدخول -->
        <div class="text-center mt-2">
          <span class="text-gray-600 dark:text-slate-300 text-sm">لديك حساب بالفعل؟</span>
          <RouterLink
            to="/login"
            class="text-[#165C75] dark:text-cyan-300 font-semibold hover:underline text-sm ml-1"
          >
            تسجيل الدخول
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const showPass = ref(false)
const showPass2 = ref(false)

const router = useRouter()

const onSubmit = () => {
  router.push('/login')
}
</script>

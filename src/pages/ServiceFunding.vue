<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/services" class="hover:text-[#000000] dark:hover:text-cyan-300">الخدمات</RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">خدمة التمويل</span>
      </nav>
    </div>

    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#165C75] dark:text-cyan-300 mb-2 text-right">
        خدمة التمويل
      </h1>
      <p class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
        من خلال خدمة التمويل، توفر الهيئة قروضاً بيضاء ميسّرة عبر الجمعيات الشريكة
        لدعم تمويل المشاريع الصغيرة والأصغر ورفع قدرتها على التوسع والاستدامة.
      </p>
    </div>

    <section
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-8">
        <img
          :src="fundImg"
          alt="خدمة التمويل"
          class="w-full h-[420px] object-cover"
        />
      </div>

      <section class="mb-8 text-right">
        <h2 class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
          نبذة عن خدمة التمويل
        </h2>
        <p class="text-slate-700 dark:text-slate-200 text-[17px] leading-[2.2]">
          تقدم الهيئة خدمات التمويل عبر قروض بيضاء بدون فوائد وبشروط ميسّرة
          من خلال الجمعيات الشريكة المعتمدة، بهدف تمكين المشاريع من
          بدء أو توسيع نشاطها وتحقيق أثر اقتصادي واجتماعي مستدام.
        </p>
      </section>

      <section class="mb-8 text-right">
        <h3 class="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
          مميزات التمويل
        </h3>
        <ul class="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
          <li>قروض بدون فوائد (بيضاء).</li>
          <li>شروط سداد ميسّرة تتناسب مع طبيعة المشروع.</li>
          <li>متابعة وإرشاد بعد التمويل لضمان استدامة المشروع.</li>
        </ul>
      </section>

      <div class="mt-4 flex justify-center">
        <button
          type="button"
         class="btn-long-full "
          @click="goToRegisterForm"
        >
          اطلب الخدمة
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import fundImg from '@/assets/images/training.jpg'

const router = useRouter()
const { isLoggedIn } = useAuth()

function goToRegisterForm() {
  const target = '/form/small-project-register'
  if (!isLoggedIn.value) {
    router.push({ name: 'login', query: { redirect: target } })
  } else {
    router.push(target)
  }
}
</script>

<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/services" class="hover:text-[#165C75] dark:hover:text-cyan-300">الخدمات</RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">خدمة التسويق</span>
      </nav>
    </div>

    <!-- عنوان مختصر -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
        خدمة التسويق
      </h1>
      <p class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
        من خلال خدمة التسويق، تسعى الهيئة لدعم أصحاب المشاريع الصغيرة في الوصول
        إلى العملاء المستهدفين عبر قنوات تسويقية متنوعة ومعارض وفعاليات مدروسة.
      </p>
    </div>

    <!-- الكارد الأبيض -->
    <section
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-8">
        <img
          :src="marketingImg"
          alt="خدمة التسويق"
          class="w-full h-[420px] object-cover"
        />
      </div>

      <section class="mb-8 text-right">
        <h2 class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
          نبذة عن خدمة التسويق
        </h2>
        <p class="text-slate-700 dark:text-slate-200 text-[17px] leading-[2.2]">
          تقدم الهيئة خدمة التسويق لدعم أصحاب المشاريع في الوصول إلى الأسواق المستهدفة،
          وتحسين ظهور منتجاتهم عبر القنوات المناسبة، بما يضمن زيادة المبيعات واستدامة المشروع.
        </p>
      </section>

      <section class="mb-8 text-right">
        <h3 class="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
          ما الذي نقدمه؟
        </h3>
        <ul class="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
          <li>المشاركة في المعارض والفعاليات المحلية.</li>
          <li>الترويج للمنتجات عبر المنصات الرقمية والقنوات المتاحة.</li>
          <li>إرشاد حول تحسين الهوية البصرية والتعبئة والتغليف.</li>
        </ul>
      </section>

      <div class="mt-4 flex justify-center">
        <button
          type="button"
          class="btn btn-solid btn-long-full max-w-[320px]"
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
import marketingImg from '@/assets/images/training.jpg' // غيّرها لصورة التسويق لو عندك

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

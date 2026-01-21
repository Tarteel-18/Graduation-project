<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav
        class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2"
      >
        <RouterLink
          to="/"
          class="hover:text-[#000000] dark:hover:text-cyan-300"
        >
          الرئيسية
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          التسهيلات الحكومية
        </span>
      </nav>
    </div>

    <!-- Page Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1
        class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right"
      >
        التسهيلات الحكومية
      </h1>

      <p
        class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right"
      >
        نوفر لك دليلاً شاملاً للتسهيلات والخدمات الحكومية التي تساعد رواد الأعمال وأصحاب المشاريع
        الصغيرة والأصغر على الانطلاق والنمو بسهولة، مع شرح مبسط للإجراءات والمتطلبات.
      </p>
    </div>

    <!-- الكارد الأبيض الموحد -->
    <div
      class="mx-auto max-w-[1300px]
             bg-white dark:bg-slate-900
             rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm p-10"
    >
      <!-- كارد التسهيلات السماوي -->
      <div
        class="gov-card bg-[#E9F5F6] dark:bg-slate-800
               border border-[#D8EDEE] dark:border-slate-700
               rounded-[24px]
               p-8
               w-full flex flex-col gap-4"
      >
        <!-- هيدر الكارد -->
        <div class="flex items-center gap-3 mb-2">
          <img
            src="@/assets/icons/gov-icon.png"
            alt="أيقونة التسهيلات الحكومية"
            class="w-9 h-9 object-contain"
          />
          <h2 class="text-xl md:text-2xl font-bold text-[#165C75] dark:text-cyan-300">
            مذكرة المواصفات والمقاييس
          </h2>
        </div>

        <!-- النص -->
        <p class="text-slate-700 dark:text-slate-100 leading-8 text-[16px] md:text-[17px]">
          تصدر الهيئة العامة لتنمية المشاريع الصغيرة والأصغر مذكرات رسمية موجهة إلى الجهات الحكومية
          ذات العلاقة، ومنها الهيئة اليمنية للمواصفات والمقاييس وضبط الجودة، وذلك لتسهيل إجراءات تسجيل
          وترخيص المشاريع الصغيرة والأصغر، وتمكينها من الحصول على الدعم اللوجستي والخدمات وفق الأنظمة
          المعتمدة. تمثل هذه المذكرات أداة هامة لدعم رواد الأعمال وتعزيز استدامة المشاريع الإنتاجية
          الصغيرة.
        </p>

        <!-- زر اطلب الخدمة -->
        <div class="mt-4 flex justify-center">
          <button
            @click="goToSpecsForm"
            type="button"
    class="btn-long-full "
          >
            اطلب الخدمة
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

const goToSpecsForm = () => {
  const target = '/form/specs-memo-request'

  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
      query: { redirect: target },
    })
  } else {
    router.push(target)
  }
}
</script>

<style scoped>
.gov-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.gov-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>

<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mb-3">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">التسهيلات الحكومية</span>
      </nav>
    </div>

    <!-- Title -->
    <h1 class="text-right text-3xl font-bold text-[#165C75] pr-2">
      التسهيلات الحكومية
    </h1>

    <!-- Description خارج المربع الأبيض -->
    <p class="text-right max-w-[900px] ml-auto mt-3 text-[18px] text-slate-700 leading-8 pr-2">
      نوفر لك دليلاً شاملاً للتسهيلات والخدمات الحكومية التي تساعد رواد الأعمال وأصحاب المشاريع
      الصغيرة والأصغر على الانطلاق والنمو بسهولة، مع شرح مبسط للإجراءات والمتطلبات.
    </p>

    <!-- 🟦 المربع الأبيض (نفس تصميم الخدمات) -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-10 mt-8 mb-24"
    >

      <!-- 🟩 كارد التسهيل الحكومي الجديد (لون جديد) -->
      <div class="bg-[#E9F5F6] rounded-[24px] border border-[#D8EDEE] p-8">

        <div class="flex items-center gap-3 mb-4">
          <img
            src="@/assets/icons/gov-icon.png"
            alt="icon"
            class="w-9 h-9 object-contain"
          />
          <h2 class="text-[#185974] font-bold text-2xl">
            مذكرة المواصفات والمقاييس
          </h2>
        </div>

        <p class="text-slate-700 leading-8 text-[17px]">
          تصدر الهيئة العامة لتنمية المشاريع الصغيرة والأصغر مذكرات رسمية موجهة إلى الجهات الحكومية
          ذات العلاقة، ومنها الهيئة اليمنية للمواصفات والمقاييس وضبط الجودة، وذلك لتسهيل إجراءات تسجيل
          وترخيص المشاريع الصغيرة والأصغر، وتمكينها من الحصول على الدعم اللوجستي والخدمات وفق الأنظمة
          المعتمدة. تمثل هذه المذكرات أداة هامة لدعم رواد الأعمال وتعزيز استدامة المشاريع الإنتاجية الصغيرة.
        </p>

        <button
  @click="goToSpecsForm"
  class="bg-[#165C75] hover:bg-[#0f3d4e] text-white px-10 py-3 rounded-xl text-lg font-semibold"
>
  اطلب الخدمة
</button>


      </div>

    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

function goToSpecsForm() {
  const target = '/form/specs-memo-request' // نفس slug اللي حطيناه في الفورم

  if (!isLoggedIn.value) {
    // لو مش مسجل دخول → يروح للّوجن ومعاه redirect على الفورم
    router.push({
      name: 'login',
      query: { redirect: target },
    })
  } else {
    // لو مسجل دخول → يفتح الفورم مباشرة
    router.push(target)
  }
}
</script>

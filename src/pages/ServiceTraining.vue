<!-- src/pages/ServiceTraining.vue -->
<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- 🔹 Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/services" class="hover:text-[#165C75]">الخدمات</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">خدمة التدريب</span>
      </nav>
    </div>

    <!-- 🔹 عنوان الصفحة -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#1A1A1A] mb-2 text-right">
        خدمة التدريب
      </h1>
      <p class="text-slate-600 text-lg leading-8 w-full md:w-[85%] text-right">
        من خلال خدمة التدريب، تقدم الهيئة برامج تدريبية متخصصة لتأهيل رواد
        الأعمال وأصحاب المشاريع الصغيرة والأصغر ضمن سلاسل قيمة معتمدة.
      </p>
    </div>

    <!-- 🟦 الكارد الأبيض الكبير الموحد -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-6 md:p-10"
    >
      <div class="max-w-[1100px] mx-auto">
        <DetailCard
          :image="trainingImg"
          :content="content"
          buttonText="اطلب الخدمة"
          @request="goToTrainingForm"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import DetailCard from '@/components/DetailCard.vue'
import trainingImg from '@/assets/images/training.jpg'

const router = useRouter()
const { isLoggedIn } = useAuth()

const content = `
تقدم الهيئة العامة لتنمية المشاريع الصغيرة والأصغر برامج تدريبية متخصصة في
مجالات التصنيع الغذائي، الخياطة، الحرف اليدوية، ريادة الأعمال والتدريب
المهني والمعرفي، ضمن منهجية "تدريب – تمكين – تسويق".
`

function goToTrainingForm() {
  const target = '/form/training-program' // الفورم الخاص بالتدريب من formsConfig

  if (!isLoggedIn.value) {
    router.push({ name: 'login', query: { redirect: target } })
  } else {
    router.push(target)
  }
}
</script>

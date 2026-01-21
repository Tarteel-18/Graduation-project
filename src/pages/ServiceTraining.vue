<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/services" class="hover:text-[#165C75] dark:hover:text-cyan-300">الخدمات</RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          خدمة التدريب
        </span>
      </nav>
    </div>

    <!-- عنوان مختصر أعلى -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2 text-right">
        خدمة التدريب
      </h1>
      <p class="text-slate-600 dark:text-slate-300 text-lg leading-8 w-full md:w-[85%] text-right">
        من خلال خدمة التدريب، تقدم الهيئة برامج تدريبية متخصصة لتأهيل رواد
        الأعمال وأصحاب المشاريع الصغيرة والأصغر ضمن سلاسل قيمة معتمدة.
      </p>
    </div>

    <!-- الكارد الأبيض الكبير -->
    <section
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <!-- صورة علوية مثل تفاصيل المشروع -->
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-8">
        <img
          :src="trainingImg"
          alt="خدمة التدريب"
          class="w-full h-[420px] object-cover"
        />
      </div>

      <!-- محتوى الخدمة -->
      <section class="mb-8 text-right">
        <h2 class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3">
          نبذة عن خدمة التدريب
        </h2>
        <p class="text-slate-700 dark:text-slate-200 text-[17px] leading-[2.2]">
          تقدم الهيئة العامة لتنمية المشاريع الصغيرة والأصغر برامج تدريبية متخصصة في
          مجالات التصنيع الغذائي، الخياطة، الحرف اليدوية، ريادة الأعمال والتدريب
          المهني والمعرفي، ضمن منهجية "تدريب – تمكين – تسويق".
        </p>
      </section>

      <section class="mb-8 text-right">
        <h3 class="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
          أهداف الخدمة
        </h3>
        <ul class="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
          <li>رفع كفاءة رواد الأعمال وأصحاب المشاريع في الجوانب الفنية والإدارية.</li>
          <li>تمكين المستفيدين من إنشاء وإدارة مشاريع مستدامة ومجدية اقتصاديًا.</li>
          <li>ربط التدريب بفرص التمويل والتسويق ضمن سلاسل قيمة متكاملة.</li>
        </ul>
      </section>

      <section class="mb-8 text-right">
        <h3 class="text-xl font-bold text-[#165C75] dark:text-cyan-300 mb-2">
          الفئات المستهدفة
        </h3>
        <ul class="list-disc pr-6 space-y-1 text-slate-700 dark:text-slate-200 leading-8 text-[16px]">
          <li>رواد الأعمال الشباب من الجنسين.</li>
          <li>أصحاب المشاريع الصغيرة والأصغر القائمة.</li>
          <li>المبادرون الذين لديهم أفكار مشاريع قابلة للتنفيذ.</li>
        </ul>
      </section>

      <!-- زر اطلب الخدمة -->
      <div class="mt-4 flex justify-center">
        <button
          type="button"
          @click="goToTrainingForm"
          class="btn-long-full "
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
import trainingImg from '@/assets/images/training.jpg'

const router = useRouter()
const { isLoggedIn } = useAuth()

function goToTrainingForm() {
  const target = '/form/training-program'

  if (!isLoggedIn.value) {
    router.push({ name: 'login', query: { redirect: target } })
  } else {
    router.push(target)
  }
}
</script>

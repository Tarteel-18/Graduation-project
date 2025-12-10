<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          الرئيسية
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          الدراسات
        </span>
      </nav>
    </div>

    <!-- Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-4">
      <h1 class="text-3xl font-bold text-[#000000] dark:text-cyan-300 text-right">
        الدراسات
      </h1>
    </div>

    <!-- Description -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <p class="text-right max-w-[900px] ml-auto text-slate-600 dark:text-slate-300 leading-8 text-[17px]">
        تصفح دراساتنا الحديثة التي تسلط الضوء على المشاريع المحلية والتنمية الاقتصادية في اليمن،
        واكتشف كيف تسهم هذه الدراسات في تعزيز المعرفة والوعي ودعم اتخاذ القرار في مختلف المجالات.
      </p>
    </div>

    <!-- White Card Wrapper (مصغّر في العرض والارتفاع) -->
    <div
      class="mx-auto max-w-[1100px] bg-white dark:bg-slate-800 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-4 md:px-6 py-5"
    >
      <div
        class="study-card flex flex-col md:flex-row items-stretch
               bg-[#E9F5F6] dark:bg-slate-700
               rounded-[24px] overflow-hidden"
      >
        <!-- الصورة: تظهر في الموبايل فوق، وفي الديسكتوب يمين -->
        <div class="w-full md:w-[32%] mb-4 md:mb-0">
          <img
            src="@/assets/images/news-1.jpg"
            alt="صورة الدراسة"
            class="w-full h-full object-cover rounded-2xl md:rounded-none"
          />
        </div>

        <!-- النص + الزر -->
        <div
          class="flex-1 px-4 md:px-8 py-3 md:py-5 text-right
                 flex flex-col justify-center gap-3"
        >
          <h2 class="text-xl md:text-[22px] font-bold text-[#165C75] dark:text-cyan-300">
            تحليل سلسلة قيمة إنتاج الملابس المحلية
          </h2>

          <p class="text-slate-600 dark:text-slate-100 leading-7 text-[15px] md:text-[16px]">
            دراسة "سلسلة القيمة للملابس المحلية" تسلط الضوء على رحلة المنتجين الصغار في أمانة العاصمة،
            من التحديات إلى الفرص، وتطرح رؤية عملية لتطوير الجودة، وتوسيع الأسواق، وتعزيز حضور
            الملابس المحلية كمنافس قوي في السوق.
          </p>

          <div class="mt-2">
            <button
              type="button"
              class="btn btn-solid px-6 py-2 text-sm md:text-[15px]"
            >
              تحميل الدراسة
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.study-card {
  transition:
    transform .35s cubic-bezier(.2,.9,.3,1),
    box-shadow .35s ease,
    border-color .35s ease,
    background-color .35s ease;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}

.study-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 36px rgba(15,76,92,0.18);
  border-color: #C7E4E7;
}
</style>

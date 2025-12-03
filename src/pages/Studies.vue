<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12 pb-24" dir="rtl">

    <!-- 🧭 breadcrumb -->
    <nav class="text-slate-500 text-sm flex items-center gap-2 mb-6">
      <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
      <span>›</span>
      <span class="text-[#165C75] font-semibold">الدراسات</span>
    </nav>

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-[#165C75] mb-4">
      الدراسات
    </h1>

    <!-- الوصف -->
    <p class="text-slate-600 leading-8 mb-10 max-w-[900px]">
      تصفح دراساتنا الحديثة التي تسلط الضوء على المشاريع المحلية والتنمية الاقتصادية في اليمن،
      واكتشف كيف تعمل على تعزيز المعرفة والوعي في مختلف المجالات.
    </p>

    <!-- الكارد الأبيض الكبير (تم تعديل العرض ليصبح مثل صفحة الشركاء) -->
    <div class="bg-white rounded-[40px] border border-[#E5EDF0] shadow-sm p-10 max-w-[1300px] mx-auto">

      <!-- الكارد السماوي -->
      <div class="bg-[#E6F3F5] rounded-[32px] overflow-hidden flex w-full">

        <!-- الصورة يمين — الآن 30% -->
        <div class="w-[30%]">
          <img
            src="@/assets/images/news-1.jpg"
            class="w-full h-full object-cover"
            alt="study image"
          />
        </div>

        <!-- النص يسار -->
        <div class="w-[70%] p-10 flex flex-col justify-center text-right">
          <h2 class="text-[#165C75] text-[28px] font-bold mb-4">
            تحليل سلسلة قيمة إنتاج الملابس المحلية
          </h2>

          <p class="text-slate-600 leading-8 text-[17px] mb-6">
            دراسة "سلسلة القيمة للملابس المحلية" تسلط الضوء على رحلة المنتجين الصغار
            في أمانة العاصمة، من التحديات إلى الفرص. خرجت الدراسة برؤية لتطوير الجودة،
            وتوسيع الأسواق، وتعزيز حضور الملابس المحلية كتنافس قوي.
          </p>

          <!-- الزر (صغير ومناسب كما بالصورة) -->
          <button
            class="bg-[#27AEB9] text-white px-7 py-3 rounded-xl text-[16px] font-semibold hover:opacity-90 transition self-start"
          >
            تحميل الدراسة
          </button>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

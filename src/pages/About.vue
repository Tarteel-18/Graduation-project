<template>
  <div class="bg-[#F8FBFC] dark:bg-slate-900 min-h-screen pb-20" dir="rtl">
    <!-- 🟦 الغلاف العام بعرض مثل الخدمات -->
    <div class="mx-auto max-w-[1300px] px-4 mt-12">

      <!-- 🧭 Breadcrumb -->
      <div class="mx-auto max-w-[1300px] px-4 mt-4 mb-4">
        <nav
          class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2"
        >
          <RouterLink
            to="/"
            class="hover:text-[#165C75] dark:hover:text-[#7BD4FF]"
          >
            الرئيسية
          </RouterLink>
          <span>›</span>
          <span class="text-[#165C75] dark:text-[#7BD4FF] font-semibold">
            عن الهيئة
          </span>
        </nav>
      </div>

      <!-- 🟦 عنوان الصفحة -->
      <div class="mx-auto max-w-[1300px] px-4 mb-6">
        <h1
          class="text-3xl font-extrabold text-[#165C75] dark:text-[#7BD4FF]
                 mt-1 mb-2 text-right"
        >
          عن الهيئة
        </h1>
        <p
          class="text-slate-600 dark:text-slate-300 text-lg leading-8
                 w-full md:w-[85%] text-right"
        >
          تعرف على الهيئة العامة لتنمية المشاريع الصغيرة والأصغر، رؤيتها ورسالتها وأهدافها وقيمها التي
          تخدم رواد الأعمال وأصحاب المشاريع الصغيرة.
        </p>
      </div>

      <!-- 🟩 الكارد الأبيض الكبير الذي يحتوي كل شيء -->
      <div
        class="mx-auto max-w-[1300px]
               bg-white dark:bg-slate-800
               rounded-[40px]
               border border-[#E5EDF0] dark:border-slate-700
               shadow-sm p-10 space-y-10"
      >

        <!-- 🟩 من نحن -->
        <section>
          <div
            class="bg-[#E6F4F7] dark:bg-slate-700
                   rounded-3xl p-6 md:p-8
                   border border-[#EAF4F5] dark:border-slate-600"
            dir="rtl"
          >
            <h2
              class="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF]
                     mb-3 flex items-center gap-2"
            >
              <img src="@/assets/images/icon-hex.png" class="w-6 h-6" />
              من نحن
            </h2>
            <p class="text-slate-600 dark:text-slate-100 leading-7">
              تأسست الهيئة العامة لتنمية المشاريع الصغيرة والأصغر في مارس 2021 بهدف تنظيم وتنمية قطاع المشاريع الصغيرة...
            </p>
          </div>
        </section>

        <!-- 🟩 الرؤية والرسالة -->
        <section class="grid md:grid-cols-2 gap-6" dir="rtl">
          <!-- الرؤية -->
          <div
            class="bg-[#E6F4F7] dark:bg-slate-700
                   p-6 rounded-3xl
                   border border-[#EAF4F5] dark:border-slate-600"
          >
            <h3
              class="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF]
                     mb-3 flex items-center gap-2"
            >
              <img src="@/assets/images/icon-hex.png" class="w-6 h-6" />
              الرؤية
            </h3>
            <p class="text-slate-600 dark:text-slate-100 leading-7">
              مجتمع منتج قادر على توظيف موارده بما يعزز الاقتصاد الوطني.
            </p>
          </div>

          <!-- الرسالة -->
          <div
            class="bg-[#E6F4F7] dark:bg-slate-700
                   p-6 rounded-3xl
                   border border-[#D0E7EB] dark:border-slate-600"
          >
            <h3
              class="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF]
                     mb-3 flex items-center gap-2"
            >
              <img src="@/assets/images/icon-hex.png" class="w-6 h-6" />
              الرسالة
            </h3>
            <p class="text-slate-600 dark:text-slate-100 leading-7">
              تنمية المشاريع الصغيرة والأصغر من خلال توفير البيئة الداعمة...
            </p>
          </div>
        </section>

        <!-- 🟩 الأهداف -->
        <section>
          <div
            class="bg-[#E6F4F7] dark:bg-slate-700
                   rounded-3xl p-6 md:p-8
                   border border-[#D0E7EB] dark:border-slate-600"
            dir="rtl"
          >
            <h2
              class="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF]
                     mb-4 flex items-center gap-2"
            >
              <img src="@/assets/images/icon-hex.png" class="w-6 h-6" />
              الأهداف
            </h2>
            <ol class="list-decimal pr-4 text-slate-600 dark:text-slate-100 leading-8">
              <li>توفير بيئة داعمة تساعد على تنمية المشاريع الصغيرة...</li>
              <li>وضع الاستراتيجيات والسياسات الوطنية الداعمة...</li>
              <li>نشر المعرفة بما يحقق الفاعلية والاستدامة...</li>
              <li>دعم نفاذ منتجات المشاريع الصغيرة...</li>
            </ol>
          </div>
        </section>

        <!-- 🟩 قيمنا -->
        <section class="mt-4" dir="rtl">
          <h3
            class="text-xl font-bold text-[#165C75] dark:text-[#7BD4FF]
                   mb-3 flex items-center gap-2"
          >
            <img src="@/assets/images/icon-hex.png" class="w-6 h-6" />
            قيمنا
          </h3>

          <!-- الخلفية السماوية الكبيرة -->
          <div
            class="bg-[#E9F5F6] dark:bg-slate-700
                   rounded-[32px] p-12
                   border border-[#D8EDEE] dark:border-slate-600"
          >
            <!-- شبكة القيم -->
            <div class="grid md:grid-cols-3 gap-12">

              <!-- النزاهة -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  النزاهة
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  تنفيذ كافة المهام والالتزامات بأمانة وصدق والالتزام بكل ماهو أخلاقي...
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>

              <!-- الشفافية -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  الشفافية
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  الإفصاح عن نتائج العمليات بشكل مستمر ومنتظم وتمكين الجميع من الحصول على المعلومات.
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>

              <!-- المرونة -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  المرونة
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  القدرة على التكيّف مع المتغيرات لتحقيق أداء مستقر.
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>
              <!-- الشمول -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  الشمول
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  وصول الخدمات المالية وغير المالية لكل المناطق والمحافظات.
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>

              <!-- التكامل -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  التكامل
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  توحيد جهود العاملين لتحقيق سلسلة أهداف متكاملة.
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>

              <!-- الابتكار -->
              <div class="relative p-6">
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute right-0 top-0 -translate-y-3 w-[32px] h-[38px]"
                />
                <h3 class="text-[#165C75] dark:text-[#7BD4FF] font-bold text-xl mb-3 mt-3">
                  الابتكار
                </h3>
                <p class="text-slate-600 dark:text-slate-100 leading-8 text-[16px]">
                  تقديم حلول مبتكرة تدعم تطوير المشاريع الصغيرة والأصغر.
                </p>
                <img
                  src="@/assets/images/value-corner.svg"
                  class="absolute left-0 bottom-0 translate-y-3 rotate-180 w-[32px] h-[38px]"
                />
              </div>

            </div>
          </div>
        </section>

      </div> <!-- نهاية الكارد الأبيض الكبير -->

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
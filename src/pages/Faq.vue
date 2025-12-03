<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-12" dir="rtl">

    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75]">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/about" class="hover:text-[#165C75]">عن الهيئة</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] font-semibold">الأسئلة الشائعة</span>
      </nav>
    </div>

    <!-- Title -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6">
      <h1 class="text-3xl font-bold text-[#165C75] text-right">
        الأسئلة الشائعة
      </h1>
    </div>

    <!-- White Card like Services -->
    <div
      class="mx-auto max-w-[1300px] bg-white rounded-[40px] border border-[#E5EDF0]
             shadow-sm p-8 md:p-10"
    >
      <div class="max-w-[1100px] mx-auto">

        <div
          v-for="(item, index) in faq"
          :key="index"
          class="mb-4"
        >
          <!-- السؤال -->
          <div
            @click="toggle(index)"
            class="cursor-pointer bg-[#DFF1F4] hover:bg-[#d7edf0]
                   transition-all rounded-xl px-5 py-4 border border-[#cae6ea]"
          >
            <div class="flex items-center justify-between">
              <span class="text-[#165C75] font-semibold text-lg">
                {{ item.q }}
              </span>

              <svg
                :class="[
                  'w-6 h-6 text-[#165C75] transition-transform',
                  active[index] ? 'rotate-180' : ''
                ]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- الجواب -->
          <div
            class="overflow-hidden transition-all duration-500"
            :style="active[index] ? 'max-height:400px; opacity:1;' : 'max-height:0; opacity:0;'"
          >
            <div class="bg-[#F7FCFD] rounded-xl p-5 mt-2 border border-[#D6E8EB]">
              <p class="text-slate-700 leading-8 text-[17px]">
                {{ item.a }}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const active = ref({})
const toggle = (index) => { active.value[index] = !active.value[index] }

const faq = ref([
  { q: 'هل الهيئة تمول؟', a: 'نعم، الهيئة تقدم قروض بيضاء عبر الجمعيات الشريكة...' },
  { q: 'كيف تخدمون المشاريع الصغيرة؟', a: 'تقدم الهيئة برامج تدريبية وتمويلية...' },
  { q: 'كيف أقدم على برامج الهيئة التدريبية؟', a: 'عبر التسجيل في البرامج المفتوحة...' },
  { q: 'كيف أقدم على قرض؟', a: 'التقديم يتم عن طريق الجمعيات التمويلية...' },
  { q: 'ما نوع التمويل المقدم؟', a: 'تمويل بدون فوائد عبر برنامج القرض الحسن...' },
])
</script>

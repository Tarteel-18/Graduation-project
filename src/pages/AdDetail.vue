<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- breadcrumb -->
    <nav
      class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2 mb-6"
    >
      <RouterLink
        to="/"
        class="hover:text-[#165C75] dark:hover:text-cyan-300"
      >
        الرئيسية
      </RouterLink>
      <span>›</span>
      <RouterLink
        to="/ads"
        class="hover:text-[#165C75] dark:hover:text-cyan-300"
      >
        الإعلانات
      </RouterLink>
      <span>›</span>
      <span class="text-[#000000] dark:text-cyan-300 font-semibold">
        {{ ad ? ad.title : 'تفاصيل الإعلان' }}
      </span>
    </nav>

    <!-- لو الإعلان موجود -->
    <div
      v-if="ad"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm p-8 md:p-10"
    >
      <!-- الكارد الداخلي السماوي -->
      <div
        class="bg-[#ECF6F7] dark:bg-slate-800 rounded-[26px]
               border border-[#D8EDEE] dark:border-slate-700
               shadow p-8 md:p-10"
      >
        <!-- عنوان الإعلان -->
        <h1
          class="text-3xl font-bold text-[#165C75] dark:text-cyan-300 text-center mb-3"
        >
          {{ ad.title }}
        </h1>

        <!-- معلومات عامة -->
        <p class="text-center text-slate-600 dark:text-slate-300 mb-8">
          نوع الإعلان: {{ ad.type }} |
          التاريخ: {{ ad.date }} |
          الموقع: {{ ad.location }}
        </p>

        <!-- الصورة -->
        <img
          :src="ad.image"
          :alt="ad.title"
          class="w-full h-[380px] object-cover rounded-[22px] mb-10"
        />

        <!-- تفاصيل البرنامج -->
        <section class="mb-8">
          <h2
            class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3"
          >
            تفاصيل البرنامج:
          </h2>
          <p class="text-slate-700 dark:text-slate-200 text-lg leading-8">
            {{ ad.description }}
          </p>
        </section>

        <!-- المزايا -->
        <section v-if="ad.benefits && ad.benefits.length" class="mb-8">
          <h2
            class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3"
          >
            مزايا البرنامج:
          </h2>
          <ul
            class="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg"
          >
            <li v-for="(b, i) in ad.benefits" :key="i">
              {{ b }}
            </li>
          </ul>
        </section>

        <!-- الشروط -->
        <section v-if="ad.conditions && ad.conditions.length" class="mb-8">
          <h2
            class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3"
          >
            شروط الالتحاق:
          </h2>
          <ul
            class="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg"
          >
            <li v-for="(c, i) in ad.conditions" :key="i">
              {{ c }}
            </li>
          </ul>
        </section>

        <!-- طريقة التسجيل -->
        <section v-if="ad.registration && ad.registration.length" class="mb-8">
          <h2
            class="text-2xl font-bold text-[#165C75] dark:text-cyan-300 mb-3"
          >
            طريقة التسجيل:
          </h2>
          <ul
            class="list-disc pr-6 text-slate-700 dark:text-slate-200 leading-8 text-lg"
          >
            <li v-for="(r, i) in ad.registration" :key="i">
              {{ r }}
            </li>
          </ul>
        </section>

        <!-- زر التسجيل (مع تسجيل الدخول إن لزم) -->
        <button
          v-if="ad.slug"
          @click="goToAdForm"
          class="btn-long-full"
        >
          سجل الآن
        </button>
      </div>
    </div>

    <!-- لو ما لقى الإعلان -->
    <div
      v-else
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#F1C0C0] dark:border-rose-500/60
             shadow-sm p-8 mt-10 text-center text-red-600 dark:text-rose-300"
    >
      لم يتم العثور على الإعلان المطلوب.
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

import img1 from '@/assets/images/news-1.jpg'
import img2 from '@/assets/images/news-1.jpg'
import img3 from '@/assets/images/news-1.jpg'

const route = useRoute()
const router = useRouter()
const { isLoggedIn } = useAuth()

const id = Number(route.params.id)

// بيانات الإعلانات مع slug لكل إعلان يحدد فورم التقديم
const ads = [
  {
    id: 1,
    type: 'تدريب',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تدريب جديدة',
    image: img1,
    description:
      'برنامج تدريبي متخصص يستهدف الشباب في مجال التصنيع الغذائي...',
    benefits: ['شهادة معتمدة', 'جلسات تدريبية عملية', 'ترشيح المشاريع المميزة'],
    conditions: ['وجود مشروع أو فكرة واضحة', 'الالتزام بالحضور الكامل'],
    registration: ['التسجيل عبر الموقع الرسمي', 'متابعة البريد الإلكتروني للتأكيد'],
    slug: 'training-ad', // موجود في formsConfig
  },
  {
    id: 2,
    type: 'تطوع',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تطوع جديدة',
    image: img2,
    description:
      'تعلن الهيئة عن فتح باب التطوع في عدد من البرامج والفعاليات...',
    benefits: ['خبرة ميدانية', 'شهادة تطوع من الهيئة'],
    conditions: [
      'القدرة على الالتزام بالفترة المحددة',
      'الالتزام بسلوكيات العمل التطوعي',
    ],
    registration: ['التسجيل عبر نموذج التطوع في الموقع'],
    slug: 'volunteer-program',
  },
  {
    id: 3,
    type: 'تعاقد',
    date: '15 أغسطس 2025',
    location: 'صنعاء، اليمن',
    title: 'فرصة تعاقد جديدة',
    image: img3,
    description:
      'ترغب الهيئة في التعاقد مع جهات مختصة لتنفيذ مشاريع تنموية...',
    benefits: [],
    conditions: [
      'تقديم عرض فني ومالي مفصل',
      'توفر خبرة سابقة في نفس المجال',
    ],
    registration: ['إرسال العرض عبر البريد الرسمي للهيئة'],
    slug: 'contract-opportunity',
  },
]

const ad = computed(() => ads.find(a => a.id === id))

function goToAdForm() {
  if (!ad.value?.slug) return

  const target = { name: 'dynamic-form', params: { slug: ad.value.slug } }

  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
      query: { redirect: router.resolve(target).href },
    })
  } else {
    router.push(target)
  }
}
</script>

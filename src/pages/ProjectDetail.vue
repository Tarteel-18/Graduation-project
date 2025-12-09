
import './assets/styles/index.css'

<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <RouterLink to="/projects" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          المشاريع
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          {{ project?.title || 'تفاصيل المشروع' }}
        </span>
      </nav>
    </div>

    <!-- لو لقيْنا المشروع -->
    <section
      v-if="project"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10"
    >
      <!-- الفيديو / الصورة العلوية -->
      <div class="w-full rounded-[32px] overflow-hidden bg-black mb-8">
        <video
          v-if="project.videoUrl"
          class="w-full h-[520px] object-cover"
          controls
          :src="project.videoUrl"
        >
          متصفحك لا يدعم تشغيل الفيديو.
        </video>

        <img
          v-else
          :src="project.image"
          :alt="project.title"
          class="w-full h-[520px] object-cover"
        />
      </div>

      <!-- محتوى HTML من المشروع -->
      <div
        class="text-right text-[17px] leading-[2.2]
               text-slate-700 dark:text-slate-200 mb-8"
        v-html="project.content"
      />

     <!-- زر الرجوع لصفحة المشاريع -->
      <div class="mt-4">
  <RouterLink
    to="/projects"
    class="btn-long-full "
  >
    الرجوع لصفحة المشاريع
  </RouterLink>
</div>







    </section>

    <!-- لو الـ id مش موجود -->
    <section
      v-else
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[40px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm
             px-6 md:px-10 py-10 text-center text-slate-600 dark:text-slate-200"
    >
      المشروع غير موجود.
      <div class="mt-4 flex justify-center">
        <RouterLink to="/projects" class="btn btn-outline">
          الرجوع لصفحة المشاريع
        </RouterLink>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import projectImg from '../assets/images/Training.png'

type Project = {
  id: string
  title: string
  image: string
  videoUrl?: string
  content: string
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'مشروع تدريب المدرّبات في خياطة القطنيات بطرق صناعية',
    image: projectImg,
    videoUrl: '/videos/project-1.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يهدف هذا المشروع إلى تدريب مجموعة من المدربات في مجال خياطة القطنيات
        وفق أساليب حديثة وأقرب للطرق الصناعية، بما يساهم في تحسين جودة المنتجات
        وفتح فرص عمل جديدة للنساء في المجتمع.
      </p>
      <p class="mb-4">
        يشمل البرنامج التدريبي مراحل متعددة من التصميم، القص، الخياطة، التشطيب،
        بالإضافة إلى مهارات التسعير والتسويق وإدارة الطلبات.
      </p>
      <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-xl mt-6 mb-2">
        أهداف المشروع:
      </h3>
      <ul class="list-disc pr-6 space-y-1">
        <li>تمكين النساء من امتلاك مهارات مهنية مستدامة.</li>
        <li>رفع جودة المنتجات القطنية المحلية.</li>
        <li>خلق فرص دخل إضافية للأسر المستهدفة.</li>
      </ul>
    `,
  },
  {
    id: '2',
    title: 'مشروع دعم سلاسل الإمداد الغذائية',
    image: projectImg,
    videoUrl: '/videos/project-2.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يستهدف هذا المشروع تحسين سلاسل الإمداد في القطاع الغذائي من خلال دعم
        المنتجين الصغار وربطهم بالأسواق المحلية والخارجية.
      </p>
      <p class="mb-4">
        يشمل المشروع تقديم استشارات فنية، تحسين أساليب التخزين والنقل، بالإضافة
        إلى دعم التسويق والتغليف بما يتناسب مع المعايير الحديثة.
      </p>
    `,
  },
  {
    id: '3',
    title: 'برنامج تمكين رواد الأعمال الشباب',
    image: projectImg,
    videoUrl: '/videos/project-3.mp4',
    content: `
      <p class="text-[#165C75] dark:text-cyan-300 font-bold text-lg md:text-xl leading-9 mb-4">
        يهدف البرنامج إلى تمكين الشباب من إطلاق مشاريعهم الخاصة عبر حزمة من
        الخدمات تشمل التدريب، التوجيه، وربطهم بفرص التمويل المتاحة.
      </p>
      <p class="mb-4">
        يتضمن البرنامج مخيمات ريادية، جلسات إرشاد فردية، ومسابقات لأفضل
        الأفكار والمشاريع الناشئة.
      </p>
    `,
  },
]

const route = useRoute()

const project = computed<Project | undefined>(() =>
  projectsData.find((p) => p.id === String(route.params.id)),
)
</script>

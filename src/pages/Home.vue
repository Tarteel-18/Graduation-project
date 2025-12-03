<template>
  <div>
    <!-- 🟦 السلايدر -->
    <section class="relative w-full h-[500px] overflow-hidden">
      <div class="relative w-full h-full">
        <img
          :src="slides[currentSlide].image"
          alt="صورة السلايدر"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 class="text-3xl md:text-4xl font-extrabold mb-2">
            {{ slides[currentSlide].title }}
          </h1>
          <p class="text-lg opacity-90">
            {{ slides[currentSlide].subtitle }}
          </p>
        </div>
      </div>

      <!-- النقاط -->
      <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        <button
          v-for="(s, index) in slides"
          :key="index"
          class="w-3 h-3 rounded-full transition-all"
          :class="currentSlide === index ? 'bg-[#27AEB9] w-4' : 'bg-white/70 hover:bg-white/90'"
          @click="setSlide(index)"
        ></button>
      </div>
    </section>

    <!-- 🟩 الإحصائيات -->
    <section class="bg-[#8dc3c940] py-10">
      <div class="mx-auto max-w-[1280px] px-6">
        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="stat reveal"
          >
            <span class="num">{{ stat.number }}</span>
            <span class="lbl">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 🟩 خدماتنا -->
    <section>
      <div class="mx-auto max-w-[1280px] px-6 py-12">
        <h2 class="section-title reveal">
          {{ sectionTitles.services }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <div
            v-for="(service,i) in services"
            :key="i"
            class="rounded-2xl border border-slate-200 bg-white overflow-hidden
                   w-[360px] h-[270px] shadow-sm hover:shadow-md transition-all duration-300 reveal"
          >
            <div class="w-full h-[150px] ph"></div>
            <div class="p-4 text-center">
              <h3 class="font-bold text-lg mb-1" :style="{color: HEAD}">
                {{ service.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed line-clamp-2">
                {{ service.text }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-6 reveal">
          <RouterLink to="/services" class="btn-outline">
            {{ ctaLabels.servicesMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 🟩 التسهيلات الحكومية -->
    <section class="bg-[#8dc3c940] py-12">
      <div class="mx-auto max-w-[1280px] px-6 text-center reveal">
        <h3 class="text-2xl font-bold mb-2" :style="{color: HEAD}">
          {{ govSection.title }}
        </h3>
        <p class="text-slate-600 mb-4">
          {{ govSection.description }}
        </p>
        <RouterLink to="/gov-facilities" class="btn-solid">
          {{ govSection.cta }}
        </RouterLink>
      </div>
    </section>

    <!-- 🟩 قصص النجاح -->
    <section class="relative py-16 overflow-hidden bg-[#D8EAEC40]">
      <div class="relative z-10 mx-auto max-w-[1280px] px-6">
        <h2 class="section-title mb-10 reveal">
          {{ sectionTitles.successStories }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <div
            v-for="(story, i) in stories.slice(0,3)"
            :key="i"
            class="group relative w-[360px] h-[230px]
                   rounded-2xl overflow-hidden cursor-pointer
                   shadow-md hover:shadow-xl transition-all duration-500 reveal"
          >
            <img
              :src="story.image"
              :alt="story.title"
              class="absolute inset-0 w-full h-full object-cover z-0
                     transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div
              class="absolute inset-0 bg-[#165C75]/0
                     group-hover:bg-[#0F3D52]/80
                     transition-colors duration-500 z-10">
            </div>
            <img
              :src="patternUrl"
              alt=""
              class="absolute right-0 top-0 h-full opacity-0
                     group-hover:opacity-80
                     transition-opacity duration-500 ease-out
                     pointer-events-none z-20"
            />
            <div
              class="absolute inset-0 z-30 flex flex-col items-center justify-center text-center
                     text-white opacity-0 group-hover:opacity-100
                     transition-all duration-500 ease-out px-4"
            >
              <h3 class="text-lg font-bold mb-1 tracking-wide">
                {{ story.title }}
              </h3>
              <p class="text-sm opacity-90">
                {{ story.name }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-10 reveal">
          <RouterLink to="/stories" class="btn-outline text-base px-6 py-2.5">
            {{ ctaLabels.storiesMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 🟩 المشاريع -->
    <section class="relative py-16 overflow-hidden">
      <div class="relative z-10 mx-auto max-w-[1280px] px-6">
        <h2 class="section-title reveal">
          {{ sectionTitles.projects }}
        </h2>

        <div class="space-y-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="group relative w-full h-[240px]
                   rounded-3xl overflow-hidden cursor-pointer
                   shadow-md hover:shadow-xl transition-all duration-500 reveal"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div
              class="absolute inset-0 bg-[#165C75]/0
                     group-hover:bg-[#0F3D52]/80
                     transition-colors duration-500 z-10">
            </div>
            <img
              :src="patternUrl"
              alt=""
              class="absolute right-0 top-0 h-full opacity-0
                     group-hover:opacity-80
                     transition-opacity duration-500 ease-out
                     pointer-events-none z-20"
            />
            <div
              class="absolute inset-0 z-30 flex flex-col items-center justify-center
                     text-center text-white opacity-0 group-hover:opacity-100
                     transition-all duration-500 ease-out px-6"
            >
              <h3 class="text-xl font-bold mb-2 leading-relaxed">
                {{ project.title }}
              </h3>
            
            </div>
          </div>
        </div>

        <div class="text-center mt-10 reveal">
          <RouterLink to="/projects" class="btn-outline">
            {{ ctaLabels.projectsMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 🟩 آخر الأخبار -->
    <section class="py-16">
      <div class="mx-auto max-w-[1280px] px-6">

        <!-- العنوان في الوسط -->
        <h2 class="section-title mb-10 reveal">
          آخر الأخبار
        </h2>

        <!-- الأخبار الجانبية يسار والكارد الرئيسي يمين -->
        <div class="grid lg:grid-cols-[350px_1fr] gap-6">

          <!-- الأخبار الجانبية (يسار) -->
          <aside class="space-y-3 reveal">
            <RouterLink
              v-for="(item,i) in news"
              :key="i"
              :to="item.link"
              class="block bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div class="flex justify-between mb-1">
                <span class="text-[#185974] font-bold text-[15px]">
                  {{ item.title }}
                </span>
                <span class="text-slate-500 text-xs">
                  {{ item.date }}
                </span>
              </div>
            </RouterLink>
          </aside>

          <!-- الكارد الرئيسي (يمين) -->
          <div
            class="relative rounded-3xl overflow-hidden h-[300px]
                   shadow-md bg-[#3a3a3a] reveal"
          >
            <img
              :src="mainNews.image"
              alt=""
              class="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div class="absolute inset-0 flex flex-col justify-center px-10 text-white">
              <h3 class="text-xl md:text-2xl font-bold mb-2 leading-relaxed">
                {{ mainNews.title }}
              </h3>

              <p class="opacity-90 text-sm mb-3">
                {{ mainNews.date }}
              </p>

              <p class="opacity-80 text-sm line-clamp-3">
                {{ mainNews.summary }}
              </p>

              <RouterLink
                :to="mainNews.link"
                class="mt-4 underline text-sm opacity-100 hover:text-[#27AEB9]"
              >
                قراءة المزيد
              </RouterLink>
            </div>

            <div class="absolute bottom-4 left-4 text-white text-sm opacity-90">
              1 / 4
            </div>
          </div>

        </div>

       <!-- زر مشاهدة الكل أسفل الصورة و بمحاذاة اليسار -->
<div class="mt-4 reveal flex justify-start">
  <RouterLink
    to="/news"
    class="text-[#185974] font-semibold text-lg hover:opacity-70 flex items-center gap-2"
  >
    <span>مشاهدة الكل</span>
    <span class="text-xl"> </span>
  </RouterLink>
</div>


      </div>
    </section>

    <!-- 🟩 الخريطة التفاعلية -->
    <section>
      <div class="mx-auto max-w-[1280px] px-6 pb-16 text-center reveal">
        <h3 class="text-2xl font-bold mb-1" :style="{color: HEAD}">
          {{ mapSection.title }}
        </h3>
        <p class="text-slate-600 mb-4">
          {{ mapSection.description }}
        </p>

        <div class="rounded-2xl overflow-hidden border border-slate-200">
          <iframe
            class="w-full h-[380px]"
            style="border:0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=31.0,10.0,55.0,20.5&layer=mapnik&marker=15.5,48.5"
          ></iframe>
        </div>

        <div class="mt-4">
          <RouterLink to="/projects/map" class="btn-outline">
            {{ mapSection.cta }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

import patternUrl from '@/assets/images/pattern.png'
import slide1 from '@/assets/images/slaider1.png'
import slide2 from '@/assets/images/slaider2.png'
import slide3 from '@/assets/images/slaider3.png'
import story1 from '@/assets/images/STORY.png'
import project1 from '@/assets/images/project1.png'
import newsMainImage from '@/assets/logo.png' // صورة الخبر الرئيسي

const HEAD = '#185974'

const sectionTitles = ref({
  services: 'خدماتنا',
  successStories: 'قصص النجاح',
  projects: 'المشاريع',
  news: 'آخر الأخبار',
})

const ctaLabels = ref({
  servicesMore: 'عرض الكل',
  storiesMore: 'عرض المزيد',
  projectsMore: 'عرض المزيد',
})

const govSection = ref({
  title: 'التسهيلات الحكومية',
  description: 'تعرّف على التسهيلات الحكومية التي تقدمها الهيئة، واحصل على الخدمات بكل سهولة.',
  cta: 'عرض التسهيلات الحكومية',
})

const mapSection = ref({
  title: 'مشاريعنا حسب المحافظات',
  description: 'هنا توضيح خريطة تفاعلية لمواقع المشاريع حسب المحافظات.',
  cta: 'عرض التفاصيل',
})

/* السلايدر */
const slides = ref([
  {
    title: 'مبادرة اليوم .. مستقبل الغد',
    subtitle: 'دعم المشاريع الصغيرة والمتوسطة لتمكين رواد الأعمال في اليمن',
    image: slide1,
  },
  {
    title: 'تمكين القدرات المحلية لبناء صناعة غذائية مستدامة',
    subtitle: 'التنمية تبدأ بإتقان',
    image: slide2,
  },
  {
    title: 'نجاحك .. مسؤوليتنا',
    subtitle: 'نرافقك في كل خطوة من رحلتك الريادية',
    image: slide3,
  },
])

const currentSlide = ref(0)
let sliderTimer = null

const setSlide = (i) => {
  currentSlide.value = i
}

/* أنيميشن السكروول بشكل واضح */
let scrollHandler = null

onMounted(() => {
  // سلايدر
  sliderTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 5000)

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85
    const elements = document.querySelectorAll('.reveal')
    elements.forEach(el => {
      const rect = el.getBoundingClientRect()
      if (rect.top < triggerBottom) {
        el.classList.add('show')
      }
    })
  }

  scrollHandler = () => revealOnScroll()

  window.addEventListener('scroll', scrollHandler)
  // استدعاء أولي للعناصر اللي فوق
  revealOnScroll()
})

onUnmounted(() => {
  if (sliderTimer) clearInterval(sliderTimer)
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})

/* الإحصائيات */
const stats = ref([
  { number: '+500', label: 'المشاريع المنجزة' },
  { number: '+1200', label: 'رواد الأعمال المستفيدون' },
  { number: '+35', label: 'الشراكات الاستراتيجية' },
])

/* الخدمات */
const services = ref([
  { title: 'التمويل', text: 'خدمات تمويل مبتكرة تساعد في نمو مشروعك.' },
  { title: 'التسويق', text: 'دعم تسويقي على المنصات الرقمية وقنوات أخرى.' },
  { title: 'التدريب', text: 'برامج تدريبية واستشارات متخصصة لرواد الأعمال.' },
])

/* المشاريع */
const projects = ref([
  {
    id: 1,
    title: 'مشروع تدريب المدرّبات في خياطة القطنيات بطرق صناعية',
    location: 'صنعاء',
    category: 'القطاع الحرفي',
    status: 'قيد التنفيذ',
    image: project1,
  },
  {
    id: 2,
    title: 'مشروع دعم سلاسل الإمداد الغذائية',
    location: 'عدن',
    category: 'القطاع الغذائي',
    status: 'منجز',
    image: project1,
  },
  {
    id: 3,
    title: 'برنامج تمكين رواد الأعمال الشباب',
    location: 'تعز',
    category: 'برامج تمويل',
    status: 'جارِ الإطلاق',
    image: project1,
  },
])

/* الخبر الرئيسي */
const mainNews = ref({
  title: '“الهيئة” قامت بتحديث نظام الدعم الفني',
  summary:
    'تم تحديث نظام الدعم الفني لتحسين سرعة الاستجابة وجودة الخدمة المقدمة للمشاريع الصغيرة والمتوسطة عبر مختلف المحافظات.',
  date: '25 يوليو 2025',
  link: '/news/1',
  image: newsMainImage,
})

/* قائمة الأخبار الجانبية */
const news = ref([
  { title: 'افتتاح مبادرة دعم المشاريع الريفية', date: '8 أغسطس 2025', link: '/news/2' },
  { title: 'إطلاق برنامج تمويل جديد للمشاريع الناشئة', date: '1 أغسطس 2025', link: '/news/3' },
  { title: 'ورشة تدريبية لريادة الأعمال النسائية', date: '25 يوليو 2025', link: '/news/4' },
  { title: 'نتائج المبادرات السابقة للمشاريع الصغيرة', date: '15 يوليو 2025', link: '/news/5' },
])

/* قصص النجاح */
const stories = ref([
  {
    title: 'مبادرة برايد كميونتي',
    name: 'عائشة العاقل - رئيس المبادرة',
    image: story1,
  },
  {
    title: 'حلم تحقق',
    name: 'عبدالرحمن محمد - رائد أعمال',
    image: 'https://via.placeholder.com/600x400?text=قصة+2',
  },
  {
    title: 'تجربتي في الريادة',
    name: 'صالح أحمد - مستفيد من المبادرة',
    image: 'https://via.placeholder.com/600x400?text=قصة+3',
  },
  {
    title: 'من الفكرة إلى النجاح',
    name: 'ريم ناصر - مؤسسة المشروع',
    image: 'https://via.placeholder.com/600x400?text=قصة+4',
  },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800&display=swap');

:global(html, body) {
  font-family: "Cairo", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.section-title{
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  color: #185974;
}

.btn-solid{
  display:inline-block;
  padding:.6rem 1.2rem;
  border-radius:.75rem;
  color:#fff;
  background:#27AEB9;
  font-weight:600;
}
.btn-solid:hover{
  opacity:.9;
}

.btn-outline{
  display:inline-block;
  padding:.45rem 1rem;
  border-radius:.75rem;
  border:1px solid #27AEB9;
  color:#27AEB9;
  background:#fff;
  font-weight:600;
}
.btn-outline:hover{
  background:#e0f6f8;
}

.ph{
  background: repeating-linear-gradient(45deg, #e9eef0, #e9eef0 10px, #f7fafb 10px, #f7fafb 20px);
  border: 1px dashed #cbd5e1;
}

/* إحصائيات */
.stat{
  border-radius:1.25rem;
  padding:1.5rem 1.25rem;
  background:#fff;
  border:1px solid #e5e7eb;
  text-align:center;
  box-shadow:0 10px 25px rgba(15,76,92,0.06);
  transition:transform .25s ease, box-shadow .25s ease;
}
.stat .num{
  display:block;
  font-weight:800;
  font-size:22px;
  color:#27AEB9;
  margin-bottom:.25rem;
}
.stat .lbl{
  display:block;
  color:#185974;
  font-weight:700;
  font-size:14px;
}
.stat:hover{
  transform:translateY(-4px);
  box-shadow:0 18px 35px rgba(15,76,92,0.14);
}

/* أنيميشن الظهور – أقوى وواضح */
.reveal{
  opacity:0;
  transform:translateY(60px) scale(0.97);
  transition:
    opacity .7s ease-out,
    transform .7s ease-out;
}
.reveal.show{
  opacity:1;
  transform:translateY(0) scale(1);
}
</style>

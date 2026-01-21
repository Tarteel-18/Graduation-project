<template>
  <div :style="{ paddingTop: '25px' }" id="page-root">
    <!-- السلايدر -->
    <section class="relative w-full h-[500px] overflow-hidden mt-0 bg-black">
      <div class="relative w-full h-full">
        <img
          :src="slides[currentSlide].image"
          alt="صورة السلايدر"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- نص السلايدر -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
        >
          <h1
            ref="heroTitle"
            class="hero-title text-3xl md:text-4xl font-extrabold mb-2"
          >
            {{ slides[currentSlide].title }}
          </h1>
          <p ref="heroSub" class="hero-subtitle text-lg opacity-90">
            {{ slides[currentSlide].subtitle }}
          </p>
        </div>
      </div>

      <!-- نقاط -->
      <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        <button
          v-for="(s, index) in slides"
          :key="index"
          class="w-3 h-3 rounded-full transition-all"
          :class="
            currentSlide === index
              ? 'bg-[#27AEB9] w-4'
              : 'bg-white/70 hover:bg-white/90'
          "
          @click="setSlide(index)"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
    </section>

    <!-- الإحصائيات -->
    <section class="bg-section-alt py-10">
      <div class="mx-auto max-w-[1280px] px-6">
        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="stat card-hover reveal"
          >
            <span class="num" :data-final="stat.number">
              {{ stat.number }}
            </span>
            <span class="lbl">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- خدماتنا -->
    <section class="bg-section pt-5">
      <div class="mx-auto max-w-[1280px] px-6 py-12">
        <h2 class="section-title reveal">
          {{ sectionTitles.services }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <RouterLink
            v-for="(service, i) in services"
            :key="i"
            :to="{ name: service.routeName }"
            class="card-hover rounded-2xl border border-slate-200 dark:border-slate-700
                   bg-white dark:bg-slate-900 overflow-hidden
                   w-[360px] h-[270px] reveal block"
          >
            <div class="w-full h-[150px] ph"></div>
            <div class="p-4 text-center">
              <h3 class="font-bold text-lg mb-1" :style="{ color: HEAD }">
                {{ service.title }}
              </h3>
              <p
                class="text-slate-600 dark:text-slate-200 text-sm leading-relaxed line-clamp-2"
              >
                {{ service.text }}
              </p>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-6 reveal">
          <RouterLink :to="{ name: 'services' }" class="btn btn-outline">
            {{ ctaLabels.servicesMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- التسهيلات الحكومية -->
    <section class="bg-section-alt py-12">
      <div class="mx-auto max-w-[1280px] px-6 pt-5 text-center reveal">
        <h3 class="section-title section-title-wide mb-2">
          {{ govSection.title }}
        </h3>

        <p
          class="text-slate-600 dark:text-slate-200 mb-4 text-base md:text-lg"
        >
          {{ govSection.description }}
        </p>

        <RouterLink :to="{ name: 'GovFacilities' }" class="btn btn-solid">
          {{ govSection.cta }}
        </RouterLink>
      </div>
    </section>

    <!-- قصص النجاح -->
    <section class="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
      <div class="relative z-10 mx-auto max-w-[1280px] px-6">
        <h2 class="section-title section-title-wide mb-10 reveal">
          {{ sectionTitles.successStories }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <RouterLink
            v-for="(story, i) in stories"
            :key="story.slug || i"
            :to="{ name: 'story-detail', params: { slug: story.slug } }"
            class="card-hover group relative w-[360px] h-[230px]
                   rounded-2xl overflow-hidden cursor-pointer reveal block"
          >
            <img
              :src="story.image"
              :alt="story.title"
              class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div
              class="absolute inset-0 bg-[#165C75]/0 group-hover:bg-[#0F3D52]/80 transition-colors duration-500 z-10"
            ></div>
            <img
              :src="patternUrl"
              alt=""
              class="absolute right-0 top-0 h-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-out pointer-events-none z-20"
            />
            <div
              class="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out px-4"
            >
              <h3 class="text-lg font-bold mb-1 tracking-wide">
                {{ story.title }}
              </h3>
              <p class="text-sm opacity-90">{{ story.name }}</p>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-10 reveal">
          <RouterLink
            :to="{ name: 'media-stories' }"
            class="btn btn-outline text-base"
          >
            {{ ctaLabels.storiesMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- شركاؤنا -->
    <section class="py-12 bg-section-alt">
      <div class="mx-auto max-w-[1280px] px-6 pt-4">
        <h2 class="section-title mb-8 reveal">شركاؤنا</h2>

        <div class="partners-viewport reveal">
          <div class="partners-track">
            <div
              v-for="(logo, i) in partners"
              :key="'p1-' + i"
              class="partner-card"
            >
              <img :src="logo" alt="شعار شريك" loading="lazy" />
            </div>
            <div
              v-for="(logo, i) in partners"
              :key="'p2-' + i"
              class="partner-card"
            >
              <img :src="logo" alt="شعار شريك" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- المشاريع -->
    <section class="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
      <div class="relative z-10 mx-auto max-w-[1280px] px-6">
        <h2 class="section-title reveal">
          {{ sectionTitles.projects }}
        </h2>

        <div class="space-y-6">
          <RouterLink
            v-for="project in projects"
            :key="project.id"
            :to="{ name: 'project-detail', params: { id: project.id } }"
            class="card-hover group relative w-full h-[240px]
                   rounded-3xl overflow-hidden cursor-pointer reveal block"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div
              class="absolute inset-0 bg-[#165C75]/0 group-hover:bg-[#0F3D52]/80 transition-colors duration-500 z-10"
            ></div>
            <img
              :src="patternUrl"
              alt=""
              class="absolute right-0 top-0 h-full opacity-0 group-hover:opacity-80 transition-opacity duration-500 ease-out pointer-events-none z-20"
            />
            <div
              class="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out px-6"
            >
              <h3 class="text-xl font-bold mb-2 leading-relaxed">
                {{ project.title }}
              </h3>
            </div>
          </RouterLink>
        </div>

        <div class="text-center mt-10 reveal">
          <RouterLink :to="{ name: 'projects' }" class="btn btn-outline">
            {{ ctaLabels.projectsMore }}
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- آخر الأخبار -->
    <section class="py-16 bg-section-alt">
      <div class="mx-auto max-w-[1280px] px-6">
        <h2 class="section-title mb-8 reveal">
          {{ sectionTitles.news }}
        </h2>

        <div
          class="grid lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1.1fr)] gap-8 items-stretch"
        >
          <!-- الخبر الرئيسي -->
          <article
            class="relative rounded-3xl overflow-hidden shadow-md bg-[#111827] text-white reveal flex flex-col justify-end"
          >
            <img
              :src="mainNews.image"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/5"
            ></div>

            <div
              class="relative z-10 px-8 pb-8 pt-20 flex flex-col gap-3"
            >
              <p class="text-xs md:text-sm opacity-90">
                {{ mainNews.date }}
              </p>
              <h3 class="text-xl md:text-2xl font-bold leading-relaxed">
                {{ mainNews.title }}
              </h3>
              <p
                class="text-xs md:text-sm opacity-90 leading-relaxed line-clamp-3"
              >
                {{ mainNews.summary }}
              </p>

              <div
                class="mt-4 flex items-center justify-between text-xs md:text-sm"
              >
                <div class="flex items-center gap-4">
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    ›
                  </button>
                  <span class="opacity-80">
                    1 / {{ news.length + 1 }}
                  </span>
                </div>

                <RouterLink
                  :to="{ name: 'news-index' }"
                  class="inline-flex items-center gap-1 font-semibold hover:text-[#27AEB9] transition-colors"
                >
                  <span>اقرأ الكل</span>
                  <span class="text-lg">⟵</span>
                </RouterLink>
              </div>
            </div>
          </article>

          <!-- قائمة الأخبار -->
          <aside
            class="bg-white dark:bg-slate-900
                   rounded-3xl border border-slate-200 dark:border-slate-700
                   shadow-sm overflow-hidden flex flex-col reveal"
          >
            <div class="px-6 py-4 border-b border-slate-100">
              <h3
                class="text-sm font-semibold text-slate-600 dark:text-slate-100"
              >
                أحدث الأخبار
              </h3>
            </div>

            <div class="flex-1 divide-y divide-slate-100">
              <RouterLink
                v-for="(item, i) in news"
                :key="i"
                :to="item.link"
                class="group flex items-start gap-3 px-6 py-4 hover:bg-slate-50 transition-colors relative"
              >
                <span
                  class="absolute right-0 top-0 h-full w-[3px] bg-[#27AEB9] opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>

                <div class="flex-1">
                  <p
                    class="text-[11px] text-slate-400 dark:text-slate-500 mb-1"
                  >
                    {{ item.date }}
                  </p>
                  <p
                    class="text-[14px] font-semibold text-slate-800 dark:text-slate-100
                           leading-snug group-hover:text-[#27AEB9] transition-colors"
                  >
                    {{ item.title }}
                  </p>
                </div>
              </RouterLink>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- الخريطة -->
    <section class="relative py-16 overflow-hidden bg-section dark:bg-slate-950">
      <div class="mx-auto max-w-[1280px] px-6 pb-4 pt-0 text-center reveal">
        <h3 class="section-title section-title-wide">
          {{ mapSection.title }}
        </h3>

        <p class="text-slate-600 mb-3">
          {{ mapSection.description }}
        </p>

        <div class="rounded-2xl overflow-hidden border border-slate-200">
          <iframe
            class="w-full h-[380px]"
            style="border: 0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=31.0,10.0,55.0,20.5&layer=mapnik&marker=15.5,48.5"
          ></iframe>
        </div>

        <div class="mt-3">
          <RouterLink to="/projects/map" class="btn btn-outline">
            {{ mapSection.cta }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'

import patternUrl from '@/assets/images/pattern.png'
import slide1 from '@/assets/images/slaider1.png'
import slide2 from '@/assets/images/slaider2.png'
import slide3 from '@/assets/images/slaider3.png'
import story1 from '@/assets/images/STORY.png'
import project1 from '@/assets/images/project1.png'
import newsMainImage from '@/assets/logo.png'

import partnerLogo1 from '@/assets/logo.png'
import partnerLogo2 from '@/assets/logo2.png'

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
  description:
    'تعرّف على التسهيلات الحكومية التي تقدمها الهيئة، واحصل على الخدمات بكل سهولة.',
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

/* الإحصائيات */
const stats = ref([
  { number: '+500', label: 'المشاريع المنجزة' },
  { number: '+1200', label: 'رواد الأعمال المستفيدون' },
  { number: '+35', label: 'الشراكات الاستراتيجية' },
])

/* خدمات */
const services = ref([
  {
    title: 'التمويل',
    text: 'خدمات تمويل مبتكرة تساعد في نمو مشروعك.',
    routeName: 'service-funding',
  },
  {
    title: 'التسويق',
    text: 'دعم تسويقي على المنصات الرقمية وقنوات أخرى.',
    routeName: 'service-marketing',
  },
  {
    title: 'التدريب',
    text: 'برامج تدريبية واستشارات متخصصة لرواد الأعمال.',
    routeName: 'service-training',
  },
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

/* الأخبار */
const mainNews = ref({
  title: '“الهيئة” قامت بتحديث نظام الدعم الفني',
  summary:
    'تم تحديث نظام الدعم الفني لتحسين سرعة الاستجابة وجودة الخدمة المقدمة للمشاريع الصغيرة والمتوسطة عبر مختلف المحافظات.',
  date: '25 يوليو 2025',
  link: '/news/1',
  image: newsMainImage,
})
const news = ref([
  { title: 'افتتاح مبادرة دعم المشاريع الريفية', date: '8 أغسطس 2025', link: '/news/2' },
  { title: 'إطلاق برنامج تمويل جديد للمشاريع الناشئة', date: '1 أغسطس 2025', link: '/news/3' },
  { title: 'ورشة تدريبية لريادة الأعمال النسائية', date: '25 يوليو 2025', link: '/news/4' },
  { title: 'نتائج المبادرات السابقة للمشاريع الصغيرة', date: '15 يوليو 2025', link: '/news/5' },
])

const stories = ref([
  {
    title: 'قصة أثر',
    name: 'نبذة قصيرة عن قصة أثر',
    image: story1,
    slug: 'story-1',      // 👈 لازم يطابق /media/stories/story-1
  },
  {
    title: 'قصة ملهم ',
    name: 'عبدالرحمن محمد - رائد أعمال',
    image: 'https://via.placeholder.com/600x400?text=قصة+2',
    slug: 'story-2',
  },
  {
    title: 'تجربتي في الريادة',
    name: 'صالح أحمد - مستفيد من المبادرة',
    image: 'https://via.placeholder.com/600x400?text=قصة+3',
    slug: 'story-3',
  },
])


/* شركاء */
const partners = ref([
  partnerLogo1,
  partnerLogo2,
  partnerLogo2,
  partnerLogo2,
  partnerLogo2,
  partnerLogo2,
  partnerLogo1,
  partnerLogo2,
])

/* أنيميشن الأرقام (لو حاب تشغّله شف الكود السابق عندك) */

/* hero animation */
const heroTitle = ref(null)
const heroSub = ref(null)
const triggerHeroAnimation = () => {
  const t = heroTitle.value
  const s = heroSub.value
  if (t) {
    t.classList.remove('hero-animate')
    void t.offsetWidth
    t.classList.add('hero-animate')
  }
  if (s) {
    s.classList.remove('hero-animate-sub')
    void s.offsetWidth
    s.classList.add('hero-animate-sub')
  }
}

let revealObserver = null

onMounted(() => {
  sliderTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
    triggerHeroAnimation()
  }, 5000)

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show')
        else entry.target.classList.remove('show')
      })
    },
    { threshold: 0.15 },
  )

  document
    .querySelectorAll('.reveal')
    .forEach((el) => revealObserver.observe(el))

  nextTick(() => {
    const track = document.querySelector('.partners-track')
    if (track) {
      track.style.willChange = 'transform'
      track.style.animationTimingFunction = 'linear'
    }
  })
})

onUnmounted(() => {
  if (sliderTimer) clearInterval(sliderTimer)
  if (revealObserver) revealObserver.disconnect()
})

watch(currentSlide, () => {
  triggerHeroAnimation()
})
</script>

<style scoped>
/* لا نحتاج @import هنا؛ Rubik معرف في index.css */

/* خلفيات السكشن في اللايت */
.bg-section {
  background: #F6F9F9;
}
.bg-section-alt {
  background: #E6F3F5;
}

/* الداكن */
.dark .bg-section {
  background: #020617;
}
.dark .bg-section-alt {
  background: #0b1220;
}

/* عناوين الأقسام */
.section-title {
  font-weight: 900;
  font-size: 30px;
  margin: -40px 0 37px;
  text-align: center;
  color: #165C75;
  position: relative;
  letter-spacing: 0.2px;
}
.dark .section-title {
  color: #7BD4FF;
}
.section-title::after {
  content: "";
  width: 70px;
  height: 4px;
  display: block;
  margin: 6px auto 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #27aeb9, #185974);
  transform-origin: center;
  animation: barFloat 3s ease-in-out infinite;
  opacity: 0.95;
}

@keyframes barFloat {
  0%, 100% { transform: translateX(0); }
  50%      { transform: translateX(8px); }
}

/* الأزرار */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-width: 140px;
  min-height: 40px;
  padding: 0.55rem 1.2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.2;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease,
              transform .2s ease, box-shadow .2s ease;
}
.btn-solid {
  @apply btn;
  background: #27aeb9;
  color: #ffffff;
  border: 1px solid #27aeb9;
}
.btn-solid:hover {
  background: #1f8f98;
  border-color: #1f8f98;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(24,89,116,0.18);
}
.btn-outline {
  @apply btn;
  background: #ffffff;
  color: #185974;
  border: 1px solid #D8EDEE;
}
.btn-outline:hover {
  background: #e0f6f8;
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(24,89,116,0.12);
}
.dark .btn-outline {
  background: transparent;
  color: #7BD4FF;
  border-color: #38bdf8;
}
.dark .btn-outline:hover {
  background: #020617;
}

/* placeholder */
.ph {
  background: repeating-linear-gradient(45deg, #e9eef0, #e9eef0 10px, #f7fafb 10px, #f7fafb 20px);
  border: 1px dashed #cbd5e1;
}
.dark .ph {
  background: #020617;
  border-color: #1f2937;
}

/* إحصائيات */
.stat {
  position: relative;
  border-radius: 18px;
  padding: 1.75rem 1.5rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(231,249,251,0.7));
  border: 1px solid rgba(24,89,116,0.06);
  text-align: center;
  box-shadow: 0 10px 30px rgba(15, 76, 92, 0.06);
  overflow: visible;
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(.2,.9,.3,1), box-shadow 0.35s;
}
.dark .stat {
  background: #020617;
  border-color: #334155;
  box-shadow: 0 18px 40px rgba(0,0,0,0.6);
}
.stat::after {
  content: "";
  position: absolute;
  right: -30px;
  top: -30px;
  width: 140px;
  height: 140px;
  background:
    radial-gradient(circle at 30% 30%, rgba(39,174,185,0.12), transparent 40%),
    radial-gradient(circle at 70% 70%, rgba(24,89,116,0.08), transparent 45%);
  filter: blur(10px);
  z-index: 0;
  pointer-events: none;
  transform: rotate(10deg);
}
.stat .num {
  display: block;
  font-weight: 900;
  font-size: 26px;
  color: transparent;
  background: linear-gradient(90deg, #0f6c78, #27aeb9);
  -webkit-background-clip: text;
  background-clip: text;
  margin-bottom: 0.15rem;
  z-index: 2;
  position: relative;
}
.stat .lbl {
  display: block;
  color: #0f3d52;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.2px;
}
.dark .stat .lbl {
  color: #e5e7eb;
}
.stat:hover {
  transform: translateY(-8px) rotate(-0.6deg) scale(1.01);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
}

/* reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px) scale(0.99);
  transition: opacity 0.7s ease-in-out, transform 1s cubic-bezier(.2,.9,.3,1);
}
.reveal.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* hero text animation */
.hero-title, .hero-subtitle {
  opacity: 0;
  transform: translateY(20px);
}
.hero-animate { animation: heroFadeUp 0.8s ease-out forwards; }
.hero-animate-sub { animation: heroFadeUp 0.8s ease-out 0.15s forwards; }
@keyframes heroFadeUp { to { opacity: 1; transform: translateY(0); } }

/* شركاؤنا */
.partners-viewport {
  direction: ltr;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  cursor: grab;
  padding: 8px 0;
  scrollbar-width: none;
}
.partners-viewport::-webkit-scrollbar {
  height: 0;
}
.partners-track {
  display: flex;
  gap: 28px;
  align-items: center;
  animation: partnersAutoScroll 45s linear infinite;
}
.partner-card {
  flex: 0 0 auto;
  width: 150px;
  height: 96px;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  opacity: 0.9;
  transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
}
.dark .partner-card {
  background: #020617;
  box-shadow: 0 14px 30px rgba(0,0,0,0.6);
}
.partner-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(15,76,92,0.12);
  opacity: 1;
}
.partner-card img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

@keyframes partnersAutoScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* الكروت العامة */
.card-hover {
  transition: transform .35s cubic-bezier(.2,.9,.3,1), box-shadow .35s;
  box-shadow: 0 8px 22px rgba(15,76,92,0.10);
}
.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 40px rgba(15,76,92,0.18);
}

/* تعديلات بسيطة للموبايل */
@media (max-width: 900px) {
  .stat .num { font-size: 22px; }
}

</style>

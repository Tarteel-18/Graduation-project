<template>
  <header
    class="fixed top-0 left-0 right-0 z-40
           bg-white dark:bg-[#0f172a]
           border-b border-gray-100 dark:border-slate-700"
  >
    <nav class="mx-auto max-w-[1380px] px-4 h-20 flex items-center justify-between gap-6">
      <!-- الشعار -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 shrink-0 select-none cursor-pointer"
      >
        <img src="@/assets/logo.png" alt="شعار الهيئة" class="h-[60px] w-auto" />
      </RouterLink>

      <!-- روابط الديسكتوب -->
      <ul
        class="hidden lg:flex items-center gap-4 font-medium text-[16px]"
        :style="{ color: headColor }"
      >
        <!-- عن الهيئة -->
        <li class="relative whitespace-nowrap flex items-center">
          <button
            class="nav-link cursor-pointer hover:opacity-80 flex items-center gap-1"
            @click.stop="toggle('about')"
          >
            <span>عن الهيئة</span>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': openMenu === 'about' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
              />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="openMenu === 'about'"
              ref="aboutMenu"
              class="absolute right-0 top-full mt-3 w-56 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2"
            >
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/about" @click="openMenu = null">من نحن</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/faq" @click="openMenu = null">الأسئلة الشائعة</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/partners" @click="openMenu = null">الشركاء</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/studies" @click="openMenu = null">الدراسات</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/contact" @click="openMenu = null">تواصل معنا</RouterLink>
            </div>
          </transition>
        </li>

        <!-- الخدمات -->
        <li>
          <RouterLink class="nav-link hover:opacity-80" to="/services">
            الخدمات
          </RouterLink>
        </li>

        <!-- التسهيلات الحكومية -->
        <li>
          <RouterLink class="nav-link hover:opacity-80" to="/gov-facilities">
            التسهيلات الحكومية
          </RouterLink>
        </li>

        <!-- الإعلام والتوعية -->
        <li class="relative whitespace-nowrap flex items-center">
          <button
            class="nav-link hover:opacity-80 flex items-center gap-1"
            @click.stop="toggle('media')"
          >
            <RouterLink to="/media" class="inline-flex items-center gap-1">
              <span>قسم الإعلام والتوعية</span>
            </RouterLink>
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': openMenu === 'media' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"
              />
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="openMenu === 'media'"
              ref="mediaMenu"
              class="absolute right-0 top-full mt-3 w-64 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2"
            >
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/flashes" @click="openMenu = null">فلاشات توعوية</RouterLink>
              <RouterLink
                class="dd-item"
                :style="{ color: headColor }"
                :to="{ name: 'news-index' }"
                @click="openMenu = null"
              >
                أخبار
              </RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/stories" @click="openMenu = null">قصص نجاح</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/radio" @click="openMenu = null">حلقات إذاعية</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/nasheed" @click="openMenu = null">أناشيد</RouterLink>
            </div>
          </transition>
        </li>

        <!-- روابط أخرى -->
        <li>
          <RouterLink class="nav-link hover:opacity-80" to="/projects">
            المشاريع
          </RouterLink>
        </li>
        <li>
          <RouterLink class="nav-link hover:opacity-80" to="/ads">
            الإعلانات
          </RouterLink>
        </li>
        <li>
          <RouterLink class="nav-link hover:opacity-80" to="/start">
            روج لمشروعك
          </RouterLink>
        </li>
      </ul>

      <!-- أزرار يسار -->
      <div class="flex items-center gap-2">
        <!-- زر سجّل مشروعك -->
        <button
          @click="goToRegisterProjectForm"
          class="hidden md:inline-block px-3.5 py-1.5 rounded-xl text-white whitespace-nowrap"
          :style="{ backgroundColor: linkColor }"
        >
          سجّل مشروعك
        </button>

        <!-- زر الدارك مود -->
        <button
          class="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-[#020617] dark:border-slate-600 dark:text-slate-100"
          :style="{ borderColor: linkColor, color: linkColor }"
          @click="toggleDark"
        >
          <svg v-if="!isDark" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              stroke="currentColor"
              stroke-width="1.8"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            />
          </svg>
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
              stroke="currentColor"
              stroke-width="1.8"
            />
            <path
              d="M12 2v2.5M12 19.5V22M4.22 4.22 5.8 5.8M18.2 18.2l1.58 1.58M2 12h2.5M19.5 12H22M4.22 19.78 5.8 18.2M18.2 5.8 19.78 4.22"
              stroke="currentColor"
              stroke-width="1.8"
            />
          </svg>
        </button>

        <!-- زر الحساب (يبقى فوق فقط) -->
        <RouterLink
          :to="isLoggedIn ? '/profile' : '/login'"
          class="inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
          :style="{ borderColor: linkColor, color: linkColor }"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-width="1.8" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 1 0-14 0"/>
          </svg>
        </RouterLink>

        <!-- زر منيو الموبايل -->
        <button
          class="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
          :style="{ borderColor: linkColor, color: linkColor }"
          @click="mobileOpen = !mobileOpen"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-width="1.8" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- منيو الموبايل -->
    <transition name="fade">
      <div
        v-if="mobileOpen"
        class="lg:hidden fixed inset-0 z-50 flex justify-start
               bg-white/60 dark:bg-[#0f172a]/70 backdrop-blur-sm"
      >
        <div
          class="relative w-[78%] max-w-xs h-full bg-white/90 dark:bg-[#0f172a]/95
                 border-r border-slate-100 dark:border-slate-700
                 pt-6 pb-8 px-4 space-y-4"
          :style="{ color: headColor }"
          dir="rtl"
        >
          <!-- الشعار في أعلى المنيو -->
          <div class="flex items-center justify-between mb-6">
            <img src="@/assets/logo.png" alt="شعار الهيئة" class="h-10 w-auto" />

            <button
              class="w-8 h-8 flex items-center justify-center rounded-full
                     border border-slate-200 dark:border-slate-600 text-slate-500"
              @click="mobileOpen = false"
            >
              ✕
            </button>
          </div>

          <!-- الروابط -->
          <div class="space-y-2 text-[16px]">
            <details class="mobile-item">
              <summary>
                <span>عن الهيئة</span>
                <span class="circle-arrow">
                  <span class="chevron"></span>
                </span>
              </summary>
              <div class="children">
                <RouterLink class="block py-1" to="/about" @click="mobileOpen = false">من نحن</RouterLink>
                <RouterLink class="block py-1" to="/faq" @click="mobileOpen = false">الأسئلة الشائعة</RouterLink>
                <RouterLink class="block py-1" to="/partners" @click="mobileOpen = false">الشركاء</RouterLink>
                <RouterLink class="block py-1" to="/studies" @click="mobileOpen = false">الدراسات</RouterLink>
                <RouterLink class="block py-1" to="/contact" @click="mobileOpen = false">تواصل معنا</RouterLink>
              </div>
            </details>

            <RouterLink class="mobile-link" to="/services" @click="mobileOpen = false">
              الخدمات
            </RouterLink>

            <RouterLink class="mobile-link" to="/gov-facilities" @click="mobileOpen = false">
              التسهيلات الحكومية
            </RouterLink>

            <details class="mobile-item">
              <summary>
                <span>قسم الإعلام والتوعية</span>
                <span class="circle-arrow">
                  <span class="chevron"></span>
                </span>
              </summary>
              <div class="children">
                <RouterLink class="block py-1" to="/media/flashes" @click="mobileOpen = false">فلاشات توعوية</RouterLink>
                <RouterLink class="block py-1" :to="{ name: 'news-index' }" @click="mobileOpen = false">أخبار</RouterLink>
                <RouterLink class="block py-1" to="/media/stories" @click="mobileOpen = false">قصص نجاح</RouterLink>
                <RouterLink class="block py-1" to="/media/radio" @click="mobileOpen = false">حلقات إذاعية</RouterLink>
                <RouterLink class="block py-1" to="/media/nasheed" @click="mobileOpen = false">أناشيد</RouterLink>
              </div>
            </details>

            <RouterLink class="mobile-link" to="/projects" @click="mobileOpen = false">
              المشاريع
            </RouterLink>
            <RouterLink class="mobile-link" to="/ads" @click="mobileOpen = false">
              الإعلانات
            </RouterLink>
            <RouterLink class="mobile-link" to="/start" @click="mobileOpen = false">
              روج لمشروعك
            </RouterLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

const isDark = ref(false)
const headColor = computed(() => (isDark.value ? '#E5F4F7' : '#185974'))
const linkColor = computed(() => (isDark.value ? '#38BDF8' : '#27AEB9'))

const openMenu = ref(null)
const mobileOpen = ref(false)

const aboutMenu = ref(null)
const mediaMenu = ref(null)

onMounted(() => {
  const saved = sessionStorage.getItem('theme')

  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    isDark.value = false
    sessionStorage.setItem('theme', 'light')
  }

  applyDarkMode()
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

function toggle(which) {
  openMenu.value = openMenu.value === which ? null : which
}

function toggleDark() {
  isDark.value = !isDark.value
  sessionStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyDarkMode()
}

function applyDarkMode() {
  const html = document.documentElement
  if (isDark.value) html.classList.add('dark')
  else html.classList.remove('dark')
}

function onClickOutside(e) {
  const els = [aboutMenu.value, mediaMenu.value]
  if (!els.some(el => el && el.contains(e.target))) {
    openMenu.value = null
  }
}

function goToRegisterProjectForm() {
  if (!isLoggedIn.value) {
    router.push({
      name: 'login',
      query: { redirect: '/form/small-project-register' },
    })
  } else {
    router.push('/form/small-project-register')
  }
}
</script>

<style scoped>
.dd-item {
  @apply block rounded-lg px-3 py-2 transition-colors duration-150;
}
.dd-item:hover {
  background-color: #d8eaec;
  color: #185974;
}
.dd-item:active,
.dd-item:focus {
  background-color: #b2dade;
  color: #185974;
}

.nav-link {
  @apply inline-flex items-center;
  height: 48px;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.mobile-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 0.7rem 0;
}
.dark .mobile-item {
  border-color: #1f2937;
}

.mobile-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  list-style: none;
}
.mobile-item summary::-webkit-details-marker {
  display: none;
}

.mobile-item .children {
  margin-top: 0.4rem;
  padding-right: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

/* نفس شكل العناوين الرئيسية مع هوفر */
.mobile-item .children a {
  display: block;
  padding: 0.25rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: #185974;
  transition: color 0.15s ease;
}
.dark .mobile-item .children a {
  color: #E5F4F7;
}
.mobile-item .children a:hover {
  color: #27aeb9;
}

.dark .mobile-item .children {
  color: #cbd5f5;
}

.mobile-link {
  display: block;
  padding: 0.9rem 0;
  border-bottom: 1px solid #e5e7eb;
}
.dark .mobile-link {
  border-color: #1f2937;
}
.mobile-link:hover {
  color: #27aeb9;
}

.mobile-item summary:hover {
  color: #27aeb9;
}

/* دائرة + سهم */
.circle-arrow {
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 1px solid #27aeb9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* سهم أنحف ومضبوط في الوسط */
.circle-arrow .chevron {
  width: 8px;
  height: 8px;
  border-right: 1.8px solid #27aeb9;
  border-bottom: 1.8px solid #27aeb9;
  transform: rotate(45deg);
  transform-origin: center;
  transition: transform 0.2s ease;
}

/* عند الفتح: لفوق */
.mobile-item[open] .circle-arrow .chevron {
  transform: rotate(-135deg);
}
</style>

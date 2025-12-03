<template>
  <header
    class="fixed top-0 left-0 right-0 z-40
           bg-white/70 dark:bg-[#0f172a]/80
           backdrop-blur-md
           border-b border-gray-100 dark:border-slate-700"
  >
    <nav class="mx-auto max-w-[1380px] px-0 h-20 flex items-center justify-between gap-3">

      <!-- الشعار -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 shrink-0 select-none cursor-pointer"
      >
        <img src="@/assets/logo.png" alt="شعار الهيئة" class="h-[65px] w-auto" />
      </RouterLink>

      <!-- روابط الديسكتوب -->
      <ul
        class="hidden lg:flex items-center gap-4 font-medium text-[16px]"
        :style="{ color: headColor }"
      >

        <!-- عن الهيئة -->
        <li class="relative whitespace-nowrap">
          <span
            class="nav-link cursor-pointer hover:opacity-80"
            @click.stop="toggle('about')"
          >
            عن الهيئة
          </span>

          <button
            class="ms-1"
            :style="{ color: linkColor }"
            @click.stop="toggle('about')"
            aria-label="عن الهيئة"
          >
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
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/contact" @click="openMenu = null">اتصل بنا</RouterLink>
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
          <RouterLink class="nav-link hover:opacity-80" to="/media">
            قسم الإعلام والتوعية
          </RouterLink>

          <button
            class="ms-1"
            :style="{ color: linkColor }"
            @click.stop="toggle('media')"
            aria-label="الإعلام والتوعية"
          >
            <svg
              class="w-4 h-4 transition-transform"
              :class="{ 'rotate-180': openMenu === 'media' }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z"/>
            </svg>
          </button>

          <transition name="fade">
            <div
              v-if="openMenu === 'media'"
              ref="mediaMenu"
              class="absolute right-0 top-full mt-3 w-64 rounded-xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg p-2"
            >
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/flashes" @click="openMenu = null">فلاشات توعوية</RouterLink>
              <RouterLink class="dd-item" :style="{ color: headColor }" to="/media/news" @click="openMenu = null">أخبار</RouterLink>
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

        <!-- زر سجّل مشروعك → يفتح فورم ديناميكي مع شرط تسجيل الدخول -->
        <button
          @click="goToRegisterProjectForm"
          class="hidden md:inline-block px-3.5 py-1.5 rounded-xl text-white whitespace-nowrap"
          :style="{ backgroundColor: linkColor }"
        >
          سجّل مشروعك
        </button>

        <RouterLink
          to="/en"
          class="hidden md:inline-block px-2.5 py-1.5 rounded-xl border bg-white dark:bg-slate-900 whitespace-nowrap"
          :style="{ borderColor: linkColor, color: linkColor }"
        >
          EN
        </RouterLink>

        <!-- زر الدارك مود -->
        <button
          class="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-[#020617] dark:border-slate-600 dark:text-slate-100"
          :style="{ borderColor: linkColor }"
          @click="toggleDark"
        >
          <!-- وضع فاتح = يظهر أيقونة القمر -->
          <svg v-if="!isDark" class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-width="1.8"
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
          </svg>
          <!-- وضع داكن = يظهر أيقونة الشمس -->
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7" />
            <path stroke="currentColor" stroke-width="1.7" d="M12 2v2.5M12 19.5V22M4.22 4.22 5.8 5.8M18.2 18.2l1.58 1.58M2 12h2.5M19.5 12H22M4.22 19.78 5.8 18.2M18.2 5.8 19.78 4.22"/>
          </svg>
        </button>

        <RouterLink
          :to="isLoggedIn ? '/profile' : '/login'"
          class="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-100"
          :style="{ borderColor: linkColor, color: linkColor }"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path stroke="currentColor" stroke-width="1.8" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 1 0-14 0"/>
          </svg>
        </RouterLink>

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

    <!-- قائمة الموبايل -->
    <transition name="fade">
      <div
        v-if="mobileOpen"
        class="lg:hidden border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-900"
      >
        <div
          class="mx-auto max-w-[1380px] px-3 py-3 space-y-2 text-[16px]"
          :style="{ color: headColor }"
          dir="rtl"
        >

          <details>
            <summary class="py-2 cursor-pointer whitespace-nowrap">عن الهيئة</summary>
            <div class="ps-3 mt-1 space-y-1">
              <RouterLink class="block py-1" to="/about">من نحن</RouterLink>
              <RouterLink class="block py-1" to="/faq">الأسئلة الشائعة</RouterLink>
              <RouterLink class="block py-1" to="/partners">الشركاء</RouterLink>
              <RouterLink class="block py-1" to="/studies">الدراسات</RouterLink>
              <RouterLink class="block py-1" to="/contact">اتصل بنا</RouterLink>
            </div>
          </details>

          <RouterLink class="block py-2" to="/services">الخدمات</RouterLink>
          <RouterLink class="block py-2" to="/gov-facilities">التسهيلات الحكومية</RouterLink>

          <details>
            <summary class="py-2 cursor-pointer whitespace-nowrap">قسم الإعلام والتوعية</summary>
            <div class="ps-3 mt-1 space-y-1">
              <RouterLink class="block py-1" to="/media/flashes">فلاشات توعوية</RouterLink>
              <RouterLink class="block py-1" to="/media/news">أخبار</RouterLink>
              <RouterLink class="block py-1" to="/media/stories">قصص نجاح</RouterLink>
              <RouterLink class="block py-1" to="/media/radio">حلقات إذاعية</RouterLink>
              <RouterLink class="block py-1" to="/media/nasheed">أناشيد</RouterLink>
            </div>
          </details>

          <RouterLink class="block py-2" to="/projects">المشاريع</RouterLink>
          <RouterLink class="block py-2" to="/ads">الإعلانات</RouterLink>
          <RouterLink class="block py-2" to="/start">روح لمشروعك</RouterLink>

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

// 🌙 حالة الدارك مود
const isDark = ref(false)

// ألوان الهيدر والدروب داون تتغيّر حسب الدارك/لايت
const headColor = computed(() => (isDark.value ? '#E5F4F7' : '#185974'))
const linkColor = computed(() => (isDark.value ? '#38BDF8' : '#27AEB9'))

const openMenu = ref(null)
const mobileOpen = ref(false)

const aboutMenu = ref(null)
const mediaMenu = ref(null)

// قراءة الثيم من localStorage + تطبيقه
onMounted(() => {
  const saved = localStorage.getItem('theme')
  isDark.value = saved === 'dark'
  applyDarkMode()

  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})

function toggle(which) {
  openMenu.value = openMenu.value === which ? null : which
}

// تبديل وضع الدارك
function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyDarkMode()
}

// تطبيق كلاس dark على <html>
function applyDarkMode() {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

function onClickOutside(e) {
  const els = [aboutMenu.value, mediaMenu.value]
  if (!els.some(el => el && el.contains(e.target))) {
    openMenu.value = null
  }
}

// 🔹 زر "سجّل مشروعك"
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

/* كلاس موحّد لعناوين الهيدر */
.nav-link {
  @apply inline-flex items-center;
  height: 40px;
}

/* الترانزيشن حق القوائم */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

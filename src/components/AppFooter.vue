<template>
  <!-- الفوتر بكامل عرض الصفحة -->
  <footer
    class="pt-10 bg-[#165C75] text-white dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300"
  >
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-3 gap-8 items-start">
        
        <!-- عمود يمين: نبذة -->
        <div>
          <h3 class="font-semibold text-[21px] mb-3">
            الهيئة العامة لتنمية المشاريع الصغيرة والأصغر
          </h3>
          <p
            class="leading-relaxed text-[21px] text-white/90 dark:text-slate-200"
          >
            هدفنا دعم وتمكين المشاريع الصغيرة في اليمن من خلال توفير الدعم المالي والمعرفي والتقني.
          </p>
        </div>

        <!-- عمود وسط: روابط سريعة -->
        <div class="text-center">
          <h4 class="font-semibold text-[21px] mb-3">
            روابط سريعة
          </h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/"
                class="hover:underline text-[21px] text-white/90 dark:text-slate-200"
              >
                الرئيسية
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="hover:underline text-[21px] text-white/90 dark:text-slate-200"
              >
                عن الهيئة
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/services"
                class="hover:underline text-[21px] text-white/90 dark:text-slate-200"
              >
                خدماتنا
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/contact"
                class="hover:underline text-[21px] text-white/90 dark:text-slate-200"
              >
                تواصل معنا
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- عمود يسار: تواصل معنا -->
        <div class="md:text-left text-center">
          <h4 class="font-semibold text-[21px] mb-3">
            تواصل معنا
          </h4>
          <ul class="space-y-2 text-[21px] text-white/90 dark:text-slate-200">
            <li>📍 صنعاء – الدائري – جولة غزة (كنتاكي) سابقًا – عمارة المعتلي</li>
            <li>📞 780040072</li>
            <li>✉️ info@gasmed.gov.ye</li>
          </ul>

          <!-- أيقونات -->
          <div class="flex md:justify-start justify-center gap-3 mt-3">
            <a href="#" class="soc" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path
                  d="M13 3h4a1 1 0 0 1 1 1v3h-3a2 2 0 0 0-2 2v3h5l-1 4h-4v8h-4v-8H7v-4h2V9a6 6 0 0 1 6-6z"
                />
              </svg>
            </a>

            <a href="#" class="soc" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path
                  d="M20 3a10 10 0 0 0-17 10l-2 6 6-2A10 10 0 1 0 20 3zm-8 16a8 8 0 0 1-4.1-1.1L6 18l.1-1.8A8 8 0 1 1 12 19z"
                />
              </svg>
            </a>

            <a href="#" class="soc" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                />
              </svg>
            </a>

            <a href="#" class="soc" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path
                  d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8zM9.8 15.5V8.5L15.5 12z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <!-- شريط سفلي -->
      <div
        class="text-center text-[18px] py-6 mt-6 border-t border-white/20 dark:border-slate-700 text-white/80 dark:text-slate-400"
      >
        © 2025 الهيئة العامة لتنمية المشاريع الصغيرة والأصغر. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.soc {
  @apply inline-flex items-center justify-center w-10 h-10 rounded-full
         bg-white/10 hover:bg-white/20
         dark:bg-slate-800 dark:hover:bg-slate-700
         text-white dark:text-slate-100 transition-colors duration-200;
}
</style>
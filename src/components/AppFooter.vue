<template>
  <footer
    class="pt-10 bg-[#0F6075] dark:bg-slate-900 text-white transition-colors duration-300"
  >
    <div class="max-w-[1200px] mx-auto px-4">
      <div class="grid md:grid-cols-4 gap-8 items-start text-[14px]">
        <!-- عن الهيئة -->
        <div class="md:text-right text-center">
          <h4 class="font-semibold text-[16px] mb-3 text-white">
            عن الهيئة
          </h4>
          <div class="h-px bg-white/25 mb-3"></div>
          <ul class="space-y-1 text-white/90">
            <li><RouterLink to="/about">من نحن</RouterLink></li>
            <li><RouterLink to="/about/board">مجلس الإدارة</RouterLink></li>
            <li><RouterLink to="/about/team">الفر يق التنفيذي</RouterLink></li>
            <li><RouterLink to="/about/structure">الهيكل التنظيمي</RouterLink></li>
          </ul>
        </div>

        <!-- الدعم والمساندة -->
        <div class="md:text-right text-center">
          <h4 class="font-semibold text-[16px] mb-3 text-white">
            الدعم والمساندة
          </h4>
          <div class="h-px bg-white/25 mb-3"></div>
          <ul class="space-y-1 text-white/90">
            <li><RouterLink to="/contact">اتصل بنا</RouterLink></li>
            <li><RouterLink to="/faq">الأسئلة الشائعة</RouterLink></li>
            <li><RouterLink to="/privacy">سياسة الخصوصية</RouterLink></li>
            <li><RouterLink to="/terms">سياسة الاستخدام</RouterLink></li>
          </ul>
        </div>

        <!-- روابط مهمة -->
        <div class="md:text-right text-center">
          <h4 class="font-semibold text-[16px] mb-3 text-white">
            روابط مهمة
          </h4>
          <div class="h-px bg-white/25 mb-3"></div>
          <ul class="space-y-1 text-white/90">
            <li><RouterLink to="/">الرئيسية</RouterLink></li>
            <li><RouterLink to="/about">عن الهيئة</RouterLink></li>
            <li><RouterLink to="/services">خدماتنا</RouterLink></li>
            <li><RouterLink to="/contact">تواصل معنا</RouterLink></li>
          </ul>
        </div>

        <!-- تواصل معنا -->
        <div class="md:text-right text-center">
          <h4 class="font-semibold text-[16px] mb-3 text-white">
            تواصل معنا
          </h4>
          <div class="h-px bg-white/25 mb-3"></div>
          <ul class="space-y-1 text-white/90">
            <li>صنعاء – الدائري – جولة غزة (كنتاكي) سابقًا – عمارة المعتلي</li>

            <li>
              📞
              <a
                href="https://wa.me/967780040073"
                target="_blank"
                rel="noopener"
                class="underline-offset-2 hover:underline"
              >
                780040073
              </a>
            </li>

            <li>✉️ info@gasmed.gov.ye</li>
          </ul>

          <!-- الأيقونات -->
          <div class="flex justify-center md:justify-start gap-3 mt-4">
            <!-- فيسبوك -->
            <a
              href="https://www.facebook.com/share/1Lk2sKUtik/"
              target="_blank"
              rel="noopener"
              class="soc"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path
                  d="M13 3h4a1 1 0 0 1 1 1v3h-3a2 2 0 0 0-2 2v3h5l-1 4h-4v8h-4v-8H7v-4h2V9a6 6 0 0 1 6-6z"
                />
              </svg>
            </a>

            <!-- تيليغرام -->
            <a
              href="https://t.me/samea777"
              target="_blank"
              rel="noopener"
              class="soc"
              aria-label="Telegram"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M3.5 11.5 19.5 4.5c.6-.27 1.2.3 1 .9l-3 13c-.15.63-.93.87-1.43.44l-4.1-3.53-2.5 2.1c-.6.5-1.53.18-1.65-.6l-.4-3.06-3.3-1.26c-.78-.3-.8-1.38-.02-1.59Z"
                  stroke="white"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>

            <!-- واتساب -->
            <a
              href="https://wa.me/967780040073"
              target="_blank"
              rel="noopener"
              class="soc"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 32 32" width="16" height="16" fill="none">
                <path
                  d="M16 3C9.37 3 4 8.37 4 15c0 2.1.54 4.07 1.57 5.86L4 29l8.36-1.53A11.7 11.7 0 0 0 16 27c6.63 0 12-5.37 12-12S22.63 3 16 3Z"
                  stroke="white"
                  stroke-width="2"
                  fill="none"
                />
                <path
                  d="M12.9 11.2c-.2-.45-.4-.46-.6-.46h-.5c-.2 0-.5.07-.8.38s-1.1 1.07-1.1 2.6 1.1 3 1.26 3.2c.16.21 2.2 3.5 5.4 4.78 2.67 1.06 3.21.85 3.8.8.58-.06 1.87-.77 2.14-1.52.26-.75.26-1.39.18-1.52-.07-.13-.26-.2-.55-.35s-1.7-.84-1.96-.94-.45-.15-.64.15-.73.94-.9 1.13-.33.17-.61.06c-.28-.1-1.18-.44-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.09-.58.09-.12.21-.3.31-.45.1-.15.13-.25.2-.41.07-.16.04-.3-.02-.42-.07-.13-.63-1.54-.89-2.11Z"
                  fill="white"
                />
              </svg>
            </a>

            <!-- X -->
            <a
              href="https://x.com/Gasmed28Gasmed?t=MTnUmxS6FGUDzKghkLtP9A&s=09"
              target="_blank"
              rel="noopener"
              class="soc"
              aria-label="X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path d="M4 3h4l4 5 4-5h4l-7 8 7 10h-4l-5-7-5 7H4l7-10z" />
              </svg>
            </a>

            <!-- يوتيوب -->
            <a
              href="https://youtube.com/channel/UCL-scONsm7whLMk2rc1aCaA?si=AJ-dMnJlO-RLQKGQ"
              target="_blank"
              rel="noopener"
              class="soc"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
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
        class="text-center text-[13px] py-5 mt-6 border-t border-white/20 text-white/80"
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
  @apply inline-flex items-center justify-center w-9 h-9 rounded-full
         bg-white/10 hover:bg-white/20
         text-white transition-colors duration-200;
}
</style>

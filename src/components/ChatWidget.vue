<template>
  <!-- زر الشات العائم --> <div class="fixed bottom-6 left-6 z-40"> <button @click="isOpen = !isOpen" class="flex items-center justify-center hover:scale-110 transition-transform duration-200" >
     <img :src="chatIcon" alt="chat" class="w-20 h-20 object-contain" /> </button> </div>

  <!-- نافذة الشات --> <transition name="fade"> <div v-if="isOpen" :class="[ 'fixed z-40 bg-white border border-slate-200 flex flex-col transition-all duration-300 overflow-hidden shadow-2xl', isMaximized ? 'inset-0 w-full h-full rounded-none' : 'bottom-24 left-6 w-[400px] h-[520px] rounded-2xl' ]" >

      
      <!-- الهيدر -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#0A8096] text-white">

        <!-- 🔹 الأيقونة + النص في اليمين -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center overflow-hidden">
            <img :src="chatIcon" class="w-full h-full object-cover" />
          </div>
          <span class="text-lg font-semibold tracking-wide">الهيئة</span>
        </div>

        <!-- 🔹 أزرار التكبير + الإغلاق في اليسار -->
        <div class="flex items-center gap-4 text-xl">
          <button @click="toggleMax" class="hover:scale-110 transition-transform">⤢</button>
          <button @click="closeChat" class="hover:scale-110 transition-transform">✕</button>
        </div>
      </div>

<!-- محتوى الرسائل -->
<div class="flex-1 bg-[#F4F7F8] px-4 py-5 overflow-y-auto" dir="rtl">

  <!-- رسالة بوت 1 -->
  <div class="mb-6">
    <div class="flex justify-start">   <!-- ← الآن تظهر الرسالة على اليمين -->
      <div class="flex items-start gap-3">

        <!-- الأيقونة (يمين) -->
        <div class="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center overflow-hidden">
          <img :src="chatIcon" class="w-full h-full object-cover" />
        </div>

        <!-- الفقاعة (يسار الأيقونة لكن كلها يمين الشاشة) -->
        <div class="max-w-[75%] bg-white rounded-2xl rounded-tl-none px-4 py-2 text-sm text-slate-900 shadow">
          مرحباً! أنا هنا وجاهز لمساعدتك.
        </div>

      </div>
    </div>

    <!-- الوقت -->
    <div class="text-[11px] text-slate-500 text-left pl-12 mt-1">
      6:52 PM
    </div>
  </div>

  <!-- رسالة بوت 2 -->
  <div class="mb-6">
    <div class="flex justify-start">
      <div class="flex items-start gap-3">

        <!-- الأيقونة -->
        <div class="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center overflow-hidden">
          <img :src="chatIcon" class="w-full h-full object-cover" />
        </div>

        <!-- الفقاعة -->
        <div class="max-w-[75%] bg-white rounded-2xl rounded-tl-none px-4 py-2 text-sm text-slate-900 shadow">
          كيف أستطيع مساعدتك اليوم؟
        </div>

      </div>
    </div>

    <div class="text-[11px] text-slate-500 text-left pl-12 mt-1">
      6:52 PM
    </div>
  </div>

</div>


      <!-- إدخال الرسائل -->
      <div class="border-t border-slate-200 bg-white px-4 py-3" dir="rtl">
        <div class="relative">

          <input
            type="text"
            v-model="message"
            @keyup.enter="sendMessage"
            class="w-full rounded-3xl border border-slate-300 bg-[#F8FCFF] pr-12 pl-4 py-3 text-sm text-slate-700 outline-none"
            placeholder="اكتب رسالتك هنا..."
          />

          <button
            @click="sendMessage"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#1AA3C4] text-2xl rotate-180"
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import chatIcon from '@/assets/images/chat-icon.png'

const isOpen = ref(false)
const isMaximized = ref(false)
const message = ref('')

const sendMessage = () => {
  if (!message.value.trim()) return
  console.log('رسالة مرسلة:', message.value)
  message.value = ''
}

// فتح/إغلاق من زر الأيقونة
const toggleOpen = () => {
  // لو كان مغلق → افتحه دائماً بالحجم الصغير
  if (!isOpen.value) {
    isMaximized.value = false
    isOpen.value = true
  } else {
    // لو مفتوح → يقفل فقط
    isOpen.value = false
  }
}

// زر الإغلاق داخل الشات
const closeChat = () => {
  isOpen.value = false
  isMaximized.value = false // عشان يرجع صغير لما نفتح مرة ثانية
}

const toggleMax = () => {
  isMaximized.value = !isMaximized.value
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

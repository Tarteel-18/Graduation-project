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
<div class="flex-1 bg-[#F4F7F8] px-4 py-5 overflow-y-auto" dir="rtl" ref="messagesContainer">

  <!-- رسائل المحادثة -->
  <div v-for="(msg, index) in messages" :key="index" class="mb-6">
    <!-- رسالة المستخدم -->
    <div v-if="msg.type === 'user'" class="flex justify-end mb-2">
      <div class="max-w-[75%] bg-[#0A8096] text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm shadow">
        {{ msg.text }}
      </div>
    </div>

    <!-- رسالة البوت -->
    <div v-else class="flex justify-start">
      <div class="flex items-start gap-3">
        <!-- الأيقونة -->
        <div class="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
          <img :src="chatIcon" class="w-full h-full object-cover" />
        </div>

        <!-- الفقاعة -->
        <div class="max-w-[75%] bg-white rounded-2xl rounded-tl-none px-4 py-2 text-sm text-slate-900 shadow">
          <div v-if="msg.loading" class="flex items-center gap-2">
            <span class="animate-pulse">جاري الكتابة</span>
            <span class="animate-bounce">...</span>
          </div>
          <div v-else class="whitespace-pre-wrap">{{ msg.text }}</div>
        </div>
      </div>
    </div>

    <!-- الوقت -->
    <div v-if="msg.timestamp" :class="msg.type === 'user' ? 'text-right' : 'text-left pl-12'" class="text-[11px] text-slate-500 mt-1">
      {{ formatTime(msg.timestamp) }}
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
            :disabled="isLoading || !message.trim()"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-[#1AA3C4] text-2xl rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>

        </div>

      </div>

    </div>
  </transition>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import chatIcon from '@/assets/images/chat-icon.png'

const API_BASE_URL = 'http://localhost:8001'

const isOpen = ref(false)
const isMaximized = ref(false)
const message = ref('')
const isLoading = ref(false)
const messages = ref([
  {
    type: 'bot',
    text: 'مرحباً! أنا هنا وجاهز لمساعدتك. كيف أستطيع مساعدتك اليوم؟',
    timestamp: new Date()
  }
])
const messagesContainer = ref(null)

// تنسيق الوقت
const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`
}

// إرسال الرسالة
const sendMessage = async () => {
  if (!message.value.trim() || isLoading.value) return

  const userMessage = message.value.trim()
  message.value = ''

  // إضافة رسالة المستخدم
  messages.value.push({
    type: 'user',
    text: userMessage,
    timestamp: new Date()
  })

  // إضافة رسالة تحميل للبوت
  const loadingMessage = {
    type: 'bot',
    text: '',
    loading: true,
    timestamp: new Date()
  }
  messages.value.push(loadingMessage)

  isLoading.value = true
  scrollToBottom()

  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // تحديث رسالة التحميل بالرد
    const loadingIndex = messages.value.findIndex(m => m.loading)
    if (loadingIndex !== -1) {
      messages.value[loadingIndex] = {
        type: 'bot',
        text: data.response || 'عذراً، لم أتمكن من توليد إجابة.',
        loading: false,
        timestamp: new Date()
      }
    }
  } catch (error) {
    console.error('Error sending message:', error)
    
    // تحديث رسالة التحميل بخطأ
    const loadingIndex = messages.value.findIndex(m => m.loading)
    if (loadingIndex !== -1) {
      messages.value[loadingIndex] = {
        type: 'bot',
        text: 'عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.',
        loading: false,
        timestamp: new Date()
      }
    }
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

// التمرير للأسفل
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
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
  scrollToBottom()
}

// عند فتح الشات، التمرير للأسفل
onMounted(() => {
  scrollToBottom()
})
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

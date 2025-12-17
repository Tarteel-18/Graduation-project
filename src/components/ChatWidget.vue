<template>
  <!-- زر فتح الشات -->
  <div class="fixed bottom-6 left-6 z-40">
    <button
      @click="toggleOpen"
      class="flex items-center justify-center hover:scale-110 transition-transform duration-200"
    >
      <img :src="chatIcon" alt="chat" class="w-20 h-20 object-contain" />
    </button>
  </div>

  <!-- طبقة الخلفية لإغلاق الشات عند الضغط خارج -->
  <transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-30"
      @click="closeChat"
    ></div>
  </transition>

  <!-- نافذة الشات -->
  <transition name="fade">
    <div
      v-if="isOpen"
      :class="[
        'fixed z-40 flex flex-col transition-all duration-300 overflow-hidden shadow-2xl',
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
        isMaximized
          ? 'inset-0 w-full h-full rounded-none'
          : 'bottom-24 left-6 w-[400px] h-[520px] rounded-2xl'
      ]"
      @click.stop
    >
      <!-- الهيدر -->
      <div class="flex items-center justify-between px-4 py-3 bg-[#0A8096] dark:bg-slate-800 text-white">
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-white/20 border border-white/40
                   flex items-center justify-center overflow-hidden"
          >
            <img :src="chatIcon" class="w-full h-full object-cover" />
          </div>
          <span class="text-lg font-semibold tracking-wide">الهيئة</span>
        </div>

        <div class="flex items-center gap-4 text-xl">
          <button @click="toggleMax" class="hover:scale-110 transition-transform">⤢</button>
          <button @click="closeChat" class="hover:scale-110 transition-transform">✕</button>
        </div>
      </div>

      <!-- محتوى الرسائل -->
      <div
        class="flex-1 px-4 py-5 overflow-y-auto bg-[#F4F7F8] dark:bg-slate-800"
        dir="rtl"
        ref="messagesContainer"
      >
        <div v-for="(msg, index) in messages" :key="index" class="mb-2">
          <!-- رسالة المستخدم (يمين) -->
          <div v-if="msg.type === 'user'" class="mb-4 flex justify-end">
            <div class="flex flex-col items-end max-w-[75%]">
              <div
                class="bg-[#0A8096] text-white
                       rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow"
              >
                <div class="whitespace-pre-wrap">
                  {{ msg.text }}
                </div>
              </div>

              <span
                v-if="msg.timestamp"
                class="mt-1 text-[10px] text-slate-500 dark:text-slate-400"
              >
                {{ formatTime(msg.timestamp) }}
              </span>
            </div>
          </div>

          <!-- رسالة البوت + حالة جاري الكتابة -->
          <div v-else>
            <!-- رسالة البوت العادية -->
            <div v-if="!msg.loading" class="flex flex-col items-end">
              <div class="flex items-start gap-2">
                <!-- الأيقونة -->
                <div
                  class="w-8 h-8 rounded-full bg-white dark:bg-slate-700
                         border border-slate-300 dark:border-slate-600
                         flex items-center justify-center overflow-hidden shrink-0"
                >
                  <img :src="chatIcon" class="w-full h-full object-cover" />
                </div>

                <!-- فقاعة الرد -->
                <div
                  class="max-w-[75%] rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow
                         bg-white dark:bg-slate-700
                         text-slate-900 dark:text-slate-100 text-right"
                >
                  <div class="whitespace-pre-wrap">
                    {{ msg.text }}
                  </div>
                </div>
              </div>

              <span
                v-if="msg.timestamp"
                class="mt-1 text-[10px] text-slate-500 dark:text-slate-400 text-right w-full pr-10"
              >
                {{ formatTime(msg.timestamp) }} · الهيئة بوت
              </span>
            </div>

            <!-- فقاعة "جاري الكتابة..." في الشق الثاني -->
            <div v-else class="flex justify-start mt-1">
              <div
                class="ml-10 max-w-[70%] rounded-2xl rounded-tl-none px-4 py-2 text-sm shadow
                       bg-white/80 dark:bg-slate-700/80
                       text-slate-700 dark:text-slate-100 text-right"
              >
                جاري الكتابة ...
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- إدخال الرسائل -->
      <div
        class="border-t border-slate-200 dark:border-slate-700
               bg-white dark:bg-slate-900 px-4 py-3"
        dir="rtl"
      >
        <div class="relative">
          <input
            type="text"
            v-model="message"
            @keyup.enter="sendMessage"
            class="w-full rounded-3xl border border-slate-300 dark:border-slate-600
                   bg-[#F8FCFF] dark:bg-slate-800
                   pr-12 pl-4 py-3 text-sm
                   text-slate-700 dark:text-slate-100
                   outline-none"
            placeholder="اكتب رسالتك هنا..."
          />

          <button
            @click="sendMessage"
            :disabled="isLoading || !message.trim()"
            class="absolute right-3 top-1/2 -translate-y-1/2
                   text-[#1AA3C4] text-2xl rotate-180
                   disabled:opacity-50 disabled:cursor-not-allowed"
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

// فتح/إغلاق الشات من الزر
const toggleOpen = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(scrollToBottom)
  }
}

// تنسيق الوقت
const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`
}

// إرسال الرسالة
const sendMessage = async () => {
  if (!message.value.trim() || isLoading.value) return

  const userMessage = message.value.trim()
  message.value = ''

  messages.value.push({
    type: 'user',
    text: userMessage,
    timestamp: new Date()
  })

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
      body: JSON.stringify({ message: userMessage })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const loadingIndex = messages.value.findIndex(m => m.loading)
    if (loadingIndex !== -1) {
      messages.value[loadingIndex] = {
        type: 'bot',
        text: data.response || 'عذراً، لم أتمكن من توليد إجابة.',
        loading: false,
        typeBot: true,
        timestamp: new Date()
      }
    }
  } catch (error) {
    console.error('Error sending message:', error)

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

const closeChat = () => {
  isOpen.value = false
  isMaximized.value = false
}

const toggleMax = () => {
  isMaximized.value = !isMaximized.value
  scrollToBottom()
}

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

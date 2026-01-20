'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// API Base URL - uses environment variable or defaults to Render backend
// In Next.js, NEXT_PUBLIC_* env vars are available at build time for client components
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://graduation-project-w0wk.onrender.com'

interface Message {
  type: 'user' | 'bot'
  text: string
  loading?: boolean
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      text: 'مرحباً! أنا هنا وجاهز لمساعدتك. كيف أستطيع مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ])

  const suggestedQuestions = [
    'ما هي الهيئة العامة لتنمية المشاريع الصغيرة والأصغر؟',
    'هل تقدم الهيئة خدمات إلكترونية؟',
    'هل الهيئة جهة تمويلية مباشرة؟',
    'استفسارات عامة',
    'هل تساعد الهيئة في إنشاء مشروع من الصفر؟',
  ]

  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(scrollToBottom, 0)
    }
  }

  const formatTime = (date: Date) => {
    if (!date) return ''
    const d = new Date(date)
    const hours = d.getHours()
    const minutes = d.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, '0')}${ampm}`
  }

  const sendSuggested = (q: string) => {
    if (isLoading) return
    setMessage(q)
    setShowSuggestions(false)
    setTimeout(() => {
      sendMessage(q)
    }, 0)
  }

  const sendMessage = async (suggestedMessage?: string) => {
    const messageToSend = suggestedMessage || message.trim()
    if (!messageToSend || isLoading) return

    setShowSuggestions(false)
    setMessage('')

    const userMessage: Message = {
      type: 'user',
      text: messageToSend,
      timestamp: new Date()
    }

    const loadingMessage: Message = {
      type: 'bot',
      text: '',
      loading: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setIsLoading(true)
    scrollToBottom()

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageToSend })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setMessages(prev => {
        const newMessages = [...prev]
        const loadingIndex = newMessages.findIndex(m => m.loading)
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = {
            type: 'bot',
            text: data.response || 'عذراً، لم أتمكن من توليد إجابة.',
            loading: false,
            timestamp: new Date()
          }
        }
        return newMessages
      })
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev]
        const loadingIndex = newMessages.findIndex(m => m.loading)
        if (loadingIndex !== -1) {
          newMessages[loadingIndex] = {
            type: 'bot',
            text: 'عذراً، حدث خطأ في الاتصال بالخادم.',
            loading: false,
            timestamp: new Date()
          }
        }
        return newMessages
      })
    } finally {
      setIsLoading(false)
      scrollToBottom()
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
      }
    }, 0)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMaximized(false)
  }

  const toggleMax = () => {
    setIsMaximized(!isMaximized)
    scrollToBottom()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <>
      {/* زر فتح الشات */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleOpen}
          className="flex items-center justify-center hover:scale-110 transition-transform duration-200"
        >
          <Image
            src="/assets/images/chat-icon.png"
            alt="chat"
            width={80}
            height={80}
            className="object-contain"
          />
        </button>
      </div>

      {/* طبقة الخلفية لإغلاق الشات عند الضغط خارج */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 transition-opacity duration-200"
          onClick={closeChat}
          style={{ opacity: isOpen ? 1 : 0 }}
        />
      )}

      {/* نافذة الشات */}
      {isOpen && (
        <div
          className={`fixed z-40 flex flex-col transition-all duration-300 overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 ${
            isMaximized
              ? 'inset-0 w-full h-full rounded-none'
              : 'bottom-24 left-6 w-[400px] h-[520px] rounded-2xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* الهيدر */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0A8096] dark:bg-slate-800 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/images/chat-icon.png"
                  alt="chat icon"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold tracking-wide">الهيئة</span>
            </div>

            <div className="flex items-center gap-4 text-xl">
              <button onClick={toggleMax} className="hover:scale-110 transition-transform">⤢</button>
              <button onClick={closeChat} className="hover:scale-110 transition-transform">✕</button>
            </div>
          </div>

          {/* محتوى الرسائل */}
          <div
            ref={messagesContainerRef}
            className="flex-1 px-4 py-5 overflow-y-auto bg-[#F4F7F8] dark:bg-slate-800"
            dir="rtl"
          >
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                {/* رسالة المستخدم (يمين) */}
                {msg.type === 'user' ? (
                  <div className="mb-4 flex justify-end">
                    <div className="flex flex-col items-end max-w-[75%]">
                      <div className="bg-[#0A8096] text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow">
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                      {msg.timestamp && (
                        <span className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                          {formatTime(msg.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  /* رسالة البوت + حالة جاري الكتابة */
                  <div>
                    {!msg.loading ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-start gap-2">
                          {/* الأيقونة */}
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center overflow-hidden shrink-0">
                            <Image
                              src="/assets/images/chat-icon.png"
                              alt="bot icon"
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          {/* فقاعة الرد */}
                          <div className="max-w-[75%] rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-right">
                            <div className="whitespace-pre-wrap">{msg.text}</div>
                          </div>
                        </div>
                        {msg.timestamp && (
                          <span className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 text-right w-full pr-10">
                            {formatTime(msg.timestamp)} · الهيئة بوت
                          </span>
                        )}
                      </div>
                    ) : (
                      /* فقاعة "جاري الكتابة..." */
                      <div className="flex justify-start mt-1">
                        <div className="ml-10 max-w-[70%] rounded-2xl rounded-tl-none px-4 py-2 text-sm shadow bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-100 text-right">
                          جاري الكتابة ...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* الأسئلة المقترحة */}
          {showSuggestions && suggestedQuestions.length > 0 && (
            <div className="px-4 pt-3 pb-4 bg-[#F4F7F8] dark:bg-slate-800 border-t border-slate-200/0" dir="rtl">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendSuggested(q)}
                    className="px-4 py-2 rounded-full text-sm bg-white text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* إدخال الرسائل */}
          <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3" dir="rtl">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-3xl border border-slate-300 dark:border-slate-600 bg-[#F8FCFF] dark:bg-slate-800 pr-12 pl-4 py-3 text-sm text-slate-700 dark:text-slate-100 outline-none"
                placeholder="اكتب رسالتك هنا..."
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !message.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1AA3C4] text-2xl rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


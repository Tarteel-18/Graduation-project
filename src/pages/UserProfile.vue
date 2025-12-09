<template>
  <div class="mx-auto mt-12 max-w-[1300px] px-4 pb-20" dir="rtl">
    <!-- Breadcrumb -->
    <div class="mx-auto max-w-[1300px] px-4 mt-6 mb-4">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">الرئيسية</RouterLink>
        <span>›</span>
        <span class="text-[#165C75] dark:text-cyan-300 font-semibold">الصفحة الشخصية</span>
      </nav>
    </div>

    <!-- زر الخروج -->
    <div class="mx-auto max-w-[1300px] px-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
      <div class="text-right"></div>

      <button
        @click="handleLogout"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl
               border border-[#F97373] text-[#F97373] bg-white dark:bg-slate-900
               text-sm font-semibold hover:bg-[#F97373] hover:text-white
               shadow-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
        </svg>
        <span>خروج من الحساب</span>
      </button>
    </div>

    <!-- بطاقة رأس الصفحة -->
    <section class="mx-auto max-w-[1300px] mb-8">
      <div
        class="relative overflow-hidden rounded-[32px] bg-gradient-to-l
               from-[#0E607C] via-[#137A90] to-[#1BA4B6]
               text-white shadow-lg"
      >
        <div class="absolute inset-0 bg-black/10"></div>

        <div class="relative px-8 pt-10 pb-12 flex flex-col lg:flex-row gap-10 lg:items-center">
          <!-- صورة المستخدم -->
          <div class="flex flex-col items-center gap-4">
            <div
              class="w-[160px] h-[160px] rounded-[28px] overflow-hidden border border-white/40
                     shadow-lg bg-white/20 backdrop-blur-md"
            >
              <img :src="user.avatar" class="w-full h-full object-cover" />
            </div>

            <!-- زر تغيير الصورة -->
            <label
              class="relative inline-flex items-center justify-center px-7 py-2 rounded-full
                     bg-white/15 text-white text-xs font-semibold cursor-pointer
                     border border-white/40 backdrop-blur-sm
                     hover:bg-white/25 hover:border-white/70
                     tracking-wide transition-all duration-200"
            >
              <input
                type="file"
                accept="image/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="onAvatarChange"
              />
              تغيير الصورة الشخصية
            </label>
          </div>

          <!-- بيانات المستخدم -->
          <div class="flex-1 text-right space-y-4">
            <h2 class="text-3xl font-bold">{{ user.name }}</h2>

            <div class="space-y-1 text-[15px] text-slate-50/90">
              <p>البريد: <span class="font-semibold">{{ user.email }}</span></p>
              <p>رقم الهاتف: <span class="font-semibold">{{ user.phone }}</span></p>
            </div>

            <!-- إحصائيات -->
            <div class="flex flex-wrap gap-3 pt-3 text-[13px]">
              <div class="stat-chip">
                <span class="dot bg-emerald-300"></span>
                {{ user.projectsCount }} مشاريع
              </div>
              <div class="stat-chip">
                <span class="dot bg-amber-300"></span>
                {{ user.pendingRequests }} طلبات قيد المراجعة
              </div>
              <div class="stat-chip">
                <span class="dot bg-rose-300"></span>
                {{ user.rejectedRequests }} طلبات غير مقبولة
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs مع هوفر -->
    <div class="mx-auto max-w-[1300px] px-1 flex flex-wrap gap-3 mb-8">
      <button
        v-for="item in tabs"
        :key="item.value"
        @click="tab = item.value"
        class="px-8 py-2 rounded-full text-sm font-semibold transition border"
        :class="tab === item.value
          ? 'bg-[#165C75] text-white shadow border-transparent dark:bg-cyan-500'
          : 'bg-white border-[#BFD0D3] text-[#165C75] dark:bg-slate-900 dark:text-cyan-200 dark:border-slate-700 hover:bg-[#F3FBFC] hover:border-[#7BB6C6]'"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- نظرة عامة -->
    <section
      v-if="tab === 'overview'"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8"
    >
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">حالة الحساب</h3>
          <p class="text-sm text-slate-700 dark:text-slate-200 mb-4">
            يمكنك متابعة طلباتك وآخر التحديثات من هنا.
          </p>
          <div class="h-2 rounded-full bg-[#D9EEF2] dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-[#27AEB9]" style="width:70%"></div>
          </div>
        </div>

        <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">أحدث طلب</h3>
          <p class="text-sm text-slate-700 dark:text-slate-200 mb-2">
            نوع: {{ lastRequest.type }}
          </p>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">
            تم التقديم منذ {{ lastRequest.daysAgo }} أيام
          </p>
          <button class="px-5 py-1.5 rounded-full bg-[#FFEED1] text-[#C7780A] text-sm font-semibold">
            قيد المراجعة
          </button>
        </div>

        <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-3">أحدث مشروع</h3>
          <p class="text-sm text-slate-700 dark:text-slate-200 mb-2">{{ lastProject.name }}</p>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">
            الموقع: {{ lastProject.location }}
          </p>
          <button class="px-5 py-1.5 rounded-full bg-[#D8F4DF] text-[#1B7A35] text-sm font-semibold">
            مقبول
          </button>
        </div>
      </div>
    </section>

    <!-- طلباتي -->
    <section
      v-else-if="tab === 'requests'"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8"
    >
      <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-xl mb-4">قائمة الطلبات</h3>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-right">
          <thead>
            <tr class="border-b bg-[#F4FBFB] dark:bg-slate-800">
              <th class="py-3 px-4">#</th>
              <th class="py-3 px-4">النوع</th>
              <th class="py-3 px-4">الوصف</th>
              <th class="py-3 px-4">التاريخ</th>
              <th class="py-3 px-4">الحالة</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(req, i) in requests"
              :key="req.id"
              class="border-b hover:bg-[#F9FBFC] dark:hover:bg-slate-800"
            >
              <td class="py-3 px-4">{{ i + 1 }}</td>
              <td class="py-3 px-4">{{ req.type }}</td>
              <td class="py-3 px-4">{{ req.desc }}</td>
              <td class="py-3 px-4">{{ req.date }}</td>
              <td class="py-3 px-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                  :class="statusBadgeClass(req.status)"
                >
                  {{ req.statusLabel }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- مشاريعي -->
    <section
      v-else-if="tab === 'projects'"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8"
    >
      <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-xl mb-4">مشاريعي</h3>

      <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-8 py-6">
        <div class="grid md:grid-cols-2 gap-6">
          <article
            v-for="proj in projects"
            :key="proj.id"
            class="bg-white dark:bg-slate-900 rounded-[22px] px-6 py-5 shadow-sm"
          >
            <h4 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-2">
              {{ proj.name }}
            </h4>
            <p class="text-sm text-slate-700 dark:text-slate-200 mb-1">
              {{ proj.shortDesc }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-300 mb-1">
              الحجم: {{ proj.size }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-300 mb-1">
              المدينة: {{ proj.city }} — {{ proj.district }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- الإعدادات -->
    <section
      v-else-if="tab === 'settings'"
      class="mx-auto max-w-[1300px] bg-white dark:bg-slate-900 rounded-[32px]
             border border-[#E5EDF0] dark:border-slate-700 shadow-sm px-10 py-10 mb-8"
    >
      <div class="grid md:grid-cols-2 gap-6">
        <!-- تغيير كلمة المرور -->
        <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-4">
            تغيير كلمة المرور
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                كلمة المرور الحالية
              </label>
              <input type="password" class="input" />
            </div>

            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                كلمة المرور الجديدة
              </label>
              <input type="password" class="input" />
            </div>

            <button class="btn-primary">حفظ</button>
          </div>
        </div>

        <!-- بيانات الحساب -->
        <div class="bg-[#F4FBFB] dark:bg-slate-800 rounded-[26px] px-6 py-6">
          <h3 class="text-[#165C75] dark:text-cyan-300 font-bold text-lg mb-4">
            بيانات الحساب
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                الاسم الكامل
              </label>
              <input v-model="user.name" type="text" class="input" />
            </div>

            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                البريد الإلكتروني
              </label>
              <input v-model="user.email" type="email" class="input" />
            </div>

            <div>
              <label class="block text-sm text-slate-600 dark:text-slate-200 mb-1">
                رقم الهاتف
              </label>
              <input v-model="user.phone" type="tel" class="input" />
            </div>

            <button class="btn-primary">تحديث البيانات</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import avatarImg from '@/assets/images/profile-demo.jpg'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/')
}

const tab = ref('overview')

const tabs = [
  { label: 'نظرة عامة', value: 'overview' },
  { label: 'طلباتي', value: 'requests' },
  { label: 'مشاريعي', value: 'projects' },
  { label: 'الإعدادات', value: 'settings' },
]

const user = ref({
  name: 'محمد إسماعيل',
  email: 'moh@gmail.com',
  phone: '777777777',
  avatar: avatarImg,
  projectsCount: 3,
  pendingRequests: 2,
  rejectedRequests: 1,
})

const lastRequest = ref({
  type: 'دعم فني',
  daysAgo: 3,
})

const lastProject = ref({
  name: 'المشغل اليدوي',
  location: 'صنعاء — السبعين',
})

const requests = ref([
  { id: 1, type: 'دعم فني', desc: 'استشارة فنية', date: '2025-07-12', status: 'pending', statusLabel: 'قيد المراجعة' },
  { id: 2, type: 'مذكرة', desc: 'مطابقة مواصفات', date: '2025-07-12', status: 'approved', statusLabel: 'مقبول' },
])

const projects = ref([
  { id: 1, name: 'المشغل اليدوي', shortDesc: 'إنتاج جلابيات', size: 'صغير', city: 'صنعاء', district: 'السبعين' },
  { id: 2, name: 'المشغل اليدوي', shortDesc: 'إنتاج جلابيات', size: 'صغير', city: 'صنعاء', district: 'السبعين' },
])

const statusBadgeClass = (status) => ({
  pending: 'bg-[#FFEED1] text-[#C7780A]',
  approved: 'bg-[#D8F4DF] text-[#1B7A35]',
  rejected: 'bg-[#FBD5D5] text-[#B91C1C]',
}[status] || 'bg-gray-100 text-gray-600')

const onAvatarChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const url = URL.createObjectURL(file)
  user.value.avatar = url
}
</script>

<style scoped>
.stat-chip {
  @apply flex items-center gap-2 bg-white/10 rounded-2xl px-4 py-2 text-sm;
}
.dot {
  @apply w-2 h-2 rounded-full;
}

.input {
  @apply w-full rounded-xl border border-[#BFD0D3] px-4 py-2 text-sm
         bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100
         focus:border-[#165C75] dark:focus:border-cyan-400 outline-none;
}

.btn-primary {
  @apply mt-2 w-full md:w-auto px-8 py-2 rounded-xl
         bg-[#165C75] text-white text-sm font-semibold hover:bg-[#0e4257]
         dark:bg-cyan-500 dark:hover:bg-cyan-400;
}
</style>

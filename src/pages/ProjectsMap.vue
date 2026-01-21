<template>
  <div class="mx-auto max-w-[1300px] px-4 mt-10 pb-20" dir="rtl">
    <!-- breadcrumb -->
    <div class="mt-4 mb-6">
      <nav class="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
        <RouterLink to="/" class="hover:text-[#165C75] dark:hover:text-cyan-300">
          الرئيسية
        </RouterLink>
        <span>›</span>
        <span class="text-[#000000] dark:text-cyan-300 font-semibold">
          مشاريعنا حسب المحافظات
        </span>
      </nav>
    </div>

    <!-- العنوان والوصف -->
    <header class="mb-6 text-right">
      <h1 class="text-3xl font-bold text-[#000000] dark:text-cyan-300 mb-2">
        مشاريعنا حسب المحافظات
      </h1>
      <p class="text-slate-600 dark:text-slate-300 text-[15px]">
        هنا توضح الخريطة التفاعلية للمشاريع حسب المحافظة (قيد التنفيذ).
      </p>
    </header>

    <!-- كرت الخريطة -->
    <div
      class="bg-white dark:bg-slate-800 rounded-[28px]
             border border-[#E5EDF0] dark:border-slate-700
             shadow-sm overflow-hidden"
    >
      <!-- الخريطة (Leaflet) -->
      <div id="projects-map" class="w-full h-[420px] md:h-[520px]"></div>

      <!-- شريط تحت الخريطة -->
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-3
               px-5 py-4 bg-[#F5FAFB] dark:bg-slate-900"
      >
        <p class="text-sm text-slate-600 dark:text-slate-300 text-right">
          حرّك المؤشر فوق علامة المشروع في الخريطة لعرض اسمه وصورته.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import L from 'leaflet'

// بيانات تجريبية للمشاريع مع الصور
const projects = ref([
  {
    id: 1,
    name: 'مشروع حاضنات المشاريع الصغيرة',
    location: 'مركز صنعاء - صنعاء',
    lat: 15.3694,
    lng: 44.1910,
    image: '/images/projects/incubator.jpg',
  },
  {
    id: 2,
    name: 'مشروع دعم الشباب الريادي – تعز',
    location: 'مدينة تعز',
    lat: 13.5789,
    lng: 44.0170,
    image: '/images/projects/riyadi-taiz.jpg',
  },
  {
    id: 3,
    name: 'مشروع تطوير المنتجات الزراعية – إب',
    location: 'محافظة إب',
    lat: 14.0049,
    lng: 44.2479,
    image: '/images/projects/agri-ibb.jpg',
  },
])

let mapInstance

onMounted(() => {
  // إنشاء الخريطة
  mapInstance = L.map('projects-map').setView([15.5, 44.5], 6)

  // طبقة OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(mapInstance)

  // إضافة ماركر لكل مشروع مع بوب‑أب يفتح عند hover
  projects.value.forEach((p) => {
    const marker = L.marker([p.lat, p.lng]).addTo(mapInstance)

    const popupHtml = `
      <div style="direction:rtl; text-align:right; max-width:280px;">
        <div style="display:flex; gap:12px; align-items:center;">
          <div style="flex:1;">
            <strong style="display:block; margin-bottom:4px; font-size:14px;">
              ${p.name}
            </strong>
            <span style="font-size:12px; color:#555;">${p.location}</span>
          </div>
          ${
            p.image
              ? `
          <div style="width:110px; height:70px; overflow:hidden; border-radius:10px;">
            <img src="${p.image}" style="width:100%; height:100%; object-fit:cover;" />
          </div>`
              : ''
          }
        </div>
      </div>
    `

    marker.bindPopup(popupHtml)

    // فتح البوب‑أب عند مرور الماوس
    marker.on('mouseover', () => {
      marker.openPopup()
    })

    // إغلاقه عند خروج الماوس
    marker.on('mouseout', () => {
      marker.closePopup()
    })
  })
})

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.remove()
  }
})
</script>

<style scoped>
#projects-map :deep(.leaflet-container) {
  width: 100%;
  height: 100%;
}
</style>

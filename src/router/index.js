// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Faq from '../pages/Faq.vue'
import Partners from '../pages/Partners.vue'
import Services from '../pages/Services.vue'

const SplashVideo = () => import('@/pages/SplashVideo.vue')

// صفحات الإعلام
import MediaIndex from '@/pages/MediaIndex.vue'
import MediaFlashes from '@/pages/MediaFlashes.vue'
import MediaStories from '@/pages/MediaStories.vue'
import MediaFlashesCategory from '@/pages/MediaFlashesCategory.vue'

// صفحات الإعلانات
const AdsIndex  = () => import('@/pages/AdsIndex.vue')
const AdDetail  = () => import('@/pages/AdDetail.vue')

// صفحة تفاصيل قصة نجاح
const StoryDetail = () => import('@/pages/StoryDetail.vue')

// صفحات الأخبار
const NewsIndex  = () => import('@/pages/NewsIndex.vue')
const NewsDetail = () => import('@/pages/NewsDetail.vue')

// صفحة الفورم الديناميكي
const DynamicFormView = () => import('../views/DynamicForm.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // الرئيسية على '/'
    { path: '/',       name: 'home',   component: Home },

    // السبلاش على مسار مستقل
    { path: '/splash', name: 'splash', component: SplashVideo, meta: { hideLayout: true } },

    { path: '/about',    name: 'about',    component: About },
    { path: '/faq',      name: 'faq',      component: Faq },
    { path: '/partners', name: 'partners', component: Partners },

    // الشركاء المنفذون
    {
      path: '/partners/executors',
      name: 'partners-executors',
      component: () => import('../pages/PartnersExecutors.vue'),
    },

    // الشركاء الممولون
    {
      path: '/partners/funders',
      name: 'partners-funders',
      component: () => import('@/pages/PartnersFunded.vue'),
    },

    // قسم الإعلام والتوعية
    { path: '/media',         name: 'media-index',   component: MediaIndex },
    { path: '/media/flashes', name: 'media-flashes', component: MediaFlashes },

    {
      path: '/media/flashes/:category/:slug',
      name: 'media-flash-detail',
      component: () => import('../pages/MediaFlashVideoDetail.vue'),
    },
    {
      path: '/media/flashes/:slug',
      name: 'media-flashes-category',
      component: MediaFlashesCategory,
    },

    // قصص النجاح
    { path: '/media/stories',       name: 'media-stories', component: MediaStories },
    { path: '/media/stories/:slug', name: 'story-detail',  component: StoryDetail },

    { path: '/media/radio',   name: 'media-radio',   component: () => import('../pages/MediaRadio.vue') },
    { path: '/media/nasheed', name: 'media-nasheed', component: () => import('../pages/MediaNasheed.vue') },

    // التسهيلات الحكومية
    {
      path: '/gov-facilities',
      name: 'GovFacilities',
      component: () => import('../pages/GovFacilities.vue'),
    },

    // الخدمات الرئيسية
    {
      path: '/services',
      name: 'services',
      component: Services,
    },

    // خدمات فرعية
    {
      path: '/services/training',
      name: 'service-training',
      component: () => import('../pages/ServiceTraining.vue'),
    },
    {
      path: '/services/marketing',
      name: 'service-marketing',
      component: () => import('../pages/ServiceMarketing.vue'),
    },
    {
      path: '/services/consulting',
      name: 'service-consulting',
      component: () => import('../pages/ServiceConsulting.vue'),
    },
    {
      path: '/services/funding',
      name: 'service-funding',
      component: () => import('../pages/ServiceFunding.vue'),
    },

    // الإعلانات
    { path: '/ads',     name: 'ads-index', component: AdsIndex },
    { path: '/ads/:id', name: 'ad-detail', component: AdDetail, props: true },

    // الأخبار
    { path: '/news',     name: 'news-index',  component: NewsIndex },
    { path: '/news/:id', name: 'news-detail', component: NewsDetail, props: true },

    // صفحات أخرى
    { path: '/studies',  name: 'studies',  component: () => import('../pages/Studies.vue') },
    { path: '/projects', name: 'projects', component: () => import('../pages/Projects.vue') },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../pages/ProjectDetail.vue'),
    },

    { path: '/contact',  name: 'contact',  component: () => import('../pages/Contact.vue') },
    { path: '/start',    name: 'start',    component: () => import('../pages/StartProject.vue') },
    { path: '/register', name: 'register', component: () => import('../pages/Register.vue') },
    { path: '/login',    name: 'login',    component: () => import('../pages/Login.vue') },
    { path: '/profile',  name: 'profile',  component: () => import('../pages/UserProfile.vue') },

    // فورمات ديناميكية (محميّة)
    {
      path: '/form/:slug',
      name: 'dynamic-form',
      component: DynamicFormView,
      meta: { hideLayout: true, requiresAuth: true },
    },
  ],

  scrollBehavior: () => ({ top: 0 }),
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
    return
  }

  if (!hasSeenSplash && to.name === 'home') {
    sessionStorage.setItem('hasSeenSplash', 'true')
    next({ name: 'splash' })
    return
  }

  next()
})

export default router

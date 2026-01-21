<template>
  <FlashesCategoryLayout
    :title="current.title"
    :breadcrumb-label="current.breadcrumbLabel"
    :description="current.description"
    :videos="current.videos"
    :category-slug="currentSlug"
  />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import FlashesCategoryLayout from '@/components/FlashesCategoryLayout.vue'

import imgHome1 from '@/assets/images/home-vid-1.png'
import imgHome2 from '@/assets/images/home-vid-1.png'
import imgHome3 from '@/assets/images/home-vid-1.png'
import imgHome4 from '@/assets/images/home-vid-1.png'
import imgHome5 from '@/assets/images/home-vid-1.png'
import imgHome6 from '@/assets/images/home-vid-1.png'

import imgAnimal1 from '@/assets/images/home-vid-1.png'
import imgAnimal2 from '@/assets/images/home-vid-1.png'
import imgAnimal3 from '@/assets/images/home-vid-1.png'

import imgLearn1 from '@/assets/images/home-vid-1.png'
import imgLearn2 from '@/assets/images/home-vid-1.png'
import imgLearn3 from '@/assets/images/home-vid-1.png'
import imgLearn4 from '@/assets/images/home-vid-1.png'
import imgLearn5 from '@/assets/images/home-vid-1.png'
import imgLearn6 from '@/assets/images/home-vid-1.png'

const route = useRoute()

const CATEGORIES = {
  'home-industry': {
    breadcrumbLabel: 'فيديوهات توعوية (الصناعات المنزلية)',
    title: 'فيديوهات توعوية (الصناعات المنزلية)',
    description: 'مجموعة فيديوهات توضح خطوات الصناعات الغذائية المنزلية بطريقة آمنة وسهلة.',
    videos: [
      { id: 1, slug: 'cream-cheese',   title: 'إنتاج الجبن السائل (الكريمي) في البيت',      image: imgHome1 },
      { id: 2, slug: 'salty-cheese',   title: 'إنتاج الجبن المالح في البيت',                 image: imgHome2 },
      { id: 3, slug: 'milk-powder',    title: 'إنتاج الزبادي من الحليب البودرة في المنزل',  image: imgHome3 },
      { id: 4, slug: 'apple-jam',      title: 'إنتاج مربى التفاح الطبيعي في البيت',          image: imgHome4 },
      { id: 5, slug: 'strawberry-jam', title: 'إنتاج مربى الفراولة الطبيعي في البيت',        image: imgHome5 },
      { id: 6, slug: 'dry-tomato',     title: 'تجفيف الطماطم خلال مواسم الوفرة',             image: imgHome6 },
    ],
  },

  'animal-health': {
    breadcrumbLabel: 'فلاشات توعوية (الصحة الحيوانية)',
    title: 'فلاشات توعوية (الصحة الحيوانية)',
    description: 'مواد مرئية توعوية للحفاظ على صحة المواشي وتحسين الإنتاج.',
    videos: [
      { id: 1, slug: 'msg-1', title: 'رسالة توعوية لمربي المواشي 1', image: imgAnimal1 },
      { id: 2, slug: 'msg-2', title: 'رسالة توعوية لمربي المواشي 2', image: imgAnimal2 },
      { id: 3, slug: 'msg-3', title: 'رسالة توعوية لمربي المواشي 3', image: imgAnimal3 },
    ],
  },

  'learn-in-a-minute': {
    breadcrumbLabel: 'سلسلة تعلّم في دقيقة',
    title: 'سلسلة تعلّم في دقيقة',
    description: 'فيديوهات سريعة تسلط الضوء على مهارات ونصائح لأصحاب المشاريع الصغيرة.',
    videos: [
      { id: 1, slug: 'skill-1', title: 'مهارة 1', image: imgLearn1 },
      { id: 2, slug: 'skill-2', title: 'مهارة 2', image: imgLearn2 },
      { id: 3, slug: 'skill-3', title: 'مهارة 3', image: imgLearn3 },
      { id: 4, slug: 'skill-4', title: 'مهارة 4', image: imgLearn4 },
      { id: 5, slug: 'skill-5', title: 'مهارة 5', image: imgLearn5 },
      { id: 6, slug: 'skill-6', title: 'مهارة 6', image: imgLearn6 },
    ],
  },
}

const currentSlug = computed(() => route.params.slug || 'home-industry')

const current = computed(() => CATEGORIES[currentSlug.value] || CATEGORIES['home-industry'])
</script>

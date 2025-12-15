<template>
  <div
    class="min-h-screen bg-[#F4FAFB] dark:bg-slate-950 py-10
           transition-colors duration-300"
    dir="rtl"
  >
    <div class="mx-auto max-w-[900px] px-4">

      <!-- كرت العنوان -->
      <div
        v-if="formDef"
        class="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden mb-6
               border border-slate-100 dark:border-slate-700"
      >
        <div class="h-3 bg-[#06A6C8]"></div>
        <div class="px-8 py-6">
          <h1 class="text-xl md:text-2xl font-extrabold text-[#163B52] dark:text-cyan-300 mb-2">
            {{ formDef.title }}
          </h1>
          <p
            v-if="formDef.description"
            class="text-sm text-slate-500 dark:text-slate-300"
          >
            {{ formDef.description }}
          </p>
        </div>
      </div>

      <!-- تحميل -->
      <div v-if="loading" class="text-center text-slate-500 dark:text-slate-300">
        جاري تحميل النموذج...
      </div>

      <!-- خطأ / فورم مش موجود -->
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>

      <!-- المحتوى الأساسي للفورم -->
      <form
        v-else
        @submit.prevent="onSubmit"
        class="space-y-5 bg-white dark:bg-slate-900
               rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700
               px-6 md:px-8 py-6"
      >
        <!-- الحقول -->
        <div
          v-for="field in formDef.fields"
          :key="field.name"
        >
          <component
            :is="resolveFieldComponent(field)"
            v-model="formData[field.name]"
            :label="field.label"
            :placeholder="field.placeholder"
            :description="field.description"
            :options="field.options"
            :error="errors[field.name]"
          />
        </div>

        <!-- الأزرار -->
        <div class="flex items-center justify-between pt-2">
          <button
            type="button"
            @click="resetForm"
            class="text-sm text-[#06A6C8] dark:text-cyan-300 hover:underline"
          >
            محو النموذج
          </button>

          <button
            type="submit"
            class="px-10 py-2.5 rounded-xl bg-[#06A6C8] hover:bg-[#0587A2]
                   text-white font-semibold text-sm transition-colors"
          >
            إرسال
          </button>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { formsConfig } from '@/data/formsConfig'

import BaseTextField from '@/components/form/BaseTextField.vue'
import BaseTextareaField from '@/components/form/BaseTextareaField.vue'
import BaseFileUpload from '@/components/form/BaseFileUpload.vue'
import BaseRadioGroup from '@/components/form/BaseRadioGroup.vue'
import BaseCheckboxGroup from '@/components/form/BaseCheckboxGroup.vue'

const route = useRoute()
const router = useRouter()

const formDef = ref(null)
const loading = ref(true)
const error = ref('')

const formData = reactive({})
const errors = reactive({})

const resolveFieldComponent = (field) => {
  switch (field.type) {
    case 'text':
    case 'tel':
    case 'number':
    case 'email':
      return BaseTextField
    case 'textarea':
      return BaseTextareaField
    case 'file':
      return BaseFileUpload
    case 'checkbox':
      return BaseCheckboxGroup
    case 'radio':
      return BaseRadioGroup
    default:
      return BaseTextField
  }
}

const loadForm = () => {
  loading.value = true
  error.value = ''

  const slug = route.params.slug
  const def = formsConfig[slug]

  if (!def) {
    error.value = 'عذراً، هذا النموذج غير متوفر حالياً.'
    formDef.value = null
  } else {
    formDef.value = def
    def.fields.forEach((field) => {
      formData[field.name] = field.type === 'checkbox' ? [] : ''
      errors[field.name] = ''
    })
  }

  loading.value = false
}

const validate = () => {
  let ok = true
  if (!formDef.value) return false

  formDef.value.fields.forEach((field) => {
    errors[field.name] = ''
    if (field.required) {
      const value = formData[field.name]
      if (
        value === null ||
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors[field.name] = 'هذا الحقل مطلوب'
        ok = false
      }
    }
  })

  return ok
}

const onSubmit = () => {
  if (!validate()) return

  const slug = route.params.slug

  console.log('Dynamic form submit:', {
    slug,
    data: { ...formData },
  })

  alert('تم إرسال النموذج (واجهة فقط – جاهز للربط مع الباك لاحقاً).')

  router.push({ name: 'home' })
}

const resetForm = () => {
  if (!formDef.value) return
  formDef.value.fields.forEach((field) => {
    formData[field.name] = field.type === 'checkbox' ? [] : ''
    errors[field.name] = ''
  })
}

onMounted(() => {
  loadForm()
})
</script>

<style scoped>
</style>

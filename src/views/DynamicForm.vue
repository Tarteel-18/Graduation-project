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
          <!-- سكشن الاتصال في حالات الطوارئ -->
          <template v-if="field.name === 'emergencyContactName'">
            <div class="my-6 border-t border-slate-200 dark:border-slate-700"></div>
            <h3 class="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
              الاتصال في حالات الطوارئ
            </h3>
          </template>

          <!-- سكشن بيانات الاتصال -->
          <template v-if="field.name === 'mobile'">
            <div class="my-6 border-t border-slate-200 dark:border-slate-700"></div>
            <h3 class="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
              بيانات الاتصال
            </h3>
          </template>

          <!-- سكشن المؤهلات العلمية -->
          <template v-if="field.name === 'educations'">
            <div class="my-6 border-t border-slate-200 dark:border-slate-700"></div>
            <h3 class="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
              المؤهلات العلمية
            </h3>
          </template>

          <!-- سكشن تفاصيل المشروع -->
          <template v-if="field.name === 'projects'">
            <div class="my-6 border-t border-slate-200 dark:border-slate-700"></div>
            <h3 class="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
              تفاصيل المشروع
            </h3>
          </template>

          <!-- الحقل نفسه -->
          <component
            :is="resolveFieldComponent(field)"
            v-model="formData[field.name]"
            :label="field.label"
            :placeholder="field.placeholder"
            :description="field.description"
            :options="field.options"
            :required="field.required"
            :error="errors[field.name]"
            :field="field"
            :type="field.type"   
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
import { useFieldOptions } from '@/composables/useFieldOptions'

import BaseTextField from '@/components/form/BaseTextField.vue'
import BaseTextareaField from '@/components/form/BaseTextareaField.vue'
import BaseFileUpload from '@/components/form/BaseFileUpload.vue'
import BaseRadioGroup from '@/components/form/BaseRadioGroup.vue'
import BaseCheckboxGroup from '@/components/form/BaseCheckboxGroup.vue'
import BaseTableField from '@/components/form/BaseTableField.vue'
import BaseSelectField from '@/components/form/BaseSelectField.vue'

const route = useRoute()
const router = useRouter()

// Use field options composable
const { 
  fieldOptions, 
  loading: optionsLoading, 
  fetchFieldOptions, 
  getFieldOptions,
  processFormDataForSubmission 
} = useFieldOptions()

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
    case 'date':          // التاريخ يمر على BaseTextField مع type="date"
      return BaseTextField
    case 'textarea':
      return BaseTextareaField
    case 'file':
      return BaseFileUpload
    case 'checkbox':
      return BaseCheckboxGroup
    case 'radio':
      return BaseRadioGroup
    case 'select':
      return BaseSelectField
    case 'table':
      return BaseTableField
    default:
      return BaseTextField
  }
}

const loadForm = async () => {
  loading.value = true
  error.value = ''

  try {
    // Load field options first
    await fetchFieldOptions()
    
    const slug = route.params.slug
    const def = formsConfig[slug]

    if (!def) {
      error.value = 'عذراً، هذا النموذج غير متوفر حالياً.'
      formDef.value = null
    } else {
      // Clone the form definition to avoid mutating the original
      formDef.value = JSON.parse(JSON.stringify(def))
      
      // Populate dynamic options for fields
      formDef.value.fields.forEach((field) => {
        if (field.dynamicOptions) {
          const options = getFieldOptions(field.dynamicOptions)
          field.options = options.map(opt => ({
            label: opt.label,
            value: opt.label, // Use Arabic label as value for frontend
            englishValue: opt.value || opt.english // Store English value for backend
          }))
        }
        
        // Handle table fields with dynamic options
        if (field.type === 'table' && field.columns) {
          field.columns.forEach(column => {
            if (column.dynamicOptions) {
              const options = getFieldOptions(column.dynamicOptions)
              column.options = options.map(opt => ({
                label: opt.label,
                value: opt.label, // Use Arabic label as value for frontend
                englishValue: opt.value || opt.english // Store English value for backend
              }))
            }
          })
        }
        
        // Initialize form data
        if (field.type === 'checkbox' || field.type === 'table') {
          formData[field.name] = []
        } else {
          formData[field.name] = ''
        }
        errors[field.name] = ''
      })
    }
  } catch (err) {
    console.error('Error loading form:', err)
    error.value = 'حدث خطأ في تحميل النموذج'
  } finally {
    loading.value = false
  }
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

const onSubmit = async () => {
  if (!validate()) return

  const slug = route.params.slug

  console.log('Dynamic form submit:', {
    slug,
    data: { ...formData },
  })

  // If this is the small-project-register form, use the enhanced submission
  if (slug === 'small-project-register') {
    try {
      // Import the form submission utility
      const { submitSmallProjectForm, validateSmallProjectForm } = await import('@/utils/formSubmission.js')
      
      // Process form data to map Arabic values to English for backend
      const processedData = processFormDataForSubmission(formData)
      
      console.log('Original form data:', formData)
      console.log('Processed form data for backend:', processedData)
      
      // Validate form data
      const validation = validateSmallProjectForm(processedData)
      if (!validation.isValid) {
        console.error('Form validation failed:', validation.errors)
        alert('يرجى تصحيح الأخطاء في النموذج قبل الإرسال')
        return
      }
      
      // Extract file if present
      const idCardFile = processedData.idCardImage
      
      // Submit form
      console.log('Submitting to Frappe API...')
      const result = await submitSmallProjectForm(processedData, idCardFile)
      
      if (result.success) {
        alert(`تم إرسال النموذج بنجاح! رقم المرجع: ${result.tokenId}`)
        router.push({ name: 'home' })
      } else {
        console.error('Submission failed:', result.error)
        alert(`فشل في إرسال النموذج: ${result.error}`)
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      alert(`خطأ في إرسال النموذج: ${error.message}`)
    }
  } else {
    // For other forms, show the placeholder message
    alert('تم إرسال النموذج (واجهة فقط – جاهز للربط مع الباك لاحقاً).')
    router.push({ name: 'home' })
  }
}

const resetForm = () => {
  if (!formDef.value) return
  formDef.value.fields.forEach((field) => {
    if (field.type === 'checkbox' || field.type === 'table') {
      formData[field.name] = []
    } else {
      formData[field.name] = ''
    }
    errors[field.name] = ''
  })
}

onMounted(() => {
  loadForm()
})
</script>

<style scoped>
</style>

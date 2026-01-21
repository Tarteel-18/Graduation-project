'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import BaseLayout from '@/components/BaseLayout'
import { formsConfig } from '@/data/formsConfig'
import { useFieldOptions } from '@/hooks/useFieldOptions'
import { useAuth } from '@/hooks/useAuth'
import BaseTextField from '@/components/form/BaseTextField'
import BaseTextareaField from '@/components/form/BaseTextareaField'
import BaseFileUpload from '@/components/form/BaseFileUpload'
import BaseSelectField from '@/components/form/BaseSelectField'
import BaseCheckboxGroup from '@/components/form/BaseCheckboxGroup'
import BaseRadioGroup from '@/components/form/BaseRadioGroup'
import BaseTableField from '@/components/form/BaseTableField'

export default function DynamicForm() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const { isLoggedIn } = useAuth()
  const { fieldOptions, loading: optionsLoading, fetchFieldOptions, getFieldOptions, processFormDataForSubmission } = useFieldOptions()

  const [formDef, setFormDef] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Check authentication for protected forms (except contact-form)
  useEffect(() => {
    // Re-check auth state from localStorage directly (in case useAuth hasn't updated yet)
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const loggedIn = !!localStorage.getItem('userLogged')
        if (slug !== 'contact-form' && !loggedIn) {
          router.push(`/login?redirect=${encodeURIComponent(`/form/${slug}`)}`)
        }
      }
    }
    
    // Check immediately
    checkAuth()
    
    // Also listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('auth-change', handleAuthChange)
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [slug, router])

  const resolveFieldComponent = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'tel':
      case 'number':
      case 'email':
      case 'date':
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

  useEffect(() => {
    // Don't load form if not authenticated (except contact-form)
    if (slug !== 'contact-form') {
      const loggedIn = typeof window !== 'undefined' && !!localStorage.getItem('userLogged')
      if (!loggedIn) {
        // Auth check will handle redirect, just return here
        return
      }
    }

    const loadForm = async () => {
      setLoading(true)
      setError('')

      try {
        await fetchFieldOptions()

        const def = formsConfig[slug]

        if (!def) {
          setError('عذراً، هذا النموذج غير متوفر حالياً.')
          setFormDef(null)
        } else {
          const clonedDef = JSON.parse(JSON.stringify(def))

          // Initialize form data and errors in a single batch
          const initialFormData: Record<string, any> = {}
          const initialErrors: Record<string, string> = {}

          clonedDef.fields.forEach((field: any) => {
            if (field.dynamicOptions) {
              const options = getFieldOptions(field.dynamicOptions)
              field.options = options.map((opt: any) => ({
                label: opt.label,
                value: opt.label,
                englishValue: opt.value || opt.english,
              }))
            }

            if (field.type === 'table' && field.columns) {
              field.columns.forEach((column: any) => {
                if (column.dynamicOptions) {
                  const options = getFieldOptions(column.dynamicOptions)
                  column.options = options.map((opt: any) => ({
                    label: opt.label,
                    value: opt.label,
                    englishValue: opt.value || opt.english,
                  }))
                }
              })
            }

            // Initialize form data based on field type
            if (field.type === 'checkbox' || field.type === 'table' || field.type === 'file') {
              initialFormData[field.name] = []
            } else {
              initialFormData[field.name] = ''
            }
            initialErrors[field.name] = ''
          })

          // Set form data and errors in a single batch update
          setFormData(initialFormData)
          setErrors(initialErrors)
          setFormDef(clonedDef)
        }
      } catch (err: any) {
        console.error('Error loading form:', err)
        setError('حدث خطأ في تحميل النموذج')
      } finally {
        setLoading(false)
      }
    }

    loadForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]) // Only depend on slug - fetchFieldOptions and getFieldOptions are stable

  const validate = () => {
    let ok = true
    if (!formDef) return false

    const newErrors: Record<string, string> = {}

    formDef.fields.forEach((field: any) => {
      newErrors[field.name] = ''
      if (field.required) {
        const value = formData[field.name]
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          newErrors[field.name] = 'هذا الحقل مطلوب'
          ok = false
        }
      }
    })

    setErrors(newErrors)
    return ok
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    console.log('Dynamic form submit:', { slug, data: { ...formData } })

    if (slug === 'small-project-register') {
      try {
        const processedData = processFormDataForSubmission(formData)
        console.log('Processed form data:', processedData)
        // TODO: Submit to API
        alert('تم إرسال النموذج بنجاح!')
        router.push('/')
      } catch (error: any) {
        console.error('Form submission error:', error)
        alert(`خطأ في إرسال النموذج: ${error.message}`)
      }
    } else {
      alert('تم إرسال النموذج (واجهة فقط – جاهز للربط مع الباك لاحقاً).')
      router.push('/')
    }
  }

  const resetForm = () => {
    if (!formDef) return
    const newData: Record<string, any> = {}
    formDef.fields.forEach((field: any) => {
      if (field.type === 'checkbox' || field.type === 'table') {
        newData[field.name] = []
      } else {
        newData[field.name] = ''
      }
      setErrors((prev) => ({ ...prev, [field.name]: '' }))
    })
    setFormData(newData)
  }

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }))
    }
  }

  if (loading || optionsLoading) {
    return (
      <BaseLayout>
        <div className="min-h-screen bg-[#F4FAFB] dark:bg-[#020617] py-10 flex items-center justify-center">
          <div className="text-center text-slate-500 dark:text-slate-300">جاري تحميل النموذج...</div>
        </div>
      </BaseLayout>
    )
  }

  if (error) {
    return (
      <BaseLayout>
        <div className="min-h-screen bg-[#F4FAFB] dark:bg-[#020617] py-10 flex items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </BaseLayout>
    )
  }

  if (!formDef) {
    return (
      <BaseLayout>
        <div className="min-h-screen bg-[#F4FAFB] dark:bg-[#020617] py-10 flex items-center justify-center">
          <div className="text-center text-slate-500 dark:text-slate-300">النموذج غير متوفر</div>
        </div>
      </BaseLayout>
    )
  }

  return (
    <BaseLayout>
      <div className="min-h-screen bg-[#F4FAFB] dark:bg-[#020617] py-10 transition-colors duration-300" dir="rtl">
        <div className="mx-auto max-w-[900px] px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden mb-6 border border-slate-100 dark:border-slate-700">
            <div className="h-3 bg-[#06A6C8]"></div>
            <div className="px-8 py-6">
              <h1 className="text-xl md:text-2xl font-extrabold text-[#163B52] dark:text-cyan-300 mb-2">
                {formDef.title}
              </h1>
              {formDef.description && (
                <p className="text-sm text-slate-500 dark:text-slate-300">{formDef.description}</p>
              )}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 px-6 md:px-8 py-6">
          {formDef.fields.map((field: any) => {
            const FieldComponent = resolveFieldComponent(field)

            if (field.name === 'emergencyContactName') {
              return (
                <div key={field.name}>
                  <div className="my-6 border-t border-slate-200 dark:border-slate-700"></div>
                  <h3 className="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
                    الاتصال في حالات الطوارئ
                  </h3>
                  <FieldComponent
                    {...({
                      value: formData[field.name] || '',
                      onChange: (value: any) => handleFieldChange(field.name, value),
                      label: field.label,
                      placeholder: field.placeholder,
                      hint: field.description,
                      type: field.type,
                      error: errors[field.name],
                      ...(field.type === 'select' && { options: field.options || [] }),
                      ...(field.type === 'file' && { 
                    multiple: field.maxFiles > 1, 
                    accept: field.accept,
                    description: field.description
                  }),
                      ...(field.type === 'table' && { field }),
                    } as any)}
                  />
                </div>
              )
            }

            if (field.name === 'mobile') {
              return (
                <div key={field.name}>
                  <div className="my-6 border-t border-slate-200 dark:border-slate-700"></div>
                  <h3 className="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
                    بيانات الاتصال
                  </h3>
                  <FieldComponent
                    {...({
                      value: formData[field.name] || '',
                      onChange: (value: any) => handleFieldChange(field.name, value),
                      label: field.label,
                      placeholder: field.placeholder,
                      hint: field.description,
                      type: field.type,
                      error: errors[field.name],
                      ...(field.type === 'select' && { options: field.options || [] }),
                      ...(field.type === 'file' && { 
                    multiple: field.maxFiles > 1, 
                    accept: field.accept,
                    description: field.description
                  }),
                      ...(field.type === 'table' && { field }),
                    } as any)}
                  />
                </div>
              )
            }

            if (field.name === 'educations') {
              return (
                <div key={field.name}>
                  <div className="my-6 border-t border-slate-200 dark:border-slate-700"></div>
                  <h3 className="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
                    المؤهلات العلمية
                  </h3>
                  <FieldComponent
                    {...({
                      value: formData[field.name] || [],
                      onChange: (value: any) => handleFieldChange(field.name, value),
                      label: field.label,
                      field: field,
                      error: errors[field.name],
                    } as any)}
                  />
                </div>
              )
            }

            if (field.name === 'projects') {
              return (
                <div key={field.name}>
                  <div className="my-6 border-t border-slate-200 dark:border-slate-700"></div>
                  <h3 className="text-base font-extrabold text-[#163B52] dark:text-cyan-300 mb-3">
                    تفاصيل المشروع
                  </h3>
                  <FieldComponent
                    {...({
                      value: formData[field.name] || [],
                      onChange: (value: any) => handleFieldChange(field.name, value),
                      label: field.label,
                      field: field,
                      error: errors[field.name],
                    } as any)}
                  />
                </div>
              )
            }

            return (
              <FieldComponent
                key={field.name}
                {...({
                  value: formData[field.name] ?? (field.type === 'checkbox' || field.type === 'table' || field.type === 'file' ? [] : ''),
                  onChange: (value: any) => handleFieldChange(field.name, value),
                  label: field.label,
                  placeholder: field.placeholder,
                  hint: field.description,
                  type: field.type,
                  error: errors[field.name],
                  ...(field.type === 'select' && { options: field.options || [] }),
                  ...(field.type === 'file' && { 
                    multiple: field.maxFiles > 1, 
                    accept: field.accept,
                    description: field.description
                  }),
                  ...(field.type === 'table' && { field }),
                  ...(field.type === 'checkbox' && { options: field.options || [] }),
                  ...(field.type === 'radio' && { options: field.options || [] }),
                } as any)}
              />
            )
          })}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-[#06A6C8] dark:text-cyan-300 hover:underline"
            >
              محو النموذج
            </button>

            <button
              type="submit"
              className="px-10 py-2.5 rounded-xl bg-[#06A6C8] hover:bg-[#0587A2] text-white font-semibold text-sm transition-colors"
            >
              إرسال
            </button>
          </div>
        </form>
        </div>
      </div>
    </BaseLayout>
  )
}


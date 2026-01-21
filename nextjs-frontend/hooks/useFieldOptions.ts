'use client'

import { useState, useEffect } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8007'

export function useFieldOptions() {
  const [fieldOptions, setFieldOptions] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const genderMapping: Record<string, string> = {
    'ذكر': 'Male',
    'أنثى': 'Female',
  }

  const projectStatusMapping: Record<string, string> = {
    'قيد الفكرة': 'Open',
    'قيد التنفيذ': 'Open',
    'قائم': 'Approved',
    'نشط': 'Approved',
    'غير نشط': 'Rejected',
    'معلق': 'Open',
    'أغلق': 'Cancelled',
  }

  const educationLevelMapping: Record<string, string> = {
    'Graduate': 'Graduate',
    'Post Graduate': 'Post Graduate',
    'Under Graduate': 'Under Graduate',
  }

  const accommodationTypeMapping: Record<string, string> = {
    'مملوك': 'Owned',
    'مستأجر': 'Rented',
  }

  const fetchFieldOptions = async () => {
    if (Object.keys(fieldOptions).length > 0) {
      return fieldOptions
    }

    setLoading(true)
    setError(null)

    try {
      const apiUrl = `${API_BASE_URL}/api/method/override_project_integration.api.field_options.get_field_options`

      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': typeof window !== 'undefined' ? window.location.origin : '',
        },
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.message && result.message.success) {
        const newOptions = { ...(result.message.data || {}) }
        addDefaultOptions(newOptions)
        setFieldOptions(newOptions)
      } else {
        throw new Error(result.message?.message || 'Failed to fetch field options')
      }
    } catch (err: any) {
      // Don't show error to user if it's a network error - just use defaults
      if (err.name === 'AbortError' || err.name === 'TypeError' || err.message?.includes('fetch') || err.message?.includes('NetworkError')) {
        console.warn('Field options API unavailable, using default options:', err.message)
      } else {
        console.error('Error fetching field options:', err)
      }
      
      // Always set default options so form can still work
      const defaultOpts: Record<string, any[]> = {}
      addDefaultOptions(defaultOpts)
      setFieldOptions(defaultOpts)
    } finally {
      setLoading(false)
    }

    return fieldOptions
  }

  const addDefaultOptions = (options: Record<string, any[]>) => {
    if (!options.gender) {
      options.gender = [
        { label: 'ذكر', value: 'Male', arabic: 'ذكر', english: 'Male' },
        { label: 'أنثى', value: 'Female', arabic: 'أنثى', english: 'Female' },
      ]
    }

    if (!options.project_status) {
      options.project_status = [
        { label: 'قيد الفكرة', value: 'Open', arabic: 'قيد الفكرة', english: 'Open' },
        { label: 'قيد التنفيذ', value: 'Open', arabic: 'قيد التنفيذ', english: 'Open' },
        { label: 'قائم', value: 'Approved', arabic: 'قائم', english: 'Approved' },
        { label: 'نشط', value: 'Approved', arabic: 'نشط', english: 'Approved' },
        { label: 'غير نشط', value: 'Rejected', arabic: 'غير نشط', english: 'Rejected' },
      ]
    }

    if (!options.education_level) {
      options.education_level = [
        { label: 'خريج', value: 'Graduate', arabic: 'خريج', english: 'Graduate' },
        { label: 'دراسات عليا', value: 'Post Graduate', arabic: 'دراسات عليا', english: 'Post Graduate' },
        { label: 'طالب جامعي', value: 'Under Graduate', arabic: 'طالب جامعي', english: 'Under Graduate' },
      ]
    }

    if (!options.unit) {
      options.unit = [
        { label: 'كيلوجرام', value: 'Kg' },
        { label: 'صندوق', value: 'Box' },
        { label: 'قطعة', value: 'Nos' },
        { label: 'متر', value: 'Meter' },
        { label: 'لتر', value: 'Litre' },
      ]
    }

    if (!options.accommodation_type) {
      options.accommodation_type = [
        { label: 'مملوك', value: 'Owned', arabic: 'مملوك', english: 'Owned' },
        { label: 'مستأجر', value: 'Rented', arabic: 'مستأجر', english: 'Rented' },
      ]
    }

    if (!options.city_name) options.city_name = []
    if (!options.directorate_name) options.directorate_name = []
    if (!options.district_name) options.district_name = []
    if (!options.village_name) options.village_name = []
    if (!options.sector_name) options.sector_name = []
    if (!options.sector_type_name) options.sector_type_name = []
    if (!options.sector_type_details_name) options.sector_type_details_name = []
  }

  const getFieldOptions = (fieldName: string) => {
    return fieldOptions[fieldName] || []
  }

  const mapValueToEnglish = (fieldName: string, arabicValue: string) => {
    if (!arabicValue) return arabicValue

    switch (fieldName) {
      case 'gender':
        return genderMapping[arabicValue] || arabicValue
      case 'projectStatus':
      case 'project_status':
        return projectStatusMapping[arabicValue] || arabicValue
      case 'level':
      case 'education_level':
        return educationLevelMapping[arabicValue] || arabicValue
      case 'accommodation_type':
        return accommodationTypeMapping[arabicValue] || arabicValue
      case 'unit':
        const unitMapping: Record<string, string> = {
          'كيلوجرام': 'Kg',
          'صندوق': 'Box',
          'قطعة': 'Nos',
          'متر': 'Meter',
          'لتر': 'Litre',
          'جرام': 'Gram',
          'طن': 'Ton',
          'سلسلة': 'Nos',
        }
        return unitMapping[arabicValue] || 'Nos'
      default:
        const options = getFieldOptions(fieldName)
        const option = options.find((opt: any) => opt.arabic === arabicValue || opt.label === arabicValue)
        return option ? option.english || option.value : arabicValue
    }
  }

  const processFormDataForSubmission = (formData: Record<string, any>) => {
    const processedData = { ...formData }

    Object.keys(processedData).forEach((key) => {
      if (typeof processedData[key] === 'string') {
        processedData[key] = mapValueToEnglish(key, processedData[key])
      }
    })

    const firstName = processedData.firstName || ''
    const middleName = processedData.middleName || ''
    const lastName = processedData.lastName || ''
    const fullName = [firstName, middleName, lastName].filter((n) => n.trim()).join(' ')
    if (fullName) {
      processedData.ownerFullName = fullName
    }

    if (processedData.birthDate) {
      const birthYear = new Date(processedData.birthDate).getFullYear()
      const currentYear = new Date().getFullYear()
      processedData.age = currentYear - birthYear
    }

    if (processedData.mobile) {
      processedData.primaryPhone = processedData.mobile
    }

    if (!processedData.projectStatus || processedData.projectStatus.trim() === '') {
      processedData.projectStatus = 'Open'
    }

    if (!processedData.governorate) processedData.governorate = 'أمانة العاصمة'
    if (!processedData.district) processedData.district = 'مديرية الثورة'
    if (!processedData.neighborhood) processedData.neighborhood = 'حي السبعين'
    if (!processedData.street) processedData.street = 'شارع الزراعة'

    if (processedData.projects && processedData.projects.length > 0) {
      const project = processedData.projects[0]
      if (project.project_name) processedData.projectName = project.project_name
      if (project.project_detials) processedData.projectDescription = project.project_detials
      if (project.amount_capital) processedData.capital = project.amount_capital
      if (project.number_of_workers) processedData.workersCount = project.number_of_workers
    }

    if (!processedData.projectName) processedData.projectName = 'مشروع تجريبي'
    if (!processedData.projectDescription) processedData.projectDescription = 'وصف المشروع'
    if (!processedData.capital) processedData.capital = 10000
    if (!processedData.workersCount) processedData.workersCount = 1
    if (!processedData.startDate) processedData.startDate = new Date().toISOString().split('T')[0]
    if (!processedData.products) processedData.products = 'منتجات متنوعة'

    if (processedData.addresses && processedData.addresses.length > 0) {
      const address = processedData.addresses[0]
      if (address.city_name) {
        const cityMapping: Record<string, string> = {
          'Amanat Al Asimah': 'أمانة العاصمة',
          "Sana'a": 'صنعاء',
          'Aden': 'عدن',
          'Taiz': 'تعز',
          'صنعاء': 'صنعاء',
          'أمانة العاصمة': 'أمانة العاصمة',
        }
        processedData.governorate = cityMapping[address.city_name] || address.city_name
      }
      if (address.directorate_name) processedData.district = address.directorate_name
      if (address.district_name) processedData.neighborhood = address.district_name
      if (address.village_name) processedData.street = address.village_name
    }

    if (processedData.educations && Array.isArray(processedData.educations)) {
      processedData.educations = processedData.educations.map((edu: any) => ({
        ...edu,
        level: mapValueToEnglish('level', edu.level),
      }))
    }

    if (processedData.productions && Array.isArray(processedData.productions)) {
      processedData.productions = processedData.productions.map((prod: any) => ({
        ...prod,
        unit: mapValueToEnglish('unit', prod.unit),
      }))
    }

    if (processedData.addresses && Array.isArray(processedData.addresses)) {
      processedData.addresses = processedData.addresses.map((addr: any) => ({
        ...addr,
        accommodation_type:
          addr.accommodation_type && addr.accommodation_type.trim() !== ''
            ? mapValueToEnglish('accommodation_type', addr.accommodation_type)
            : 'Owned',
      }))
    }

    return processedData
  }

  return {
    fieldOptions,
    loading,
    error,
    fetchFieldOptions,
    getFieldOptions,
    mapValueToEnglish,
    processFormDataForSubmission,
  }
}


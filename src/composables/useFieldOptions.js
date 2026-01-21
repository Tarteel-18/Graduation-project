// src/composables/useFieldOptions.js

import { ref, reactive } from 'vue'
import { API_CONFIG, getApiUrl } from '@/config/api'

export function useFieldOptions() {
  const fieldOptions = reactive({})
  const loading = ref(false)
  const error = ref(null)

  // Gender mapping from Arabic to English
  const genderMapping = {
    'ذكر': 'Male',
    'أنثى': 'Female'
  }

  // Project status mapping from Arabic to English
  const projectStatusMapping = {
    'قيد الفكرة': 'Open',
    'قيد التنفيذ': 'Open', 
    'قائم': 'Approved',
    'نشط': 'Approved',
    'غير نشط': 'Rejected',
    'معلق': 'Open',
    'أغلق': 'Cancelled'
  }

  // Education level mapping
  const educationLevelMapping = {
    'Graduate': 'Graduate',
    'Post Graduate': 'Post Graduate', 
    'Under Graduate': 'Under Graduate'
  }

  // Accommodation type mapping
  const accommodationTypeMapping = {
    'مملوك': 'Owned',
    'مستأجر': 'Rented'
  }

  /**
   * Fetch field options from API
   */
  const fetchFieldOptions = async () => {
    if (Object.keys(fieldOptions).length > 0) {
      return fieldOptions // Return cached options
    }

    loading.value = true
    error.value = null

    try {
      const apiUrl = getApiUrl('/api/method/override_project_integration.api.field_options.get_field_options')
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.message && result.message.success) {
        // Store fetched options
        Object.assign(fieldOptions, result.message.data || {})
        
        // Add default options for fields that might not be in the API
        addDefaultOptions()
        
        console.log(' Field options loaded:', fieldOptions)
      } else {
        throw new Error(result.message?.message || 'Failed to fetch field options')
      }
    } catch (err) {
      console.error(' Error fetching field options:', err)
      error.value = err.message
      
      // Use default options on error
      addDefaultOptions()
    } finally {
      loading.value = false
    }

    return fieldOptions
  }

  /**
   * Add default options for common fields
   */
  const addDefaultOptions = () => {
    // Gender options
    if (!fieldOptions.gender) {
      fieldOptions.gender = [
        { label: 'ذكر', value: 'Male', arabic: 'ذكر', english: 'Male' },
        { label: 'أنثى', value: 'Female', arabic: 'أنثى', english: 'Female' }
      ]
    }

    // Project status options
    if (!fieldOptions.project_status) {
      fieldOptions.project_status = [
        { label: 'قيد الفكرة', value: 'Open', arabic: 'قيد الفكرة', english: 'Open' },
        { label: 'قيد التنفيذ', value: 'Open', arabic: 'قيد التنفيذ', english: 'Open' },
        { label: 'قائم', value: 'Approved', arabic: 'قائم', english: 'Approved' },
        { label: 'نشط', value: 'Approved', arabic: 'نشط', english: 'Approved' },
        { label: 'غير نشط', value: 'Rejected', arabic: 'غير نشط', english: 'Rejected' }
      ]
    }

    // Education level options
    if (!fieldOptions.education_level) {
      fieldOptions.education_level = [
        { label: 'خريج', value: 'Graduate', arabic: 'خريج', english: 'Graduate' },
        { label: 'دراسات عليا', value: 'Post Graduate', arabic: 'دراسات عليا', english: 'Post Graduate' },
        { label: 'طالب جامعي', value: 'Under Graduate', arabic: 'طالب جامعي', english: 'Under Graduate' }
      ]
    }

    // Unit options for productivity
    if (!fieldOptions.unit) {
      fieldOptions.unit = [
        { label: 'كيلوجرام', value: 'Kg' },
        { label: 'صندوق', value: 'Box' },
        { label: 'قطعة', value: 'Nos' },
        { label: 'متر', value: 'Meter' },
        { label: 'لتر', value: 'Litre' }
      ]
    }

    // Accommodation type options
    if (!fieldOptions.accommodation_type) {
      fieldOptions.accommodation_type = [
        { label: 'مملوك', value: 'Owned', arabic: 'مملوك', english: 'Owned' },
        { label: 'مستأجر', value: 'Rented', arabic: 'مستأجر', english: 'Rented' }
      ]
    }

    // Address Details Link field options (empty by default, will be populated from API)
    if (!fieldOptions.city_name) {
      fieldOptions.city_name = []
    }
    if (!fieldOptions.directorate_name) {
      fieldOptions.directorate_name = []
    }
    if (!fieldOptions.district_name) {
      fieldOptions.district_name = []
    }
    if (!fieldOptions.village_name) {
      fieldOptions.village_name = []
    }

    // Project Details Link field options (empty by default, will be populated from API)
    if (!fieldOptions.sector_name) {
      fieldOptions.sector_name = []
    }
    if (!fieldOptions.sector_type_name) {
      fieldOptions.sector_type_name = []
    }
    if (!fieldOptions.sector_type_details_name) {
      fieldOptions.sector_type_details_name = []
    }
  }

  /**
   * Get options for a specific field
   */
  const getFieldOptions = (fieldName) => {
    return fieldOptions[fieldName] || []
  }

  /**
   * Map Arabic value to English for backend
   */
  const mapValueToEnglish = (fieldName, arabicValue) => {
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
        // Unit mapping for productivity table
        const unitMapping = {
          'كيلوجرام': 'Kg',
          'صندوق': 'Box', 
          'قطعة': 'Nos',
          'متر': 'Meter',
          'لتر': 'Litre',
          'جرام': 'Gram',
          'طن': 'Ton',
          'Chain': 'Nos', // Map unknown units to Nos
          'سلسلة': 'Nos'
        }
        return unitMapping[arabicValue] || 'Nos' // Default to Nos if unknown
      
      default:
        // Check if field has options with mapping
        const options = getFieldOptions(fieldName)
        const option = options.find(opt => opt.arabic === arabicValue || opt.label === arabicValue)
        return option ? option.english || option.value : arabicValue
    }
  }

  /**
   * Map English value to Arabic for display
   */
  const mapValueToArabic = (fieldName, englishValue) => {
    if (!englishValue) return englishValue

    const reverseGenderMapping = Object.fromEntries(
      Object.entries(genderMapping).map(([k, v]) => [v, k])
    )

    const reverseStatusMapping = Object.fromEntries(
      Object.entries(projectStatusMapping).map(([k, v]) => [v, k])
    )

    switch (fieldName) {
      case 'gender':
        return reverseGenderMapping[englishValue] || englishValue
      
      case 'projectStatus':
      case 'project_status':
        return reverseStatusMapping[englishValue] || englishValue
      
      default:
        // Check if field has options with mapping
        const options = getFieldOptions(fieldName)
        const option = options.find(opt => opt.english === englishValue || opt.value === englishValue)
        return option ? option.arabic || option.label : englishValue
    }
  }

  /**
   * Process form data before submission (map Arabic to English)
   */
  const processFormDataForSubmission = (formData) => {
    const processedData = { ...formData }

    // Process main fields
    Object.keys(processedData).forEach(key => {
      if (typeof processedData[key] === 'string') {
        processedData[key] = mapValueToEnglish(key, processedData[key])
      }
    })

    // Create ownerFullName from name components
    const firstName = processedData.firstName || ''
    const middleName = processedData.middleName || ''
    const lastName = processedData.lastName || ''
    const fullName = [firstName, middleName, lastName].filter(n => n.trim()).join(' ')
    if (fullName) {
      processedData.ownerFullName = fullName
    }

    // Convert birthDate to age
    if (processedData.birthDate) {
      const birthYear = new Date(processedData.birthDate).getFullYear()
      const currentYear = new Date().getFullYear()
      processedData.age = currentYear - birthYear
    }

    // Map mobile to primaryPhone
    if (processedData.mobile) {
      processedData.primaryPhone = processedData.mobile
    }

    // Handle projectStatus - if empty, set default
    if (!processedData.projectStatus || processedData.projectStatus.trim() === '') {
      processedData.projectStatus = 'Open'
    }

    // Add missing required fields with default/placeholder values
    if (!processedData.governorate) processedData.governorate = 'أمانة العاصمة'
    if (!processedData.district) processedData.district = 'مديرية الثورة'
    if (!processedData.neighborhood) processedData.neighborhood = 'حي السبعين'
    if (!processedData.street) processedData.street = 'شارع الزراعة'
    
    // Map project fields from child table
    if (processedData.projects && processedData.projects.length > 0) {
      const project = processedData.projects[0]
      if (project.project_name) processedData.projectName = project.project_name
      if (project.project_detials) processedData.projectDescription = project.project_detials
      if (project.amount_capital) processedData.capital = project.amount_capital
      if (project.number_of_workers) processedData.workersCount = project.number_of_workers
    }

    // Add default values for missing required fields
    if (!processedData.projectName) processedData.projectName = 'مشروع تجريبي'
    if (!processedData.projectDescription) processedData.projectDescription = 'وصف المشروع'
    if (!processedData.capital) processedData.capital = 10000
    if (!processedData.workersCount) processedData.workersCount = 1
    if (!processedData.startDate) processedData.startDate = new Date().toISOString().split('T')[0]
    if (!processedData.products) processedData.products = 'منتجات متنوعة'

    // Map address fields from child table
    if (processedData.addresses && processedData.addresses.length > 0) {
      const address = processedData.addresses[0]
      if (address.city_name) {
        // Map city_name to governorate
        const cityMapping = {
          'Amanat Al Asimah': 'أمانة العاصمة',
          'Sana\'a': 'صنعاء',
          'Aden': 'عدن',
          'Taiz': 'تعز',
          'صنعاء': 'صنعاء',
          'أمانة العاصمة': 'أمانة العاصمة'
        }
        processedData.governorate = cityMapping[address.city_name] || address.city_name
      }
      if (address.directorate_name) {
        processedData.district = address.directorate_name
      }
      if (address.district_name) {
        processedData.neighborhood = address.district_name
      }
      if (address.village_name) {
        processedData.street = address.village_name
      }
    }

    // Process child table data
    if (processedData.educations && Array.isArray(processedData.educations)) {
      processedData.educations = processedData.educations.map(edu => ({
        ...edu,
        level: mapValueToEnglish('level', edu.level)
      }))
    }

    if (processedData.productions && Array.isArray(processedData.productions)) {
      processedData.productions = processedData.productions.map(prod => ({
        ...prod,
        unit: mapValueToEnglish('unit', prod.unit)
      }))
    }

    if (processedData.addresses && Array.isArray(processedData.addresses)) {
      processedData.addresses = processedData.addresses.map(addr => ({
        ...addr,
        accommodation_type: addr.accommodation_type && addr.accommodation_type.trim() !== '' 
          ? mapValueToEnglish('accommodation_type', addr.accommodation_type)
          : 'Owned'  // Default value for empty accommodation_type
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
    mapValueToArabic,
    processFormDataForSubmission
  }
}
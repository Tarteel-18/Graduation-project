// Form submission utility for connecting Vue.js to Frappe API
// This handles the connection between small-project-register form and Micro Enterprise Request DocType

const API_BASE_URL = 'http://127.0.0.1:8007'; // Local testing URL

/**
 * Test CORS connectivity before form submission
 * @returns {Promise<boolean>} True if CORS is working
 */
export async function testCorsConnection() {
  try {
    console.log('🧪 Testing CORS connection...');
    
    const testUrl = `${API_BASE_URL}/api/method/override_project_integration.api.test_cors.test_cors`;
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ test: 'cors' })
    });
    
    console.log('🧪 CORS Test Response Status:', response.status);
    console.log('🧪 CORS Test Response Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ CORS Test Successful:', result);
      return true;
    } else {
      console.error('❌ CORS Test Failed:', response.status, response.statusText);
      return false;
    }
    
  } catch (error) {
    console.error('❌ CORS Test Error:', error);
    return false;
  }
}

/**
 * Submit form data to Frappe API
 * @param {string} formType - Type of form (e.g., 'small-project-register')
 * @param {Object} formData - Form data object
 * @param {string} tokenId - Optional token ID for tracking
 * @param {Object} files - Optional file uploads
 * @returns {Promise<Object>} API response
 */
export async function submitFormToFrappe(formType, formData, tokenId = null, files = null) {
  try {
    console.log('🚀 Starting form submission to Frappe...');
    
    // Test CORS connection first
    const corsWorking = await testCorsConnection();
    if (!corsWorking) {
      throw new Error('CORS connection test failed. Please check server configuration.');
    }
    
    console.log('Form Type:', formType);
    console.log('Token ID:', tokenId);
    console.log('Has Files:', !!files);
    
    // Prepare form data for multipart submission if files are included
    const submitData = new FormData();
    
    // Add form type and data
    submitData.append('form_type', formType);
    submitData.append('form_data', JSON.stringify(formData));
    
    // Add token ID if provided
    if (tokenId) {
      submitData.append('token_id', tokenId);
    }
    
    // Add files if provided
    if (files) {
      Object.keys(files).forEach(fieldName => {
        const fileData = files[fieldName];
        if (Array.isArray(fileData)) {
          // Multiple files
          fileData.forEach((file, index) => {
            submitData.append(`${fieldName}`, file);
          });
        } else {
          // Single file
          submitData.append(fieldName, fileData);
        }
      });
    }
    
    // Log form data contents
    console.log(' Form data contents:');
    for (let [key, value] of submitData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}:`, value);
      }
    }
    
    const apiUrl = `${API_BASE_URL}/api/method/override_project_integration.api.forms.submit_form`;
    console.log('🌐 API URL:', apiUrl);
    
    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: submitData,
      headers: {
        // Don't set Content-Type for FormData - browser will set it with boundary
        'Accept': 'application/json',
      }
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
    
    let result;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      // If not JSON, get text response for debugging
      const textResponse = await response.text();
      console.error(' Non-JSON response received:', textResponse);
      
      // Try to extract error information
      if (response.status === 500) {
        throw new Error(`Server Error (500): ${textResponse.substring(0, 200)}...`);
      } else if (response.status === 404) {
        throw new Error('API endpoint not found. Make sure override_project_integration is installed and enabled.');
      } else if (response.status === 403) {
        throw new Error('Access denied. Check API permissions.');
      } else {
        throw new Error(`HTTP ${response.status}: ${textResponse.substring(0, 200)}...`);
      }
    }
    
    console.log('📋 API Response:', result);
    
    if (!response.ok) {
      const errorMessage = result.message || result.error || `HTTP ${response.status}: Request failed`;
      console.error(' API Error:', errorMessage);
      throw new Error(errorMessage);
    }
    
    console.log(' Form submission successful!');
    return result;
    
  } catch (error) {
    console.error(' Form submission error:', error);
    
    // Enhanced error information
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('فشل الاتصال بالخادم. تأكد من تشغيل Frappe على العنوان المحدد.');
    } else if (error.message.includes('500')) {
      throw new Error('خطأ في الخادم. تحقق من سجلات Frappe للمزيد من التفاصيل.');
    } else if (error.message.includes('404')) {
      throw new Error('API غير موجود. تأكد من تثبيت override_project_integration.');
    } else if (error.message.includes('CORS')) {
      throw new Error('مشكلة في إعدادات CORS. تحقق من تكوين الخادم.');
    }
    
    throw error;
  }
}

/**
 * Map small-project-register form data to expected format
 * @param {Object} rawFormData - Raw form data from Vue.js form
 * @returns {Object} Mapped form data
 */
export function mapSmallProjectFormData(rawFormData) {
  return {
    // Basic personal information
    firstName: rawFormData.firstName || '',
    middleName: rawFormData.middleName || '',
    lastName: rawFormData.lastName || '',
    gender: rawFormData.gender || '',
    birthDate: rawFormData.birthDate || '',
    workJoinDate: rawFormData.workJoinDate || '',
    idNumber: rawFormData.idNumber || '',
    
    // Project type and status
    projectType: rawFormData.projectType || '',
    entity: rawFormData.entity || '',
    projectStatus: rawFormData.projectStatus || '',
    
    // Emergency contact
    emergencyContactName: rawFormData.emergencyContactName || '',
    emergencyContactPhone: rawFormData.emergencyContactPhone || '',
    emergencyRelation: rawFormData.emergencyRelation || '',
    
    // Contact details
    mobile: rawFormData.mobile || '',
    email: rawFormData.email || '',
    familyInfo: rawFormData.familyInfo || '',
    
    // Child tables - these will be arrays
    educations: rawFormData.educations || [],
    projects: rawFormData.projects || [],
    productions: rawFormData.productions || [],
    addresses: rawFormData.addresses || []
  };
}

/**
 * Submit small project registration form
 * @param {Object} formData - PROCESSED form data from processFormDataForSubmission
 * @param {File} idCardFile - ID card image file
 * @param {string} tokenId - Optional token ID
 * @returns {Promise<Object>} Submission result
 */
export async function submitSmallProjectForm(formData, idCardFile = null, tokenId = null) {
  try {
    // Use the already processed form data directly (no need to map again)
    // The formData parameter should already be processed by processFormDataForSubmission
    const processedData = formData;
    
    // Prepare files object
    const files = {};
    if (idCardFile) {
      files.idCardImage = idCardFile;
    }
    
    // Generate token ID if not provided
    const finalTokenId = tokenId || generateTokenId();
    
    // Submit to API
    const result = await submitFormToFrappe(
      'small-project-register',
      processedData,
      finalTokenId,
      Object.keys(files).length > 0 ? files : null
    );
    
    return {
      success: true,
      data: result,
      tokenId: finalTokenId
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      details: error
    };
  }
}

/**
 * Generate a unique token ID for form submission
 * @returns {string} Generated token ID
 */
function generateTokenId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `vue_${timestamp}_${random}`;
}

/**
 * Validate form data before submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result
 */
export function validateSmallProjectForm(formData) {
  const errors = {};
  
  // Required fields validation
  const requiredFields = [
    'firstName',
    'gender', 
    'birthDate',
    'mobile'
  ];
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = `${field} is required`;
    }
  });
  
  // Email validation (optional but must be valid if provided)
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Birth date validation
  if (formData.birthDate) {
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18 || age > 100) {
      errors.birthDate = 'Age must be between 18 and 100 years';
    }
  }
  
  // Phone validation
  if (formData.mobile && !/^[0-9+\-\s()]+$/.test(formData.mobile)) {
    errors.mobile = 'Invalid phone number format';
  }
  
  // Emergency phone validation (if provided)
  if (formData.emergencyContactPhone && !/^[0-9+\-\s()]+$/.test(formData.emergencyContactPhone)) {
    errors.emergencyContactPhone = 'Invalid emergency phone number format';
  }
  
  // Validate child tables
  if (formData.educations && Array.isArray(formData.educations)) {
    formData.educations.forEach((education, index) => {
      if (education.qualification && !education.school_univ) {
        errors[`educations_${index}_school_univ`] = 'School/University is required when qualification is provided';
      }
    });
  }
  
  if (formData.projects && Array.isArray(formData.projects)) {
    formData.projects.forEach((project, index) => {
      if (project.project_name && !project.project_detials) {
        errors[`projects_${index}_project_detials`] = 'Project details are required when project name is provided';
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Export default configuration
export default {
  submitFormToFrappe,
  submitSmallProjectForm,
  mapSmallProjectFormData,
  validateSmallProjectForm,
  generateTokenId,
  testCorsConnection
};
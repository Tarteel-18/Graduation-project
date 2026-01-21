// API Configuration for Frappe Integration
// Update these settings based on your Frappe site configuration

export const API_CONFIG = {
  // Base URL for your Frappe site
  // Update this to match your actual Frappe site URL
  BASE_URL: import.meta.env.VITE_FRAPPE_URL || 'http://127.0.0.1:8007',
  
  // API endpoints
  ENDPOINTS: {
    SUBMIT_FORM: '/api/method/override_project_integration.api.forms.submit_form',
    HEALTH_CHECK: '/api/method/override_project_integration.api.health.health_check',
    GET_FORM_SCHEMA: '/api/method/override_project_integration.api.forms.get_form_schema'
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    timeout: 30000, // 30 seconds
    headers: {
      'Accept': 'application/json',
    }
  },
  
  // Form types mapping
  FORM_TYPES: {
    SMALL_PROJECT: 'small-project-register',
    TRAINING_PROGRAM: 'training-program',
    VOLUNTEER_PROGRAM: 'volunteer-program',
    TRAINING_SERVICE: 'training-service',
    PROMOTE_PROJECT: 'promote-project',
    SPECS_MEMO: 'specs-memo-request',
    CONTRACT_OPPORTUNITY: 'contract-opportunity',
    CONTACT_FORM: 'contact-form'
  },
  
  // File upload configuration
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx']
  }
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    BASE_URL: 'http://127.0.0.1:8007',
    DEBUG: true,
    SHOW_CONSOLE_LOGS: true
  },
  production: {
    BASE_URL: 'http://127.0.0.1:8007', // Update this for production
    DEBUG: false,
    SHOW_CONSOLE_LOGS: false
  },
  staging: {
    BASE_URL: 'https://staging.your-frappe-site.com', // Update this for staging
    DEBUG: true,
    SHOW_CONSOLE_LOGS: true
  }
};

// Get current environment configuration
export function getEnvConfig() {
  const env = import.meta.env.MODE || 'development';
  return ENV_CONFIG[env] || ENV_CONFIG.development;
}

// Get full API URL
export function getApiUrl(endpoint) {
  const envConfig = getEnvConfig();
  const baseUrl = import.meta.env.VITE_FRAPPE_URL || envConfig.BASE_URL;
  return `${baseUrl}${endpoint}`;
}

// Validate API configuration
export function validateApiConfig() {
  const envConfig = getEnvConfig();
  const issues = [];
  
  if (!envConfig.BASE_URL) {
    issues.push('BASE_URL is not configured');
  }
  
  if (envConfig.BASE_URL === 'https://your-frappe-site.com') {
    issues.push('BASE_URL is still using placeholder value');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

export default API_CONFIG;
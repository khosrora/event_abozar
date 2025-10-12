import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig 
} from 'axios';
import { toast } from 'sonner';
import type { ApiResponse, ApiError } from '@/types/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  // Make sure we have the correct base URL for the API
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  timeout: 15000, // Increased timeout for production API
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Log the API base URL during initialization
console.log(`🔌 API initialized with baseURL: ${api.defaults.baseURL}`);

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available from Zustand store or fallback to localStorage
    let token = null;
    if (typeof window !== 'undefined') {
      // Try to get from Zustand store via window object
      if (window.__ZUSTAND_STATE__?.['auth-storage']?.state?.token) {
        token = window.__ZUSTAND_STATE__['auth-storage'].state.token;
      } else {
        // Fallback to localStorage/sessionStorage
        token = localStorage.getItem('authToken') || sessionStorage.getItem('access_token');
      }
    }
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp for cache busting if needed
    if (config.method === 'get' && config.params) {
      config.params._t = Date.now();
    }
    
    // Debug logging for API requests
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, { 
        headers: config.headers,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return response data directly (Django REST Framework returns data directly, not wrapped)
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);

    // Network error handling - Don't show toast in development when using fallback
    if (!error.response) {
      const errorMessage = 'خطا در اتصال به سرور';
      
      // Only show toast if we're not in development or if mock fallback is disabled
      if (process.env.NODE_ENV === 'production' || 
          process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'false') {
        toast.error(errorMessage);
      }
      
      return Promise.reject({
        message: errorMessage,
        statusCode: 0,
        timestamp: new Date().toISOString(),
      } as ApiError);
    }

    // Server error handling
    const { status, data } = error.response;
    let errorMessage = 'خطای غیرمنتظره‌ای رخ داده است';

    switch (status) {
      case 400:
        // Log detailed error information for debugging
        console.log('400 Bad Request Details:', { data, url: error.config?.url });
        
        // For validation errors, try to extract specific field errors
        if (data?.errors) {
          const errorFields = Object.entries(data.errors)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join('; ');
          errorMessage = `خطای اعتبارسنجی: ${errorFields}`;
        } else {
          errorMessage = data?.message || data?.detail || 'داده‌های ارسالی نامعتبر است';
        }
        break;
      case 401:
        errorMessage = 'شما مجاز به دسترسی نیستید';
        // Clear token and redirect to login if needed
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
        }
        break;
      case 403:
        errorMessage = 'دسترسی غیرمجاز';
        break;
      case 404:
        errorMessage = 'اطلاعات درخواستی یافت نشد';
        break;
      case 422:
        errorMessage = 'داده‌های ارسالی نامعتبر است';
        // Handle validation errors
        if (data?.errors) {
          const validationErrors = Object.values(data.errors).flat();
          errorMessage = validationErrors.join(', ');
        }
        break;
      case 429:
        errorMessage = 'تعداد درخواست‌ها بیش از حد مجاز است';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorMessage = 'خطا در سرور، لطفاً بعداً تلاش کنید';
        break;
      default:
        errorMessage = data?.message || errorMessage;
    }

    // Show toast for non-401 errors (auth errors might be handled differently)
    if (status !== 401) {
      toast.error(errorMessage);
    }

    const apiError: ApiError = {
      message: errorMessage,
      statusCode: status,
      errors: data?.errors,
      timestamp: new Date().toISOString(),
    };

    return Promise.reject(apiError);
  }
);

// Generic API request function
export async function apiRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await api.request<T>(config);
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}

// HTTP method helpers
export const apiClient = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiRequest<T>({ method: 'GET', url, ...config });
  },

  post: async <T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ method: 'POST', url, data, ...config });
  },

  put: async <T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ method: 'PUT', url, data, ...config });
  },

  patch: async <T = any>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiRequest<T>({ method: 'PATCH', url, data, ...config });
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiRequest<T>({ method: 'DELETE', url, ...config });
  },
};

export default api;
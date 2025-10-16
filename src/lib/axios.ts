import axios from 'axios';

// Base API URL - باید در .env.local تنظیم شود
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.brisf.ir/';

// Flag to prevent multiple redirects
let isRedirecting = false;

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Create axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Safely parse JSON from localStorage
const safeParse = <T = any>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

// Centralized token resolver to avoid using a bad/undefined token
export const getAuthToken = (): { token: string | null; source: string } => {
  if (typeof window === 'undefined') return { token: null, source: 'ssr' };

  // Try common keys in order of preference
  const rawToken = localStorage.getItem('token');
  const access = localStorage.getItem('access');
  const accessToken = localStorage.getItem('access_token');

  // Zustand persisted auth storage
  const authStorage = safeParse<{ state?: { token?: string } }>(localStorage.getItem('auth-storage'));
  const zustandToken = authStorage?.state?.token ?? null;

  // Clean up the common anti-pattern where 'undefined' was saved as a string
  const normalize = (t: string | null) => (t && t !== 'undefined' && t !== 'null' ? t : null);

  const candidates: Array<[string, string | null]> = [
    ['token', normalize(rawToken)],
    ['access', normalize(access)],
    ['access_token', normalize(accessToken)],
    ['auth-storage', normalize(zustandToken)],
  ];

  for (const [source, val] of candidates) {
    if (val) return { token: val, source };
  }
  return { token: null, source: 'none' };
};

// Get refresh token
const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const refresh = localStorage.getItem('refresh');
  const refreshToken = localStorage.getItem('refresh_token');
  
  const normalize = (t: string | null) => (t && t !== 'undefined' && t !== 'null' ? t : null);
  
  return normalize(refresh) || normalize(refreshToken);
};

// Refresh access token
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return null;
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/account/refresh/`, {
      refresh: refreshToken,
    });
    
    const newAccessToken = response.data?.access;
    
    if (newAccessToken) {
      // Update token in localStorage
      localStorage.setItem('token', newAccessToken);
      localStorage.setItem('access', newAccessToken);
      localStorage.setItem('access_token', newAccessToken);
      
      // Update Zustand store
      const authStorage = safeParse<{ state?: any }>(localStorage.getItem('auth-storage'));
      if (authStorage?.state) {
        authStorage.state.token = newAccessToken;
        localStorage.setItem('auth-storage', JSON.stringify(authStorage));
      }
      
      return newAccessToken;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

// Notify all subscribers with new token
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

// Add subscriber to wait for token refresh
const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// Request interceptor - اضافه کردن توکن به هر درخواست
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const url = config.url || '';
      
      // Skip adding Authorization for auth endpoints
      const isAuthEndpoint = /\/account\/(login|register|verify)\/?$/i.test(url);
      if (isAuthEndpoint) {
        return config;
      }

      const { token } = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - مدیریت خطاها و refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }
      
      // Skip refresh for auth endpoints
      const url = originalRequest.url || '';
      const isAuthEndpoint = /\/account\/(login|register|refresh)\/?$/i.test(url);
      
      if (isAuthEndpoint) {
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      
      // If already refreshing, wait for the new token
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }
      
      isRefreshing = true;
      
      try {
        const newToken = await refreshAccessToken();
        
        if (newToken) {
          isRefreshing = false;
          onRefreshed(newToken);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } else {
          // Refresh failed, logout user
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        isRefreshing = false;
        
        // Clear tokens and redirect to login (only once)
        if (!isRedirecting) {
          isRedirecting = true;
          
          // Clear all tokens
          localStorage.removeItem('token');
          localStorage.removeItem('access');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('auth-storage');
          
          // Only redirect if not already on login/register page
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
            setTimeout(() => {
              window.location.replace('/login');
              isRedirecting = false;
            }, 100);
          } else {
            isRedirecting = false;
          }
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function برای ارسال FormData
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });
  
  return formData;
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api';
import type { User, LoginData, ApiError } from '@/types/api';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

interface RegisterData {
  full_name: string;
  phone: string;
  password: string;
}

// Create auth store with persistence
const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (data: LoginData) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post<{
            access_token: string;
            user: User;
          }>('/account/login/', data);

          // Save auth data
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          toast.success('ورود با موفقیت انجام شد');
          return true;
        } catch (error) {
          const apiError = error as ApiError;
          toast.error(apiError.message || 'خطا در ورود به سیستم');
          set({ isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          // Log the exact request being sent
          console.log('Sending registration request with data:', data);
          
          // Send the data directly as received from the form
          // This ensures we're using the exact field names as specified in the API documentation
          const response = await apiClient.post<{
            access_token: string;
            user: User;
          }>('/account/register/', data);

          console.log('Registration response:', response);

          // Auto login after successful registration
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          toast.success('ثبت‌نام با موفقیت انجام شد');
          return true;
        } catch (error: any) {
          // Log detailed error information for debugging
          console.error('Registration error details:', error);
          console.error('Response data:', error.response?.data);
          console.error('Request config:', {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: JSON.parse(error.config?.data || '{}')
          });
          
          // Format error message based on server response
          let errorMessage = 'خطا در ثبت‌نام';
          
          if (error.response?.data) {
            const responseData = error.response.data;
            if (typeof responseData === 'string') {
              errorMessage = responseData;
            } else if (responseData.message) {
              errorMessage = responseData.message;
            } else if (responseData.detail) {
              errorMessage = responseData.detail;
            } else if (responseData.errors) {
              const errors = Object.entries(responseData.errors)
                .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
                .join('; ');
              errorMessage = `خطای اعتبارسنجی: ${errors}`;
            }
          }
          
          toast.error(errorMessage);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        // Clear auth data from store
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        
        // Clear all possible auth-related items from browser storage
        if (typeof window !== 'undefined') {
          // Clear tokens and user data
          localStorage.removeItem('authToken');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('access_token');
          sessionStorage.removeItem('refresh_token');
          sessionStorage.removeItem('user');
          
          // Clear Zustand persisted state
          localStorage.removeItem('auth-storage');
          sessionStorage.removeItem('auth-storage');
        }
        
        toast.success('خروج با موفقیت انجام شد');
      },

      checkAuth: () => {
        const { token } = get();
        return !!token;
      },
    }),
    {
      name: 'auth-storage', // Name for localStorage key
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
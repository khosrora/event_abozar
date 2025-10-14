import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient, getAuthToken } from '@/lib/axios';
import type { User, LoginData, ApiError } from '@/types/api';
import { toast } from 'sonner';
import { accountService } from '@/services/account.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;  // Track if state has been restored from storage
  
  // Actions
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
  setHydrated: (hydrated: boolean) => void;
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
      isHydrated: false,

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      login: async (data: LoginData) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post('/account/login/', data);
          const responseData = response.data;

          // استخراج توکن از پاسخ
          const token = responseData?.tokens?.access || responseData?.access;
          const refreshToken = responseData?.tokens?.refresh || responseData?.refresh;
          
          // بررسی وجود توکن معتبر
          if (!token || token === 'undefined' || token === 'null') {
            set({ isLoading: false, isAuthenticated: false, token: null, user: null });
            toast.error('توکن احراز هویت دریافت نشد');
            return false;
          }

          // ذخیره در state
          set({
            user: responseData.user,
            token: token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // ذخیره در localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('access', token);
            localStorage.setItem('access_token', token);
            if (refreshToken) {
              localStorage.setItem('refresh', refreshToken);
              localStorage.setItem('refresh_token', refreshToken);
            }
          }
          
          toast.success('ورود با موفقیت انجام شد');
          return true;
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 
                              error.response?.data?.detail ||
                              'خطا در ورود به سیستم';
          toast.error(errorMessage);
          set({ isLoading: false });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post('/account/register/', data);
          const responseData = response.data;

          // استخراج توکن از پاسخ
          const token = responseData?.tokens?.access || responseData?.access;
          const refreshToken = responseData?.tokens?.refresh || responseData?.refresh;
          
          if (!token || token === 'undefined' || token === 'null') {
            set({ isLoading: false, isAuthenticated: false, token: null, user: null });
            toast.error('توکن احراز هویت دریافت نشد');
            return false;
          }

          // Auto login after successful registration
          set({
            user: responseData.user,
            token: token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          // ذخیره در localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('access', token);
            localStorage.setItem('access_token', token);
            if (refreshToken) {
              localStorage.setItem('refresh', refreshToken);
              localStorage.setItem('refresh_token', refreshToken);
            }
          }
          
          toast.success('ثبت‌نام با موفقیت انجام شد');
          return true;
        } catch (error: any) {
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
          localStorage.removeItem('token'); // کلید اصلی که در interceptor استفاده می‌شود
          localStorage.removeItem('authToken');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          
          sessionStorage.removeItem('token');
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
      onRehydrateStorage: () => (state) => {
        if (!state || typeof window === 'undefined') return;

        // علامت هیدراته شدن
        state.setHydrated(true);

        // نرمال‌سازی توکن‌های ذخیره شده و پاکسازی مقادیر بد
        const rawToken = localStorage.getItem('token');
        const access = localStorage.getItem('access');
        const accessToken = localStorage.getItem('access_token');

        const normalize = (t: string | null) => (t && t !== 'undefined' && t !== 'null' ? t : null);
        const candidates = [normalize(rawToken), normalize(access), normalize(accessToken)];
        const selected = candidates.find(Boolean) || null;

        // همگام‌سازی با localStorage اگر توکن معتبری وجود دارد
        if (selected && selected !== state.token) {
          state.token = selected;
          state.isAuthenticated = true;
        }

        // پاکسازی توکن‌های بد
        if (!selected) {
          localStorage.removeItem('token');
          localStorage.removeItem('access');
          localStorage.removeItem('access_token');
          state.token = null;
          state.isAuthenticated = false;
        }
      },
    }
  )
);

export default useAuthStore;
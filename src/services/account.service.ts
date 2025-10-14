import { apiClient } from '@/lib/axios';
import { User, UpdateUserProfile } from '@/types/api';

/**
 * Account Service
 * مدیریت API های مربوط به حساب کاربری
 */

export const accountService = {
  /**
   * دریافت اطلاعات پروفایل کاربر
   * GET /account/me/
   */
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/account/me/');
    return response.data;
  },

  /**
   * به‌روزرسانی اطلاعات پروفایل کاربر
   * PUT /account/me/
   * توجه: شماره تلفن قابل تغییر نیست
   */
  updateProfile: async (data: UpdateUserProfile): Promise<User> => {
    const response = await apiClient.put<User>('/account/me/', data);
    return response.data;
  },

  /**
   * اعتبارسنجی توکن کاربر
   * POST /account/verify/
   * بدنه: { token: string }
   * خروجی: در صورت 200 معتبر است، در غیر این صورت نامعتبر
   */
  verifyToken: async (token: string): Promise<'valid' | 'invalid' | 'unknown'> => {
    try {
      // ارسال توکن در بدنه، نه در هدر Authorization
      const res = await apiClient.post('/account/verify/', { token });
      return res.status >= 200 && res.status < 300 ? 'valid' : 'invalid';
    } catch (err: any) {
      const status = err?.response?.status;
      // اگر endpoint وجود نداشت یا متد مجاز نبود، وضعیت نامشخص است
      if (status === 404 || status === 405) return 'unknown';
      // اگر 401 بود یعنی توکن نامعتبر است
      if (status === 401) return 'invalid';
      return 'invalid';
    }
  },

  /**
   * دریافت پروفایل با توکن سفارشی (برای تست سریع اعتبار توکن)
   * این متد توکن را مستقیماً در هدر ارسال می‌کند
   */
  getProfileWithToken: async (token: string): Promise<User | null> => {
    try {
      const response = await apiClient.get<User>('/account/me/', {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      return response.data;
    } catch {
      return null;
    }
  },
};

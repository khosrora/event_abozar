import { apiClient, createFormData } from '@/lib/axios';
import {
  FestivalRegistrationListItem,
  FestivalRegistrationDetail,
  DashboardStatistics,
  Work,
  CreateWorkData,
  UpdateWorkData,
} from '@/types/api';

/**
 * Festival Service
 * مدیریت API های مربوط به جشنواره و آثار
 */

export const festivalService = {
  /**
   * دریافت لیست جشنواره‌های ثبت‌نام شده کاربر
   * GET /festival/my-registrations-list/
   */
  getMyRegistrations: async (): Promise<FestivalRegistrationListItem[]> => {
    const response = await apiClient.get<FestivalRegistrationListItem[]>(
      '/festival/my-registrations-list/'
    );
    return response.data;
  },

  /**
   * دریافت جزئیات یک جشنواره ثبت‌نام شده
   * GET /festival/my-registrations-detail/{id}/
   */
  getRegistrationDetail: async (id: number): Promise<FestivalRegistrationDetail> => {
    const response = await apiClient.get<FestivalRegistrationDetail>(
      `/festival/my-registrations-detail/${id}/`
    );
    return response.data;
  },

  /**
   * دریافت آمار داشبورد کاربر
   * GET /festival/my-statistics/
   */
  getMyStatistics: async (): Promise<DashboardStatistics> => {
    const response = await apiClient.get<DashboardStatistics>(
      '/festival/my-statistics/'
    );
    return response.data;
  },

  /**
   * دریافت لیست آثار یک جشنواره
   * GET /festival/works/by-festival/{festival_id}/
   */
  getWorksByFestival: async (festivalId: number): Promise<Work[]> => {
    const response = await apiClient.get<Work[]>(
      `/festival/works/by-festival/${festivalId}/`
    );
    return response.data;
  },

  /**
   * ارسال اثر جدید
   * POST /festival/works/
   * با استفاده از FormData برای آپلود فایل
   */
  createWork: async (data: CreateWorkData): Promise<Work> => {
    const formData = createFormData({
      festival_registration: data.festival_registration,
      title: data.title,
      description: data.description,
      file: data.file,
    });

    const response = await apiClient.post<Work>('/festival/works/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * به‌روزرسانی اثر
   * PUT /festival/works/{id}/
   * با استفاده از FormData اگر فایل جدید ارسال شود
   */
  updateWork: async (id: number, data: UpdateWorkData): Promise<Work> => {
    // اگر فایل جدید ارسال شده، از FormData استفاده کن
    if (data.file) {
      const formData = createFormData({
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        file: data.file,
      });

      const response = await apiClient.put<Work>(
        `/festival/works/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    }

    // در غیر این صورت، فقط JSON ارسال کن
    const response = await apiClient.put<Work>(`/festival/works/${id}/`, {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
    });
    return response.data;
  },

  /**
   * حذف اثر
   * DELETE /festival/works/{id}/
   */
  deleteWork: async (id: number): Promise<void> => {
    await apiClient.delete(`/festival/works/${id}/`);
  },
};

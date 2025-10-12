import { apiClient } from '@/lib/api';
import type {
  News,
  NewsListResponse,
  NewsDetailResponse,
  NewsFilters,
  Event,
  EventListResponse,
  EventDetailResponse,
  EventFilters,
  EducationContent,
  EducationListResponse,
  EducationDetailResponse,
  EducationFilters,
  RegistrationData,
  RegistrationResponse,
  ContactData,
  ContactResponse,
  SiteStats,
  FestivalRegistrationData,
  FestivalRegistrationResponse,
  SignupData,
  SignupResponse,
  LoginData,
  LoginResponse,
  User,
} from '@/types/api';

// Authentication API
export const authApi = {
  signup: async (data: SignupData): Promise<SignupResponse> => {
    // Log the exact data being sent for debugging
    console.log('🔐 Signup API call with data:', data);
    const response = await apiClient.post<SignupResponse>('/account/register/', data);
    console.log('✅ Signup API response:', response);
    return response;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    console.log('🔐 Login API call with data:', data);
    const response = await apiClient.post<LoginResponse>('/account/login/', data);
    console.log('✅ Login API response:', response);
    return response;
  },

  logout: async (): Promise<void> => {
    await apiClient.post<void>('/auth/logout/', {});
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile/');
    return response;
  },

  refreshToken: async (refresh: string): Promise<{ access: string }> => {
    const response = await apiClient.post<{ access: string }>('/auth/refresh/', { refresh });
    return response;
  },
};

// News API
export const newsApi = {
  getAll: async (filters?: NewsFilters): Promise<NewsListResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(`${key}[]`, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await apiClient.get<NewsListResponse>(`/content/news/?${params.toString()}`);
    return response;
  },

  getById: async (id: number): Promise<NewsDetailResponse> => {
    const response = await apiClient.get<NewsDetailResponse>(`/content/news/${id}/`);
    return response;
  },
};

// Events API
export const eventsApi = {
  getAll: async (filters?: EventFilters): Promise<EventListResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(`${key}[]`, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await apiClient.get<EventListResponse>(`/content/events/?${params.toString()}`);
    return response;
  },

  getById: async (id: number): Promise<EventDetailResponse> => {
    const response = await apiClient.get<EventDetailResponse>(`/content/events/${id}/`);
    return response;
  },
};

// Education API
export const educationApi = {
  getAll: async (filters?: EducationFilters): Promise<EducationListResponse> => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(`${key}[]`, v.toString()));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }
    
    const response = await apiClient.get<EducationListResponse>(`/content/education/?${params.toString()}`);
    return response;
  },

  getById: async (id: number): Promise<EducationDetailResponse> => {
    const response = await apiClient.get<EducationDetailResponse>(`/content/education/${id}/`);
    return response;
  },
};

// Festival Registration API
export const festivalApi = {
  register: async (data: FestivalRegistrationData): Promise<FestivalRegistrationResponse> => {
    return apiClient.post<FestivalRegistrationResponse>('/festival/registration/', data);
  },

  getProvinces: async () => {
    return apiClient.get('/festival/provinces/');
  },

  getCities: async (provinceId?: number) => {
    const params = provinceId ? `?province_id=${provinceId}` : '';
    return apiClient.get(`/festival/cities/${params}`);
  },
};

// Legacy Registration API (for backward compatibility)
export const registrationApi = {
  submit: async (data: RegistrationData): Promise<RegistrationResponse> => {
    // Map to festival API format
    const festivalData: FestivalRegistrationData = {
      full_name: data.fullName,
      father_name: data.fatherName,
      national_id: data.nationalId,
      gender: data.gender,
      education: data.education,
      phone_number: data.phoneNumber,
      virtual_number: data.virtualNumber,
      province_id: parseInt(data.province),
      city_id: parseInt(data.city),
      media_name: data.mediaName,
      festival_format: data.category,
      festival_topic: data.topic,
      special_section: data.specialSection,
    };
    return festivalApi.register(festivalData) as any;
  },
};

// Contact API (placeholder - not in schema)
export const contactApi = {
  submit: async (data: ContactData): Promise<ContactResponse> => {
    return apiClient.post<{ messageId: number }>('/contact/', data) as any;
  },
};

// Stats API (placeholder - not in schema)
export const statsApi = {
  getSiteStats: async (): Promise<{ data: SiteStats }> => {
    return apiClient.get<SiteStats>('/stats/') as any;
  },
};

// Search API (not in current schema)
export const searchApi = {
  global: async (query: string, filters?: { type?: 'news' | 'events' | 'education' }): Promise<{
    data: {
      news: News[];
      events: Event[];
      education: EducationContent[];
    };
  }> => {
    const params = new URLSearchParams({ q: query });
    if (filters?.type) {
      params.append('type', filters.type);
    }
    const data = await apiClient.get<{
      news: News[];
      events: Event[];
      education: EducationContent[];
    }>(`/search?${params.toString()}`);
    return { data } as any;
  },
};
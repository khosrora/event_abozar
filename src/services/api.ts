import { apiClient } from '@/lib/api';
import type {
  News,
  NewsListResponse,
  NewsFilters,
  Event,
  EventListResponse,
  EventFilters,
  EducationContent,
  EducationListResponse,
  EducationFilters,
  RegistrationData,
  RegistrationResponse,
  ContactData,
  ContactResponse,
  SiteStats,
} from '@/types/api';

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
    
    const response = await apiClient.get(`/news?${params.toString()}`);
    return response as NewsListResponse;
  },

  getById: async (id: number): Promise<{ data: News }> => {
    return apiClient.get<News>(`/news/${id}`);
  },

  getBySlug: async (slug: string): Promise<{ data: News }> => {
    return apiClient.get<News>(`/news/slug/${slug}`);
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    return apiClient.post<{ viewCount: number }>(`/news/${id}/view`);
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
    
    const response = await apiClient.get(`/events?${params.toString()}`);
    return response as EventListResponse;
  },

  getById: async (id: number): Promise<{ data: Event }> => {
    return apiClient.get<Event>(`/events/${id}`);
  },

  getBySlug: async (slug: string): Promise<{ data: Event }> => {
    return apiClient.get<Event>(`/events/slug/${slug}`);
  },

  getFeatured: async (): Promise<{ data: Event[] }> => {
    return apiClient.get<Event[]>('/events/featured');
  },

  getUpcoming: async (limit = 6): Promise<{ data: Event[] }> => {
    return apiClient.get<Event[]>(`/events/upcoming?limit=${limit}`);
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    return apiClient.post<{ viewCount: number }>(`/events/${id}/view`);
  },

  register: async (eventId: number, data: RegistrationData): Promise<RegistrationResponse> => {
    return apiClient.post<{ registrationId: number }>(`/events/${eventId}/register`, data);
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
    
    const response = await apiClient.get(`/education?${params.toString()}`);
    return response as EducationListResponse;
  },

  getById: async (id: number): Promise<{ data: EducationContent }> => {
    return apiClient.get<EducationContent>(`/education/${id}`);
  },

  getBySlug: async (slug: string): Promise<{ data: EducationContent }> => {
    return apiClient.get<EducationContent>(`/education/slug/${slug}`);
  },

  getFeatured: async (limit = 6): Promise<{ data: EducationContent[] }> => {
    return apiClient.get<EducationContent[]>(`/education/featured?limit=${limit}`);
  },

  getByCategory: async (category: string, limit = 6): Promise<{ data: EducationContent[] }> => {
    return apiClient.get<EducationContent[]>(`/education/category/${category}?limit=${limit}`);
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    return apiClient.post<{ viewCount: number }>(`/education/${id}/view`);
  },
};

// Registration API
export const registrationApi = {
  submit: async (data: RegistrationData): Promise<RegistrationResponse> => {
    return apiClient.post<{ registrationId: number }>('/registration', data);
  },

  getById: async (id: number): Promise<{ data: RegistrationData & { id: number; createdAt: string } }> => {
    return apiClient.get<RegistrationData & { id: number; createdAt: string }>(`/registration/${id}`);
  },
};

// Contact API
export const contactApi = {
  submit: async (data: ContactData): Promise<ContactResponse> => {
    return apiClient.post<{ messageId: number }>('/contact', data);
  },
};

// Stats API
export const statsApi = {
  getSiteStats: async (): Promise<{ data: SiteStats }> => {
    return apiClient.get<SiteStats>('/stats');
  },
};

// Search API
export const searchApi = {
  global: async (query: string, filters?: { type?: 'news' | 'events' | 'education' }): Promise<{
    data: {
      news: News[];
      events: Event[];
      education: EducationContent[];
    }
  }> => {
    const params = new URLSearchParams({ q: query });
    if (filters?.type) {
      params.append('type', filters.type);
    }
    return apiClient.get<{
      news: News[];
      events: Event[];
      education: EducationContent[];
    }>(`/search?${params.toString()}`);
  },
};
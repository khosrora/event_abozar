import type {
  NewsListResponse,
  EventListResponse,
  EducationListResponse,
  NewsFilters,
  EventFilters,
  EducationFilters,
  News,
  Event,
  EducationContent,
  BackendPaginatedResponse,
} from '@/types/api';

import {
  mockNews,
  mockEvents,
  mockEducationContent,
} from '@/data/mockData';

// Simulate network delay
const simulateDelay = (min = 300, max = 1000) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Helper to generate empty backend paginated response
const emptyPaginatedResponse = <T>(): BackendPaginatedResponse<T> => ({
  links: {
    next: null,
    previous: null
  },
  total_items: 0,
  total_pages: 1,
  current_page: 1,
  page_size: null,
  results: []
});

// Mock API Services
export const mockNewsApi = {
  getAll: async (filters?: NewsFilters): Promise<NewsListResponse> => {
    await simulateDelay();
    return emptyPaginatedResponse();
  },

  getById: async (id: number): Promise<News> => {
    await simulateDelay();
    const news = mockNews.find((item: any) => item.id === id);
    if (!news) {
      throw { message: 'خبر یافت نشد', statusCode: 404 };
    }
    return news;
  },

  getBySlug: async (slug: string): Promise<News> => {
    await simulateDelay();
    const news = mockNews.find((item: any) => item.slug === slug);
    if (!news) {
      throw { message: 'خبر یافت نشد', statusCode: 404 };
    }
    return news;
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const news = mockNews.find((item: any) => item.id === id);
    if (!news) {
      throw { message: 'خبر یافت نشد', statusCode: 404 };
    }
    news.viewCount = (news.viewCount || 0) + 1;
    return { data: { viewCount: news.viewCount } };
  },
};

export const mockEventsApi = {
  getAll: async (filters?: EventFilters): Promise<EventListResponse> => {
    await simulateDelay();
    return emptyPaginatedResponse();
  },

  getById: async (id: number): Promise<Event> => {
    await simulateDelay();
    const event = mockEvents.find((item: any) => item.id === id);
    if (!event) {
      throw { message: 'رویداد یافت نشد', statusCode: 404 };
    }
    return event;
  },

  getBySlug: async (slug: string): Promise<Event> => {
    await simulateDelay();
    const event = mockEvents.find((item: any) => item.slug === slug);
    if (!event) {
      throw { message: 'رویداد یافت نشد', statusCode: 404 };
    }
    return event;
  },

  getFeatured: async (): Promise<{ data: Event[] }> => {
    await simulateDelay();
    return { data: [] };
  },

  getUpcoming: async (limit = 6): Promise<{ data: Event[] }> => {
    await simulateDelay();
    return { data: [] };
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const event = mockEvents.find((item: any) => item.id === id);
    if (!event) {
      throw { message: 'رویداد یافت نشد', statusCode: 404 };
    }
    event.viewCount = (event.viewCount || 0) + 1;
    return { data: { viewCount: event.viewCount } };
  },
};

export const mockEducationApi = {
  getAll: async (filters?: EducationFilters): Promise<EducationListResponse> => {
    await simulateDelay();
    return emptyPaginatedResponse();
  },

  getById: async (id: number): Promise<EducationContent> => {
    await simulateDelay();
    const content = mockEducationContent.find((item: any) => item.id === id);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    return content;
  },

  getBySlug: async (slug: string): Promise<EducationContent> => {
    await simulateDelay();
    const content = mockEducationContent.find((item: any) => item.slug === slug);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    return content;
  },

  getFeatured: async (limit = 6): Promise<{ data: EducationContent[] }> => {
    await simulateDelay();
    return { data: [] };
  },

  getByCategory: async (category: string, limit = 6): Promise<{ data: EducationContent[] }> => {
    await simulateDelay();
    return { data: [] };
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const content = mockEducationContent.find((item: any) => item.id === id);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    content.viewCount = (content.viewCount || 0) + 1;
    return { data: { viewCount: content.viewCount } };
  },
};
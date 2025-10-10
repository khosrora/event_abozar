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
} from '@/types/api';

import {
  generateMockNewsResponse,
  generateMockEventsResponse,
  generateMockEducationResponse,
  mockNews,
  mockEvents,
  mockEducationContent,
} from '@/data/mockData';

// Simulate network delay
const simulateDelay = (min = 300, max = 1000) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Mock API Services
export const mockNewsApi = {
  getAll: async (filters?: NewsFilters): Promise<NewsListResponse> => {
    await simulateDelay();
    return generateMockNewsResponse(filters);
  },

  getById: async (id: number): Promise<{ data: News }> => {
    await simulateDelay();
    const news = mockNews.find(item => item.id === id);
    if (!news) {
      throw { message: 'خبر یافت نشد', statusCode: 404 };
    }
    return { data: news };
  },

  getBySlug: async (slug: string): Promise<{ data: News }> => {
    await simulateDelay();
    const news = mockNews.find(item => item.slug === slug);
    if (!news) {
      throw { message: 'خبر یافت نشد', statusCode: 404 };
    }
    return { data: news };
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const news = mockNews.find(item => item.id === id);
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
    return generateMockEventsResponse(filters);
  },

  getById: async (id: number): Promise<{ data: Event }> => {
    await simulateDelay();
    const event = mockEvents.find(item => item.id === id);
    if (!event) {
      throw { message: 'رویداد یافت نشد', statusCode: 404 };
    }
    return { data: event };
  },

  getBySlug: async (slug: string): Promise<{ data: Event }> => {
    await simulateDelay();
    const event = mockEvents.find(item => item.slug === slug);
    if (!event) {
      throw { message: 'رویداد یافت نشد', statusCode: 404 };
    }
    return { data: event };
  },

  getFeatured: async (): Promise<{ data: Event[] }> => {
    await simulateDelay();
    // Return first 3 events as featured
    return { data: mockEvents.slice(0, 3) };
  },

  getUpcoming: async (limit = 6): Promise<{ data: Event[] }> => {
    await simulateDelay();
    const upcomingEvents = mockEvents
      .filter(event => event.status === 'upcoming' || event.status === 'active')
      .slice(0, limit);
    return { data: upcomingEvents };
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const event = mockEvents.find(item => item.id === id);
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
    return generateMockEducationResponse(filters);
  },

  getById: async (id: number): Promise<{ data: EducationContent }> => {
    await simulateDelay();
    const content = mockEducationContent.find(item => item.id === id);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    return { data: content };
  },

  getBySlug: async (slug: string): Promise<{ data: EducationContent }> => {
    await simulateDelay();
    const content = mockEducationContent.find(item => item.slug === slug);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    return { data: content };
  },

  getFeatured: async (limit = 6): Promise<{ data: EducationContent[] }> => {
    await simulateDelay();
    // Return first `limit` education content as featured
    return { data: mockEducationContent.slice(0, limit) };
  },

  getByCategory: async (category: string, limit = 6): Promise<{ data: EducationContent[] }> => {
    await simulateDelay();
    const categoryContent = mockEducationContent
      .filter(content => content.category === category)
      .slice(0, limit);
    return { data: categoryContent };
  },

  incrementView: async (id: number): Promise<{ data: { viewCount: number } }> => {
    await simulateDelay(100, 300);
    const content = mockEducationContent.find(item => item.id === id);
    if (!content) {
      throw { message: 'محتوای آموزشی یافت نشد', statusCode: 404 };
    }
    content.viewCount = (content.viewCount || 0) + 1;
    return { data: { viewCount: content.viewCount } };
  },
};
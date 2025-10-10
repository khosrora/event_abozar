import { 
  newsApi as realNewsApi, 
  eventsApi as realEventsApi, 
  educationApi as realEducationApi 
} from './api';

import { 
  mockNewsApi, 
  mockEventsApi, 
  mockEducationApi 
} from './mockApi';

// Check if we're in development mode and should use mock data
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' && 
  process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';

// Fallback helper - tries real API first, falls back to mock on error
async function withFallback<T>(
  realApiCall: () => Promise<T>,
  mockApiCall: () => Promise<T>,
  useMock = USE_MOCK_DATA
): Promise<T> {
  if (useMock) {
    console.log('🟡 Using mock data (development mode)');
    return mockApiCall();
  }

  try {
    console.log('🟢 Attempting real API call');
    const result = await realApiCall();
    return result;
  } catch (error: any) {
    console.warn('🔴 Real API failed, falling back to mock data:', error.message);
    
    // Only fallback to mock in development or if it's a connection error
    if (process.env.NODE_ENV === 'development' || 
        error.statusCode === 0 || 
        error.message?.includes('Network Error') ||
        error.message?.includes('timeout')) {
      
      console.log('🟡 Using mock data as fallback');
      return mockApiCall();
    }
    
    // Re-throw the error if we shouldn't use mock data
    throw error;
  }
}

// Adaptive News API
export const adaptiveNewsApi = {
  getAll: async (params?: any) => 
    withFallback(
      () => realNewsApi.getAll(params),
      () => mockNewsApi.getAll(params)
    ),

  getById: async (id: number) => 
    withFallback(
      () => realNewsApi.getById(id),
      () => mockNewsApi.getById(id)
    ),

  getBySlug: async (slug: string) => 
    withFallback(
      () => realNewsApi.getBySlug(slug),
      () => mockNewsApi.getBySlug(slug)
    ),

  incrementView: async (id: number) => 
    withFallback(
      () => realNewsApi.incrementView(id),
      () => mockNewsApi.incrementView(id)
    ),
};

// Adaptive Events API
export const adaptiveEventsApi = {
  getAll: async (params?: any) => 
    withFallback(
      () => realEventsApi.getAll(params),
      () => mockEventsApi.getAll(params)
    ),

  getById: async (id: number) => 
    withFallback(
      () => realEventsApi.getById(id),
      () => mockEventsApi.getById(id)
    ),

  getBySlug: async (slug: string) => 
    withFallback(
      () => realEventsApi.getBySlug(slug),
      () => mockEventsApi.getBySlug(slug)
    ),

  getFeatured: async (params?: any) => 
    withFallback(
      () => realEventsApi.getFeatured(),
      () => mockEventsApi.getFeatured()
    ),

  getUpcoming: async (params?: { limit?: number }) => {
    const limit = params?.limit || 6;
    return withFallback(
      () => realEventsApi.getUpcoming(limit),
      () => mockEventsApi.getUpcoming(limit)
    );
  },

  incrementView: async (id: number) => 
    withFallback(
      () => realEventsApi.incrementView(id),
      () => mockEventsApi.incrementView(id)
    ),
};

// Adaptive Education API
export const adaptiveEducationApi = {
  getAll: async (params?: any) => 
    withFallback(
      () => realEducationApi.getAll(params),
      () => mockEducationApi.getAll(params)
    ),

  getById: async (id: number) => 
    withFallback(
      () => realEducationApi.getById(id),
      () => mockEducationApi.getById(id)
    ),

  getBySlug: async (slug: string) => 
    withFallback(
      () => realEducationApi.getBySlug(slug),
      () => mockEducationApi.getBySlug(slug)
    ),

  getFeatured: async (params?: { limit?: number }) => {
    const limit = params?.limit || 6;
    return withFallback(
      () => realEducationApi.getFeatured(limit),
      () => mockEducationApi.getFeatured(limit)
    );
  },

  getByCategory: async (params?: { category: string; limit?: number }) => {
    const { category, limit = 6 } = params || {};
    if (!category) throw new Error('Category is required');
    return withFallback(
      () => realEducationApi.getByCategory(category, limit),
      () => mockEducationApi.getByCategory(category, limit)
    );
  },

  incrementView: async (id: number) => 
    withFallback(
      () => realEducationApi.incrementView(id),
      () => mockEducationApi.incrementView(id)
    ),
};

// Export the adaptive APIs as the main APIs
export const newsApi = adaptiveNewsApi;
export const eventsApi = adaptiveEventsApi;
export const educationApi = adaptiveEducationApi;
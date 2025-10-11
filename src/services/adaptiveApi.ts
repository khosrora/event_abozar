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
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Fallback helper - tries real API first, falls back to mock on error
async function withFallback<T>(
  realApiCall: () => Promise<T>,
  mockApiCall: () => Promise<T>,
  useMock = USE_MOCK_DATA
): Promise<T> {
  if (useMock) {
    console.log('🟡 Using mock data (forced via env variable)');
    return mockApiCall();
  }

  try {
    console.log('🟢 Attempting real API call to backend');
    const result = await realApiCall();
    console.log('✅ Real API call successful');
    return result;
  } catch (error: any) {
    console.warn('🔴 Real API failed:', error.message);
    
    // Only fallback to mock in development or if it's a connection error
    if (process.env.NODE_ENV === 'development' && (
        error.statusCode === 0 || 
        error.message?.includes('Network Error') ||
        error.message?.includes('timeout') ||
        error.message?.includes('Not Found'))) {
      
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
      async () => {
        const result = await mockNewsApi.getById(id);
        return result.data;
      }
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
      async () => {
        const result = await mockEventsApi.getById(id);
        return result.data;
      }
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
      async () => {
        const result = await mockEducationApi.getById(id);
        return result.data;
      }
    ),
};

// Export the adaptive APIs as the main APIs
export const newsApi = adaptiveNewsApi;
export const eventsApi = adaptiveEventsApi;
export const educationApi = adaptiveEducationApi;
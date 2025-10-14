// Re-export real APIs directly (no mock fallback in production)
import { 
  newsApi,
  eventsApi,
  educationApi,
  authApi,
} from './api';

export {
  newsApi,
  eventsApi,
  educationApi,
  authApi,
};
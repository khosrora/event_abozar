// Base API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: 'success' | 'error';
  statusCode?: number;
}

// Custom Backend Pagination (actual structure from backend)
export interface BackendPaginatedResponse<T> {
  links: {
    next: string | null;
    previous: string | null;
  };
  total_items: number;
  total_pages: number;
  current_page: number;
  page_size: number | null;
  results: T[];
}

// Django REST Framework Pagination (kept for compatibility)
export interface DjangoPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// News Types (matches Django API)
export interface News {
  id: number;
  title: string;
  description: string;
  image: string | null;
  publish_date: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsList {
  id: number;
  title: string;
  publish_date: string;
  tags: string[];
  image?: string | null;
}

export type NewsListResponse = BackendPaginatedResponse<NewsList>;
export type NewsDetailResponse = News;

// Events Types (matches Django API)
export interface Event {
  id: number;
  title: string;
  description: string;
  image: string | null;
  publish_date: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface EventList {
  id: number;
  title: string;
  publish_date: string;
  tags: string[];
  image?: string | null;
}

export type EventListResponse = BackendPaginatedResponse<EventList>;
export type EventDetailResponse = Event;

// Education Types (matches Django API)
export interface EducationContent {
  id: number;
  title: string;
  description: string;
  image: string | null;
  publish_date: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface EducationList {
  id: number;
  title: string;
  publish_date: string;
  tags: string[];
  image?: string | null;
}

export type EducationListResponse = BackendPaginatedResponse<EducationList>;
export type EducationDetailResponse = EducationContent;

// Festival Registration Types (matches Django API)
export interface FestivalRegistrationData {
  full_name: string;
  father_name: string;
  national_id: string;
  gender: 'male' | 'female';
  education: string;
  phone_number: string;
  virtual_number?: string;
  province_id: number;
  city_id: number;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  special_section?: string;
}

export interface FestivalRegistration {
  id: number;
  full_name: string;
  father_name: string;
  national_id: string;
  gender: 'male' | 'female';
  education: string;
  phone_number: string;
  virtual_number?: string;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  special_section?: string;
  created_at: string;
  updated_at: string;
}

export type FestivalRegistrationResponse = FestivalRegistration;

// Province and City Types
export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  province_id: number;
}

// Legacy Registration Types (for backward compatibility)
export interface RegistrationData {
  fullName: string;
  education: string;
  fatherName: string;
  gender: 'male' | 'female';
  mediaName: string;
  nationalId: string;
  phoneNumber: string;
  virtualNumber?: string;
  province: string;
  city: string;
  category: string;
  topic: string;
  specialSection?: string;
  eventId?: number;
}

export interface RegistrationResponse extends ApiResponse<{ registrationId: number }> {}

// Contact Types
export interface ContactData {
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}

export interface ContactResponse extends ApiResponse<{ messageId: number }> {}

// Stats Types
export interface SiteStats {
  totalEvents: number;
  totalNews: number;
  totalEducationContent: number;
  totalRegistrations: number;
  activeEvents: number;
  upcomingEvents: number;
}

// Error Types
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp: string;
}

// Filter and Search Types
export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface NewsFilters extends BaseFilters {
  category?: 'organization' | 'branches';
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
}

export interface EventFilters extends BaseFilters {
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
}

export interface EducationFilters extends BaseFilters {
  level?: string;
  category?: string;
  instructor?: string;
  durationMin?: number;
  durationMax?: number;
  tags?: string[];
}
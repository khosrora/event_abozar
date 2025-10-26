// Base API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: 'success' | 'error';
  statusCode?: number;
}

// Authentication Types
export interface SignupData {
  full_name: string;  // Single full name field
  phone: string;      // Changed from mobile to phone
  password: string;
}

export interface LoginData {
  phone: string; // Updated to match API requirements
  password: string;
}

export interface User {
  id: number;
  fullName: string;
  phone: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  password: string;
  groups: number[];
  user_permissions: number[];
  // Keep old fields for backward compatibility
  first_name?: string;
  last_name?: string;
  full_name?: string;
  mobile?: string;
  email?: string;
  created_at?: string;
}

export interface AuthResponse {
  message?: string;
  user: User;
  tokens?: {
    access: string;
    refresh: string;
  };
  // Legacy fields for backward compatibility
  access?: string;
  refresh?: string;
}

export type SignupResponse = AuthResponse;
export type LoginResponse = AuthResponse;

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
  publish_link?: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface NewsList {
  id: number;
  title: string;
  publish_date: string;
  publish_link?: string | null;
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
  publish_link?: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface EventList {
  id: number;
  title: string;
  publish_date: string;
  publish_link?: string | null;
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
  video?: string | null;
  document?: string | null;
  publish_date: string;
  publish_link?: string | null;
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

// Festival Option Types
export interface FestivalOption {
  id: number;
  code: string;
  name: string;
  description: string;
}

export type FestivalFormat = FestivalOption;
export type FestivalTopic = FestivalOption;
export type FestivalSpecialSection = FestivalOption;

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
  festival_format: string; // code from FestivalFormat
  festival_topic: string; // code from FestivalTopic
  special_section?: string; // code from FestivalSpecialSection
}

// Province and City Types
export interface Province {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  province_id?: number;
}

export type Gender = 'male' | 'female';

// Festival Registration (short version for list)
export interface FestivalRegistrationListItem {
  id: number;
  full_name: string;
  gender: Gender;
  phone_number: string;
  province: Province;
  city: City;
  media_name: string;
  festival_format: FestivalFormat;
  festival_topic: FestivalTopic;
  special_section: FestivalSpecialSection;
  created_at: string;
}

// Festival Registration Detail (full version)
export interface FestivalRegistrationDetail {
  id: number;
  full_name: string;
  father_name: string;
  national_id: string;
  gender: Gender;
  education: string;
  phone_number: string;
  virtual_number: string;
  province: Province;
  city: City;
  media_name: string;
  festival_format: FestivalFormat;
  festival_topic: FestivalTopic;
  special_section: FestivalSpecialSection;
  created_at: string;
  updated_at: string;
}

// Keep old type for backward compatibility
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

// Dashboard Statistics
export interface DashboardStatistics {
  my_registrations_count: number;
  my_works_count: number;
  total_content_count: number;
}

// Work/Content Types
export interface Work {
  id: number;
  title: string;
  description: string;
  publish_link?: string;
  file_url: string;
  registration_name: string;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkData {
  festival_registration: number;
  title: string;
  description: string;
  publish_link?: string;
  file: File;
}

export interface UpdateWorkData {
  title?: string;
  description?: string;
  publish_link?: string;
  file?: File;
}

export interface UpdateUserProfile {
  fullName: string;
  // phone is readonly - cannot be changed
}


export interface EducationFilters extends BaseFilters {
  level?: string;
  category?: string;
  instructor?: string;
  durationMin?: number;
  durationMax?: number;
  tags?: string[];
}
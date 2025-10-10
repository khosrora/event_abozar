// Base API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  statusCode: number;
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

// News Types
export interface News {
  id: number;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  category: 'organization' | 'branches';
  publishedAt: string;
  author?: string;
  slug?: string;
  viewCount?: number;
  isActive: boolean;
  tags?: string[];
}

export type NewsListResponse = PaginatedResponse<News>;

// Events Types
export interface Event {
  id: number;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  category: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  maxParticipants?: number;
  currentParticipants?: number;
  registrationDeadline?: string;
  price?: number;
  organizerName?: string;
  organizerContact?: string;
  slug?: string;
  viewCount?: number;
  tags?: string[];
  requirements?: string[];
  isRegistrationOpen: boolean;
}

export type EventListResponse = PaginatedResponse<Event>;

// Education Types
export interface EducationContent {
  id: number;
  title: string;
  description: string;
  content?: string;
  imageUrl?: string;
  videoUrl?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
  instructor?: string;
  publishedAt: string;
  slug?: string;
  viewCount?: number;
  likes?: number;
  isActive: boolean;
  prerequisites?: string[];
  learningOutcomes?: string[];
  tags?: string[];
}

export type EducationListResponse = PaginatedResponse<EducationContent>;

// Registration Types
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
  status?: Event['status'];
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
}

export interface EducationFilters extends BaseFilters {
  level?: EducationContent['level'];
  category?: string;
  instructor?: string;
  durationMin?: number;
  durationMax?: number;
  tags?: string[];
}
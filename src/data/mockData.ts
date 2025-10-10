import type { 
  News, 
  Event, 
  EducationContent, 
  NewsListResponse, 
  EventListResponse, 
  EducationListResponse 
} from '@/types/api';

// Mock News Data
export const mockNews: News[] = [
  {
    id: 1,
    title: "برگزاری جشنواره ابوذر در استان اصفهان",
    description: "جشنواره ابوذر امسال با حضور گسترده رسانه‌های استان اصفهان برگزار خواهد شد.",
    content: "محتوای کامل خبر...",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "organization",
    publishedAt: "2025-10-10T10:00:00Z",
    author: "دبیرخانه سازمان",
    slug: "jashnavare-abozar-isfahan",
    viewCount: 234,
    isActive: true,
    tags: ["جشنواره", "ابوذر", "رسانه"]
  },
  {
    id: 2,
    title: "آموزش عکاسی خبری برای اعضای کانون‌ها",
    description: "دوره آموزشی عکاسی خبری ویژه فعالان رسانه‌ای کانون‌های استان",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "organization",
    publishedAt: "2025-10-09T14:30:00Z",
    author: "واحد آموزش",
    viewCount: 156,
    isActive: true,
    tags: ["آموزش", "عکاسی", "خبری"]
  },
  {
    id: 3,
    title: "گزارش فعالیت‌های کانون شهرستان کاشان",
    description: "کانون رسانه شهرستان کاشان در ماه گذشته فعالیت‌های گسترده‌ای داشته است",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "branches",
    publishedAt: "2025-10-08T09:15:00Z",
    author: "کانون کاشان",
    viewCount: 89,
    isActive: true,
    tags: ["کاشان", "گزارش", "فعالیت"]
  },
  {
    id: 4,
    title: "کارگاه تولید محتوای دیجیتال در نجف‌آباد",
    description: "برگزاری کارگاه آموزشی تولید محتوای دیجیتال در کانون رسانه نجف‌آباد",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "branches",
    publishedAt: "2025-10-07T16:45:00Z",
    author: "کانون نجف‌آباد",
    viewCount: 127,
    isActive: true,
    tags: ["نجف‌آباد", "کارگاه", "محتوای دیجیتال"]
  }
];

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: 1,
    title: "جشنواره ابوذر ۱۴۰۳",
    description: "بیست و پنجمین دوره جشنواره ابوذر با محوریت رسانه‌های نوین",
    content: "جزئیات کامل رویداد...",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    startDate: "2025-12-15T09:00:00Z",
    endDate: "2025-12-17T18:00:00Z",
    location: "مرکز همایش‌های اصفهان",
    category: "جشنواره",
    status: "upcoming",
    maxParticipants: 500,
    currentParticipants: 234,
    registrationDeadline: "2025-12-10T23:59:59Z",
    price: 0,
    organizerName: "سازمان بسیج رسانه استان اصفهان",
    organizerContact: "031-12345678",
    slug: "jashnavare-abozar-1403",
    viewCount: 1234,
    isRegistrationOpen: true,
    tags: ["جشنواره", "ابوذر", "رسانه"]
  },
  {
    id: 2,
    title: "کارگاه عکاسی خبری",
    description: "آموزش تکنیک‌های پیشرفته عکاسی خبری و مستندسازی",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    startDate: "2025-11-20T10:00:00Z",
    endDate: "2025-11-20T16:00:00Z",
    location: "دفتر مرکزی سازمان",
    category: "آموزش",
    status: "active",
    maxParticipants: 30,
    currentParticipants: 25,
    registrationDeadline: "2025-11-18T23:59:59Z",
    price: 150000,
    organizerName: "واحد آموزش",
    slug: "kargah-akkasi-khabari",
    viewCount: 456,
    isRegistrationOpen: true,
    tags: ["کارگاه", "عکاسی", "آموزش"]
  },
  {
    id: 3,
    title: "نشست رسانه و فناوری",
    description: "بررسی آخرین فناوری‌های رسانه‌ای و کاربرد آن‌ها",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    startDate: "2025-11-25T14:00:00Z",
    endDate: "2025-11-25T17:00:00Z",
    location: "آمفی‌تئاتر دانشگاه اصفهان",
    category: "نشست",
    status: "upcoming",
    maxParticipants: 100,
    currentParticipants: 12,
    registrationDeadline: "2025-11-23T23:59:59Z",
    price: 0,
    organizerName: "کمیته فناوری",
    slug: "neshast-resane-fanavari",
    viewCount: 189,
    isRegistrationOpen: true,
    tags: ["نشست", "فناوری", "رسانه"]
  }
];

// Mock Education Data
export const mockEducationContent: EducationContent[] = [
  {
    id: 1,
    title: "مبانی خبرنویسی",
    description: "آموزش کامل اصول و فنون خبرنویسی حرفه‌ای",
    content: "محتوای کامل دوره...",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    videoUrl: "https://example.com/video1.mp4",
    category: "خبرنویسی",
    level: "beginner",
    duration: 120,
    instructor: "استاد احمدی",
    publishedAt: "2025-10-01T08:00:00Z",
    slug: "mabani-khabarnevisi",
    viewCount: 567,
    likes: 89,
    isActive: true,
    prerequisites: ["آشنایی با زبان فارسی"],
    learningOutcomes: ["نوشتن خبر استاندارد", "شناخت ساختار خبر"],
    tags: ["خبرنویسی", "مبانی", "مبتدی"]
  },
  {
    id: 2,
    title: "تکنیک‌های مصاحبه",
    description: "روش‌های حرفه‌ای انجام مصاحبه و تعامل با منابع خبری",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "مصاحبه",
    level: "intermediate",
    duration: 90,
    instructor: "خانم رضایی",
    publishedAt: "2025-09-28T10:30:00Z",
    slug: "taknikhaye-mosahebe",
    viewCount: 423,
    likes: 67,
    isActive: true,
    prerequisites: ["تسلط به مبانی خبرنویسی"],
    learningOutcomes: ["آماده‌سازی سوالات مؤثر", "مدیریت مصاحبه"],
    tags: ["مصاحبه", "تکنیک", "متوسط"]
  },
  {
    id: 3,
    title: "عکاسی خبری حرفه‌ای",
    description: "تسلط بر تکنیک‌های عکاسی در شرایط خبری مختلف",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "عکاسی",
    level: "advanced",
    duration: 150,
    instructor: "آقای محمدی",
    publishedAt: "2025-09-25T14:15:00Z",
    slug: "akkasi-khabari-harefeei",
    viewCount: 789,
    likes: 134,
    isActive: true,
    prerequisites: ["آشنایی با اصول عکاسی", "تجربه کار با دوربین"],
    learningOutcomes: ["عکاسی در شرایط کم نور", "ترکیب‌بندی خبری"],
    tags: ["عکاسی", "خبری", "پیشرفته"]
  },
  {
    id: 4,
    title: "تولید محتوای دیجیتال",
    description: "ایجاد محتوای جذاب برای پلتفرم‌های دیجیتال",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "دیجیتال",
    level: "intermediate",
    duration: 180,
    instructor: "تیم محتوا",
    publishedAt: "2025-09-20T11:00:00Z",
    slug: "tolid-mohtavaye-digital",
    viewCount: 345,
    likes: 78,
    isActive: true,
    prerequisites: ["آشنایی با شبکه‌های اجتماعی"],
    learningOutcomes: ["تولید محتوای ویدیویی", "بهینه‌سازی محتوا"],
    tags: ["دیجیتال", "محتوا", "شبکه اجتماعی"]
  },
  {
    id: 5,
    title: "اصول گزارش‌گری",
    description: "تکنیک‌های تهیه گزارش‌های جامع و دقیق",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "گزارش‌گری",
    level: "beginner",
    duration: 100,
    instructor: "استاد کریمی",
    publishedAt: "2025-09-15T09:30:00Z",
    slug: "osol-gozareshgari",
    viewCount: 298,
    likes: 45,
    isActive: true,
    prerequisites: ["مهارت نوشتاری"],
    learningOutcomes: ["تحقیق و بررسی", "نگارش گزارش"],
    tags: ["گزارش‌گری", "اصول", "مبتدی"]
  },
  {
    id: 6,
    title: "رسانه و اخلاق حرفه‌ای",
    description: "بررسی مسائل اخلاقی در حرفه رسانه",
    imageUrl: "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ",
    category: "اخلاق",
    level: "intermediate",
    duration: 75,
    instructor: "دکتر عباسی",
    publishedAt: "2025-09-10T13:45:00Z",
    slug: "resane-akhlagh-harfeei",
    viewCount: 412,
    likes: 92,
    isActive: true,
    prerequisites: ["تجربه کار رسانه‌ای"],
    learningOutcomes: ["شناخت اصول اخلاقی", "تصمیم‌گیری اخلاقی"],
    tags: ["اخلاق", "حرفه‌ای", "رسانه"]
  }
];

// Mock API response generators
export const generateMockNewsResponse = (
  filters?: { category?: string; limit?: number; page?: number }
): NewsListResponse => {
  let filteredNews = mockNews;
  
  if (filters?.category) {
    filteredNews = mockNews.filter(news => news.category === filters.category);
  }
  
  const limit = filters?.limit || 10;
  const page = filters?.page || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  return {
    data: paginatedNews,
    status: 'success',
    statusCode: 200,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filteredNews.length / limit),
      totalItems: filteredNews.length,
      itemsPerPage: limit,
      hasNext: endIndex < filteredNews.length,
      hasPrevious: page > 1
    }
  };
};

export const generateMockEventsResponse = (
  filters?: { status?: string; limit?: number; page?: number }
): EventListResponse => {
  let filteredEvents = mockEvents;
  
  if (filters?.status) {
    filteredEvents = mockEvents.filter(event => event.status === filters.status);
  }
  
  const limit = filters?.limit || 10;
  const page = filters?.page || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
  
  return {
    data: paginatedEvents,
    status: 'success',
    statusCode: 200,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filteredEvents.length / limit),
      totalItems: filteredEvents.length,
      itemsPerPage: limit,
      hasNext: endIndex < filteredEvents.length,
      hasPrevious: page > 1
    }
  };
};

export const generateMockEducationResponse = (
  filters?: { level?: string; limit?: number; page?: number }
): EducationListResponse => {
  let filteredEducation = mockEducationContent;
  
  if (filters?.level) {
    filteredEducation = mockEducationContent.filter(content => content.level === filters.level);
  }
  
  const limit = filters?.limit || 10;
  const page = filters?.page || 1;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedEducation = filteredEducation.slice(startIndex, endIndex);
  
  return {
    data: paginatedEducation,
    status: 'success',
    statusCode: 200,
    meta: {
      currentPage: page,
      totalPages: Math.ceil(filteredEducation.length / limit),
      totalItems: filteredEducation.length,
      itemsPerPage: limit,
      hasNext: endIndex < filteredEducation.length,
      hasPrevious: page > 1
    }
  };
};
/**
 * Application-wide constants
 */

// Image paths
export const DEFAULT_IMAGES = {
  EVENT: '/images/placeholder-event.jpg',
  NEWS: '/images/placeholder-event.jpg',
  EDUCATION: '/images/placeholder-event.jpg',
  AVATAR: '/images/placeholder-avatar.jpg',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
} as const;

// Festival format options
export const FESTIVAL_FORMATS = [
  { value: 'news_report', label: 'گزارش خبری' },
  { value: 'interview', label: 'مصاحبه' },
  { value: 'documentary', label: 'مستند' },
  { value: 'short_film', label: 'فیلم کوتاه' },
  { value: 'photo', label: 'عکس' },
] as const;

// Festival topic options
export const FESTIVAL_TOPICS = [
  { value: 'year_slogan', label: 'شعار سال' },
  { value: 'jihad_explanation', label: 'جهاد تبیین' },
  { value: 'resistance', label: 'مقاومت' },
  { value: 'islamic_awakening', label: 'بیداری اسلامی' },
  { value: 'media_ethics', label: 'اخلاق رسانه‌ای' },
] as const;

// Education levels
export const EDUCATION_LEVELS = [
  { value: 'diploma', label: 'دیپلم' },
  { value: 'associate', label: 'کاردانی' },
  { value: 'bachelor', label: 'کارشناسی' },
  { value: 'master', label: 'کارشناسی ارشد' },
  { value: 'phd', label: 'دکتری' },
] as const;

// Gender options
export const GENDER_OPTIONS = [
  { value: 'male', label: 'مرد' },
  { value: 'female', label: 'زن' },
] as const;

// API endpoints
export const API_ENDPOINTS = {
  NEWS: '/content/news',
  EVENTS: '/content/events',
  EDUCATION: '/content/education',
  FESTIVAL: {
    REGISTRATION: '/festival/registration',
    PROVINCES: '/festival/provinces',
    CITIES: '/festival/cities',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  NEWS: '/news',
  EVENTS: '/events',
  EDUCATION: '/education',
  REGISTER: '/register', // ثبت در جشنواره ابوذر
  CONTACT: '/contact',
  ABOUT: '/about',
  LOGIN: '/login', // ورود به حساب کاربری (برای داشبورد)
  SIGNUP: '/signup', // عضویت (ایجاد حساب کاربری)
  DASHBOARD: '/dashboard', // پنل کاربری
} as const;

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: 'عملیات با موفقیت انجام شد',
  ERROR: 'خطایی رخ داد. لطفا دوباره تلاش کنید',
  REGISTRATION: {
    SUCCESS: 'ثبت‌نام در جشنواره با موفقیت انجام شد',
  },
  SIGNUP: {
    SUCCESS: 'حساب کاربری شما با موفقیت ایجاد شد',
  },
  LOGIN: {
    SUCCESS: 'خوش آمدید!',
    ERROR: 'نام کاربری یا رمز عبور اشتباه است',
  },
  CONTACT: {
    SUCCESS: 'پیام شما با موفقیت ارسال شد',
  },
  COPIED: 'لینک کپی شد',
  NETWORK_ERROR: 'خطا در برقراری ارتباط با سرور',
  NOT_FOUND: 'محتوا یافت نشد',
  VALIDATION_ERROR: 'لطفا تمام فیلدها را به درستی پر کنید',
} as const;

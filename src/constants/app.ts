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

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  NEWS: '/news',
  EVENTS: '/events',
  EDUCATION: '/education',
  REGISTER: '/register',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_REGISTRATIONS: '/dashboard/registrations',
  DASHBOARD_FESTIVAL_REGISTRATION: '/dashboard/festival-registration',
} as const;

export const FESTIVAL_FORMATS = [
  { value: 'news_report', label: 'گزارش خبری' },
  { value: 'interview', label: 'مصاحبه' },
  { value: 'article', label: 'یادداشت و سرمقاله' },
  { value: 'headline', label: 'تیتر' },
  { value: 'infographic', label: 'اینفوگرافی' },
  { value: 'motion_graphic', label: 'موشن گرافی' },
  { value: 'photo', label: 'عکس' },
  { value: 'video_clip', label: 'کلیپ و گزارش ویدیویی' },
  { value: 'documentary', label: 'مستند' },
  { value: 'podcast', label: 'پادکست' },
] as const;


export const FESTIVAL_TOPICS = [
  { value: 'year_slogan', label: 'شعار سال' }, 
  { value: 'jihad_explanation', label: 'جهاد تبیین' },
  { value: 'media_industry', label: 'پیوند رسانه و صنعت' },
  { value: 'social_harms', label: 'مقابله با آسیب‌های اجتماعی' },
  { value: 'revolution_achievements', label: 'دستاوردهای انقلاب اسلامی' },
  { value: 'basij', label: 'بسیج و حوزه‌های اقدام' },
  { value: 'hope_joy', label: 'امید و نشاط آفرینی' },
  { value: 'family', label: 'خانواده، جامعه و فرزندآوری' },
  { value: 'lifestyle', label: 'سبک زندگی ایرانی اسلامی' },
  { value: 'sacrifice', label: 'ایثار و شهادت' },
  { value: 'saving', label: 'صرفه‌جویی در مصرف آب و برق' },
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

// Toast messages
export const TOAST_MESSAGES = {
  SUCCESS: 'عملیات با موفقیت انجام شد',
  ERROR: 'خطایی رخ داد. لطفا دوباره تلاش کنید',
  REGISTRATION: {
    SUCCESS: 'ثبت‌نام در جشنواره با موفقیت انجام شد',
    ERROR: 'خطا در ثبت‌نام. لطفا دوباره تلاش کنید',
  },
  LOGIN: {
    SUCCESS: 'ورود با موفقیت انجام شد',
    ERROR: 'نام کاربری یا رمز عبور اشتباه است',
  },
  SIGNUP: {
    SUCCESS: 'ثبت‌نام با موفقیت انجام شد',
    ERROR: 'خطا در ثبت‌نام. لطفا دوباره تلاش کنید',
  },
} as const;
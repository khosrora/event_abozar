/**
 * View Counter Service
 * مدیریت شمارش بازدید محتوا با استفاده از localStorage
 */

const VIEWS_STORAGE_KEY = 'content_views';

interface ViewCounts {
  [key: string]: number;
}

/**
 * دریافت تعداد بازدیدهای ذخیره شده
 */
export const getStoredViews = (): ViewCounts => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(VIEWS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading views from localStorage:', error);
    return {};
  }
};

/**
 * ذخیره تعداد بازدیدها
 */
const saveViews = (views: ViewCounts): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(VIEWS_STORAGE_KEY, JSON.stringify(views));
  } catch (error) {
    console.error('Error saving views to localStorage:', error);
  }
};

/**
 * دریافت تعداد بازدید یک محتوا
 */
export const getViewCount = (contentType: string, contentId: number | string): number => {
  const views = getStoredViews();
  const key = `${contentType}_${contentId}`;
  return views[key] || 0;
};

/**
 * افزایش تعداد بازدید یک محتوا
 */
export const incrementViewCount = (contentType: string, contentId: number | string): number => {
  const views = getStoredViews();
  const key = `${contentType}_${contentId}`;
  const currentCount = views[key] || 0;
  const newCount = currentCount + 1;
  
  views[key] = newCount;
  saveViews(views);
  
  return newCount;
};

/**
 * تنظیم مستقیم تعداد بازدید
 */
export const setViewCount = (contentType: string, contentId: number | string, count: number): void => {
  const views = getStoredViews();
  const key = `${contentType}_${contentId}`;
  views[key] = count;
  saveViews(views);
};

/**
 * پاک کردن تمام بازدیدها (برای تست یا پاک‌سازی)
 */
export const clearAllViews = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(VIEWS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing views from localStorage:', error);
  }
};

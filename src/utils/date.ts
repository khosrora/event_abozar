/**
 * Date utility functions
 */

/**
 * Format date to Persian (Jalali) format
 * @param dateString - ISO date string
 * @returns Formatted Persian date string
 */
export function formatPersianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

/**
 * Format date to short Persian format
 * @param dateString - ISO date string
 * @returns Short formatted Persian date (e.g., "۱۴۰۲/۱۲/۲۵")
 */
export function formatShortPersianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

/**
 * Get relative time in Persian (e.g., "۲ روز پیش")
 * @param dateString - ISO date string
 * @returns Relative time string in Persian
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'همین الان';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} دقیقه پیش`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ساعت پیش`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} روز پیش`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ماه پیش`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} سال پیش`;
  } catch (error) {
    return dateString;
  }
}

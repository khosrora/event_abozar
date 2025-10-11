/**
 * String utility functions
 */

/**
 * Calculate reading time for Persian text
 * @param text - Text content
 * @returns Reading time string in Persian
 */
export function calculateReadingTime(text: string): string {
  if (!text) return "۱ دقیقه مطالعه";
  
  // Average Persian reading speed: ~900 characters per minute
  const chars = text.replace(/\s+/g, "").length;
  const minutes = Math.max(1, Math.round(chars / 900));
  
  return `${minutes} دقیقه مطالعه`;
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Convert English numbers to Persian
 * @param str - String containing numbers
 * @returns String with Persian numbers
 */
export function toPersianNumber(str: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(str).replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Sanitize HTML content (basic)
 * @param html - HTML string
 * @returns Sanitized string
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
}

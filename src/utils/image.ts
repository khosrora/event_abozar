/**
 * Image utility functions
 */

/**
 * Get image URL with fallback
 * @param imageUrl - Image URL from API
 * @param fallback - Fallback image path
 * @returns Valid image URL
 */
export function getImageUrl(
  imageUrl: string | null | undefined,
  fallback: string = '/images/placeholder-event.jpg'
): string {
  if (!imageUrl) return fallback;
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative path, prepend API base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return `${apiBaseUrl}${imageUrl}`;
}

/**
 * Validate image URL
 * @param url - Image URL to validate
 * @returns Boolean indicating if URL is valid
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

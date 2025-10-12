/**
 * Validation utility functions
 */

/**
 * Validate Iranian national ID (کد ملی)
 * @param nationalId - National ID to validate
 * @returns Boolean indicating if national ID is valid
 */
export function validateNationalId(nationalId: string): boolean {
  if (!nationalId || nationalId.length !== 10) return false;
  
  // Check if all characters are digits
  if (!/^\d{10}$/.test(nationalId)) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1{9}$/.test(nationalId)) return false;
  
  // Validate checksum
  const check = parseInt(nationalId[9]);
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(nationalId[i]) * (10 - i);
  }
  
  const remainder = sum % 11;
  
  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
}

/**
 * Validate Iranian mobile phone number
 * @param phoneNumber - Phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  // Must be 11 digits starting with 09
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phoneNumber);
}

/**
 * Validate email address
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Boolean indicating if password meets requirements
 */
export function validatePassword(password: string): boolean {
  // At least 8 characters
  return password.length >= 8;
}

/**
 * Format phone number for display
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number (e.g., "0912 345 6789")
 */
export function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber || phoneNumber.length !== 11) return phoneNumber;
  
  return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7)}`;
}

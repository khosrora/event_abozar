import { apiClient } from '@/lib/api';
import type { ApiError } from '@/types/api';

// Types for contact form
export interface ContactFormData {
  full_name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// Contact form service
export const contactService = {
  // Send contact form data
  sendContactForm: async (data: ContactFormData): Promise<ContactResponse> => {
    try {
      const response = await apiClient.post<ContactResponse>('/info/contact-us/', data);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  }
};

export default contactService;
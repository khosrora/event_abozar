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
      // Log request for debugging
      console.log('Sending contact form data:', data);
      
      const response = await apiClient.post<ContactResponse>('/info/contact-us/', data);
      console.log('Contact form response:', response);
      return response;
    } catch (error) {
      console.error('Contact form error details:', error);
      const apiError = error as ApiError;
      throw apiError;
    }
  }
};

export default contactService;
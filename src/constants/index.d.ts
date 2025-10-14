declare module '@/constants' {
  // Export types from app.ts
  export const ROUTES: {
    readonly HOME: '/';
    readonly ABOUT: '/about';
    readonly CONTACT: '/contact';
    readonly NEWS: '/news';
    readonly EVENTS: '/events';
    readonly EDUCATION: '/education';
    readonly REGISTER: '/register';
    readonly LOGIN: '/login';
    readonly SIGNUP: '/signup';
    readonly DASHBOARD: '/dashboard';
    readonly DASHBOARD_PROFILE: '/dashboard/profile';
    readonly DASHBOARD_REGISTRATIONS: '/dashboard/registrations';
    readonly DASHBOARD_FESTIVAL_REGISTRATION: '/dashboard/festival-registration';
  };

  // Export types from file-upload.ts
  export const MAX_VIDEO_SIZE: number;
  export const MAX_IMAGE_SIZE: number;
  export const ACCEPTED_VIDEO_TYPES: string[];
  export const ACCEPTED_IMAGE_TYPES: string[];

  // Add other types as needed
}
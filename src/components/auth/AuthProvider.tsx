'use client';

import { ReactNode } from 'react';
import useAuthStore from '@/store/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Root provider for authentication state
 * Makes the auth state available throughout the application
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  // Pre-load the auth store (this ensures the store is initialized at the app level)
  useAuthStore();
  
  return <>{children}</>;
}
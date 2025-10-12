'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { PageLoading } from '@/components/ui';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, token, isLoading } = useAuthStore();
  
  // Check authentication status on component mount
  useEffect(() => {
    // If not authenticated and not loading, redirect to login
    if (!isAuthenticated && !token && !isLoading) {
      redirect('/login');
    }
  }, [isAuthenticated, token, isLoading]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <PageLoading />;
  }
  
  // If authenticated or has token, render children
  if (isAuthenticated || token) {
    return <>{children}</>;
  }
  
  // This return is actually never reached because redirect() throws an error
  // But we include it for TypeScript completeness
  return null;
}
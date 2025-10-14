'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { PageLoading } from '@/components/ui';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to login page if user is not authenticated
 * Waits for Zustand to hydrate state from localStorage before checking auth
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, token, isHydrated, setHydrated } = useAuthStore();
  const [forceHydrated, setForceHydrated] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  
  // Fallback: Force hydration after 1 second if it hasn't happened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHydrated) {
        setHydrated(true);
        setForceHydrated(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isHydrated, setHydrated]);
  
  // Check authentication after hydration is complete
  useEffect(() => {
    if ((isHydrated || forceHydrated) && !isAuthenticated && !token && !hasRedirected) {
      setHasRedirected(true);
      router.replace('/login');
    }
  }, [isHydrated, forceHydrated, isAuthenticated, token, hasRedirected, router]);
  
  // Show loading while waiting for hydration
  if (!isHydrated && !forceHydrated) {
    return <PageLoading />;
  }
  
  // If not authenticated after hydration, show loading while redirecting
  if (!isAuthenticated && !token) {
    return <PageLoading />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
}
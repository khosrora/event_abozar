'use client';

import { ReactNode, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import AuthGuard from '@/components/auth/AuthGuard';
import useAuthStore from '@/store/useAuthStore';
import { DashboardUserProvider } from './dashboard-context';
import type { User } from '@/types/api';

const DEMO_USER: User = {
  id: 0,
  full_name: 'کاربر نمونه',
  phone: '09123456789',
  email: 'demo@example.com',
  created_at: new Date().toISOString(),
};

interface DashboardSectionLayoutProps {
  children: ReactNode;
}

export default function DashboardSectionLayout({ children }: DashboardSectionLayoutProps) {
  // Use our auth store instead of local state
  const { user: storeUser, isAuthenticated } = useAuthStore();
  
  // Use store user if available, otherwise fallback to demo user
  // Only in development - in production, AuthGuard would redirect
  const resolvedUser = useMemo(
    () => isAuthenticated && storeUser ? storeUser : DEMO_USER, 
    [isAuthenticated, storeUser]
  );

  return (
    <AuthGuard>
      <DashboardUserProvider value={resolvedUser}>
        <DashboardLayout user={resolvedUser}>{children}</DashboardLayout>
      </DashboardUserProvider>
    </AuthGuard>
  );
}

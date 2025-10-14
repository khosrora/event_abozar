'use client';

import { ReactNode, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout';
import AuthGuard from '@/components/auth/AuthGuard';
import useAuthStore from '@/store/useAuthStore';
import { DashboardUserProvider } from './dashboard-context';
import type { User } from '@/types/api';

const DEMO_USER: User = {
  id: 0,
  fullName: 'کاربر نمونه',
  full_name: 'کاربر نمونه',
  phone: '09123456789',
  is_active: true,
  is_staff: false,
  is_superuser: false,
  last_login: new Date().toISOString(),
  password: '',
  groups: [],
  user_permissions: [],
  email: 'demo@example.com',
  created_at: new Date().toISOString(),
};

interface DashboardSectionLayoutProps {
  children: ReactNode;
}

export default function DashboardSectionLayout({ children }: DashboardSectionLayoutProps) {
  const { user: storeUser, isAuthenticated } = useAuthStore();
  
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

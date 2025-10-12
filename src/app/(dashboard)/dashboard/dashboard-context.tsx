'use client';

import { createContext, useContext } from 'react';
import type { User } from '@/types/api';

const DashboardUserContext = createContext<User | null>(null);

export const DashboardUserProvider = DashboardUserContext.Provider;

export function useDashboardUser() {
  const context = useContext(DashboardUserContext);
  return context;
}

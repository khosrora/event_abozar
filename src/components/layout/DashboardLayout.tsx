'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useAuthStore from '@/store/useAuthStore';
import { ROUTES } from '@/constants';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    first_name?: string;
    last_name?: string;
    full_name?: string;
    mobile?: string;
    phone?: string;
  };
}

interface MenuItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Use auth store for logout
  const { logout } = useAuthStore();

  const menuItems: MenuItem[] = [
    {
      label: 'داشبورد',
      href: ROUTES.DASHBOARD,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      label: 'پروفایل',
      href: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: 'ثبت‌نام‌های جشنواره',
      href: '/dashboard/festival-registration',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },    
  ];

  const handleLogout = () => {
    // Use Zustand store logout which handles everything
    logout();
    
    // Redirect to login page
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar (Mobile) */}
      <div className="navbar bg-base-100 shadow-lg lg:hidden sticky top-0 z-50">
        <div className="flex-none">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link href={ROUTES.DASHBOARD} className="text-xl font-bold text-primary">
            داشبورد
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-sm">
                  {user?.full_name?.[0] || user?.first_name?.[0] || 'K'}
                  {user?.full_name?.split(' ')?.[1]?.[0] || user?.last_name?.[0] || 'A'}
                </span>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{user?.full_name || `${user?.first_name} ${user?.last_name}`}</span>
              </li>
              <li><Link href="/dashboard/profile">پروفایل</Link></li>
              <li><Link href="/dashboard/settings">تنظیمات</Link></li>
              <li><button onClick={handleLogout}>خروج</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`
            fixed lg:static inset-y-0 right-0 z-40
            w-64 bg-base-100 shadow-xl
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            lg:min-h-screen
          `}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-base-300 hidden lg:block">
            <Link href={ROUTES.HOME} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary">پنل کاربری</h2>
                <p className="text-xs text-base-content/60">مدیریت حساب</p>
              </div>
            </Link>
          </div>

          {/* User Info (Desktop) */}
          <div className="p-4 border-b border-base-300 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span className="text-lg">
                    {user?.full_name?.[0] || user?.first_name?.[0] || 'K'}
                    {user?.full_name?.split(' ')?.[1]?.[0] || user?.last_name?.[0] || 'A'}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">
                  {user?.full_name || `${user?.first_name} ${user?.last_name}`}
                </p>
                <p className="text-sm text-base-content/60 truncate" dir="ltr">
                  {user?.phone || user?.mobile}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="menu p-4 gap-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 ${
                      pathname?.startsWith(item.href) ? 'active' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Button (Desktop) */}
          <div className="p-4 mt-auto border-t border-base-300 hidden lg:block">
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error w-full gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              خروج از حساب
            </button>
          </div>

          {/* Back to Site */}
          <div className="p-4">
            <Link href={ROUTES.HOME} className="btn btn-ghost w-full gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              بازگشت به سایت
            </Link>
          </div>
        </aside>

        {/* Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

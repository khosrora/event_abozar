'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { festivalService } from '@/services';
import { DashboardStatistics } from '@/types/api';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<DashboardStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    loadStatistics();
    loadUserName();
  }, []);

  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await festivalService.getMyStatistics();
      setStatistics(data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('خطا در احراز هویت. لطفاً دوباره وارد شوید');
      } else {
        toast.error('خطا در بارگذاری آمار');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserName = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.fullName || user.full_name || 'کاربر');
      } catch (e) {
        setUserName('کاربر');
      }
    }
  };

  return (
    <section className="space-y-8">
      
      {/* Welcome Section با گرادیانت */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">
            <span className="text-4xl">👋</span>
            سلام، {userName} عزیز!
          </h1>
          <p className="text-white/90 text-lg">
            به پنل کاربری خود خوش آمدید. از اینجا می‌توانید اطلاعات و فعالیت‌های خود را مدیریت کنید.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-16 w-16 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="skeleton h-4 w-24 mb-2"></div>
                    <div className="skeleton h-8 w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ثبت‌نام‌های جشنواره */}
          <Link
            href="/dashboard/festival-registration"
            className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="card-title text-lg mb-1">ثبت‌نام‌های جشنواره</h2>
                  <p className="text-4xl font-bold my-2">
                    {statistics?.my_registrations_count || 0}
                  </p>
                  <p className="text-sm opacity-90">جشنواره ابوذر</p>
                </div>
                <div className="p-4 bg-white/20 rounded-xl">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* آثار ارسالی */}
          <Link
            href="/dashboard/festival-registration"
            className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="card-title text-lg mb-1">آثار ارسالی</h2>
                  <p className="text-4xl font-bold my-2">
                    {statistics?.my_works_count || 0}
                  </p>
                  <p className="text-sm opacity-90">اثر ارسال شده</p>
                </div>
                <div className="p-4 bg-white/20 rounded-xl">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* کل محتوا */}
          <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-xl">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="card-title text-lg mb-1">کل محتوا</h2>
                  <p className="text-4xl font-bold my-2">
                    {statistics?.total_content_count || 0}
                  </p>
                  <p className="text-sm opacity-90">محتوای کل</p>
                </div>
                <div className="p-4 bg-white/20 rounded-xl">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          دسترسی سریع
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/dashboard/festival-registration/new"
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-primary"
          >
            <div className="card-body flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">ثبت‌نام در جشنواره</h3>
                <p className="text-sm text-base-content/60">
                  ثبت‌نام جدید در جشنواره ابوذر
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/festival-registration"
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-primary"
          >
            <div className="card-body flex-row items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">مشاهده ثبت‌نام‌ها</h3>
                <p className="text-sm text-base-content/60">
                  لیست جشنواره‌های ثبت‌نام شده
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/profile"
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-primary"
          >
            <div className="card-body flex-row items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold">ویرایش پروفایل</h3>
                <p className="text-sm text-base-content/60">
                  مدیریت اطلاعات حساب کاربری
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

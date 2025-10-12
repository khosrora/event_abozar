'use client';

import { useDashboardUser } from './dashboard-context';

export default function DashboardPage() {
  const user = useDashboardUser();

  return (
    <section className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
          سلام، {user?.first_name} {user?.last_name} عزیز!
        </h1>
        <p className="text-base-content/70">
          به پنل کاربری خود خوش آمدید. از اینجا می‌توانید اطلاعات و فعالیت‌های خود را مدیریت کنید.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="card bg-gradient-to-br from-primary to-primary/80 text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-lg mb-1">ثبت‌نام‌ها</h2>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm opacity-80 mt-1">جشنواره ابوذر</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-secondary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-lg mb-1">اخبار</h2>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm opacity-80 mt-1">اخبار ذخیره شده</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent to-accent/80 text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-lg mb-1">رویدادها</h2>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm opacity-80 mt-1">رویدادهای ثبت شده</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-info to-info/80 text-info-content shadow-lg">
          <div className="card-body">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="card-title text-lg mb-1">آموزش‌ها</h2>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm opacity-80 mt-1">دوره‌های شرکت کرده</p>
              </div>
              <div className="p-3 bg-white/20 rounded-lg">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">دسترسی سریع</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="btn btn-outline gap-2 justify-start">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              ثبت‌نام در جشنواره
            </button>
            
            <button className="btn btn-outline gap-2 justify-start">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              ویرایش پروفایل
            </button>
            
            <button className="btn btn-outline gap-2 justify-start">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              تنظیمات
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">فعالیت‌های اخیر</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
              <div className="p-3 bg-primary/10 text-primary rounded-full">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">حساب کاربری شما با موفقیت ایجاد شد</p>
                <p className="text-sm text-base-content/60">همین الآن</p>
              </div>
            </div>

            <div className="text-center text-base-content/60 py-8">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>فعالیت دیگری وجود ندارد</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

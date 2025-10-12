'use client';

import { useState } from 'react';
import { useDashboardUser } from '../dashboard-context';

export default function DashboardSettingsPage() {
  const user = useDashboardUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">تنظیمات حساب</h1>
        <p className="text-base-content/70">مدیریت تنظیمات حساب کاربری {user?.first_name} {user?.last_name}.</p>
      </header>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body space-y-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">دریافت اعلان‌ها</h2>
              <p className="text-sm text-base-content/60">ارسال اعلان‌های مرتبط با جشنواره و رویدادها</p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">حالت تیره</h2>
              <p className="text-sm text-base-content/60">فعال‌سازی حالت تیره برای داشبورد</p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled((prev) => !prev)}
            />
          </div>

          <p className="text-sm text-base-content/60">
            این تنظیمات به‌صورت محلی ذخیره می‌شوند و پس از اتصال به API، در پروفایل شما ذخیره خواهند شد.
          </p>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useDashboardUser } from '../dashboard-context';

export default function DashboardProfilePage() {
  const user = useDashboardUser();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">اطلاعات حساب کاربری</h1>
        <p className="text-base-content/70">جزئیات پروفایل خود را بررسی و در صورت نیاز به‌روزرسانی کنید.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body space-y-4">
            <h2 className="card-title">اطلاعات شخصی</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">نام</span>
                </label>
                <input value={user?.first_name ?? ''} className="input input-bordered" readOnly />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">نام خانوادگی</span>
                </label>
                <input value={user?.last_name ?? ''} className="input input-bordered" readOnly />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">شماره موبایل</span>
                </label>
                <input value={user?.mobile ?? ''} className="input input-bordered" readOnly dir="ltr" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">ایمیل</span>
                </label>
                <input value={user?.email ?? '---'} className="input input-bordered" readOnly dir="ltr" />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body space-y-3">
            <h2 className="card-title">اقدامات</h2>
            <p className="text-sm text-base-content/70">ویرایش اطلاعات پروفایل به‌زودی از طریق API فعال خواهد شد.</p>
            <button className="btn btn-primary" disabled>
              ویرایش اطلاعات (به‌زودی)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

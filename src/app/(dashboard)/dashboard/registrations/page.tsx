'use client';

import Link from 'next/link';
import { ROUTES } from '@/constants';
import { useDashboardUser } from '../dashboard-context';

const MOCK_REGISTRATIONS = [
  {
    id: 'REG-001',
    title: 'جشنواره ابوذر - گزارش خبری',
    submittedAt: '1404/07/01',
    status: 'در حال بررسی',
  },
];

export default function DashboardRegistrationsPage() {
  const user = useDashboardUser();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">ثبت‌نام‌های شما</h1>
        <p className="text-base-content/70">
          لیست ثبت‌نام‌های انجام شده توسط {user?.first_name} {user?.last_name}. پس از اتصال API، داده‌های واقعی نمایش داده می‌شوند.
        </p>
      </header>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-base-content/70">
                <th>شناسه</th>
                <th>عنوان</th>
                <th>تاریخ ثبت</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REGISTRATIONS.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.submittedAt}</td>
                  <td>
                    <span className="badge badge-outline badge-info">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <Link href={ROUTES.REGISTER} className="btn btn-primary">
              ثبت‌نام جدید در جشنواره
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

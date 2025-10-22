'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { festivalService } from '@/services';
import { FestivalRegistrationListItem } from '@/types/api';
import { toast } from 'sonner';

// Simple toast for now - can be replaced with react-hot-toast later


// Helper function to format festival format for display
const formatFestivalFormat = (format: string): string => {
  const formats: Record<string, string> = {
    news_report: 'گزارش خبری',
    interview: 'مصاحبه',
    article: 'یادداشت و سرمقاله',
    headline: 'تیتر',
    infographic: 'اینفوگرافی',
    motion_graphic: 'موشن گرافی',
    photo: 'عکس',
    video_clip: 'کلیپ و گزارش ویدیویی',
    documentary: 'مستند',
    podcast: 'پادکست',
  };
  return formats[format] || format;
};

export default function FestivalRegistrationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [registrations, setRegistrations] = useState<FestivalRegistrationListItem[]>([]);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setIsLoading(true);
      const data = await festivalService.getMyRegistrations();
      setRegistrations(data);
    } catch (error: any) {
      toast.error('خطا در بارگذاری لیست ثبت‌نام‌ها');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl text-white">
              <h1 className="font-bold mb-2 flex items-center gap-3 py-2">
                <span className="text-sm py-2 font-black">🎬</span>
                ثبت‌نام‌های من در جشنواره
              </h1>
              <p className="text-white/90 text-sm">
                مشاهده و مدیریت ثبت‌نام‌های جشنواره‌ها
              </p>
            </div>
            
            <Link 
              href="/dashboard/festival-registration/new" 
              className="btn btn-accent  gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              ثبت‌نام جدید
            </Link>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && registrations.length === 0 && (
        <div className="card bg-base-100 shadow-2xl border-2 border-dashed border-base-300">
          <div className="card-body items-center text-center py-16">
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-2xl font-bold mb-2">هنوز ثبت‌نامی ندارید</h3>
            <p className="text-base-content/60 mb-6 text-lg max-w-md">
              برای شرکت در جشنواره‌های رسانه‌ای و ارسال آثار خود، ابتدا ثبت‌نام کنید
            </p>
            <Link href="/dashboard/festival-registration/new" className="btn btn-primary btn-lg gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              ثبت‌نام در جشنواره
            </Link>
          </div>
        </div>
      )}

      {/* Registrations Grid */}
      {!isLoading && registrations.length > 0 && (
        <div className="grid gap-6">
          {registrations.map((registration) => (
            <div 
              key={registration.id} 
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 hover:border-primary/30 group"
            >
              <div className="card-body p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Registration Info */}
                  <div className="flex items-start gap-4 flex-1">

                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl my-4 font-bold text-base-content group-hover:text-primary transition-colors">
                          {registration.media_name}
                        </h3>
                        <div className="flex flex-wrap gap-6 mt-2">
                          <span className="flex flex-row items-center gap-x-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                            {typeof registration.festival_format === 'string' 
                              ? formatFestivalFormat(registration.festival_format)
                              : registration.festival_format.name}
                          </span>
                          <span className="flex flex-row items-center gap-x-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(registration.created_at).toLocaleDateString('fa-IR')}
                          </span>
                          <span className="flex flex-row items-center gap-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                            {registration.province.name} - {registration.city.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Link 
                      href={`/dashboard/festival-registration/${registration.id}/submit-work`}
                      className="btn btn-success gap-2  shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      ارسال اثر
                    </Link>
                    
                    <Link 
                      href={`/dashboard/festival-registration/${registration.id}/works`}
                      className="btn btn-info gap-2  shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      مشاهده آثار
                    </Link>
                    
                    <Link 
                      href={`/dashboard/festival-registration/${registration.id}`}
                      className="btn btn-outline gap-2  hover:btn-primary"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      جزئیات
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
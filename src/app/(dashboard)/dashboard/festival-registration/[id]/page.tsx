"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { festivalService } from "@/services";
import type { FestivalRegistrationDetail } from "@/types/api";

export default function RegistrationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.id as string;

  const [registration, setRegistration] = useState<FestivalRegistrationDetail | null>(null);
  const [worksCount, setWorksCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrationDetails();
  }, [registrationId]);

  const fetchRegistrationDetails = async () => {
    try {
      setLoading(true);
      const data = await festivalService.getRegistrationDetail(Number(registrationId));
      setRegistration(data);
      
      // دریافت تعداد آثار
      const works = await festivalService.getWorksByFestival(Number(registrationId));
      setWorksCount(works.length);
    } catch (error) {
      toast.error("خطا در دریافت جزئیات ثبت‌ نام");
      router.push("/dashboard/festival-registration");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFormatLabel = (format: string | { name: string; code: string }): string => {
    if (typeof format === 'object' && format.name) {
      return format.name;
    }
    const formats: Record<string, string> = {
      news_report: "گزارش خبری",
      interview: "مصاحبه",
      article: "یادداشت و سرمقاله",
      headline: "تیتر",
      infographic: "اینفوگرافی",
      motion_graphic: "موشن گرافی",
      photo: "عکس",
      video_clip: "کلیپ و گزارش ویدیویی",
      documentary: "مستند",
      podcast: "پادکست",
    };
    return formats[format as string] || (format as string);
  };

  const getTopicLabel = (topic: string | { name: string; code: string }): string => {
    if (typeof topic === 'object' && topic.name) {
      return topic.name;
    }
    const topics: Record<string, string> = {
      year_slogan: "شعار سال",
      jihad_explanation: "جهاد تبیین",
      media_industry: "پیوند رسانه و صنعت",
      social_harms: "مقابله با آسیب‌های اجتماعی",
      revolution_achievements: "دستاوردهای انقلاب اسلامی",
      basij: "بسیج و حوزه‌های اقدام",
      hope_joy: "امید و نشاط آفرینی",
      family: "خانواده، جامعه و فرزندآوری",
      lifestyle: "سبک زندگی ایرانی اسلامی",
      sacrifice: "ایثار و شهادت",
      saving: "صرفه‌جویی در مصرف آب و برق",
    };
    return topics[topic as string] || (topic as string);
  };

  const getSpecialSectionLabel = (section?: string | { name: string; code: string }): string => {
    if (!section) return "-";
    if (typeof section === 'object' && section.name) {
      return section.name;
    }
    const sections: Record<string, string> = {
      progress_narrative: "روایت پیشرفت",
      field_narrative_12days: "روایت میدان در جنگ ۱۲ روزه",
    };
    return sections[section as string] || (section as string);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!registration) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h3 className="text-xl font-bold">ثبت‌نام یافت نشد</h3>
          <Link href="/dashboard/festival-registration" className="btn btn-primary mt-4">
            بازگشت به لیست
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header با گرادیانت */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 text-white">
            <Link
              href="/dashboard/festival-registration"
              className="btn btn-circle btn-ghost text-white hover:bg-white/20"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2 justify-center">
                <span className="text-base">📋</span>
                جزئیات ثبت‌نام
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/dashboard/festival-registration/${registrationId}/submit-work`}
          className="btn btn-success gap-2  hover:shadow-xl"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          ارسال اثر جدید
        </Link>
        {worksCount > 0 && (
          <Link
            href={`/dashboard/festival-registration/${registrationId}/works`}
            className="btn btn-info gap-2  hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            مشاهده آثار ({worksCount})
          </Link>
        )}
      </div>

      {/* Personal Information */}
      <div className="card bg-base-100 shadow-xl border border-primary/20">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-2">
            <span className="text-2xl">👤</span>
            اطلاعات شخصی
          </h2>
          <div className="divider my-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                نام و نام خانوادگی
              </span>
              <span className="font-bold text-primary">{registration.full_name}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">نام پدر</span>
              <span className="font-medium">{registration.father_name}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">کد ملی</span>
              <span className="font-medium font-mono">{registration.national_id}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">جنسیت</span>
              <span className="font-medium">
                {registration.gender === "male" ? "مرد" : "زن"}
              </span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">تحصیلات</span>
              <span className="font-medium">{registration.education}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                شماره تماس
              </span>
              <span className="font-medium font-mono">{registration.phone_number}</span>
            </div>
            {registration.virtual_number && (
              <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
                <span className="text-base-content/70">شماره مجازی</span>
                <span className="font-medium font-mono">
                  {registration.virtual_number}
                </span>
              </div>
            )}
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">استان</span>
              <span className="font-medium">{registration.province.name}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">شهر</span>
              <span className="font-medium">{registration.city.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Festival Information */}
      <div className="card bg-base-100 shadow-xl border border-secondary/20">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            اطلاعات جشنواره
          </h2>
          <div className="divider my-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                نام رسانه
              </span>
              <span className="font-bold text-secondary">{registration.media_name}</span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">قالب جشنواره</span>
              <span className="badge badge-primary badge-lg">
                {getFormatLabel(registration.festival_format)}
              </span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">محور جشنواره</span>
              <span className="badge badge-secondary badge-lg">
                {getTopicLabel(registration.festival_topic)}
              </span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70">بخش ویژه</span>
              <span className="font-medium">
                {getSpecialSectionLabel(registration.special_section)}
              </span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors">
              <span className="text-base-content/70 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                تاریخ ثبت‌نام
              </span>
              <span className="font-medium">
                {formatDate(registration.created_at)}
              </span>
            </div>
            <div className="flex justify-between py-3 px-4 rounded-lg bg-success/10 hover:bg-success/20 transition-colors border-2 border-success/30">
              <span className="text-success flex items-center gap-2 font-medium">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                تعداد آثار ارسالی
              </span>
              <span className="font-bold text-success text-xl">{worksCount} اثر</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

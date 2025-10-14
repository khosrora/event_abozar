"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { festivalService } from "@/services";
import type { Work } from "@/types/api";

export default function WorksListPage() {
  const params = useParams();
  const registrationId = params.id as string;
  
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorks();
  }, [registrationId]);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      const data = await festivalService.getWorksByFestival(Number(registrationId));
      setWorks(data);
    } catch (error) {
      toast.error("خطا در دریافت آثار");
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

  const getFileExtension = (url: string): string => {
    const ext = url.split('.').pop()?.toLowerCase() || '';
    return ext;
  };

  const getFileTypeIcon = (fileUrl: string) => {
    const ext = getFileExtension(fileUrl);
    const videoFormats = ['mp4', 'avi', 'mov', 'mkv', 'webm'];
    
    if (videoFormats.includes(ext)) {
      return (
        <svg
          className="w-6 h-6"
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
      );
    }
    return (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/festival-registration/${registrationId}`}
            className="btn btn-ghost btn-circle"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">آثار ارسال شده</h1>
            <p className="text-base-content/60 mt-1">
              لیست آثار ارسال شده برای این ثبت‌نام
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/festival-registration/${registrationId}/submit-work`}
          className="btn btn-primary"
        >
          <svg
            className="w-5 h-5"
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
          ارسال اثر جدید
        </Link>
      </div>

      {/* Works List */}
      {works.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-16">
            <svg
              className="w-20 h-20 text-base-content/20 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-bold">هنوز اثری ارسال نکرده‌اید</h3>
            <p className="text-base-content/60 mt-2">
              برای شرکت در جشنواره، اثر خود را ارسال کنید
            </p>
            <Link
              href={`/dashboard/festival-registration/${registrationId}/submit-work`}
              className="btn btn-primary mt-6"
            >
              ارسال اولین اثر
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {works.map((work) => (
            <div key={work.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  {/* File Type Icon */}


                  {/* Work Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-bold text-lg">{work.title}</h3>
                        <p className="text-base-content/60 text-sm mt-1">
                          {work.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-3 text-sm">
                          <div className="badge badge-outline">{work.registration_name}</div>
                          <div className="badge badge-outline">{work.media_name}</div>
                          <div className="badge badge-primary">{work.festival_format}</div>
                          <div className="badge badge-secondary">{work.festival_topic}</div>
                        </div>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-base-content/60">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(work.created_at)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <a
                        href={work.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-ghost"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        مشاهده فایل
                      </a>
                      <a
                        href={work.file_url}
                        download
                        className="btn btn-sm btn-ghost"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        دانلود
                      </a>
                    </div>
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

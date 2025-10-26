/**
 * Detail Page Layout Component
 * Reusable layout for news, events, and education detail pages
 */

"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { VideoViewer, PDFViewer } from "@/components/ui/MediaViewer";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { getImageUrl, calculateReadingTime, formatPersianDate } from "@/utils";
import DescriptionEditor from "../ui/DescriptionEditor";

interface DetailPageLayoutProps {
  title: string;
  description: string;
  image?: string | null;
  video?: string | null;
  document?: string | null;
  publishDate?: string;
  tags?: string[];
  breadcrumbs: BreadcrumbItem[];
  views?: number;
  onCopy?: () => void;
  onPrint?: () => void;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function DetailPageLayout({
  title,
  description,
  image,
  video,
  document,
  publishDate,
  tags,
  breadcrumbs,
  views,
  onCopy,
  onPrint,
  actions,
  children,
}: DetailPageLayoutProps) {
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      onCopy?.();
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handlePrint = () => {
    window.print();
    onPrint?.();
  };

  return (
    <div dir="rtl" className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero Section */}
      <section className="mt-4 overflow-hidden rounded-box border bg-base-200">
        <figure className="relative">
          <ImageLightbox
            src={image}
            alt={title}
            className="h-72 w-full object-cover md:h-96 cursor-pointer"
            containerClassName="w-full"
          />
        </figure>

        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
            {/* <Badge variant="outline">{readingTime}</Badge> */}
            {publishDate && (
              <Badge variant="ghost">{formatPersianDate(publishDate)}</Badge>
            )}
            {views !== undefined && (
              <Badge variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {views.toLocaleString('fa-IR')} بازدید
              </Badge>
            )}
          </div>

          <div className="join">
            <button className="btn join-item btn-ghost" onClick={handleCopy}>
              کپی لینک
            </button>
   
            {actions}
            <button
              className="btn join-item btn-primary"
              onClick={() => router.back()}
            >
              بازگشت
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <h1 className="text-xl font-extrabold md:text-3xl mt-4 md:my-8">{title}</h1>

      <article
        className="prose prose-sm rtl:prose-p:text-right prose-headings:font-extrabold md:prose-base lg:prose-lg mt-6 max-w-none"
        style={{ fontFamily: "Vazirmatn, sans-serif" }}
      >
        <DescriptionEditor text={description} />
      </article>

      {/* Video Section */}
      {video && <VideoViewer url={video} />}

      {/* Document Section */}
      {document && <PDFViewer url={document} />}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="primary" className="badge-outline">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Additional Content */}
      {children}
    </div>
  );
}

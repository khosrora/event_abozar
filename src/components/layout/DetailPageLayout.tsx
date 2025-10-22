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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getImageUrl(image)}
            alt={title}
            className="h-72 w-full object-cover md:h-124"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-200/90 via-base-200/40 to-transparent p-4">
            <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
          </div>
        </figure>

        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
            {/* <Badge variant="outline">{readingTime}</Badge> */}
            {publishDate && (
              <Badge variant="ghost">{formatPersianDate(publishDate)}</Badge>
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

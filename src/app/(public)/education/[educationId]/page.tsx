"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { educationApi } from "@/services/adaptiveApi";
import { DetailPageLayout } from "@/components/layout";
import { PageLoading, ErrorAlert } from "@/components/ui";
import { ROUTES, TOAST_MESSAGES } from "@/constants";
import { toast } from "sonner";
import { incrementViewCount } from "@/utils";
import type { EducationContent } from "@/types/api";

export default function EducationDetailPage() {
  const pathname = usePathname();
  const educationId = pathname?.split("/").pop() || "1";
  const [viewCount, setViewCount] = useState<number>(0);

  // Fetch education data from API
  const {
    data: education,
    loading,
    error,
  } = useApi<EducationContent>(
    () => educationApi.getById(Number(educationId)),
    { immediate: true, showErrorToast: false }
  );

  // Increment view count when education data is loaded
  useEffect(() => {
    if (education) {
      const newViewCount = incrementViewCount('education', Number(educationId));
      setViewCount(newViewCount);
    }
  }, [education, educationId]);

  // Loading state
  if (loading) {
    return (
      <div dir="rtl" className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
        <PageLoading />
      </div>
    );
  }

  // Error state
  if (error || !education) {
    return (
      <div dir="rtl" className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
        <ErrorAlert
          message={error?.message}
          backUrl={ROUTES.EDUCATION}
          backLabel="بازگشت به لیست آموزش‌ها"
        />
      </div>
    );
  }

  const breadcrumbs = [
    { label: "خانه", href: ROUTES.HOME },
    { label: "آموزش‌ها", href: ROUTES.EDUCATION },
    { label: education.title },
  ];

  return (
    <DetailPageLayout
      title={education.title}
      description={education.description}
      image={education.image}
      video={education.video}
      document={education.document}
      publishDate={education.publish_date}
      tags={education.tags}
      breadcrumbs={breadcrumbs}
      views={viewCount}
      onCopy={() => toast.success(TOAST_MESSAGES.SUCCESS)}
    />
  );
}

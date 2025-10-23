"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { newsApi } from "@/services/adaptiveApi";
import type { News } from "@/types/api";
import { DetailPageLayout } from "@/components/layout";
import { PageLoading, ErrorAlert } from "@/components/ui";
import { ROUTES } from "@/constants";
import { incrementViewCount, getViewCount } from "@/utils";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.newsId as string;

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await newsApi.getById(Number(newsId));
        setNews(data);
        
        // Increment view count in localStorage
        const newViewCount = incrementViewCount('news', Number(newsId));
        setViewCount(newViewCount);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "خطا در بارگذاری اطلاعات خبر"
        );
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={() => window.location.reload()}
        backUrl={ROUTES.NEWS}
      />
    );
  }

  if (!news) {
    return (
      <ErrorAlert
        message="خبر مورد نظر یافت نشد"
        backUrl={ROUTES.NEWS}
      />
    );
  }

  const breadcrumbs = [
    { label: "صفحه اصلی", href: ROUTES.HOME },
    { label: "اخبار", href: ROUTES.NEWS },
    { label: news.title },
  ];

  return (
    <DetailPageLayout
      title={news.title}
      description={news.description}
      image={news.image}
      publishDate={news.publish_date}
      tags={news.tags}
      breadcrumbs={breadcrumbs}
      views={viewCount}
    />
  );
}

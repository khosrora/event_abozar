"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { eventsApi } from "@/services/adaptiveApi";
import type { Event } from "@/types/api";
import { DetailPageLayout } from "@/components/layout";
import { PageLoading, ErrorAlert } from "@/components/ui";
import { ROUTES } from "@/constants";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await eventsApi.getById(Number(eventId));
        setEvent(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "خطا در بارگذاری اطلاعات رویداد"
        );
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return <PageLoading />;
  }

  if (error) {
    return (
      <ErrorAlert
        message={error}
        onRetry={() => window.location.reload()}
        backUrl={ROUTES.EVENTS}
      />
    );
  }

  if (!event) {
    return (
      <ErrorAlert message="رویداد مورد نظر یافت نشد" backUrl={ROUTES.EVENTS} />
    );
  }

  const breadcrumbs = [
    { label: "صفحه اصلی", href: ROUTES.HOME },
    { label: "رویدادها", href: ROUTES.EVENTS },
    { label: event.title },
  ];

  return (
    <DetailPageLayout
      title={event.title}
      description={event.description}
      image={event.image}
      publishDate={event.publish_date}
      tags={event.tags}
      breadcrumbs={breadcrumbs}
    />
  );
}

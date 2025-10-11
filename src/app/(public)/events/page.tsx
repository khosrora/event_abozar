"use client";

import { useMemo, useState } from "react";
import { useApiList } from "@/hooks/useApi";
import { eventsApi } from "@/services/adaptiveApi";
import { SectionHeader, SearchToolbar, ItemCard, ItemGrid, EmptyState } from "@/components/common";
import type { EventList } from "@/types/api";
import { DEFAULT_IMAGES } from "@/constants";
import { formatPersianDate } from "@/utils";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  
  // API call for events
  const {
    items: events,
    loading,
    error,
    refresh
  } = useApiList(eventsApi.getAll, {
    immediate: true,
    params: { limit: 100 } // Load all events for filtering
  });

  // فیلتر کردن رویدادها بر اساس جستجو و برچسب‌ها
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    
    return events.filter((event) => {
      const matchesSearch = !searchQuery || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = category === "all" || event.tags?.includes(category);
      
      return matchesSearch && matchesCategory;
    });
  }, [events, searchQuery, category]);

  // Handle search clear
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Handle retry when error occurs
  const handleRetry = () => {
    refresh();
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <SectionHeader title="رویدادها" subtitle="مشاهده تمام رویدادهای در حال برگزاری و آینده" />
        <EmptyState
          icon={
            <svg className="w-16 h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="خطا در بارگذاری رویدادها"
          description={error.message || "متأسفانه نتوانستیم رویدادها را بارگذاری کنیم"}
          action={
            <button className="btn btn-primary" onClick={handleRetry}>
              تلاش مجدد
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <SectionHeader 
        title="رویدادها" 
        subtitle="مشاهده تمام رویدادهای در حال برگزاری و آینده"
      >
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">همه دسته‌بندی‌ها</option>
            <option value="conference">کنفرانس</option>
            <option value="workshop">کارگاه</option>
            <option value="seminar">سمینار</option>
            <option value="training">آموزشی</option>
          </select>
        </div>
      </SectionHeader>

      <SearchToolbar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="جستجو رویداد..."
      />

      {loading ? (
        <ItemGrid isLoading={true} cols={3}>
          <div></div>
        </ItemGrid>
      ) : filteredEvents.length > 0 ? (
        <ItemGrid cols={3}>
          {filteredEvents.map((event) => (
            <ItemCard
              key={event.id}
              href={`/events/${event.id}`}
              title={event.title}
              meta={formatPersianDate(event.publish_date)}
              image={event.image || DEFAULT_IMAGES.EVENT}
              badge={event.tags && event.tags.length > 0 ? event.tags[0] : undefined}
            />
          ))}
        </ItemGrid>
      ) : (
        <EmptyState
          title={searchQuery ? "رویدادی یافت نشد" : "هیچ رویدادی موجود نیست"}
          description={
            searchQuery 
              ? `هیچ رویدادی با عبارت "${searchQuery}" یافت نشد`
              : "در حال حاضر هیچ رویدادی برنامه‌ریزی نشده است"
          }
          action={
            searchQuery ? (
              <button className="btn btn-outline" onClick={handleClearSearch}>
                پاک کردن جستجو
              </button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}

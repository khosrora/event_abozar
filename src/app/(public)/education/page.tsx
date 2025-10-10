"use client";

import { useMemo, useState } from "react";
import { useApiList } from "@/hooks/useApi";
import { educationApi } from "@/services/adaptiveApi";
import { SectionHeader, SearchToolbar, ItemCard, ItemGrid, EmptyState } from "@/components/common";
import type { EducationContent } from "@/types/api";

// Default image for education content
const DEFAULT_IMAGE = "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

// تابع فرمت کردن مدت زمان
function formatDuration(minutes?: number): string {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours} ساعت${mins > 0 ? ` و ${mins} دقیقه` : ''}`;
  }
  return `${mins} دقیقه`;
}

// تابع تعیین نوع بج بر اساس سطح
function getLevelBadge(level: string): { text: string; color: "success" | "warning" | "error" } {
  switch (level) {
    case 'beginner':
      return { text: "مبتدی", color: "success" };
    case 'intermediate':
      return { text: "متوسط", color: "warning" };
    case 'advanced':
      return { text: "پیشرفته", color: "error" };
    default:
      return { text: "عمومی", color: "success" };
  }
}

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [level, setLevel] = useState<string>("all");
  
  // API call for education content
  const {
    items: educationContent,
    loading,
    error,
    refresh
  } = useApiList(educationApi.getAll, {
    immediate: true,
    params: { 
      limit: 100,
      level: level !== "all" ? level : undefined
    }
  });

  // فیلتر کردن محتوا بر اساس جستجو
  const filteredContent = useMemo(() => {
    if (!educationContent) return [];
    
    return educationContent.filter((item) => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [educationContent, searchQuery]);

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
        <SectionHeader title="محتوای آموزشی" subtitle="دوره‌ها و مطالب آموزشی" />
        <EmptyState
          icon={
            <svg className="w-16 h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="خطا در بارگذاری محتوای آموزشی"
          description={error.message || "متأسفانه نتوانستیم محتوای آموزشی را بارگذاری کنیم"}
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
        title="محتوای آموزشی" 
        subtitle="دوره‌ها و مطالب آموزشی"
      >
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="all">همه سطوح</option>
            <option value="beginner">مبتدی</option>
            <option value="intermediate">متوسط</option>
            <option value="advanced">پیشرفته</option>
          </select>
        </div>
      </SectionHeader>

      <SearchToolbar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="جستجو در محتوای آموزشی..."
      />

      {loading ? (
        <ItemGrid isLoading={true} cols={3}>
          <div></div>
        </ItemGrid>
      ) : filteredContent.length > 0 ? (
        <ItemGrid cols={3}>
          {filteredContent.map((item) => {
            const levelBadge = getLevelBadge(item.level);
            return (
              <ItemCard
                key={item.id}
                href={`/education/${item.id}`}
                title={item.title}
                excerpt={item.description}
                meta={`${item.instructor ? `مدرس: ${item.instructor}` : ''}${item.duration ? ` • ${formatDuration(item.duration)}` : ''}`}
                image={item.imageUrl || DEFAULT_IMAGE}
              />
            );
          })}
        </ItemGrid>
      ) : (
        <EmptyState
          title={searchQuery ? "محتوای آموزشی یافت نشد" : "هیچ محتوای آموزشی موجود نیست"}
          description={
            searchQuery 
              ? `هیچ محتوای آموزشی با عبارت "${searchQuery}" یافت نشد`
              : "در حال حاضر هیچ محتوای آموزشی موجود نیست"
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

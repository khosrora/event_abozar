"use client";

import { useMemo, useState } from "react";
import { useApiList } from "@/hooks/useApi";
import { newsApi } from "@/services/adaptiveApi";
import { SectionHeader, SearchToolbar, ItemCard, ItemGrid, EmptyState } from "@/components/common";
import type { News } from "@/types/api";

// Default image for news
const DEFAULT_IMAGE = "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

// تابع فرمت کردن تاریخ به فارسی
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// تابع تعیین نوع بج بر اساس دسته‌بندی
function getCategoryBadge(category: string): { text: string; color: "primary" | "secondary" | "accent" } {
  switch (category) {
    case 'organization':
      return { text: "سازمانی", color: "primary" };
    case 'branches':
      return { text: "شعبه‌ها", color: "secondary" };
    default:
      return { text: "عمومی", color: "accent" };
  }
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  
  // API call for news
  const {
    items: news,
    loading,
    error,
    refresh
  } = useApiList(newsApi.getAll, {
    immediate: true,
    params: { 
      limit: 100,
      category: category !== "all" ? category : undefined
    }
  });

  // فیلتر کردن اخبار بر اساس جستجو
  const filteredNews = useMemo(() => {
    if (!news) return [];
    
    return news.filter((item) => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [news, searchQuery]);

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
        <SectionHeader title="اخبار" subtitle="آخرین اخبار و اطلاعیه‌ها" />
        <EmptyState
          icon={
            <svg className="w-16 h-16 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          title="خطا در بارگذاری اخبار"
          description={error.message || "متأسفانه نتوانستیم اخبار را بارگذاری کنیم"}
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
        title="اخبار" 
        subtitle="آخرین اخبار و اطلاعیه‌ها"
      >
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">همه اخبار</option>
            <option value="organization">اخبار سازمانی</option>
            <option value="branches">اخبار شعبه‌ها</option>
          </select>
        </div>
      </SectionHeader>

      <SearchToolbar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="جستجو در اخبار..."
      />

      {loading ? (
        <ItemGrid isLoading={true} cols={3}>
          <div></div>
        </ItemGrid>
      ) : filteredNews.length > 0 ? (
        <ItemGrid cols={3}>
          {filteredNews.map((item) => {
            const categoryBadge = getCategoryBadge(item.category);
            return (
              <ItemCard
                key={item.id}
                href={`/news/${item.id}`}
                title={item.title}
                excerpt={item.description}
                meta={`${formatDate(item.publishedAt)}${item.author ? ` • ${item.author}` : ''} • ${categoryBadge.text}`}
                image={item.imageUrl || DEFAULT_IMAGE}
              />
            );
          })}
        </ItemGrid>
      ) : (
        <EmptyState
          title={searchQuery ? "خبری یافت نشد" : "هیچ خبری موجود نیست"}
          description={
            searchQuery 
              ? `هیچ خبری با عبارت "${searchQuery}" یافت نشد`
              : "در حال حاضر هیچ خبری منتشر نشده است"
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

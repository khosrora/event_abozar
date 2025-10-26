"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import LoadingCard, { LoadingCardGrid, LoadingCardSlider } from "@/components/LoadingCard";
import { useApiList, useApi } from "@/hooks/useApi";
import { newsApi, eventsApi, educationApi } from "@/services/adaptiveApi";
import type { NewsList, EventList, EducationList } from "@/types/api";
import { getViewCount } from "@/utils";

// Shared image source for all image cards and hero poster
const IMG = "/images/placeholder-event.jpg";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"organization" | "branches">(
    "organization"
  );
  
  // Track view counts for news items
  const [newsViewCounts, setNewsViewCounts] = useState<Record<number, number>>({});
  const [educationViewCounts, setEducationViewCounts] = useState<Record<number, number>>({});

  // API calls with stable functions
  const {
    items: educationContent,
    loading: educationLoading,
    error: educationError,
  } = useApiList(educationApi.getAll, {
    immediate: true,
    params: { limit: 6 },
  });

  const {
    items: upcomingEvents,
    loading: eventsLoading,
    error: eventsError,
  } = useApiList(eventsApi.getAll, {
    immediate: true,
    params: { limit: 3 },
  });

  const {
    items: organizationNews,
    loading: orgNewsLoading,
    refresh: refreshOrgNews,
  } = useApiList(newsApi.getAll, {
    immediate: true,
    params: { limit: 3 },
  });

  const {
    items: branchesNews,
    loading: branchNewsLoading,
    execute: loadBranchNews,
  } = useApiList(newsApi.getAll, {
    immediate: false,
    params: { limit: 3 },
  });

  // Load branch news when tab changes (with proper dependency)
  const [hasLoadedBranchNews, setHasLoadedBranchNews] = useState(false);
  
  useEffect(() => {
    if (activeTab === "branches" && !hasLoadedBranchNews) {
      loadBranchNews();
      setHasLoadedBranchNews(true);
    }
  }, [activeTab, hasLoadedBranchNews, loadBranchNews]);

  // Get current news based on active tab
  const currentNews = activeTab === "organization" ? organizationNews : branchesNews;
  const currentNewsLoading = activeTab === "organization" ? orgNewsLoading : branchNewsLoading;

  // Load view counts for current news
  useEffect(() => {
    if (currentNews && currentNews.length > 0) {
      const counts: Record<number, number> = {};
      currentNews.forEach(news => {
        counts[news.id] = getViewCount('news', news.id);
      });
      setNewsViewCounts(counts);
    }
  }, [currentNews]);

  // Load view counts for education content
  useEffect(() => {
    if (educationContent && educationContent.length > 0) {
      const counts: Record<number, number> = {};
      educationContent.forEach(item => {
        counts[item.id] = getViewCount('education', item.id);
      });
      setEducationViewCounts(counts);
    }
  }, [educationContent]);

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-base-100">
      {/* Hero Section */}
     <section className="relative isolate min-h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-none">
  {/* ویدیو پس‌زمینه با لایه نیمه‌تیره */}
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/images/event.mp4"
    autoPlay
    muted
    loop
    playsInline
    poster={IMG}
  />
  
  {/* لایه‌ی گرادینت برای عمق و خوانایی متن */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  {/* محتوای هیرو */}
  <div className="relative z-10 flex h-full min-h-[70vh] md:min-h-[80vh] flex-col items-center justify-center text-center text-white px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold title-kalameh leading-tight drop-shadow-lg animate-fadeIn mb-4 md:mb-6">
          پورتال سازمان بسیج رسانه اصفهان
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed animate-fadeIn [animation-delay:0.2s] mb-6 md:mb-8 max-w-2xl mx-auto">
        پلتفرمی برای آموزش، رویدادها و پوشش خبری سازمان کانون‌های شهرستان ها
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fadeIn [animation-delay:0.4s]">
        <Link
          href="/signup"
          className="btn btn-primary btn-wide text-base md:text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
        >
          شروع کنید
        </Link>
        <Link
          href="/contact"
          className="btn btn-outline text-white border-white hover:bg-white hover:text-primary hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
        >
          ارتباط با ما
        </Link>
      </div>
    </div>
  </div>

  {/* افکت محو پایین صفحه برای ترکیب طبیعی با بقیه بخش‌ها */}
  <div className="absolute bottom-0 h-20 md:h-40 w-full to-transparent" />
</section>


      <main className="container mx-auto flex-1 space-y-16 px-4 py-10 md:px-6 lg:px-8">
      
        
        {/* رویدادها و جشنواره‌ها */}
<AnimatedSection animation="slideInRight" delay={200}>
<section className="relative py-12">
  <div className="mb-8 flex items-center justify-between border-b border-base-300 pb-2">
    <h2 className="text-3xl font-extrabold text-primary">رویدادها و جشنواره‌ها</h2>
    <Link href="/events" className="btn btn-ghost btn-sm md:btn-md">
      تقویم رویدادها
    </Link>
  </div>

  {/* گرید متوازن - Mobile First Design */}
  {eventsLoading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="md:col-span-2 lg:col-span-2">
        <LoadingCard />
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  ) : eventsError ? (
    <div className="text-center py-8">
      <p className="text-error">خطا در بارگذاری رویدادها</p>
      <button 
        className="btn btn-primary btn-sm mt-2"
        onClick={() => window.location.reload()}
      >
        تلاش مجدد
      </button>
    </div>
  ) : upcomingEvents?.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* کارت بزرگ اول */}
      {upcomingEvents[0] && (
        <div className="md:col-span-2 lg:col-span-2 relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[280px] md:min-h-[320px]">
          <img
            src={upcomingEvents[0].image || IMG}
            alt={upcomingEvents[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute top-4 right-4 bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-semibold">
            {new Date(upcomingEvents[0].publish_date).toLocaleDateString('fa-IR')}
          </div>

          <div className="relative z-10 flex flex-col justify-end p-5 md:p-6 h-full text-white">
            <h3 className="text-lg md:text-2xl font-bold mb-2 title-kalameh">{upcomingEvents[0].title}</h3>
            <p className="opacity-90 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
              {upcomingEvents[0].title}
            </p>
            <div className="flex items-center justify-between">
              <Link 
                href={`/events/${upcomingEvents[0].id}`} 
                className="btn btn-primary btn-sm md:btn-md hover:btn-secondary transition-all duration-300 shadow-lg"
              >
                جزئیات
              </Link>
              <div className="flex items-center gap-2 text-xs opacity-80">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                <span>{"آینده"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ستون سمت چپ شامل دو کارت کوچکتر */}
      <div className="flex flex-col gap-4 md:gap-6 md:col-span-2 lg:col-span-1">
        {upcomingEvents.slice(1, 3).map((event, index) => (
          <div key={event.id} className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 min-h-[140px] md:min-h-[150px] flex-1">
            <img
              src={event.image || IMG}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute top-3 right-3 bg-success text-success-content px-2 py-1 rounded-full text-xs font-semibold">
              {"جدید"}
            </div>
            
            <div className="relative z-10 flex flex-col justify-end p-4 md:p-5 h-full text-white">
              <h3 className="text-sm md:text-lg font-bold mb-1">{event.title}</h3>
              <p className="opacity-90 text-xs md:text-sm mb-2 line-clamp-2">
                {event.title}
              </p>
              <Link 
                href={`/events/${event.id}`} 
                className="btn btn-primary btn-xs md:btn-sm self-start hover:btn-secondary transition-colors duration-300"
              >
                جزئیات
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-base-content/60">رویدادی یافت نشد</p>
    </div>
  )}
</section>
</AnimatedSection>

        {/* اخبار */}
<AnimatedSection animation="slideInLeft" delay={400}>
<section className="relative py-12">
  <h2 className="text-center text-3xl font-extrabold text-primary mb-8 title-kalameh">
    اخبار
  </h2>

  <div className="tabs tabs-boxed mx-auto mb-8 w-full max-w-md md:max-w-lg bg-base-200 p-1 rounded-2xl">
    <button
      role="tab"
      className={`tab font-bold text-xs md:text-sm transition-all duration-300 ${
        activeTab === "organization" 
          ? "tab-active bg-primary text-primary-content shadow-md" 
          : "hover:bg-base-300"
      }`}
      onClick={() => setActiveTab("organization")}
    >
      اخبار سازمان
    </button>
    <button
      role="tab"
      className={`tab font-bold text-xs md:text-sm transition-all duration-300 ${
        activeTab === "branches" 
          ? "tab-active bg-primary text-primary-content shadow-md" 
          : "hover:bg-base-300"
      }`}
      onClick={() => setActiveTab("branches")}
    >
      اخبار کانون‌ها
    </button>
  </div>

  {currentNewsLoading ? (
    <LoadingCardGrid count={3} />
  ) : currentNews?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {currentNews.map((news) => (
        <article
          key={news.id}
          className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-500 group overflow-hidden rounded-2xl border border-base-200"
        >
          <figure className="relative overflow-hidden">
            <img
              src={news.image || IMG}
              alt={news.title}
              className="h-48 md:h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* نشان تاریخ */}
            <div className="absolute top-3 right-3 bg-base-100/90 text-base-content px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
              {new Date(news.publish_date).toLocaleDateString('fa-IR', { 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </figure>
          <div className="card-body p-4 md:p-5">
            <h3 className="card-title text-sm md:text-lg font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {news.title}
            </h3>
            <p className="text-xs md:text-sm opacity-70 leading-relaxed line-clamp-3 mb-4">
              {news.title}
            </p>
            <div className="card-actions justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-base-content/60">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>{(newsViewCounts[news.id] || 0).toLocaleString('fa-IR')} بازدید</span>
              </div>
              <Link 
                href={`/news/${news.id}`} 
                className="btn btn-outline btn-sm hover:btn-primary transition-all duration-300 shadow-sm hover:shadow-md"
              >
                مشاهده
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-base-content/60">خبری یافت نشد</p>
    </div>
  )}
</section>
</AnimatedSection>
  {/* آموزش */}
<AnimatedSection>
<section className="relative py-12">
  <div className="mb-6 flex items-center justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-primary title-kalameh">آموزش</h2>
    <Link href="/education" className="btn btn-sm md:btn-md btn-outline">
      مشاهده همه
    </Link>
  </div>

  {/* Scrollable multi-card section */}
  <div className="flex gap-4 md:gap-5 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-base-100 hover:scrollbar-thumb-primary/50">
    {educationLoading ? (
      // Loading skeleton
      Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="shrink-0 w-64 sm:w-72 md:w-80">
          <LoadingCard />
        </div>
      ))
    ) : educationError ? (
      <div className="w-full text-center py-8">
        <p className="text-error">خطا در بارگذاری محتوای آموزشی</p>
        <button 
          className="btn btn-primary btn-sm mt-2"
          onClick={() => window.location.reload()}
        >
          تلاش مجدد
        </button>
      </div>
    ) : (
      educationContent?.map((item) => (
        <div
          key={item.id}
          className="snap-center shrink-0 w-64 sm:w-72 md:w-80 bg-base-100 card shadow-md hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden group border border-base-200"
        >
          <figure className="relative overflow-hidden">
            <img
              src={item.image || IMG}
              alt={item.title}
              className="h-44 md:h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="absolute top-3 right-3 bg-primary text-primary-content text-xs px-2 py-1 rounded-full font-semibold">
              {item.tags?.[0] || "عمومی"}
            </div>
          </figure>
          <div className="card-body p-4 md:p-5">
            <h3 className="card-title text-base md:text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-xs md:text-sm opacity-70 leading-relaxed line-clamp-3">
              {item.title}
            </p>
            <div className="card-actions justify-between items-center mt-4">
              <div className="flex items-center gap-1 text-xs text-base-content/60">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>{(educationViewCounts[item.id] || 0).toLocaleString('fa-IR')} بازدید</span>
              </div>
              <Link 
                href={`/education/${item.id}`} 
                className="btn btn-primary btn-sm hover:btn-secondary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                مشاهده
              </Link>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</section>
</AnimatedSection>
      </main>
    </div>
  );
}


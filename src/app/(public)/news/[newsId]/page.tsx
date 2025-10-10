"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// DaisyUI‑first News Article page (RTL)
// - Clean hero banner with image
// - Breadcrumbs, meta (date, author, reading time)
// - Share actions (copy link, print)
// - Prev/Next inline nav + related posts grid (sample)
// - Accessible, responsive, and RTL‑friendly

type NewsItem = {
  id: number;
  title: string;
  date?: string;
  author?: string;
  image?: string;
  content: string;
  tags?: string[];
};

const IMG =
  "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

export default function NewsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const newsId = pathname?.split("/").pop() || "1";

  // Sample data
  const news: NewsItem = {
    id: Number(newsId),
    title: "عنوان خبر نمونه",
    date: "۱۴۰۴/۰۷/۲۰",
    author: "سازمان رسانه‌ای ابوذر",
    image: IMG,
    content: `تحولات در عرصه رسانه‌ها و ارتباطات در دهه‌های اخیر بسیار چشمگیر بوده است.\nاین تغییرات نقش مهمی در توسعه فرهنگی و اجتماعی جامعه ایفا می‌کنند.\nدر این خبر، به بررسی آخرین تحولات و تحلیل‌های مرتبط پرداخته می‌شود.`,
    tags: ["فرهنگ", "رسانه", "تحلیل"],
  };

  const readingTime = useMemo(() => {
    // naive ~200wpm equivalent in Persian: ~180 chars/sec; here: ~350 chars/min
    const chars = news.content.replace(/\s+/g, "").length;
    const minutes = Math.max(1, Math.round(chars / 900));
    return `${minutes} دقیقه مطالعه`;
  }, [news.content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  return (
    <div dir="rtl" className="mx-auto max-w-5xl px-4 py-8 md:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="breadcrumbs text-sm text-base-content/70">
        <ul>
          <li>
            <Link href="/" className="link-hover">
              خانه
            </Link>
          </li>
          <li>
            <Link href="/news" className="link-hover">
              اخبار
            </Link>
          </li>
          <li>{news.title}</li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="mt-4 overflow-hidden rounded-box border bg-base-200">
        {news.image && (
          <figure className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={news.image}
              alt={news.title}
              className="h-72 w-full object-cover md:h-96"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-200/90 via-base-200/40 to-transparent p-4">
              <h1 className="text-2xl font-extrabold md:text-3xl">
                {news.title}
              </h1>
            </div>
          </figure>
        )}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
            <span className="badge badge-ghost">تاریخ: {news.date}</span>
            <span className="badge badge-ghost">نویسنده: {news.author}</span>
            <span className="badge badge-outline">{readingTime}</span>
          </div>
          <div className="join">
            <button
              className="btn join-item btn-ghost"
              onClick={handleCopy}
              aria-label="کپی لینک"
            >
              لینک
            </button>
            <button
              className="btn join-item btn-ghost"
              onClick={() => window.print()}
              aria-label="چاپ"
            >
              چاپ
            </button>
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
      <article className="prose prose-sm prose-headings:font-extrabold prose-p:leading-8 rtl:prose-p:text-right md:prose-base lg:prose-lg mt-6 max-w-none">
        {news.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>

      {/* Tags */}
      {news.tags && news.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {news.tags.map((t) => (
            <span key={t} className="badge badge-primary badge-outline">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Prev / Next */}
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        <Link
          href={`/news/${news.id - 1 || 1}`}
          className="btn btn-ghost justify-between"
        >
          <span>← خبر قبلی</span>
          <span className="truncate">{`خبر شماره ${Math.max(
            news.id - 1,
            1
          )}`}</span>
        </Link>
        <Link
          href={`/news/${news.id + 1}`}
          className="btn btn-ghost justify-between md:justify-between"
        >
          <span className="truncate">{`خبر شماره ${news.id + 1}`}</span>
          <span>خبر بعدی →</span>
        </Link>
      </div>

      {/* Related posts (sample) */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-extrabold">مطالب مرتبط</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Link
              key={i}
              href={`/news/${i}`}
              className="card bg-base-200 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <figure>
                <img
                  src={IMG}
                  alt="related"
                  className="h-36 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-base">عنوان خبر {i}</h3>
                <p className="text-sm opacity-80">
                  خلاصه‌ای کوتاه از خبر {i} ...
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

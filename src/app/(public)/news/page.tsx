"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const IMG =
  "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
      <div>
        <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm opacity-70">{subtitle}</p>}
      </div>
    </header>
  );
}

function Toolbar({
  q,
  setQ,
  onClear,
}: {
  q: string;
  setQ: (v: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="mb-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
      <label className="input input-bordered flex items-center gap-2 md:max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          type="text"
          className="grow"
          placeholder="جستجو خبر..."
        />
        {q && (
          <button className="btn btn-xs" onClick={onClear}>
            پاک‌سازی
          </button>
        )}
      </label>
    </div>
  );
}

function ItemCard({
  href,
  title,
  excerpt,
  meta,
  image,
}: {
  href: string;
  title: string;
  excerpt?: string;
  meta?: string;
  image?: string;
}) {
  return (
    <Link
      href={href}
      className="card bg-base-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {image && (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-40 w-full object-cover md:h-48"
          />
        </figure>
      )}
      <div className="card-body">
        <h3 className="card-title text-base md:text-lg">{title}</h3>
        {excerpt && (
          <p className="text-sm opacity-80 line-clamp-2">{excerpt}</p>
        )}
        {meta && <div className="mt-1 text-xs opacity-60">{meta}</div>}
      </div>
    </Link>
  );
}

export default function NewsIndexPage() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        title: `عنوان خبر ${i + 1}`,
        excerpt: "خلاصه‌ای کوتاه از خبر و توضیح تکمیلی برای جذب کلیک.",
        date: "۱۴۰۴/۰۷/۲۰",
        author: "سازمان رسانه‌ای ابوذر",
        image: IMG,
      })),
    []
  );

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const per = 9;
  const filtered = items.filter(
    (x) => x.title.includes(q) || x.excerpt.includes(q)
  );
  const total = Math.max(1, Math.ceil(filtered.length / per));
  const slice = filtered.slice((page - 1) * per, page * per);

  return (
    <div dir="rtl" className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
      <SectionHeader title="همه اخبار" subtitle="آخرین خبرها و گزارش‌ها" />
      <Toolbar
        q={q}
        setQ={(v) => {
          setQ(v);
          setPage(1);
        }}
        onClear={() => {
          setQ("");
          setPage(1);
        }}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {slice.map((n) => (
          <ItemCard
            key={n.id}
            href={`/news/${n.id}`}
            title={n.title}
            excerpt={n.excerpt}
            meta={`تاریخ: ${n.date} • نویسنده: ${n.author}`}
            image={n.image}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center">
        <div className="join">
          <button
            className="btn join-item"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            قبلی
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`btn join-item ${p === page ? "btn-active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn join-item"
            disabled={page >= total}
            onClick={() => setPage(page + 1)}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}

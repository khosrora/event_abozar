"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// DaisyUI‑first, RTL Event detail page
// - Image hero with gradient overlay
// - Breadcrumbs + meta (date, location, duration)
// - Share/Print/Back actions
// - Add-to-calendar (ICS) lightweight client-side
// - Related events grid (sample)

type EventItem = {
  id: number;
  title: string;
  date?: string; // Shamsi (sample). Replace with your own formatter.
  location?: string;
  image?: string;
  content: string;
  tags?: string[];
};

const IMG =
  "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

export default function EventPage() {
  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname?.split("/").pop() || "1";

  // Sample event data (replace with real fetch)
  const event: EventItem = {
    id: Number(eventId),
    title: "جشنواره ابوذر",
    date: "۱۴۰۴/۰۸/۰۵",
    location: "تهران، مرکز همایش‌ها",
    image: IMG,
    content:
      "جشنواره ابوذر رویدادی فرهنگی و رسانه‌ای است که با هدف تقویت و توسعه توانمندی‌های رسانه‌ای برگزار می‌شود. این جشنواره فرصتی است برای اصحاب رسانه تا آثار خود را ارائه دهند و با دیگر فعالان رسانه‌ای ارتباط برقرار کنند.",
    tags: ["جشنواره", "رسانه", "فرهنگی"],
  };

  const readingTime = useMemo(() => {
    const chars = event.content.replace(/\s+/g, "").length;
    const minutes = Math.max(1, Math.round(chars / 900));
    return `${minutes} دقیقه مطالعه`;
  }, [event.content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  const handleICS = () => {
    // very simple ICS content (UTC now → +2h placeholder). In production, use real ISO dates.
    const dtStart = new Date();
    const dtEnd = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const fmt = (d: Date) =>
      `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(
        d.getUTCDate()
      ).padStart(2, "0")}T${String(d.getUTCHours()).padStart(2, "0")}${String(
        d.getUTCMinutes()
      ).padStart(2, "0")}${String(d.getUTCSeconds()).padStart(2, "0")}Z`;

    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Abuzar Media//Event//FA\nBEGIN:VEVENT\nUID:${event.id}@abuzar\nDTSTAMP:${fmt(new Date())}\nDTSTART:${fmt(dtStart)}\nDTEND:${fmt(dtEnd)}\nSUMMARY:${event.title}\nLOCATION:${event.location || ""}\nDESCRIPTION:${event.content.replace(/\n/g, " ")}\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-${event.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
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
            <Link href="/events" className="link-hover">
              رویدادها
            </Link>
          </li>
          <li>{event.title}</li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="mt-4 overflow-hidden rounded-box border bg-base-200">
        {event.image && (
          <figure className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.image} alt={event.title} className="h-72 w-full object-cover md:h-96" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-200/90 via-base-200/40 to-transparent p-4">
              <h1 className="text-2xl font-extrabold md:text-3xl">{event.title}</h1>
            </div>
          </figure>
        )}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
            {event.date && <span className="badge badge-ghost">تاریخ: {event.date}</span>}
            {event.location && <span className="badge badge-ghost">مکان: {event.location}</span>}
            <span className="badge badge-outline">{readingTime}</span>
          </div>
          <div className="join">
            <button className="btn join-item btn-ghost" onClick={handleCopy} aria-label="کپی لینک">
              لینک
            </button>
            <button className="btn join-item btn-ghost" onClick={() => window.print()} aria-label="چاپ">
              چاپ
            </button>
            <button className="btn join-item btn-ghost" onClick={handleICS} aria-label="افزودن به تقویم">
              افزودن به تقویم
            </button>
            <button className="btn join-item btn-primary" onClick={() => router.back()}>
              بازگشت
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="prose prose-sm prose-headings:font-extrabold prose-p:leading-8 rtl:prose-p:text-right md:prose-base lg:prose-lg mt-6 max-w-none">
        {event.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span key={t} className="badge badge-primary badge-outline">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Related events */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-extrabold">رویدادهای مرتبط</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Link key={i} href={`/events/${i}`} className="card bg-base-200 transition hover:-translate-y-0.5 hover:shadow-md">
              <figure>
                <img src={IMG} alt="related" className="h-36 w-full object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-base">عنوان رویداد {i}</h3>
                <p className="text-sm opacity-80">توضیح کوتاه از رویداد {i} ...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

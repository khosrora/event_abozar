"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// Education page — image + text, styled like News (DaisyUI, RTL)
// - Image hero with gradient overlay title
// - Breadcrumbs, reading-time badge, minimal actions
// - Clean prose content

type EducationItem = {
  id: number;
  title: string;
  image?: string;
  content: string;
  tags?: string[];
};

const IMG =
  "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

export default function EducationPage() {
  const router = useRouter();
  const pathname = usePathname();
  const educationId = pathname?.split("/").pop() || "1";

  // Sample data
  const education: EducationItem = {
    id: Number(educationId),
    title: "آموزش رسانه‌ای برای اصحاب رسانه",
    image: IMG,
    content:
      "این دوره آموزشی به اصحاب رسانه کمک می‌کند تا مهارت‌های لازم در زمینه تولید محتوا، تحلیل اخبار و مدیریت رسانه‌های اجتماعی را یاد بگیرند. محتوا شامل نکات کاربردی، چارچوب‌های عملی و تمرین‌های کوتاه است. در این صفحه، خلاصه‌ای از مفاهیم کلیدی و مسیر پیشنهادی یادگیری را می‌خوانید.",
    tags: ["آموزش", "رسانه", "سواد رسانه‌ای"],
  };

  const readingTime = useMemo(() => {
    const chars = education.content.replace(/\s+/g, "").length;
    const minutes = Math.max(1, Math.round(chars / 900));
    return `${minutes} دقیقه مطالعه`;
  }, [education.content]);

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
            <Link href="/education" className="link-hover">
              آموزش‌ها
            </Link>
          </li>
          <li>{education.title}</li>
        </ul>
      </nav>

      {/* Hero (like News) */}
      <section className="mt-4 overflow-hidden rounded-box border bg-base-200">
        {education.image && (
          <figure className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={education.image}
              alt={education.title}
              className="h-72 w-full object-cover md:h-96"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-base-200/90 via-base-200/40 to-transparent p-4">
              <h1 className="text-2xl font-extrabold md:text-3xl">
                {education.title}
              </h1>
            </div>
          </figure>
        )}
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70">
            <span className="badge badge-outline">{readingTime}</span>
          </div>
          <div className="join">
            <button className="btn join-item btn-ghost" onClick={handleCopy}>
              لینک
            </button>
            <button
              className="btn join-item btn-ghost"
              onClick={() => window.print()}
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

      {/* Content (like News) */}
      <article className="prose prose-sm rtl:prose-p:text-right prose-headings:font-extrabold md:prose-base lg:prose-lg mt-6 max-w-none">
        {education.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>

      {/* Optional tags (kept for parity with News) */}
      {education.tags && education.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {education.tags.map((t) => (
            <span key={t} className="badge badge-primary badge-outline">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

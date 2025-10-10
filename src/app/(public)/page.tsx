"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Shared image source for all image cards and hero poster
const IMG =
  "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"organization" | "branches">(
    "organization"
  );

  const newsOrganization = [
    { id: 1, title: "خبر سازمان ۱", description: "خلاصه خبر شماره ۱" },
    { id: 2, title: "خبر سازمان ۲", description: "خلاصه خبر شماره ۲" },
    { id: 3, title: "خبر سازمان ۳", description: "خلاصه خبر شماره ۳" },
  ];

  const newsBranches = [
    { id: 1, title: "خبر شهرستان ۱", description: "خلاصه خبر شماره ۱" },
    { id: 2, title: "خبر شهرستان ۲", description: "خلاصه خبر شماره ۲" },
    { id: 3, title: "خبر شهرستان ۳", description: "خلاصه خبر شماره ۳" },
  ];

  const events = [
    {
      id: 1,
      title: "جشنواره ابوذر",
      description: "توضیح کوتاه درباره جشنواره ابوذر",
    },
    {
      id: 2,
      title: "رویداد رسانه امید",
      description: "توضیح کوتاه درباره رویداد رسانه امید",
    },
    {
      id: 3,
      title: "فراخوان‌های پیش رو",
      description: "لیست فراخوان‌های جدید و رویدادهای آتی",
    },
  ];

  return (
    <div dir="rtl" className="flex min-h-screen flex-col bg-base-100">
      {/* Hero Section */}
      <section className="relative isolate h-[56vh] w-full overflow-hidden rounded-none">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/sample-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster={IMG}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100/80 via-base-100/40 to-transparent" />
        <div className="hero relative z-10 h-full">
          <div className="hero-content text-center text-base-content">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
                سازمان توسعه رسانه‌های فرهنگی و تربیتی
              </h1>
              <p className="mt-4 opacity-90">
                پلتفرمی برای آموزش، رویدادها و پوشش خبری کانون‌ها در سراسر کشور
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link href="/register" className="btn btn-primary btn-wide">
                  شروع کنید
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  ارتباط با ما
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto flex-1 space-y-16 px-4 py-10 md:px-6 lg:px-8">
        {/* آموزش */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold md:text-3xl">آموزش</h2>
            <Link href="/education" className="btn btn-sm md:btn-md btn-ghost">
              مشاهده همه
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <figure>
                  <img
                    src={IMG}
                    alt={`محتوای آموزشی ${i}`}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">محتوای آموزشی {i}</h3>
                  <p className="text-sm opacity-90">
                    توضیح کوتاه درباره محتوای آموزشی {i}.
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/education/${i}`}
                      className="btn btn-primary btn-sm"
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* رویدادها و جشنواره‌ها */}
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              رویدادها و جشنواره‌ها
            </h2>
            <Link href="/events" className="btn btn-sm md:btn-md btn-ghost">
              تقویم رویدادها
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="card bg-base-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <figure>
                  <img
                    src={IMG}
                    alt={event.title}
                    className="h-56 w-full object-cover md:h-64"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  <p>{event.description}</p>
                  <Link
                    href={`/events/${event.id}`}
                    className="btn btn-primary mt-2"
                  >
                    جزئیات
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* اخبار */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-extrabold md:text-3xl">
            اخبار
          </h2>
          <div
            role="tablist"
            className="tabs tabs-boxed mx-auto mb-6 w-full max-w-lg"
          >
            <button
              role="tab"
              className={`tab ${
                activeTab === "organization" ? "tab-active" : ""
              }`}
              aria-selected={activeTab === "organization"}
              onClick={() => setActiveTab("organization")}
            >
              اخبار سازمان
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === "branches" ? "tab-active" : ""}`}
              aria-selected={activeTab === "branches"}
              onClick={() => setActiveTab("branches")}
            >
              اخبار کانون‌ها
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {(activeTab === "organization"
              ? newsOrganization
              : newsBranches
            ).map((news) => (
              <article
                key={news.id}
                className="card bg-base-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <figure>
                  <img
                    src={IMG}
                    alt={news.title}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-base md:text-lg">
                    {news.title}
                  </h3>
                  <p className="text-sm opacity-90">{news.description}</p>
                  <div className="card-actions justify-end">
                    <Link
                      href={`/news/${news.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

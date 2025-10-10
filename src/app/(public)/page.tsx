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
     <section className="relative isolate h-[80vh] w-full overflow-hidden rounded-none">
  {/* ویدیو پس‌زمینه با لایه نیمه‌تیره */}
  <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/sample-video.mp4"
    autoPlay
    muted
    loop
    playsInline
    poster={IMG}
  />
  
  {/* لایه‌ی گرادینت برای عمق و خوانایی متن */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  {/* محتوای هیرو */}
  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
    <div className="max-w-2xl px-4">
      <h1 className="text-4xl font-extrabold title-kalameh leading-tight md:text-6xl drop-shadow-lg animate-fadeIn">
        سازمان توسعه رسانه‌های فرهنگی و تربیتی
      </h1>

      <p className="mt-6 text-base md:text-lg text-gray-200 leading-relaxed animate-fadeIn [animation-delay:0.2s]">
        پلتفرمی برای آموزش، رویدادها و پوشش خبری کانون‌ها در سراسر کشور
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fadeIn [animation-delay:0.4s]">
        <Link
          href="/register"
          className="btn btn-primary btn-wide text-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
        >
          شروع کنید
        </Link>
        <Link
          href="/contact"
          className="btn btn-outline text-white border-white hover:bg-white hover:text-primary hover:shadow-lg transition-all duration-300"
        >
          ارتباط با ما
        </Link>
      </div>
    </div>
  </div>

  {/* افکت محو پایین صفحه برای ترکیب طبیعی با بقیه بخش‌ها */}
  <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-base-100/90 via-base-100/40 to-transparent" />
</section>


      <main className="container mx-auto flex-1 space-y-16 px-4 py-10 md:px-6 lg:px-8">
        {/* آموزش */}
{/* آموزش */}
<section className="relative py-12">
  <div className="mb-6 flex items-center justify-between gap-4">
    <h2 className="text-3xl font-extrabold text-primary title-kalameh">آموزش</h2>
    <Link href="/education" className="btn btn-sm md:btn-md btn-outline">
      مشاهده همه
    </Link>
  </div>

  {/* Scrollable multi-card section */}
  <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="snap-center shrink-0 w-72 md:w-80 bg-white card shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden"
      >
        <figure className="relative overflow-hidden">
          <img
            src={IMG}
            alt={`محتوای آموزشی ${i}`}
            className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-all duration-500"></div>
        </figure>
        <div className="card-body p-5">
          <h3 className="card-title text-lg font-bold">محتوای آموزشی {i}</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            توضیح کوتاه درباره محتوای آموزشی {i}. مهارت‌های رسانه‌ای، فرهنگی و تربیتی را در این بخش بیاموزید.
          </p>
          <div className="card-actions justify-end mt-3">
            <Link href={`/education/${i}`} className="btn btn-primary btn-sm">
              مشاهده
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
        {/* رویدادها و جشنواره‌ها */}
<section className="relative py-12">
  <div className="mb-8 flex items-center justify-between border-b border-base-300 pb-2">
    <h2 className="text-3xl font-extrabold text-primary">رویدادها و جشنواره‌ها</h2>
    <Link href="/events" className="btn btn-ghost btn-sm md:btn-md">
      تقویم رویدادها
    </Link>
  </div>

  {/* گرید متوازن */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[320px]">
    {/* کارت بزرگ سمت راست */}
    <div className="lg:col-span-2 relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <img
        src={IMG}
        alt="جشنواره ابوذر"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* گرادینت تیره برای خوانایی متن */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500"></div>

      <div className="relative z-10 flex flex-col justify-end p-6 h-full text-white">
        <h3 className="text-2xl font-bold mb-2">جشنواره ابوذر</h3>
        <p className="opacity-90 text-sm leading-relaxed mb-3">
          توضیح کوتاه درباره جشنواره ابوذر و نحوه شرکت در آن برای فعالان رسانه.
        </p>
        <Link href="/events/1" className="btn btn-primary btn-sm self-start">
          جزئیات
        </Link>
      </div>
    </div>

    {/* ستون سمت چپ شامل دو کارت کوچکتر */}
    <div className="flex flex-col gap-6">
      {/* کارت دوم */}
      <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex-1">
        <img
          src={IMG}
          alt="رویداد رسانه امید"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500"></div>
        <div className="relative z-10 flex flex-col justify-end p-5 h-full text-white">
          <h3 className="text-lg font-bold mb-1">رویداد رسانه امید</h3>
          <p className="opacity-90 text-sm mb-3">
            برنامه‌ای برای شبکه‌سازی میان خبرنگاران و فعالان حوزه فرهنگی کشور.
          </p>
          <Link href="/events/2" className="btn btn-primary btn-sm self-start">
            جزئیات
          </Link>
        </div>
      </div>

      {/* کارت سوم */}
      <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex-1">
        <img
          src={IMG}
          alt="فراخوان‌های پیش رو"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500"></div>
        <div className="relative z-10 flex flex-col justify-end p-5 h-full text-white">
          <h3 className="text-lg font-bold mb-1">فراخوان‌های پیش رو</h3>
          <p className="opacity-90 text-sm mb-3">
            جدیدترین فراخوان‌های فرهنگی و رسانه‌ای ویژه خبرنگاران سراسر کشور.
          </p>
          <Link href="/events/3" className="btn btn-primary btn-sm self-start">
            جزئیات
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


        {/* اخبار */}
<section className="relative py-12">
  <h2 className="text-center text-3xl font-extrabold text-primary mb-8 title-kalameh">
    اخبار
  </h2>

  <div className="tabs tabs-boxed mx-auto mb-8 w-full max-w-lg">
    <button
      role="tab"
      className={`tab font-bold ${activeTab === "organization" ? "tab-active text-primary" : ""}`}
      onClick={() => setActiveTab("organization")}
    >
      اخبار سازمان
    </button>
    <button
      role="tab"
      className={`tab font-bold ${activeTab === "branches" ? "tab-active text-primary" : ""}`}
      onClick={() => setActiveTab("branches")}
    >
      اخبار کانون‌ها
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {(activeTab === "organization" ? newsOrganization : newsBranches).map((news) => (
      <article
        key={news.id}
        className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-2xl"
      >
        <figure className="relative overflow-hidden">
          <img
            src={IMG}
            alt={news.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-300/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        </figure>
        <div className="card-body">
          <h3 className="card-title text-base font-bold md:text-lg">{news.title}</h3>
          <p className="text-sm opacity-80">{news.description}</p>
          <div className="card-actions justify-end mt-2">
            <Link href={`/news/${news.id}`} className="btn btn-outline btn-sm">
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

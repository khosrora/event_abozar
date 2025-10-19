"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";

/**
 * DaisyUI‑first, RTL‑friendly Navbar
 * - Sticky, translucent background with blur
 * - Mobile menu (hamburger) + desktop menu
 * - Active link highlighting based on pathname
 * - Language‑agnostic; Persian labels included
 * - Optional theme toggle (persists to localStorage)
 */

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "خانه" },
  { href: "/education", label: "آموزش" },
  { href: "/events", label: "رویدادها" },
  { href: "/news", label: "اخبار" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

function useTheme() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // hydrate from localStorage or system
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial =
      stored ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return { theme, toggle };
}

function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname?.startsWith(href);
  return (
    <Link
      href={href}
      className={`btn btn-ghost px-3 py-2 text-sm md:text-base transition-all duration-300 hover:scale-105 ${
        isActive 
          ? "text-primary bg-primary/10 border-primary/20" 
          : "opacity-80 hover:opacity-100 hover:bg-base-200"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-6 rounded bg-primary md:hidden" />
      )}
    </Link>
  );
}

export default function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <header dir="rtl" className="sticky top-0 z-50">
      <div className="navbar mx-auto w-full  bg-base-100/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 md:px-6 lg:px-8 shadow-sm">
        {/* Left: Brand (in RTL this visually sits on the right) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-square"
              aria-label="منو"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-sm dropdown-content mt-3 w-64 rounded-xl bg-base-100 p-3 shadow-xl border border-base-200 backdrop-blur-sm"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="mb-1 tet-xs">
                  <ActiveLink href={item.href}>{item.label}</ActiveLink>
                </li>
              ))}
              <li className="mt-3 pt-2 border-t border-base-200">
                <Link href="/dashboard/festival-registration/new" className="btn btn-primary btn-sm w-full justify-center mb-1">
                  ثبت‌نام در جشنواره
                </Link>
              </li>
              {isAuthenticated ? (
                <li>
                  <Link href="/dashboard" className="btn btn-outline btn-sm w-full justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    داشبورد
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/login" className="btn btn-outline btn-sm w-full justify-center">
                    ورود / عضویت
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <Link
            href="/"
            className="btn btn-ghost text-lg md:text-xl font-extrabold hover:bg-transparent"
          >
            <span className="inline-flex items-center gap-2 md:gap-3">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={40} 
                height={40} 
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span className="text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight max-w-[120px] sm:max-w-none">
                سازمان بسیج رسانه استان اصفهان
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="text-xs">
                <ActiveLink href={item.href}>{item.label}</ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="navbar-end gap-2">
          {/* Register CTA (desktop) */}
          <Link
            href="/dashboard/festival-registration/new"
            className="btn btn-primary btn-sm md:btn-md hidden lg:inline-flex"
          >
            ثبت‌نام در جشنواره
          </Link>
          
          {/* Login/Signup or Dashboard (desktop) */}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="btn btn-outline btn-sm md:btn-md hidden md:inline-flex gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              داشبورد
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn btn-outline btn-sm md:btn-md hidden md:inline-flex"
            >
              ورود / عضویت
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

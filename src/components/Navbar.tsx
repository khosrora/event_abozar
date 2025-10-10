"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
      className={`btn btn-ghost px-3 text-sm md:text-base ${
        isActive ? "text-primary" : "opacity-80 hover:opacity-100"
      }`}
    >
      {children}
      {isActive && (
        <span className="block h-0.5 w-6 rounded bg-primary md:hidden" />
      )}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header dir="rtl" className="sticky top-0 z-50">
      <div className="navbar mx-auto w-full  bg-base-100/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 md:px-6 lg:px-8 shadow-sm">
        {/* Left: Brand (in RTL this visually sits on the right) */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown md:hidden">
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
              className="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <ActiveLink href={item.href}>{item.label}</ActiveLink>
                </li>
              ))}
              <li className="mt-2">
                <Link href="/register" className="btn btn-primary btn-sm">
                  ثبت نام
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="btn btn-ghost text-lg md:text-xl font-extrabold"
          >
            <span className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span>رسانه ابوذر</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop menu */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <ActiveLink href={item.href}>{item.label}</ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="navbar-end gap-2">
          {/* Register CTA (desktop) */}
          <Link
            href="/register"
            className="btn btn-primary hidden md:inline-flex"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </header>
  );
}

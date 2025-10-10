"use client";

import Link from "next/link";

interface ItemCardProps {
  href: string;
  title: string;
  excerpt?: string;
  meta?: string;
  image?: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "accent" | "success" | "warning" | "error";
  isLoading?: boolean;
}

function ItemCardSkeleton() {
  return (
    <div className="card bg-base-200 animate-pulse">
      <div className="h-40 w-full bg-base-300 md:h-48" />
      <div className="card-body">
        <div className="h-4 bg-base-300 rounded mb-2" />
        <div className="h-3 bg-base-300 rounded w-3/4 mb-2" />
        <div className="h-3 bg-base-300 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function ItemCard({
  href,
  title,
  excerpt,
  meta,
  image,
  badge,
  badgeColor = "primary",
  isLoading = false
}: ItemCardProps) {
  if (isLoading) {
    return <ItemCardSkeleton />;
  }

  return (
    <Link
      href={href}
      className="card bg-base-200 transition hover:-translate-y-0.5 hover:shadow-md group"
    >
      {image && (
        <figure className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-40 w-full object-cover md:h-48 group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <div className={`badge badge-${badgeColor} absolute top-2 right-2 text-xs`}>
              {badge}
            </div>
          )}
        </figure>
      )}
      <div className="card-body">
        <h3 className="card-title text-base md:text-lg group-hover:text-primary transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm opacity-80 line-clamp-2">{excerpt}</p>
        )}
        {meta && (
          <div className="mt-1 text-xs opacity-60 flex items-center gap-1">
            <svg 
              className="w-3 h-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            {meta}
          </div>
        )}
      </div>
    </Link>
  );
}
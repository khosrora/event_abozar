/**
 * Image Lightbox Component
 * Beautiful and modern image viewer with animations
 */

"use client";

import { useState } from "react";
import { getImageUrl } from "@/utils";

interface ImageLightboxProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ImageLightbox({
  src,
  alt,
  className = "h-72 w-full object-cover md:h-96",
  containerClassName = "",
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!src) {
    return (
      <div className={`${className} ${containerClassName} bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center rounded-xl overflow-hidden`}>
        <div className="text-center">
          <svg className="w-12 h-12 text-base-content/20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-base-content/30 text-sm">تصویری موجود نیست</span>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(src);

  return (
    <>
      {/* Thumbnail - Enhanced with better hover effects */}
      <figure
        className={`relative cursor-pointer group overflow-hidden rounded-xl ${containerClassName}`}
        onClick={() => {
          setIsOpen(true);
          setIsLoading(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true);
            setIsLoading(true);
          }
        }}
      >
        {/* Image with better effects */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className={`${className} transition-all duration-500 group-hover:scale-110 group-hover:brightness-75`}
          onLoad={() => setIsLoading(false)}
        />
        
        {/* Beautiful gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Animated zoom icon with glow effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="relative">
            {/* Glow circle background */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
            
            {/* Icon container */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/30 shadow-2xl">
              <svg
                className="w-8 h-8 text-white drop-shadow-lg animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 12a2 2 0 100-4 2 2 0 000 4z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Additional info badge */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20">
          برای بزرگنمایی کلیک کنید
        </div>
      </figure>

      {/* Modern Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          {/* Dark backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-7xl max-h-[95vh] flex flex-col animate-scaleIn mx-auto">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-4 px-4">
              <div className="text-white/70 text-sm font-medium backdrop-blur-md bg-black/30 px-4 py-2 rounded-lg border border-white/10">
                📷 عرض تمام‌صفحه
              </div>
              
              {/* Close button with hover effect */}
              <button
                className="group relative p-2 hover:bg-white/10 rounded-full transition-all duration-300 backdrop-blur-md bg-black/30 border border-white/10 hover:border-white/30 shadow-lg"
                onClick={() => setIsOpen(false)}
                aria-label="بستن"
              >
                <svg
                  className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Image container - scrollable, centered, with max dimensions */}
            <div className="relative flex-1 overflow-auto rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                  <span className="loading loading-spinner loading-lg text-white" />
                </div>
              )}
              
              <div className="min-h-full flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={alt}
                  className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl animate-fadeIn rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>

            {/* Footer with image info */}
            <div className="mt-4 backdrop-blur-md bg-black/40 border-t border-white/10 rounded-lg p-4 space-y-3">
              {/* Title/Alt text */}
              {alt && (
                <div>
                  <p className="text-white/50 text-xs font-medium mb-1">عنوان تصویر</p>
                  <p className="text-white text-sm font-medium line-clamp-2">
                    {alt}
                  </p>
                </div>
              )}

              {/* Controls info */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white/80">Esc</kbd>
                    برای بستن
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span>یا کلیک بیرون</span>
                  </span>
                </div>
                
                {/* Download hint */}
                <div className="text-xs text-white/40">
                  کلیک راست برای ذخیره تصویر
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts */}
      {isOpen && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          style={{ outline: 'none' }}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </>
  );
}

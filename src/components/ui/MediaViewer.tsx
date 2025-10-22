/**
 * Media Viewer Component
 * For displaying video and PDF files
 */

"use client";

import { useState } from "react";

interface MediaViewerProps {
  type: "video" | "pdf";
  url: string;
  title?: string;
}

export function VideoViewer({ url, title }: { url: string; title?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="mt-8">
      <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl border border-primary/20">
        <div className="card-body p-6">
          <h2 className="card-title text-2xl mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>ویدیو</span>
          </h2>
          
          <div className="rounded-xl overflow-hidden bg-black shadow-2xl">
            <video
              controls
              className="w-full aspect-video"
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={url} type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>

          {title && (
            <div className="mt-4 p-3 bg-base-200/50 rounded-lg">
              <p className="text-sm text-base-content/70">{title}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function PDFViewer({ url, title }: { url: string; title?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="mt-8">
      <div className="card bg-gradient-to-br from-error/5 to-warning/5 shadow-xl border border-error/20">
        <div className="card-body p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span>فایل (PDF)</span>
            </h2>

            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-error btn-sm gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              دانلود فایل
            </a>
          </div>

          <div className="relative">
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-200 rounded-xl">
                <span className="loading loading-spinner loading-lg text-error"></span>
              </div>
            )}

            {/* PDF Viewer */}

          </div>

          {title && (
            <div className="mt-4 p-3 bg-base-200/50 rounded-lg">
              <p className="text-sm text-base-content/70">{title}</p>
            </div>
          )}

          {/* Instructions */}
        </div>
      </div>
    </section>
  );
}

export function MediaViewer({ type, url, title }: MediaViewerProps) {
  if (type === "video") {
    return <VideoViewer url={url} title={title} />;
  }
  return <PDFViewer url={url} title={title} />;
}

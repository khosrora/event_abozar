"use client";

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, children }: SectionHeaderProps) {
  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
      <div className="flex-1">
        <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm opacity-70">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </header>
  );
}
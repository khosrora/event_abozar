/**
 * Breadcrumb Component
 */

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`breadcrumbs text-sm text-base-content/70 ${className}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href} className="link-hover">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Error Alert Component
 */

import { useRouter } from 'next/navigation';

interface ErrorAlertProps {
  message?: string;
  backUrl?: string;
  backLabel?: string;
  onRetry?: () => void;
}

export function ErrorAlert({
  message = 'خطایی رخ داد',
  backUrl,
  backLabel = 'بازگشت',
  onRetry,
}: ErrorAlertProps) {
  const router = useRouter();

  return (
    <div className="alert alert-error shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
      <div className="flex gap-2">
        {onRetry && (
          <button className="btn btn-sm btn-ghost" onClick={onRetry}>
            تلاش مجدد
          </button>
        )}
        {backUrl && (
          <button className="btn btn-sm" onClick={() => router.push(backUrl)}>
            {backLabel}
          </button>
        )}
      </div>
    </div>
  );
}

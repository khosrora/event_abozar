/**
 * Loading Spinner Component
 */

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'loading-sm',
    md: 'loading-md',
    lg: 'loading-lg',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className={`loading loading-spinner text-primary ${sizeClasses[size]}`}></span>
    </div>
  );
}

/**
 * Full Page Loading
 */
export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

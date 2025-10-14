"use client";

import React from 'react';
import { toast } from 'sonner';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Show user-friendly error toast
    toast.error('خطایی در نمایش صفحه رخ داده است');
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4 text-error">خطایی رخ داده است</h2>
        <p className="text-base-content/70 mb-6 leading-relaxed">
          متأسفانه در نمایش این بخش مشکلی پیش آمده است. 
          لطفاً صفحه را تازه‌سازی کرده یا بعداً تلاش کنید.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={resetError}
            className="btn btn-primary"
          >
            تلاش مجدد
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-outline"
          >
            تازه‌سازی صفحه
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
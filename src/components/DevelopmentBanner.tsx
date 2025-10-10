"use client";

import { useState, useEffect } from 'react';

export default function DevelopmentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [apiMode, setApiMode] = useState<'mock' | 'real' | 'unknown'>('unknown');

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
      
      // Check API mode
      const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false';
      setApiMode(useMockData ? 'mock' : 'real');
    }
  }, []);

  if (!isVisible) return null;

  const toggleApiMode = () => {
    // This would require a page refresh to take effect
    const newMode = apiMode === 'mock' ? 'real' : 'mock';
    const message = `برای تغییر حالت API به ${newMode === 'mock' ? 'Mock' : 'Real'}, متغیر NEXT_PUBLIC_USE_MOCK_DATA را در .env.local تغییر دهید و صفحه را تازه‌سازی کنید.`;
    alert(message);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-warning text-warning-content px-4 py-2 rounded-lg shadow-lg text-xs font-semibold border border-warning-content/20">
      <div className="flex items-center gap-2">
        <span>🔧 حالت توسعه</span>
        <div className="divider divider-horizontal mx-0"></div>
        <button 
          onClick={toggleApiMode}
          className="hover:underline cursor-pointer"
          title="کلیک کنید برای تغییر حالت API"
        >
          API: {apiMode === 'mock' ? '🟡 Mock Data' : '🟢 Real Server'}
        </button>
      </div>
    </div>
  );
}
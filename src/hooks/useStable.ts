"use client";

import { useRef, useCallback, useState, useEffect } from 'react';

/**
 * Hook to prevent unnecessary re-renders by memoizing function calls
 * Useful for API functions that are passed as dependencies
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback);
  
  // Update ref when callback changes
  callbackRef.current = callback;
  
  // Return stable reference
  return useCallback(((...args: any[]) => {
    return callbackRef.current(...args);
  }) as T, []);
}

/**
 * Hook to create stable references for objects/arrays
 * Prevents infinite loops caused by object recreation on every render
 */
export function useStableValue<T>(value: T): T {
  const ref = useRef<T>(value);
  const serialized = JSON.stringify(value);
  const lastSerialized = useRef<string>(serialized);
  
  if (lastSerialized.current !== serialized) {
    ref.current = value;
    lastSerialized.current = serialized;
  }
  
  return ref.current;
}

/**
 * Hook to debounce values and prevent too frequent updates
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}
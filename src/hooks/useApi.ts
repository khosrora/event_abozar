"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import type { ApiError } from '@/types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
) {
  const {
    immediate = false,
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
  } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Use refs for callbacks to prevent infinite loops
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const apiFunctionRef = useRef(apiFunction);
  
  // Update refs when callbacks change
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;
  apiFunctionRef.current = apiFunction;

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const result = await apiFunctionRef.current(...args);
        setState(prev => ({ ...prev, data: result, loading: false }));
        
        if (onSuccessRef.current) {
          onSuccessRef.current(result);
        }
        
        if (showSuccessToast) {
          toast.success('عملیات با موفقیت انجام شد');
        }
        
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        setState(prev => ({ ...prev, error: apiError, loading: false }));
        
        if (onErrorRef.current) {
          onErrorRef.current(apiError);
        } else if (showErrorToast) {
          toast.error(apiError.message);
        }
        
        throw error;
      }
    },
    [showSuccessToast, showErrorToast]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  // Control immediate execution separately
  const hasExecuted = useRef(false);
  
  useEffect(() => {
    if (immediate && !hasExecuted.current) {
      hasExecuted.current = true;
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    reset,
    isIdle: !state.loading && !state.data && !state.error,
  };
}

// Specialized hook for list data with pagination
export function useApiList<T = any>(
  apiFunction: (params?: any) => Promise<{ data: T[]; meta?: any }>,
  options: UseApiOptions & { params?: any } = {}
) {
  const { params = {}, immediate = false, ...apiOptions } = options;
  const [items, setItems] = useState<T[]>([]);
  const [meta, setMeta] = useState<any>(null);
  
  // Memoize the API function to prevent infinite loops
  const memoizedApiFunction = useCallback(() => {
    return apiFunction(params);
  }, [JSON.stringify(params)]); // Stable dependency

  const api = useApi(memoizedApiFunction, {
    ...apiOptions,
    immediate: false, // We'll control when to execute
    onSuccess: (result) => {
      setItems(result.data || []);
      setMeta(result.meta || null);
      if (options.onSuccess) {
        options.onSuccess(result);
      }
    },
  });

  // Separate effect for initial load
  useEffect(() => {
    if (immediate) {
      api.execute();
    }
  }, [immediate]); // Only depend on immediate flag

  const loadMore = useCallback(
    async (additionalParams?: any) => {
      try {
        const mergedParams = { ...params, ...additionalParams };
        const result = await apiFunction(mergedParams);
        
        if (additionalParams?.page > 1) {
          // Append to existing items for pagination
          setItems(prev => [...prev, ...(result.data || [])]);
        } else {
          // Replace items for new search
          setItems(result.data || []);
        }
        setMeta(result.meta || null);
        return result;
      } catch (error) {
        throw error;
      }
    },
    [apiFunction, JSON.stringify(params)]
  );

  const refresh = useCallback(async () => {
    setItems([]);
    setMeta(null);
    try {
      const result = await apiFunction(params);
      setItems(result.data || []);
      setMeta(result.meta || null);
      return result;
    } catch (error) {
      throw error;
    }
  }, [apiFunction, JSON.stringify(params)]);

  // Manual execute function
  const execute = useCallback(async () => {
    return api.execute();
  }, [api.execute]);

  return {
    ...api,
    items,
    meta,
    loadMore,
    refresh,
    execute,
    hasMore: meta?.hasNext || false,
  };
}
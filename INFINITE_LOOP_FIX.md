# رفع خطای Maximum Update Depth Exceeded

## 🚨 مشکل
خطای `Maximum update depth exceeded` معمولاً زمانی رخ می‌دهد که:
- useEffect بدون dependency array صحیح
- setState داخل useEffect که باعث re-render می‌شود
- Function dependencies که در هر render تغییر می‌کنند

## ✅ راه‌حل‌های پیاده‌سازی شده

### 1. **Stable API Functions**
```tsx
// ❌ مشکل: Function جدید در هر render
const api = useApiList(() => apiCall(params), { immediate: true });

// ✅ حل شده: Function reference پایدار
const api = useApiList(apiCall, { 
  immediate: true, 
  params: { limit: 6 } 
});
```

### 2. **Controlled useEffect Dependencies**
```tsx
// ❌ مشکل: Dependency تغییر در هر render
useEffect(() => {
  if (condition && array.length === 0) {
    doSomething();
  }
}, [condition, array.length, doSomething]);

// ✅ حل شده: State-based control
const [hasLoaded, setHasLoaded] = useState(false);
useEffect(() => {
  if (condition && !hasLoaded) {
    doSomething();
    setHasLoaded(true);
  }
}, [condition, hasLoaded]);
```

### 3. **Ref-based Callbacks**
```tsx
// در useApi hook
const onSuccessRef = useRef(onSuccess);
onSuccessRef.current = onSuccess; // Update without causing re-render

const execute = useCallback(async (...args) => {
  // Use ref instead of direct dependency
  if (onSuccessRef.current) {
    onSuccessRef.current(result);
  }
}, [showSuccessToast, showErrorToast]); // Stable dependencies only
```

### 4. **Single Execution Control**
```tsx
const hasExecuted = useRef(false);

useEffect(() => {
  if (immediate && !hasExecuted.current) {
    hasExecuted.current = true;
    execute();
  }
}, [immediate, execute]);
```

## 🛠️ ابزارهای کمکی

### useStableCallback Hook
```tsx
import { useStableCallback } from '@/hooks/useStable';

const stableCallback = useStableCallback((data) => {
  console.log(data);
});
// این callback در render های بعدی تغییر نمی‌کند
```

### useStableValue Hook  
```tsx
import { useStableValue } from '@/hooks/useStable';

const stableParams = useStableValue({ category: 'news', limit: 10 });
// Object reference پایدار باقی می‌ماند
```

## 🔍 تشخیص مشکل

### نشانه‌های خطا:
- صفحه freeze می‌شود
- Console پر از error
- CPU usage بالا
- Browser responsive نیست

### دیباگ کردن:
```tsx
// اضافه کردن log برای tracking re-renders
useEffect(() => {
  console.log('Component re-rendered:', { dependency1, dependency2 });
}, [dependency1, dependency2]);
```

## 📋 Checklist پیشگیری

- ✅ useCallback برای functions
- ✅ useMemo برای expensive calculations
- ✅ useRef برای callbacks که نباید dependency باشند
- ✅ useState بجای direct comparison در useEffect
- ✅ Stable function references در API calls
- ✅ JSON.stringify برای object dependencies (محدود)

## 🎯 بهترین روش‌ها

1. **Minimize Dependencies**: فقط چیزهایی که واقعاً نیاز هست
2. **Use Refs for Callbacks**: callbacks که نمی‌خواهید re-render trigger کنند  
3. **Separate Concerns**: loading logic جدا از UI logic
4. **State-based Control**: بجای direct comparison
5. **Memoization**: برای expensive operations

با این تغییرات، دیگر infinite loop نخواهید داشت و API calls به درستی کار خواهند کرد! 🚀
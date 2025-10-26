# 🎨 Lightbox - نمونه‌های استفاده

## 📖 راهنمای نمونه‌ها

### مثال 1: در صفحه خبر

```tsx
// صفحه: /news/[newsId]
// کامپوننت: DetailPageLayout

<ImageLightbox
  src={news.image}
  alt={news.title}
  className="h-72 w-full object-cover md:h-96"
  containerClassName="w-full"
/>
```

**نتیجه:**
- تصویر خبر کلیکی است
- بر روی hover، zoom و info badge ظاهر می‌شود
- کلیک روی آن، modal تمام‌صفحه باز می‌شود
- توضیح: عنوان خبر در footer نمایش داده می‌شود

---

### مثال 2: در صفحه رویداد

```tsx
// صفحه: /events/[eventId]
// کامپوننت: DetailPageLayout

<ImageLightbox
  src={event.image}
  alt={event.title}
  className="h-72 w-full object-cover md:h-96"
  containerClassName="w-full"
/>
```

**نتیجه:**
- تصویر رویداد کلیکی است
- modal اپن شدن برای دیدن تصویر بزرگ‌تر
- عنوان رویداد نمایش داده می‌شود

---

### مثال 3: در صفحه آموزش

```tsx
// صفحه: /education/[educationId]
// کامپوننت: DetailPageLayout

<ImageLightbox
  src={education.image}
  alt={education.title}
  className="h-72 w-full object-cover md:h-96"
  containerClassName="w-full"
/>
```

**نتیجه:**
- تصویر آموزش کلیکی است
- modal اپن شدن برای دیدن تصویر بزرگ‌تر
- عنوان آموزش نمایش داده می‌شود

---

## 🎯 Keyboard Shortcuts در Modal

| کلید | عملکرد |
|------|--------|
| `Esc` | بستن modal |
| `Space` | روی thumbnail: باز کردن modal |
| `Enter` | روی thumbnail: باز کردن modal |
| Click | روی backdrop: بستن modal |
| Click | روی X button: بستن modal |

---

## 🖱️ Mouse Interactions

### Thumbnail
```
Move over → Zoom (110%) + Brightness (75%)
           → Overlay gradient appear
           → Zoom icon show with glow

Click     → Modal open with scale animation
```

### Modal Controls
```
Hover Close Button → Rotate 90° + Highlight
Click Close Button → Close with smooth fade

Click Backdrop → Close modal
Click Image    → No action (prevent propagation)
```

---

## 📊 State Transitions

```
THUMBNAIL (Normal)
    ↓
[User Hovers]
    ↓
THUMBNAIL (Hovered)
    ↓
[User Clicks]
    ↓
MODAL (Opening - Scale In)
    ↓
MODAL (Opened - Visible)
    ↓
[User Closes (Esc/Click)]
    ↓
MODAL (Closing - Fade Out)
    ↓
THUMBNAIL (Normal)
```

---

## 🎬 Animation Timeline

### Thumbnail Hover (0-300ms)
```
0ms:    Normal state
100ms:  Image scale increases
150ms:  Overlay appears
200ms:  Zoom icon fades in
250ms:  Info badge fades in
300ms:  Complete
```

### Modal Open (0-400ms)
```
0ms:    Backdrop fade starts
50ms:   Modal scale starts (0.95)
100ms:  Modal content fades in
150ms:  Image loads
300ms:  Loading spinner disappears
400ms:  Complete & interactive
```

### Modal Close (0-300ms)
```
0ms:    Fade out starts
150ms:  Scale down starts (1 → 0.95)
300ms:  Complete (removed from DOM)
```

---

## 💡 بهترین روش‌ها (Best Practices)

### ✅ درست

```tsx
// صحیح: همیشه alt text ارائه دهید
<ImageLightbox
  src={image.url}
  alt="توضیح معنی‌دار در مورد تصویر"
/>

// صحیح: مناسب بسازید
<ImageLightbox
  src={image.url}
  alt="عنوان خبر"
  className="h-72 w-full object-cover md:h-96"
/>
```

### ❌ غلط

```tsx
// غلط: بدون alt text
<ImageLightbox src={image.url} alt="" />

// غلط: generic توضیح
<ImageLightbox src={image.url} alt="image" />

// غلط: بدون className
<ImageLightbox src={image.url} alt="title" />
```

---

## 🔍 Visual Feedback Elements

### Loading State
```
User clicks thumbnail
    ↓
Modal opens (scale in)
    ↓
Is image loading?
    ├─ YES: Show spinner (loading loading-spinner loading-lg)
    ├─ Wait for onLoad event
    └─ Remove spinner
```

### Info Badge
```
User hovers thumbnail
    ↓
Badge appears: "برای بزرگنمایی کلیک کنید"
    ↓
Tells user that image is clickable
    ↓
Improves discoverability
```

### Keyboard Hint
```
Modal open
    ↓
Footer shows shortcuts:
  - "Esc برای بستن"
  - "Click outside"
    ↓
User learns available options
```

---

## 🎨 Customization Examples

### مثال 1: تغییر زوم میزان

**Default:**
```tsx
group-hover:scale-110  // 110% zoom
```

**Customize:**
```tsx
// بیشتر zoom
group-hover:scale-125

// کمتر zoom
group-hover:scale-105
```

**تغییر در component:**
```tsx
className={`${className} transition-all duration-500 group-hover:scale-125`}
```

---

### مثال 2: تغییر brightness

**Default:**
```tsx
group-hover:brightness-75  // 75% brightness
```

**Customize:**
```tsx
// تاریک‌تر
group-hover:brightness-50

// روشن‌تر
group-hover:brightness-90
```

---

### مثال 3: تغییر backdrop blur

**Default:**
```tsx
backdrop-blur-sm  // Small blur
```

**Customize:**
```tsx
// بیشتر blur
backdrop-blur-md

// کمتر blur
backdrop-blur-none
```

---

### مثال 4: تغییر modal max-width

**Default:**
```tsx
max-w-5xl  // 64rem
```

**Customize:**
```tsx
// بزرگ‌تر modal
max-w-6xl   // 72rem

// کوچک‌تر modal
max-w-4xl   // 56rem
```

---

## 🧪 Testing Scenarios

### Scenario 1: تصویر بدون alt text
```
Input: src="..." alt=""
Output: خالی footer
```

### Scenario 2: تصویر خیلی بزرگ
```
Input: 5MB image
Output: Spinner visible
Wait: Image loads
Result: Display
```

### Scenario 3: تصویر خیلی کوچک
```
Input: 10KB image
Output: Instant display
No: Spinner visible
```

### Scenario 4: بدون تصویر
```
Input: src={null}
Output: Placeholder with icon
Message: "تصویری موجود نیست"
```

---

## 📈 Performance Considerations

### Image Loading
```
✓ Images loaded on demand (lazy)
✓ High-res shown in modal (not thumbnail)
✓ Caching by browser
✓ onLoad event handling
```

### DOM
```
✓ Modal rendered conditionally (if isOpen)
✓ Minimal re-renders
✓ Event delegation used
✓ Cleanup on unmount
```

### CSS
```
✓ GPU-accelerated transforms
✓ Will-change on hover (implicit)
✓ CSS animations (not JS)
✓ Efficient selectors
```

---

## 🚀 Advanced Usage

### Option 1: Custom Loading Component

```tsx
// اگر می‌خواهی loading spinner custom کنی:
{isLoading && (
  <div className="absolute inset-0 flex items-center justify-center">
    <YourCustomLoader />
  </div>
)}
```

### Option 2: Custom Keyboard Handling

```tsx
// هنگام باز شدن modal
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
    // More shortcuts...
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### Option 3: Image Context Menu

```tsx
// برای ذخیره تصویر
const handleContextMenu = (e: React.MouseEvent) => {
  // e.preventDefault(); // Disable default menu
  // Show custom menu
};
```

---

## 📋 Checklist برای استفاده

- [ ] Import `ImageLightbox` از `@/components/ui`
- [ ] Pass `src` (image URL)
- [ ] Pass `alt` (descriptive text)
- [ ] Pass `className` (styling)
- [ ] Test on mobile
- [ ] Test keyboard shortcuts
- [ ] Test with large images
- [ ] Test without images (null/undefined)
- [ ] Check accessibility (screen readers)
- [ ] Verify animations smooth

---

## 🎬 Demo Flow

```
1. صفحه‌ی خبر بارگذاری می‌شود
2. تصویر thumbnail نمایش داده می‌شود
3. User روی تصویر hover می‌کند
   → Zoom effect + Icon + Badge
4. User کلیک می‌کند
   → Modal scale-in animation
   → Large image displayed
5. User می‌خواند info footer
6. User می‌تواند:
   - Esc فشار دهد → Close
   - Outside کلیک کند → Close
   - X کلیک کند → Close
7. Modal fade-out می‌شود
8. صفحه عادی می‌شود
```

---

نتیجه: تجربه کاملاً کاربری و جذاب! ✨

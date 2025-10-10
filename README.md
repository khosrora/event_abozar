# سایت سازمان بسیج رسانه استان اصفهان

پلتفرمی مدرن برای آموزش، رویدادها و پوشش خبری کانون‌های رسانه‌ای در سراسر کشور

## 🚀 ویژگی‌های کلیدی

- **Responsive Design**: طراحی کاملاً واکنش‌گرا برای تمام اندازه‌های صفحه
- **Modern UI/UX**: رابط کاربری مدرن با DaisyUI و Tailwind CSS
- **RTL Support**: پشتیبانی کامل از راست به چپ
- **TypeScript**: امنیت نوع‌سازی و توسعه بهتر
- **API Integration**: مدیریت یکپارچه API با Axios و error handling
- **Animations**: انیمیشن‌های smooth و تعاملی
- **Performance Optimized**: بهینه‌سازی عملکرد و SEO

## 🛠️ تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 15.5.4, React 19, TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI 5.1.29
- **HTTP Client**: Axios با interceptors
- **Notifications**: Sonner
- **Forms**: React Hook Form
- **Animations**: Framer Motion, Custom CSS Animations
- **Icons & Fonts**: فونت‌های فارسی (ایران‌سنس، کلمه)

## 📦 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js (نسخه 18 یا بالاتر)
- npm یا yarn

### مراحل نصب

1. **کلون کردن پروژه**
```bash
git clone https://github.com/khosrora/event_abozar.git
cd event_abozar
```

2. **نصب وابستگی‌ها**
```bash
npm install
```

3. **تنظیم متغیرهای محیطی**
```bash
cp .env.example .env.local
```

سپس متغیرهای مورد نیاز را در `.env.local` تنظیم کنید:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

4. **اجرای پروژه**
```bash
npm run dev
```

وب‌سایت در آدرس `http://localhost:3000` در دسترس خواهد بود.

## 🏗️ ساختار پروژه

```
src/
├── app/                     # App Router (Next.js 13+)
│   ├── (public)/           # Public routes
│   │   ├── page.tsx        # صفحه اصلی
│   │   ├── about/          # درباره ما
│   │   ├── contact/        # تماس با ما
│   │   ├── education/      # آموزش
│   │   ├── events/         # رویدادها
│   │   ├── news/           # اخبار
│   │   └── register/       # ثبت نام
│   ├── globals.css         # استایل‌های سراسری
│   └── layout.tsx          # Layout اصلی
├── components/             # کامپوننت‌های قابل استفاده مجدد
│   ├── AnimatedSection.tsx # انیمیشن‌های اسکرول
│   ├── ErrorBoundary.tsx   # مدیریت خطاها
│   ├── Footer.tsx          # فوتر
│   ├── LoadingCard.tsx     # Loading states
│   └── Navbar.tsx          # نوار ناوبری
├── hooks/                  # Custom React Hooks
│   └── useApi.ts           # مدیریت API calls
├── lib/                    # کتابخانه‌های کمکی
│   ├── api.ts              # پیکربندی Axios
│   ├── local_fonts.ts      # فونت‌های محلی
│   └── useInView.ts        # Intersection Observer
├── services/               # API Services
│   └── api.ts              # تمام API calls
├── types/                  # TypeScript Types
│   └── api.ts              # تایپ‌های API
└── constants/              # ثابت‌ها
    └── cities.ts           # لیست شهرها
```

## 🔧 API Integration

### حالت‌های API

پروژه از یک سیستم adaptive API استفاده می‌کند که دارای ۳ حالت است:

1. **Mock Data** (پیش‌فرض در development): 
   - داده‌های نمونه محلی
   - عدم نیاز به سرور backend
   - مناسب برای توسعه و تست UI

2. **Real API**: 
   - اتصال به سرور واقعی
   - قابل فعال‌سازی با تغییر `NEXT_PUBLIC_USE_MOCK_DATA=false`

3. **Fallback Mode**: 
   - تلاش برای real API اول
   - در صورت خطا، fallback به mock data
   - مناسب برای محیط production

### تنظیمات

فایل `.env.local`:
```bash
# استفاده از mock data (پیش‌فرض: true در development)
NEXT_PUBLIC_USE_MOCK_DATA=true

# آدرس API سرور
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### مثال استفاده از API Hook:

```tsx
import { useApiList } from '@/hooks/useApi';
import { newsApi } from '@/services/api';

function NewsComponent() {
  const {
    items: news,
    loading,
    error,
    refresh
  } = useApiList(() => newsApi.getAll({ limit: 10 }), {
    immediate: true
  });

  if (loading) return <LoadingCard />;
  if (error) return <div>خطا در بارگذاری</div>;

  return (
    <div>
      {news.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

## 📱 Responsive Design

پروژه با رویکرد Mobile-First طراحی شده:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🎨 Theme و Styling

- استفاده از DaisyUI themes
- Support کامل RTL
- فونت‌های فارسی بهینه‌شده
- Custom animations و transitions

## 🚦 Error Handling

- **Error Boundary**: برای مدیریت خطاهای React
- **API Error Handling**: با interceptors و toast notifications
- **Loading States**: برای تمام API calls
- **Graceful Fallbacks**: برای حالت‌های خطا

## 📊 Performance Optimization

- **Image Optimization**: lazy loading و responsive images
- **Code Splitting**: با Next.js App Router
- **Bundle Optimization**: tree shaking و minification
- **SEO Optimized**: meta tags و structured data

## 🔒 نکات امنیتی

- **Input Validation**: با React Hook Form
- **XSS Protection**: sanitization
- **HTTPS**: برای production
- **Environment Variables**: برای تنظیمات حساس

## 🚀 Production Build

```bash
# ساخت پروژه برای production
npm run build

# اجرای production build
npm start
```

## 📄 مستندات API

API endpoints مورد انتظار:

### News
- `GET /api/news` - لیست اخبار
- `GET /api/news/:id` - جزئیات خبر
- `POST /api/news/:id/view` - افزایش تعداد بازدید

### Events  
- `GET /api/events` - لیست رویدادها
- `GET /api/events/upcoming` - رویدادهای آینده
- `POST /api/events/:id/register` - ثبت نام در رویداد

### Education
- `GET /api/education` - محتوای آموزشی
- `GET /api/education/featured` - محتوای ویژه

## 🤝 مشارکت در پروژه

1. Fork کنید
2. Branch جدید بسازید: `git checkout -b feature/amazing-feature`
3. تغییرات را commit کنید: `git commit -m 'Add amazing feature'`
4. Push کنید: `git push origin feature/amazing-feature`
5. Pull Request باز کنید

## 📧 تماس و پشتیبانی

- **ایمیل**: info@abozar-isfahan.ir
- **وبسایت**: [abozar-isfahan.ir](https://abozar-isfahan.ir)

## 📝 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

# سایت جشنواره ابوذر - سازمان بسیج رسانه استان اصفهان

پلتفرمی مدرن برای آموزش، رویدادها، اخبار و مدیریت جشنواره ابوذر

## 🚀 ویژگی‌های کلیدی

- **Responsive Design**: طراحی کاملاً واکنش‌گرا برای تمام اندازه‌های صفحه
- **Modern UI/UX**: رابط کاربری مدرن با DaisyUI و Tailwind CSS
- **RTL Support**: پشتیبانی کامل از راست به چپ
- **TypeScript**: امنیت نوع‌سازی و توسعه بهتر
- **API Integration**: مدیریت یکپارچه API با Axios و احراز هویت JWT
- **Dashboard**: پنل کاربری برای مدیریت ثبت‌نام جشنواره و آثار
- **Authentication**: سیستم ورود و ثبت‌نام با توکن‌های JWT
- **Performance Optimized**: بهینه‌سازی عملکرد و SEO

## 🛠️ تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 15.5.4 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI 5.1.29
- **State Management**: Zustand با Persist middleware
- **HTTP Client**: Axios با interceptors و مدیریت خطای هوشمند
- **Notifications**: Sonner Toast
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Fonts**: ایران‌سنس، کلمه (فونت‌های محلی)

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

محتوای `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.brisf.ir/
```

4. **اجرای پروژه در محیط Development**
```bash
npm run dev
```

5. **بیلد برای Production**
```bash
npm run build
npm start
```

وب‌سایت در آدرس `http://localhost:3000` در دسترس خواهد بود.

## 🏗️ ساختار پروژه

```
src/
├── app/                     
│   ├── (public)/            # صفحات عمومی (بدون احراز هویت)
│   │   ├── page.tsx         # صفحه اصلی
│   │   ├── about/           # درباره ما
│   │   ├── contact/         # تماس با ما
│   │   ├── education/       # آموزش
│   │   ├── events/          # رویدادها
│   │   ├── news/            # اخبار
│   │   ├── login/           # ورود
│   │   └── register/        # ثبت‌نام
│   ├── (dashboard)/         # پنل کاربری (نیاز به احراز هویت)
│   │   └── dashboard/
│   │       ├── page.tsx             # داشبورد اصلی و آمار
│   │       ├── profile/             # پروفایل کاربر
│   │       └── festival-registration/
│   │           ├── page.tsx         # لیست ثبت‌نام‌های جشنواره
│   │           ├── [id]/            # جزئیات ثبت‌نام
│   │           └── new/             # ثبت‌نام جدید
│   ├── globals.css          # استایل‌های سراسری
│   └── layout.tsx           # Layout اصلی
├── components/              
│   ├── auth/                # کامپوننت‌های احراز هویت
│   │   └── AuthGuard.tsx    # محافظ مسیرها
│   ├── layout/              # کامپوننت‌های layout
│   ├── ui/                  # کامپوننت‌های UI قابل استفاده مجدد
│   ├── Footer.tsx           
│   └── Navbar.tsx           
├── services/                # سرویس‌های API
│   ├── account.service.ts   # سرویس حساب کاربری
│   ├── festival.service.ts  # سرویس جشنواره
│   └── api.ts               # سرویس‌های عمومی
├── store/                   # Zustand Store
│   └── useAuthStore.ts      # مدیریت احراز هویت
├── lib/                     
│   ├── axios.ts             # پیکربندی Axios با interceptors
│   └── local_fonts.ts       # فونت‌های محلی
├── types/                   
│   └── api.ts               # تایپ‌های TypeScript
└── constants/               
    └── cities.ts            # داده‌های ثابت
```

## 🔐 احراز هویت و امنیت

### جریان احراز هویت
1. کاربر با شماره موبایل و رمز عبور وارد می‌شود
2. Backend توکن‌های JWT (`access` و `refresh`) برمی‌گرداند
3. توکن‌ها در localStorage و Zustand store ذخیره می‌شوند
4. Axios interceptor به‌صورت خودکار توکن را به هدر درخواست‌ها اضافه می‌کند
5. در صورت 401، کاربر به صفحه لاگین هدایت می‌شود

### API Endpoints اصلی
- `POST /account/login/` - ورود کاربر
- `POST /account/register/` - ثبت‌نام کاربر
- `POST /account/verify/` - اعتبارسنجی توکن
- `GET /account/me/` - دریافت پروفایل کاربر
- `GET /festival/my-statistics/` - آمار داشبورد
- `GET /festival/my-registrations/` - لیست ثبت‌نام‌های جشنواره
- `POST /festival/registration/` - ثبت‌نام در جشنواره
- `POST /festival/work/` - ثبت اثر جدید

## 🔧 API Integration

### نحوه استفاده از سرویس‌ها

```typescript
// مثال: دریافت آمار داشبورد
import { festivalService } from '@/services';

const stats = await festivalService.getMyStatistics();

// مثال: ثبت اثر جدید با فایل
const workData = {
  festival_registration: registrationId,
  title: 'عنوان اثر',
  description: 'توضیحات',
  file: fileObject // File object
};

await festivalService.createWork(workData);
```

## 📱 Responsive Design

- **Mobile-First**: طراحی با رویکرد موبایل اول
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Testing**: تست شده روی دستگاه‌های مختلف

## 🎨 Theme و Styling

- **DaisyUI Themes**: پشتیبانی از حالت روشن/تاریک
- **RTL Support**: پشتیبانی کامل راست‌چین
- **Custom Fonts**: ایران‌سنس، کلمه
- **Animations**: Smooth transitions با Framer Motion

## 🚦 مدیریت خطا

- **Error Boundary**: گرفتن خطاهای React
- **API Errors**: مدیریت و نمایش خطاهای API با Toast
- **Loading States**: نمایش وضعیت بارگذاری
- **401 Handling**: هدایت خودکار به صفحه لاگین

## 🚀 بیلد Production

```bash
# ساخت بیلد بهینه‌شده
npm run build

# اجرا در حالت production
npm start
```

بیلد production شامل:
- Minification و compression
- Tree shaking
- Image optimization
- Code splitting

## 📝 مستندات

برای مستندات کامل API و راهنمای توسعه به فایل `API_INTEGRATION.md` مراجعه کنید.

## 🤝 مشارکت

برای مشارکت در پروژه:
1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/AmazingFeature`)
3. تغییرات را commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Push به branch (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

## 📄 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 👥 تیم توسعه

سازمان بسیج رسانه استان اصفهان

---

**نسخه**: 1.0.0  
**آخرین به‌روزرسانی**: دی 1403

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

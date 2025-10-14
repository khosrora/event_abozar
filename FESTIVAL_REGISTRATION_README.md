# سیستم مدیریت ثبت‌نام جشنواره

این بخش شامل صفحات و قابلیت‌های مربوط به مدیریت ثبت‌نام‌های جشنواره و ارسال آثار است.

## 📁 ساختار فایل‌ها

```
src/
├── app/
│   └── (dashboard)/
│       └── dashboard/
│           └── festival-registration/
│               ├── page.tsx                    # لیست ثبت‌نام‌های جشنواره
│               ├── new/
│               │   └── page.tsx                # فرم ثبت‌نام جدید در جشنواره
│               └── [id]/
│                   ├── page.tsx                # جزئیات ثبت‌نام
│                   ├── submit-work/
│                   │   └── page.tsx            # ارسال اثر
│                   └── works/
│                       └── page.tsx            # لیست آثار ارسال شده
├── services/
│   └── festivalService.ts                      # سرویس API جشنواره
└── constants/
    └── index.ts                                 # ثابت‌های جشنواره
```

## 🎯 قابلیت‌ها

### 1️⃣ لیست ثبت‌نام‌های جشنواره
**مسیر:** `/dashboard/festival-registration`

- نمایش لیست تمام ثبت‌نام‌های کاربر
- نمایش وضعیت هر ثبت‌نام (در انتظار بررسی / تایید شده / رد شده)
- دکمه ارسال اثر برای ثبت‌نام‌های تایید شده
- دکمه مشاهده آثار برای ثبت‌نام‌هایی که اثر دارند
- دکمه ثبت‌نام جدید

### 2️⃣ ثبت‌نام جدید در جشنواره
**مسیر:** `/dashboard/festival-registration/new`

#### فیلدهای فرم:
- **اطلاعات شخصی:**
  - نام و نام خانوادگی (الزامی)
  - نام پدر (الزامی)
  - کد ملی (الزامی - با اعتبارسنجی)
  - جنسیت (الزامی)
  - تحصیلات (الزامی - با قابلیت جستجو)
  - شماره تماس (الزامی - 11 رقمی)
  - شماره مجازی (اختیاری)
  - استان (الزامی - با قابلیت جستجو)
  - شهر (الزامی - بسته به استان انتخاب شده)

- **اطلاعات جشنواره:**
  - نام رسانه (الزامی)
  - قالب جشنواره (الزامی): ویدئو، عکس، اینفوگرافیک، پادکست، متن
  - محور جشنواره (الزامی): مقاومت، شهدا، دفاع مقدس، بسیج، امام و رهبری، انقلاب اسلامی
  - بخش‌های ویژه (اختیاری): روایت پیشرفت، روایت میدان در جنگ ۱۲ روزه

#### Validations:
- کد ملی با الگوریتم استاندارد ایران
- شماره موبایل 11 رقمی با فرمت `09XXXXXXXXX`
- تمام فیلدهای الزامی

### 3️⃣ ارسال اثر
**مسیر:** `/dashboard/festival-registration/[id]/submit-work`

#### ویژگی‌ها:
- **آپلود فایل با محدودیت حجم:**
  - ویدئو: حداکثر 100 مگابایت
  - تصویر: حداکثر 10 مگابایت

- **فرمت‌های پشتیبانی شده:**
  - ویدئو: MP4, MPEG, QuickTime, AVI, MKV
  - تصویر: JPEG, JPG, PNG, GIF, WEBP

- **فیلدهای فرم:**
  - عنوان اثر (الزامی)
  - توضیحات (الزامی)
  - فایل (الزامی)

- **قابلیت‌های اضافی:**
  - پیش‌نمایش تصویر
  - نمایش اطلاعات فایل (نام، حجم، نوع)
  - نوار پیشرفت آپلود
  - اعتبارسنجی فایل (نوع و حجم)

### 4️⃣ لیست آثار ارسال شده
**مسیر:** `/dashboard/festival-registration/[id]/works`

#### نمایش اطلاعات:
- عنوان و توضیحات اثر
- نوع فایل (ویدئو/تصویر)
- حجم فایل
- تاریخ ارسال
- وضعیت (در انتظار بررسی / تایید شده / رد شده)
- دلیل رد (در صورت رد شدن)

#### اقدامات:
- مشاهده فایل
- دانلود فایل
- ارسال اثر جدید

### 5️⃣ جزئیات ثبت‌نام
**مسیر:** `/dashboard/festival-registration/[id]`

#### نمایش اطلاعات:
- **اطلاعات شخصی:**
  - نام و نام خانوادگی، نام پدر، کد ملی
  - جنسیت، تحصیلات
  - شماره تماس، شماره مجازی
  - استان و شهر

- **اطلاعات جشنواره:**
  - نام رسانه
  - قالب و محور جشنواره
  - بخش ویژه
  - تاریخ ثبت‌نام
  - تعداد آثار ارسالی

#### اقدامات:
- ارسال اثر (برای ثبت‌نام‌های تایید شده)
- مشاهده آثار (اگر اثری وجود داشته باشد)

## 🔌 API Endpoints (Placeholder)

تمام endpoint های API به صورت placeholder در فایل `src/services/festivalService.ts` قرار دارند:

```typescript
// لیست ثبت‌نام‌ها
GET /api/festival/registrations/

// ثبت‌نام جدید
POST /api/festival/register/

// جزئیات ثبت‌نام
GET /api/festival/registrations/:id/

// ارسال اثر
POST /api/festival/works/submit/
Content-Type: multipart/form-data

// لیست آثار یک ثبت‌نام
GET /api/festival/registrations/:id/works/

// حذف اثر
DELETE /api/festival/works/:id/

// ویرایش ثبت‌نام
PUT /api/festival/registrations/:id/

// لغو ثبت‌نام
DELETE /api/festival/registrations/:id/
```

## 📝 نحوه استفاده از API ها

### مثال ثبت‌نام جدید:
```typescript
import festivalApi from '@/services/festivalService';

const data = {
  full_name: "علی احمدی",
  father_name: "محمد",
  national_id: "1234567890",
  gender: "male",
  education: "کارشناسی",
  phone_number: "09123456789",
  virtual_number: "09331234567",
  province_id: 1,
  city_id: 10,
  media_name: "پایگاه خبری نمونه",
  festival_format: "video",
  festival_topic: "resistance",
  special_section: "progress_narrative"
};

const result = await festivalApi.registerForFestival(data);
```

### مثال آپلود اثر با نمایش پیشرفت:
```typescript
import festivalApi from '@/services/festivalService';

const formData = new FormData();
formData.append("registration_id", "123");
formData.append("title", "عنوان اثر");
formData.append("description", "توضیحات اثر");
formData.append("file", file);

const result = await festivalApi.submitWork(formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 1)
    );
    console.log(`آپلود: ${percentCompleted}%`);
  }
});
```

## 🎨 UI Components استفاده شده

- **DaisyUI Components:**
  - Card
  - Badge
  - Button
  - Input
  - Select
  - Textarea
  - Alert
  - Progress
  - Loading Spinner
  - Dropdown (Autocomplete)

- **React Hook Form:** مدیریت فرم‌ها و validation
- **Sonner Toast:** نمایش پیام‌های موفقیت/خطا
- **Next.js Router:** مدیریت مسیرها

## 📋 Types

```typescript
// داده‌های ثبت‌نام
interface FestivalRegistrationData {
  full_name: string;
  father_name: string;
  national_id: string;
  gender: "male" | "female";
  education: string;
  phone_number: string;
  virtual_number?: string;
  province_id: number;
  city_id: number;
  media_name: string;
  festival_format: string;
  festival_topic: string;
  special_section?: string;
}

// اطلاعات ثبت‌نام
interface FestivalRegistration {
  id: number;
  festival_name: string;
  status: "pending" | "approved" | "rejected";
  registered_at: string;
  works_count: number;
  can_submit_work: boolean;
}

// اطلاعات اثر
interface Work {
  id: number;
  title: string;
  description: string;
  file_url: string;
  file_type: "video" | "image";
  file_size: number;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  rejection_reason?: string;
}
```

## 🔐 Authentication

تمام صفحات این بخش با `AuthGuard` محافظت شده‌اند و فقط کاربران لاگین شده می‌توانند به آن‌ها دسترسی داشته باشند.

## ✅ TODO: پیاده‌سازی API ها

برای فعال‌سازی کامل این بخش، باید:

1. در فایل `src/services/festivalService.ts` خطوط کامنت شده را از کامنت خارج کنید
2. endpoint های API را با آدرس‌های واقعی جایگزین کنید
3. تست کنید تا مطمئن شوید response ها با type های تعریف شده مطابقت دارند

## 🚀 نکات مهم

- تمام validationها در سمت کلاینت پیاده‌سازی شده‌اند
- آپلود فایل با `FormData` و `multipart/form-data` انجام می‌شود
- حجم فایل‌ها قبل از ارسال بررسی می‌شود
- برای ویدئوها پیش‌نمایش نمایش داده نمی‌شود (فقط تصاویر)
- تمام تاریخ‌ها به فرمت فارسی نمایش داده می‌شوند

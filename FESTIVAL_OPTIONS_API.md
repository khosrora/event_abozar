# Festival Options API - مستندات API گزینه‌های جشنواره

## 📋 خلاصه تغییرات

در این به‌روزرسانی، داده‌های استاتیک قالب‌ها، محورها و بخش‌های ویژه جشنواره از فرانت‌اند حذف شده و به API منتقل شده‌اند.

## 🔌 API Endpoints جدید

### 1. دریافت لیست قالب‌های جشنواره
```
GET /festival/formats/
```

**Response:**
```json
[
  {
    "id": 1,
    "code": "news_report",
    "name": "گزارش خبری",
    "description": "توضیحات قالب گزارش خبری"
  },
  {
    "id": 2,
    "code": "interview",
    "name": "مصاحبه",
    "description": "توضیحات قالب مصاحبه"
  },
  ...
]
```

**قالب‌های پیشنهادی:**
- `news_report` - گزارش خبری
- `interview` - مصاحبه
- `editorial` - یادداشت و سرمقاله
- `headline` - تیتر
- `infographic` - اینفوگرافی
- `motion_graphic` - موشن گرافی
- `photo` - عکس
- `video_clip` - کلیپ و گزارش ویدیویی
- `documentary` - مستند
- `podcast` - پادکست

### 2. دریافت لیست محورهای جشنواره
```
GET /festival/topics/
```

**Response:**
```json
[
  {
    "id": 1,
    "code": "year_slogan",
    "name": "شعار سال",
    "description": "توضیحات محور شعار سال"
  },
  {
    "id": 2,
    "code": "jihad_explanation",
    "name": "جهاد تبیین",
    "description": "توضیحات محور جهاد تبیین"
  },
  ...
]
```

**محورهای پیشنهادی:**
- `year_slogan` - شعار سال
- `jihad_explanation` - جهاد تبیین
- `media_industry` - پیوند رسانه و صنعت
- `social_harms` - مقابله با آسیب‌های اجتماعی
- `revolution_achievements` - دستاوردهای انقلاب اسلامی
- `basij_action` - بسیج و حوزه‌های اقدام
- `hope_happiness` - امید و نشاط آفرینی
- `family_society` - خانواده، جامعه و فرزندآوری
- `islamic_lifestyle` - سبک زندگی ایرانی اسلامی
- `sacrifice_martyrdom` - ایثار و شهادت
- `water_electricity_saving` - صرفه‌جویی در مصرف آب و برق

### 3. دریافت لیست بخش‌های ویژه جشنواره
```
GET /festival/special-sections/
```

**Response:**
```json
[
  {
    "id": 1,
    "code": "progress_narrative",
    "name": "روایت پیشرفت",
    "description": "توضیحات بخش روایت پیشرفت"
  },
  {
    "id": 2,
    "code": "field_narrative_12days",
    "name": "روایت میدان در جنگ ۱۲ روزه",
    "description": "توضیحات بخش روایت میدان"
  }
]
```

**بخش‌های ویژه پیشنهادی:**
- `progress_narrative` - روایت پیشرفت
- `field_narrative_12days` - روایت میدان در جنگ ۱۲ روزه

## 📝 تغییرات در ثبت‌نام جشنواره

### Request به `/festival/registration/`

هنگام ثبت‌نام، باید **code** (نه id) ارسال شود:

```json
{
  "full_name": "علی احمدی",
  "father_name": "محمد",
  "national_id": "1234567890",
  "gender": "male",
  "education": "کارشناسی",
  "phone_number": "09123456789",
  "virtual_number": "09331234567",
  "province_id": 1,
  "city_id": 10,
  "media_name": "پایگاه خبری نمونه",
  "festival_format": "video_clip",           // ⬅️ code از endpoint formats
  "festival_topic": "year_slogan",           // ⬅️ code از endpoint topics
  "special_section": "progress_narrative"    // ⬅️ code از endpoint special-sections (optional)
}
```

### Response از `/festival/my-registrations-list/`

در پاسخ لیست ثبت‌نام‌ها، فیلدهای `festival_format`، `festival_topic` و `special_section` باید به صورت object برگردانده شوند:

```json
[
  {
    "id": 1,
    "full_name": "علی احمدی",
    "gender": "male",
    "phone_number": "09123456789",
    "province": {
      "id": 1,
      "name": "تهران"
    },
    "city": {
      "id": 10,
      "name": "تهران"
    },
    "media_name": "پایگاه خبری نمونه",
    "festival_format": {
      "id": 8,
      "code": "video_clip",
      "name": "کلیپ و گزارش ویدیویی",
      "description": "..."
    },
    "festival_topic": {
      "id": 1,
      "code": "year_slogan",
      "name": "شعار سال",
      "description": "..."
    },
    "special_section": {
      "id": 1,
      "code": "progress_narrative",
      "name": "روایت پیشرفت",
      "description": "..."
    },
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

### Response از `/festival/my-registrations-detail/{id}/`

جزئیات ثبت‌نام نیز باید به همین صورت object برگرداند:

```json
{
  "id": 1,
  "full_name": "علی احمدی",
  "father_name": "محمد",
  "national_id": "1234567890",
  "gender": "male",
  "education": "کارشناسی",
  "phone_number": "09123456789",
  "virtual_number": "09331234567",
  "province": {
    "id": 1,
    "name": "تهران"
  },
  "city": {
    "id": 10,
    "name": "تهران"
  },
  "media_name": "پایگاه خبری نمونه",
  "festival_format": {
    "id": 8,
    "code": "video_clip",
    "name": "کلیپ و گزارش ویدیویی",
    "description": "..."
  },
  "festival_topic": {
    "id": 1,
    "code": "year_slogan",
    "name": "شعار سال",
    "description": "..."
  },
  "special_section": {
    "id": 1,
    "code": "progress_narrative",
    "name": "روایت پیشرفت",
    "description": "..."
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## 🔧 تغییرات فرانت‌اند

### فایل‌های تغییر یافته:

1. **`src/types/api.ts`**
   - اضافه شدن `FestivalOption`, `FestivalFormat`, `FestivalTopic`, `FestivalSpecialSection`
   - به‌روزرسانی `FestivalRegistrationData`
   - به‌روزرسانی `FestivalRegistrationListItem`
   - به‌روزرسانی `FestivalRegistrationDetail`

2. **`src/services/festival.service.ts`**
   - اضافه شدن `getFormats()`
   - اضافه شدن `getTopics()`
   - اضافه شدن `getSpecialSections()`

3. **`src/app/(dashboard)/dashboard/festival-registration/new/page.tsx`**
   - استفاده از API برای دریافت options
   - ارسال `code` به جای label در فرم

4. **`src/app/(dashboard)/dashboard/festival-registration/page.tsx`**
   - پشتیبانی از نمایش هر دو فرمت string و object

5. **`src/app/(dashboard)/dashboard/festival-registration/[id]/page.tsx`**
   - پشتیبانی از نمایش هر دو فرمت string و object

## ✅ نکات مهم برای بک‌اند

1. **Code باید unique باشد** - هر کد باید در دیتابیس unique باشد
2. **هنگام ثبت‌نام، code ارسال می‌شود** - نه id و نه name
3. **در پاسخ‌ها، object کامل برگردانده شود** - شامل id, code, name, description
4. **فیلد description اختیاری است** - می‌تواند خالی باشد اما باید در response وجود داشته باشد
5. **special_section اختیاری است** - می‌تواند null یا خالی باشد
6. **Backward compatibility** - فرانت‌اند هم از string و هم از object پشتیبانی می‌کند

## 🧪 تست API

### تست دریافت قالب‌ها:
```bash
curl -X GET https://api.brisf.ir/festival/formats/
```

### تست دریافت محورها:
```bash
curl -X GET https://api.brisf.ir/festival/topics/
```

### تست دریافت بخش‌های ویژه:
```bash
curl -X GET https://api.brisf.ir/festival/special-sections/
```

### تست ثبت‌نام:
```bash
curl -X POST https://api.brisf.ir/festival/registration/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "full_name": "علی احمدی",
    "father_name": "محمد",
    "national_id": "1234567890",
    "gender": "male",
    "education": "کارشناسی",
    "phone_number": "09123456789",
    "province_id": 1,
    "city_id": 10,
    "media_name": "پایگاه خبری نمونه",
    "festival_format": "video_clip",
    "festival_topic": "year_slogan",
    "special_section": "progress_narrative"
  }'
```

## 📚 منابع

- [API Integration Documentation](./API_INTEGRATION.md)
- [Backend Requirements](./BACKEND_REQUIREMENTS.md)
- [Festival Registration README](./FESTIVAL_REGISTRATION_README.md)

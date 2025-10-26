# راهنمای استفاده از فیلد publish_link

## توضیح

فیلد `publish_link` برای ذخیره‌سازی لینک منتشرشده برای محتوای News، Events، و Education استفاده می‌شود. این فیلد می‌تواند لینک به سایت خارجی یا هر منبع دیگری باشد.

## مدل‌های تأثیرپذیر

### 1. News Model (خبر)
```python
class News(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(...)
    publish_date = models.DateTimeField(...)
    publish_link = models.URLField(null=True, blank=True)  # ✅ اضافه کنید
    tags = models.JSONField(...)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### 2. Event Model (رویداد)
```python
class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(...)
    publish_date = models.DateTimeField(...)
    publish_link = models.URLField(null=True, blank=True)  # ✅ اضافه کنید
    tags = models.JSONField(...)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### 3. Education Model (آموزش)
```python
class Education(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(...)
    video = models.URLField(null=True, blank=True)
    document = models.FileField(...)
    publish_date = models.DateTimeField(...)
    publish_link = models.URLField(null=True, blank=True)  # ✅ اضافه کنید
    tags = models.JSONField(...)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

## Migration مورد نیاز

```bash
python manage.py makemigrations
python manage.py migrate
```

## استفاده در Admin

```python
@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'publish_date', 'publish_link']
    fields = ['title', 'description', 'image', 'publish_date', 'publish_link', 'tags']
```

## Frontend Integration

### Type Definitions (✅ قبلاً به‌روزرسانی شده)

فیلد `publish_link` به انواع زیر اضافه شده‌است:
- `News` interface
- `NewsList` interface  
- `Event` interface
- `EventList` interface
- `EducationContent` interface

### API Response مثال

```json
{
  "id": 1,
  "title": "عنوان خبر",
  "description": "توضیحات",
  "image": "/media/news/image.jpg",
  "publish_date": "2025-10-26T10:00:00Z",
  "publish_link": "https://example.com/article",
  "tags": ["تکنولوژی"],
  "created_at": "2025-10-26T10:00:00Z",
  "updated_at": "2025-10-26T10:00:00Z"
}
```

## Lightbox برای تصاویر (✅ اجرا شده)

کامپوننت `ImageLightbox` اضافه شده است که:
- ✅ تصاویر را در صفحات جزئیات (detail pages) قابل‌کلیک می‌کند
- ✅ هنگام کلیک، تصویر با اندازه واقعیش در یک modal نمایش داده می‌شود
- ✅ کاربر می‌تواند با کلیک روی X یا خارج modal آن را ببندد
- ✅ برای News، Events، و Education کار می‌کند

## ساختار Lightbox

```
Image (Clickable)
    ↓ (onClick)
Modal with full-size image
    - Close button (X)
    - Image alt text
    - Click outside to close
```

## وظایفی که باقی‌مانده

### Backend (Django)
1. ✅ تعریف فیلد `publish_link` در مدل‌ها
2. ✅ Migration ایجاد و اجرا
3. ✅ Admin panel به‌روزرسانی (optional)

### Frontend (Next.js)
- ✅ Type definitions به‌روزرسانی شده
- ✅ Lightbox component ایجاد شده
- ✅ DetailPageLayout به‌روزرسانی شده

## خلاصه تغییرات Frontend

| فایل | تغییر | وضعیت |
|------|-------|--------|
| `src/types/api.ts` | اضافه‌کردن `publish_link` فیلد | ✅ تکمیل |
| `src/components/ui/ImageLightbox.tsx` | کامپوننت جدید Lightbox | ✅ تکمیل |
| `src/components/layout/DetailPageLayout.tsx` | استفاده از ImageLightbox | ✅ تکمیل |
| `src/components/ui/index.ts` | Export ImageLightbox | ✅ تکمیل |

## نکات مهم

⚠️ **برای ذخیره‌سازی `publish_link`:**
1. فیلد را به Django models اضاف کنید
2. Migration ایجاد و اجرا کنید
3. API خودکار شامل این فیلد خواهد شد

⚠️ **Lightbox فقط در صفحات جزئیات کار می‌کند:**
- `/news/[id]`
- `/events/[id]`
- `/education/[id]`

## تست Lightbox

1. به صفحه جزئیات خبر/رویداد/آموزش بروید
2. بر روی تصویر کلیک کنید
3. تصویر با اندازه واقعی باید در modal ظاهر شود
4. برای بستن، روی X کلیک کنید یا خارج modal کلیک کنید

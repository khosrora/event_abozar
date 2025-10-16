# تغییرات Base URL API

## 📍 آدرس جدید API

**Base URL**: `https://api.brisf.ir/`

## 📝 فایل‌های به‌روزرسانی شده

### 1. `src/lib/axios.ts`
- ✅ Base URL به `https://api.brisf.ir/` تغییر کرد
- Default fallback برای زمانی که environment variable تنظیم نشده

### 2. `.env.local`
```bash
NEXT_PUBLIC_API_URL=https://api.brisf.ir/
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### 3. `.env.example`
- ✅ به‌روزرسانی شده با آدرس جدید
- راهنما برای سایر توسعه‌دهندگان

### 4. `README.md`
- ✅ بخش تنظیمات API به‌روزرسانی شد
- مستندات نصب و راه‌اندازی

### 5. `API_INTEGRATION.md`
- ✅ مستندات فنی با آدرس جدید

### 6. `TESTING_GUIDE.md`
- ✅ راهنمای تست با آدرس جدید

## 🔧 نحوه استفاده

### حالت Production (پیش‌فرض)
```bash
# تنظیم .env.local
NEXT_PUBLIC_API_URL=https://api.brisf.ir/
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### حالت Development با Mock Data
```bash
# برای تست بدون نیاز به سرور
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## 🚀 اجرای پروژه

```bash
# نصب وابستگی‌ها
npm install

# اجرا در حالت development
npm run dev

# ساخت برای production
npm run build
npm start
```

## 🔍 بررسی نهایی

- ✅ همه فایل‌های environment به‌روزرسانی شدند
- ✅ axios instance با آدرس جدید پیکربندی شد
- ✅ مستندات کامل به‌روزرسانی شد
- ✅ هیچ خطای کامپایلی وجود ندارد

## 📊 Endpoints موجود

تمام endpoint‌ها اکنون از این base URL استفاده می‌کنند:

### Account
- `GET /account/me/` - دریافت پروفایل
- `PUT /account/me/` - بروزرسانی پروفایل

### Festival
- `GET /festival/my-statistics/` - آمار داشبورد
- `GET /festival/my-registrations-list/` - لیست ثبت‌نام‌ها
- `GET /festival/my-registrations-detail/{id}/` - جزئیات ثبت‌نام
- `GET /festival/works/by-festival/{festival_id}/` - لیست آثار
- `POST /festival/works/` - ارسال اثر جدید
- `PUT /festival/works/{id}/` - بروزرسانی اثر
- `DELETE /festival/works/{id}/` - حذف اثر

## ⚠️ نکات مهم

1. **Token Management**: توکن‌ها در localStorage با کلید `authToken` ذخیره می‌شوند
2. **CORS**: اطمینان حاصل کنید که سرور CORS را برای این domain مجاز کرده است
3. **HTTPS**: برای production استفاده از HTTPS توصیه می‌شود
4. **Error Handling**: تمام خطاهای 401 به صفحه login هدایت می‌شوند

## 🔐 Authentication

تمام درخواست‌ها به صورت خودکار شامل header زیر هستند:
```
Authorization: Bearer {token}
```

---

**آدرس کامل سرور**: https://api.brisf.ir/

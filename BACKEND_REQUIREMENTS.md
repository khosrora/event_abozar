# 🔧 نیازمندی‌های Backend برای احراز هویت

## 📋 خلاصه

Frontend از سیستم JWT با قابلیت Automatic Token Refresh استفاده می‌کند. Backend باید این تنظیمات رو داشته باشه.

---

## ⚙️ تنظیمات مورد نیاز

### 1️⃣ **JWT Settings (Django Simple JWT)**

```python
# settings.py
from datetime import timedelta

SIMPLE_JWT = {
    # ⏱️ عمر توکن‌ها
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),        # ✅ 1 روز (24 ساعت)
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),       # ✅ 7 روز
    
    # 🔄 Token Rotation
    'ROTATE_REFRESH_TOKENS': True,                     # Refresh token جدید در هر refresh
    'BLACKLIST_AFTER_ROTATION': True,                  # Blacklist کردن token قدیمی
    
    # 🔐 امنیت
    'UPDATE_LAST_LOGIN': True,                         # آپدیت last_login
    'ALGORITHM': 'HS256',                              # الگوریتم رمزنگاری
    'SIGNING_KEY': SECRET_KEY,                         # کلید امضا
    
    # 📝 Token Claims
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

# 🗑️ Token Blacklist (اختیاری اما توصیه می‌شود)
INSTALLED_APPS = [
    ...
    'rest_framework_simplejwt.token_blacklist',
]
```

---

## 🌐 API Endpoints مورد نیاز

### 1. Login
```http
POST /account/login/
Content-Type: application/json

Request:
{
  "phone": "09123456789",
  "password": "MySecurePassword123"
}

Response (200 OK):
{
  "message": "ورود با موفقیت انجام شد",
  "user": {
    "id": 1,
    "fullName": "علی احمدی",
    "phone": "09123456789",
    "is_active": true,
    "is_staff": false,
    "is_superuser": false,
    "last_login": "2025-10-14T10:30:00Z"
  },
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Response (400 Bad Request):
{
  "message": "نام کاربری یا رمز عبور اشتباه است"
}
```

### 2. Register
```http
POST /account/register/
Content-Type: application/json

Request:
{
  "full_name": "علی احمدی",
  "phone": "09123456789",
  "password": "MySecurePassword123"
}

Response (201 Created):
{
  "message": "ثبت‌نام با موفقیت انجام شد",
  "user": {
    "id": 1,
    "fullName": "علی احمدی",
    "phone": "09123456789",
    "is_active": true,
    "is_staff": false,
    "is_superuser": false
  },
  "tokens": {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Response (400 Bad Request):
{
  "message": "این شماره موبایل قبلاً ثبت شده است"
}
```

### 3. Refresh Token ⭐ (مهم!)
```http
POST /account/refresh/
Content-Type: application/json

Request:
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response (200 OK):
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // اگر ROTATE_REFRESH_TOKENS فعال باشه
}

Response (401 Unauthorized):
{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
```

### 4. Get Profile
```http
GET /account/me/
Authorization: Bearer <access_token>

Response (200 OK):
{
  "id": 1,
  "fullName": "علی احمدی",
  "phone": "09123456789",
  "is_active": true,
  "is_staff": false,
  "is_superuser": false,
  "last_login": "2025-10-14T10:30:00Z"
}

Response (401 Unauthorized):
{
  "detail": "Authentication credentials were not provided."
}
```

### 5. Update Profile
```http
PUT /account/me/
Authorization: Bearer <access_token>
Content-Type: application/json

Request:
{
  "fullName": "علی احمدی جدید"
}

Response (200 OK):
{
  "id": 1,
  "fullName": "علی احمدی جدید",
  "phone": "09123456789",
  ...
}
```

---

## 🔒 امنیت

### CORS Settings
```python
# settings.py

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",      # Development
    "https://yourdomain.com",     # Production
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'authorization',
    'content-type',
]
```

### Authentication Classes
```python
# settings.py

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
```

---

## 🧪 تست Endpoints

### Test با cURL

```bash
# 1. Login
curl -X POST http://78.157.40.195/account/login/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "09123456789", "password": "test123"}'

# 2. Refresh Token
curl -X POST http://78.157.40.195/account/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "YOUR_REFRESH_TOKEN"}'

# 3. Get Profile
curl -X GET http://78.157.40.195/account/me/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Test با Python
```python
import requests

BASE_URL = "http://78.157.40.195"

# Login
response = requests.post(
    f"{BASE_URL}/account/login/",
    json={"phone": "09123456789", "password": "test123"}
)
data = response.json()
access_token = data["tokens"]["access"]
refresh_token = data["tokens"]["refresh"]

# Refresh
response = requests.post(
    f"{BASE_URL}/account/refresh/",
    json={"refresh": refresh_token}
)
new_access_token = response.json()["access"]

# Get Profile
response = requests.get(
    f"{BASE_URL}/account/me/",
    headers={"Authorization": f"Bearer {new_access_token}"}
)
print(response.json())
```

---

## 📊 Database Schema

### User Model
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = None  # حذف username
    email = None     # حذف email (اختیاری)
    
    phone = models.CharField(max_length=11, unique=True)
    full_name = models.CharField(max_length=255)
    
    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['full_name']
    
    def __str__(self):
        return self.phone
```

---

## ✅ Checklist برای Backend Team

- [ ] Simple JWT نصب و پیکربندی شده
- [ ] Access Token: 1 روز
- [ ] Refresh Token: 7 روز
- [ ] Token Rotation فعال
- [ ] Blacklist فعال
- [ ] Endpoint `/account/login/` کار می‌کنه
- [ ] Endpoint `/account/register/` کار می‌کنه
- [ ] Endpoint `/account/refresh/` کار می‌کنه ⭐
- [ ] Endpoint `/account/me/` (GET) کار می‌کنه
- [ ] Endpoint `/account/me/` (PUT) کار می‌کنه
- [ ] CORS تنظیم شده
- [ ] Response format مطابق مستندات
- [ ] Error handling درست
- [ ] Phone به عنوان username استفاده می‌شه

---

## 🚨 مشکلات رایج

### مشکل 1: Refresh endpoint 404 می‌ده
```python
# urls.py
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('account/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

### مشکل 2: Token expire نمی‌شه
```python
# بررسی کنید timedelta درست تنظیم شده:
ACCESS_TOKEN_LIFETIME = timedelta(days=1)  # نه timedelta(hours=24000)!
```

### مشکل 3: CORS error
```python
# CORS headers رو چک کنید:
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]
```

---

## 📞 تماس با تیم Frontend

اگه سوالی دارید یا نیاز به هماهنگی بیشتر:
- مستندات Frontend: `AUTHENTICATION.md`
- کد Frontend: `src/lib/axios.ts`
- Auth Store: `src/store/useAuthStore.ts`

---

## 🎯 Summary

**تنظیمات نهایی تایید شده:**
- ✅ Access Token: **1 روز**
- ✅ Refresh Token: **7 روز**
- ✅ Auto Refresh: فعال در Frontend
- ✅ Token Rotation: توصیه می‌شود
- ✅ Endpoint: `POST /account/refresh/`

# 🔐 سیستم احراز هویت و مدیریت نشست

## 📋 خلاصه

این پروژه از سیستم JWT (JSON Web Token) با قابلیت **Refresh Token** استفاده می‌کند که نشست کاربری را به صورت خودکار تمدید می‌کند.

---

## ⚙️ نحوه کار

### 1️⃣ **Login / Register**
```
کاربر → ورود/ثبت‌نام → دریافت Access Token (کوتاه‌مدت) + Refresh Token (بلندمدت)
```

### 2️⃣ **Access Token Expiry**
وقتی Access Token منقضی می‌شه (بعد از 1 روز):
```
API Request → 401 Unauthorized → 
  Axios Interceptor → استفاده از Refresh Token →
    دریافت Access Token جدید → تکرار درخواست اصلی
```

### 3️⃣ **Automatic Session Extension**
- نشست کاربر به صورت **خودکار** تمدید می‌شه
- کاربر نیازی به login مجدد نداره
- تا 7 روز می‌تونه بدون login مجدد کار کنه

---

## 🔧 پیکربندی

### Backend Requirements

Backend باید این endpoints رو پشتیبانی کنه:

#### 1. Login
```http
POST /account/login/
Content-Type: application/json

{
  "phone": "09123456789",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { ... },
  "tokens": {
    "access": "eyJ...",  // کوتاه‌مدت (1 روز)
    "refresh": "eyJ..." // بلندمدت (7 روز)
  }
}
```

#### 2. Refresh Token
```http
POST /account/refresh/
Content-Type: application/json

{
  "refresh": "eyJ..."
}

Response:
{
  "access": "eyJ..."  // Access Token جدید
}
```

---

## 📊 Token Lifecycle

```
┌─────────────────┐
│   User Login    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Store Access + Refresh     │
│  - localStorage             │
│  - Zustand Store            │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│   API Requests              │
│   (with Access Token)       │
└────────┬────────────────────┘
         │
         ▼
    ┌─────────┐
    │ Token   │
    │ Valid?  │
    └────┬────┘
         │
    ┌────┴────┐
    │         │
   YES       NO (401)
    │         │
    │    ┌────┴─────────────────┐
    │    │ Refresh Access Token │
    │    └────┬─────────────────┘
    │         │
    │    ┌────┴────┐
    │    │ Success?│
    │    └────┬────┘
    │         │
    │    ┌────┴────┐
    │    │         │
    │   YES       NO
    │    │         │
    │    │    ┌────┴────┐
    │    │    │ Logout  │
    │    │    │ Redirect│
    │    │    └─────────┘
    │    │
    └────┴──────┐
                │
                ▼
         ┌─────────────┐
         │  Continue   │
         └─────────────┘
```

---

## 💾 Storage Strategy

### localStorage Keys:
```javascript
// Access Tokens (همه یکی هستند - برای سازگاری)
- token
- access
- access_token

// Refresh Tokens
- refresh
- refresh_token

// Zustand Persist
- auth-storage
```

---

## 🛠️ Implementation Files

### 1. `src/lib/axios.ts`
- Axios interceptors
- Automatic token refresh
- 401 error handling

### 2. `src/store/useAuthStore.ts`
- Zustand auth state
- Login/Register/Logout
- Token persistence

### 3. `src/components/auth/AuthGuard.tsx`
- Route protection
- Redirect to login if not authenticated

---

## 🔒 Security Notes

### ✅ Best Practices:
- ✅ Access Token کوتاه‌مدت (1-2 ساعت)
- ✅ Refresh Token بلندمدت (7-30 روز)
- ✅ Refresh Token در localStorage (نه در cookie)
- ✅ Automatic token refresh before expiry
- ✅ Clear tokens on logout
- ✅ Redirect to login on refresh failure

### ⚠️ Security Considerations:
- Refresh Token را در localStorage ذخیره می‌کنیم (برای راحتی)
- برای امنیت بیشتر، می‌توان Refresh Token را در httpOnly cookie ذخیره کرد
- XSS protection: همیشه ورودی‌های کاربر را sanitize کنید

---

### 🐛 Troubleshooting

### مشکل: نشست زود منقضی می‌شه
**علت**: Access Token زود expire می‌شه  
**راه حل**: عمر Access Token در backend باید 1 روز باشه (تنظیمات فعلی پروژه ✅)

### مشکل: Refresh token کار نمی‌کنه
**علت**: Backend endpoint صحیح نیست  
**راه حل**: بررسی کنید `/account/refresh/` موجود باشه و refresh token رو قبول کنه

### مشکل: کاربر مدام logout می‌شه
**علت**: Refresh token منقضی شده یا Backend تنظیمات درستی نداره  
**راه حل**: 
- عمر Refresh Token در backend باید 7 روز باشه (تنظیمات فعلی پروژه ✅)
- بررسی کنید Backend از Simple JWT استفاده می‌کنه
- Log های Backend رو چک کنید

---

## 📞 Backend Configuration

### Django Settings (تنظیمات پروژه)

```python
# settings.py
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),        # Access token: 1 روز ✅
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),       # Refresh token: 7 روز ✅
    'ROTATE_REFRESH_TOKENS': True,                     # Refresh token جدید در هر refresh
    'BLACKLIST_AFTER_ROTATION': True,                  # Blacklist کردن refresh token قدیمی
}
```

### تنظیمات تایید شده برای این پروژه:
- ✅ **Access Token**: 1 روز (24 ساعت)
- ✅ **Refresh Token**: 7 روز
- ✅ **Auto Refresh**: فعال در Frontend
- ✅ **Endpoint**: `/account/refresh/`

---

## 🎯 تست سیستم

### Test Scenario 1: Normal Login
```
1. User logs in
2. Access token saved
3. User browses pages
4. All API calls work with access token
```

### Test Scenario 2: Token Expiry
```
1. Wait for access token to expire (or manually delete it)
2. Make an API call
3. System automatically refreshes token
4. Original API call succeeds
5. User stays logged in
```

### Test Scenario 3: Refresh Token Expiry
```
1. Wait for refresh token to expire (or manually delete it)
2. Make an API call
3. Refresh attempt fails
4. User is logged out
5. Redirected to login page
```

---

## 📝 توصیه‌های Backend

تنظیمات تایید شده برای این پروژه:

1. **Access Token**: 1 روز (24 ساعت) ✅
2. **Refresh Token**: 7 روز ✅
3. **Token Rotation**: فعال کنید (Refresh token جدید در هر refresh)
4. **Blacklisting**: Refresh token های قدیمی رو blacklist کنید
5. **Endpoint**: `/account/refresh/` با body: `{"refresh": "..."}`

---

## ✨ Features

- ✅ Automatic token refresh
- ✅ Seamless user experience (no forced logout)
- ✅ Secure token handling
- ✅ Multiple simultaneous requests during refresh
- ✅ Proper error handling
- ✅ Clean logout with token cleanup

---

## 🚀 Future Improvements

- [ ] Refresh token rotation
- [ ] Token blacklisting on logout
- [ ] Remember me functionality
- [ ] Session timeout warning
- [ ] Multiple device management

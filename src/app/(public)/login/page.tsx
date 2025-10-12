'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { validatePhoneNumber, formatPhoneNumber } from '@/utils/validation';
import { ROUTES, TOAST_MESSAGES } from '@/constants';
import useAuthStore from '@/store/useAuthStore';

interface LoginFormData {
  mobile: string;
  password: string;
  rememberMe?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  // Use our auth store
  const { login, isLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // Validate phone number
    if (!validatePhoneNumber(data.mobile)) {
      toast.error('شماره موبایل معتبر نیست');
      return;
    }

    // Login using our auth store - send phone without formatting
    const loginData = {
      phone: data.mobile, // Don't format - send as is (09xxxxxxxxx)
      password: data.password,
    };
    
    // Log data for debugging
    console.log('Login data being sent:', loginData);

    const success = await login(loginData);
    
    if (success) {
      // Store preference in appropriate storage
      const storageType = data.rememberMe ? 'localStorage' : 'sessionStorage';
      if (typeof window !== 'undefined') {
        localStorage.setItem('authStorageType', storageType);
      }
      
      router.push(ROUTES.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            ورود به حساب کاربری
          </h1>
          <p className="text-base-content/70 text-sm md:text-base">
            برای دسترسی به داشبورد و مدیریت حساب کاربری وارد شوید
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Mobile */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">شماره موبایل</span>
                </label>
                <input
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  className={`input input-bordered w-full ${errors.mobile ? 'input-error' : ''}`}
                  {...register('mobile', {
                    required: 'شماره موبایل الزامی است',
                    pattern: {
                      value: /^09[0-9]{9}$/,
                      message: 'شماره موبایل معتبر نیست',
                    },
                  })}
                  maxLength={11}
                  autoComplete="tel"
                />
                {errors.mobile && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.mobile.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">رمز عبور</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="رمز عبور خود را وارد کنید"
                    className={`input input-bordered w-full pr-12 ${errors.password ? 'input-error' : ''}`}
                    {...register('password', {
                      required: 'رمز عبور الزامی است',
                      minLength: {
                        value: 8,
                        message: 'رمز عبور باید حداقل 8 کاراکتر باشد',
                      },
                    })}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="label cursor-pointer gap-2 p-0">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-sm"
                    {...register('rememberMe')}
                  />
                  <span className="label-text">مرا به خاطر بسپار</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="link link-primary text-sm hover:link-hover"
                >
                  فراموشی رمز عبور
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    در حال ورود...
                  </>
                ) : (
                  'ورود'
                )}
              </button>
            </form>

            {/* Signup Link */}
            <div className="divider text-sm">یا</div>
            <p className="text-center text-sm text-base-content/70">
              هنوز ثبت نام نکرده‌اید؟{' '}
              <Link href={ROUTES.SIGNUP} className="link link-primary font-medium">
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href={ROUTES.HOME} className="btn btn-ghost btn-sm">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

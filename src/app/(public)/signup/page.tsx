'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { authApi } from '@/services/adaptiveApi';
import { validatePhoneNumber, formatPhoneNumber } from '@/utils/validation';
import { ROUTES, TOAST_MESSAGES } from '@/constants';
import type { SignupData } from '@/types/api';

interface SignupFormData {
  fullName: string;  // Changed to single field
  mobile: string;
  password: string;
  confirm_password: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    // Validate phone number
    if (!validatePhoneNumber(data.mobile)) {
      toast.error('شماره موبایل معتبر نیست');
      return;
    }

    if (data.password !== data.confirm_password) {
      toast.error('رمز عبور و تکرار آن یکسان نیست');
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        full_name: data.fullName,
        phone: data.mobile,
        password: data.password,
      };

      const response = await authApi.signup(signupData);
      
      // Store tokens with proper fallback
      const accessToken = response.tokens?.access || response.access;
      const refreshToken = response.tokens?.refresh || response.refresh;
      
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('access', accessToken);
        localStorage.setItem('access_token', accessToken);
      }
      
      if (refreshToken) {
        localStorage.setItem('refresh', refreshToken);
        localStorage.setItem('refresh_token', refreshToken);
      }
      
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success(TOAST_MESSAGES.SIGNUP.SUCCESS);
      router.push('/dashboard/festival-registration/new');
    } catch (error: any) {
      toast.error(error.message || 'خطا در ثبت نام. لطفا دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            عضویت
          </h1>
          <p className="text-base-content/70 text-sm md:text-base">
            برای ایجاد حساب کاربری و دسترسی به داشبورد اطلاعات خود را وارد کنید
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">نام و نام خانوادگی</span>
                </label>
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  className={`input input-bordered w-full ${errors.fullName ? 'input-error' : ''}`}
                  {...register('fullName', {
                    required: 'نام و نام خانوادگی الزامی است',
                    minLength: {
                      value: 3,
                      message: 'نام و نام خانوادگی باید حداقل 3 کاراکتر باشد',
                    },
                  })}
                />
                {errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.fullName.message}
                    </span>
                  </label>
                )}
              </div>

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
                <input
                  type="password"
                  placeholder="رمز عبور خود را وارد کنید"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  {...register('password', {
                    required: 'رمز عبور الزامی است',
                    minLength: {
                      value: 8,
                      message: 'رمز عبور باید حداقل 8 کاراکتر باشد',
                    },
                  })}
                />
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.password.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">تکرار رمز عبور</span>
                </label>
                <input
                  type="password"
                  placeholder="رمز عبور را دوباره وارد کنید"
                  className={`input input-bordered w-full ${errors.confirm_password ? 'input-error' : ''}`}
                  {...register('confirm_password', {
                    required: 'تکرار رمز عبور الزامی است',
                    validate: (value) =>
                      value === password || 'رمز عبور و تکرار آن یکسان نیست',
                  })}
                />
                {errors.confirm_password && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.confirm_password.message}
                    </span>
                  </label>
                )}
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
                    در حال ثبت نام...
                  </>
                ) : (
                  'ثبت نام'
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="divider text-sm">یا</div>
            <p className="text-center text-sm text-base-content/70">
              قبلا ثبت نام کرده‌اید؟{' '}
              <Link href={ROUTES.LOGIN} className="link link-primary font-medium">
                وارد شوید
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

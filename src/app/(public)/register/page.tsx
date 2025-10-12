"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { validatePhoneNumber, validatePassword } from "@/utils/validation";
import { testApiEndpoint, logDataShape } from "@/utils/api-debug";
import { ROUTES } from "@/constants";

type RegisterFormValues = {
  fullName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Get password value for comparison with confirmPassword
  const password = watch("password");
  
  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    // Validate phone number
    if (!validatePhoneNumber(data.phone)) {
      toast.error("شماره موبایل معتبر نیست");
      return;
    }
    
    // Validate password match
    if (data.password !== data.confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }
    
    // Validate password complexity
    if (!validatePassword(data.password)) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }
    
    // Check terms agreement
    if (!data.agreeToTerms) {
      toast.error("لطفاً قوانین و مقررات را مطالعه و تایید کنید");
      return;
    }
    
    // Ensure we're sending data with the exact field names expected by the API
    const registerData = {
      full_name: data.fullName,
      phone: data.phone,
      password: data.password,
    };
    
    // Debug the exact data being sent
    console.log('📤 Register form data being sent:', registerData);
    
    try {
      // Log data shape for debugging
      logDataShape('Register Data', registerData);
      
      // First attempt: Test the API endpoint directly
      const testResult = await testApiEndpoint('/account/register/', 'POST', registerData);
      
      if (testResult.success) {
        console.log('Direct API test succeeded, proceeding with store registration');
        
        // Try with Zustand store if direct call succeeded
        const success = await registerUser(registerData);
        
        if (success) {
          router.push(ROUTES.DASHBOARD);
        }
      } else {
        // Log detailed error from direct API test
        console.error('Direct API test failed:', testResult);
        
        // Check common error patterns
        if (testResult.status === 400) {
          // Handle validation errors
          const errorData = testResult.data as any;
          if (errorData?.phone && errorData.phone.includes('already exists')) {
            toast.error("این شماره موبایل قبلاً ثبت شده است");
          } else {
            // Show specific field errors
            const fieldErrors = Object.entries(errorData || {})
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
              .join('; ');
            
            toast.error(fieldErrors || "اطلاعات وارد شده نامعتبر است");
          }
        } else {
          toast.error("خطا در ثبت‌نام. لطفاً مجدداً تلاش کنید.");
        }
      }
    } catch (error) {
      console.error('Registration process failed:', error);
      toast.error("خطا در ثبت‌نام. لطفاً مجدداً تلاش کنید.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            ثبت‌نام در سیستم
          </h1>
          <p className="text-base-content/70 text-sm md:text-base">
            برای ایجاد حساب کاربری و دسترسی به داشبورد ثبت‌نام کنید
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">نام و نام خانوادگی</span>
                </label>
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی خود را وارد کنید"
                  className={`input input-bordered w-full ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  {...register("fullName", {
                    required: "نام و نام خانوادگی الزامی است",
                    minLength: {
                      value: 3,
                      message: "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد",
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

              {/* Phone Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">شماره موبایل</span>
                </label>
                <input
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  className={`input input-bordered w-full ${
                    errors.phone ? "input-error" : ""
                  }`}
                  {...register("phone", {
                    required: "شماره موبایل الزامی است",
                    pattern: {
                      value: /^09[0-9]{9}$/,
                      message: "شماره موبایل معتبر نیست",
                    },
                  })}
                  maxLength={11}
                />
                {errors.phone && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.phone.message}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    className={`input input-bordered w-full pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "رمز عبور الزامی است",
                      minLength: {
                        value: 8,
                        message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
                      },
                    })}
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

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">تکرار رمز عبور</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را مجدداً وارد کنید"
                    className={`input input-bordered w-full pr-12 ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "تکرار رمز عبور الزامی است",
                      validate: (value) =>
                        value === password || "رمز عبور و تکرار آن مطابقت ندارند",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.confirmPassword.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className={`checkbox checkbox-primary ${
                      errors.agreeToTerms ? "checkbox-error" : ""
                    }`}
                    {...register("agreeToTerms", {
                      required: "پذیرش قوانین و مقررات الزامی است",
                    })}
                  />
                  <span className="label-text">
                    <span>قوانین و مقررات را مطالعه کرده و می‌پذیرم</span>
                    <Link href="/terms" className="text-primary mr-1 hover:underline">
                      (مشاهده قوانین)
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <label className="label pt-0">
                    <span className="label-text-alt text-error">
                      {errors.agreeToTerms.message}
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
                    در حال ثبت‌نام...
                  </>
                ) : (
                  "ثبت‌نام"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="divider text-sm">یا</div>
            <p className="text-center text-sm text-base-content/70">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
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
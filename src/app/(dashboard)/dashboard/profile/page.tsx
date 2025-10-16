'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { accountService } from '@/services';
import { User, UpdateUserProfile } from '@/types/api';
import { toast } from 'sonner';

// Simple toast for now
const showToast = {
  error: (message: string) => {
    console.error(message);
    alert(message);
  },
  success: (message: string) => {
    console.log(message);
    alert(message);
  }
};

export default function DashboardProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateUserProfile>();

  // بارگذاری اطلاعات کاربر
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const data = await accountService.getProfile();
      setUser(data);
      reset({ fullName: data.fullName });
    } catch (error: any) {
      toast.error('خطا در بارگذاری اطلاعات پروفایل');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: UpdateUserProfile) => {
    try {
      setIsUpdating(true);
      const updatedUser = await accountService.updateProfile(data);
      setUser(updatedUser);
      reset({ fullName: updatedUser.fullName });
      setIsEditing(false);
      toast.success('اطلاعات پروفایل با موفقیت به‌روزرسانی شد');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'خطا در به‌روزرسانی اطلاعات'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    reset({ fullName: user?.fullName });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>خطا در بارگذاری اطلاعات کاربر</span>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-6 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-3xl">👤</span>
            اطلاعات حساب کاربری
          </h1>
          <p className="text-white/90">
            جزئیات پروفایل خود را بررسی و در صورت نیاز به‌روزرسانی کنید
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* کارت اطلاعات شخصی */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title text-xl">اطلاعات شخصی</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary btn-sm gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    ویرایش
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* نام کامل */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      نام کامل <span className="text-error">*</span>
                    </span>
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        {...register('fullName', {
                          required: 'نام کامل الزامی است',
                          minLength: {
                            value: 3,
                            message: 'نام کامل باید حداقل 3 کاراکتر باشد',
                          },
                        })}
                        className={`input input-bordered ${
                          errors.fullName ? 'input-error' : ''
                        }`}
                        placeholder="نام و نام خانوادگی خود را وارد کنید"
                      />
                      {errors.fullName && (
                        <label className="label">
                          <span className="label-text-alt text-error">
                            {errors.fullName.message}
                          </span>
                        </label>
                      )}
                    </>
                  ) : (
                    <input
                      type="text"
                      value={user.fullName}
                      className="input input-bordered"
                      readOnly
                    />
                  )}
                </div>

                {/* شماره تلفن (غیرقابل تغییر) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">شماره تلفن</span>
                  </label>
                  <input
                    type="text"
                    value={user.phone}
                    className="input input-bordered"
                    readOnly
                    dir="ltr"
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      شماره تلفن قابل تغییر نیست
                    </span>
                  </label>
                </div>

                {/* دکمه‌های عملیات */}
                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={!isDirty || isUpdating}
                      className="btn btn-primary gap-2"
                    >
                      {isUpdating ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          در حال ذخیره...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          ذخیره تغییرات
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="btn btn-ghost"
                    >
                      انصراف
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* کارت اطلاعات حساب */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-4">
              <h2 className="card-title text-xl">اطلاعات حساب</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <span className="text-xl">
                        {user.fullName?.charAt(0) || '👤'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-base-content/60" dir="ltr">
                      {user.phone}
                    </p>
                  </div>
                </div>

                <div className="divider my-2"></div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/60">وضعیت حساب:</span>
                    <span
                      className={`badge ${
                        user.is_active ? 'badge-success' : 'badge-error'
                      }`}
                    >
                      {user.is_active ? 'فعال' : 'غیرفعال'}
                    </span>
                  </div>

                  {user.is_staff && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-base-content/60">نقش:</span>
                      <span className="badge badge-info">مدیر</span>
                    </div>
                  )}

                  {user.last_login && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-base-content/60">
                        آخرین ورود:
                      </span>
                      <span className="text-sm">
                        {new Date(user.last_login).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

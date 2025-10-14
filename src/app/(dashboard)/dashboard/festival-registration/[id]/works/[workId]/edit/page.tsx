"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { festivalService } from "@/services";
import { UpdateWorkData, Work } from "@/types/api";
import {
  MAX_VIDEO_SIZE,
  MAX_IMAGE_SIZE,
  ACCEPTED_VIDEO_TYPES,
  ACCEPTED_IMAGE_TYPES,
} from "@/constants";

// Simple toast
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

type WorkEditFormValues = {
  title: string;
  description: string;
  file?: FileList;
};

export default function EditWorkPage() {
  const router = useRouter();
  const params = useParams();
  const registrationId = params.id as string;
  const workId = params.workId as string;

  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | "other" | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WorkEditFormValues>();

  const fileList = watch("file");
  const fileRegister = register("file");

  // Load current work data
  useEffect(() => {
    const loadWork = async () => {
      try {
        const works = await festivalService.getWorksByFestival(parseInt(registrationId));
        const work = works.find((w) => w.id === parseInt(workId));
        
        if (!work) {
          showToast.error("اثر مورد نظر یافت نشد");
          router.push(`/dashboard/festival-registration/${registrationId}/works`);
          return;
        }

        // Set form values
        setValue("title", work.title);
        setValue("description", work.description);
        
        // Set current file URL
        if (work.file_url) {
          setCurrentFileUrl(work.file_url);
          
          // Detect file type from URL
          const url = work.file_url.toLowerCase();
          if (url.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            setFileType("image");
          } else if (url.match(/\.(mp4|webm|ogg|mov)$/)) {
            setFileType("video");
          } else {
            setFileType("other");
          }
        }
        
        setLoading(false);
      } catch (error: any) {
        console.error("Error loading work:", error);
        showToast.error("خطا در بارگذاری اطلاعات اثر");
        setLoading(false);
      }
    };

    loadWork();
  }, [registrationId, workId, router, setValue]);

  // Handle file preview
  useEffect(() => {
    if (!fileList || fileList.length === 0) {
      setPreviewUrl(null);
      return;
    }

    const file = fileList[0];
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Detect new file type
    if (file.type.startsWith("image/")) {
      setFileType("image");
    } else if (file.type.startsWith("video/")) {
      setFileType("video");
    } else {
      setFileType("other");
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [fileList]);

  const onSubmit: SubmitHandler<WorkEditFormValues> = async (data) => {
    try {
      // Create work data
      const workData: UpdateWorkData = {
        title: data.title,
        description: data.description,
      };

      // Add file only if new file is selected
      if (data.file && data.file.length > 0) {
        const file = data.file[0];
        
        // Validate file size and type
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        
        if (isVideo) {
          if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
            showToast.error("فرمت ویدیو مورد قبول نیست");
            return;
          }
          if (file.size > MAX_VIDEO_SIZE) {
            showToast.error("حجم ویدیو نباید بیشتر از 5 مگابایت باشد");
            return;
          }
        } else if (isImage) {
          if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            showToast.error("فرمت تصویر مورد قبول نیست");
            return;
          }
          if (file.size > MAX_IMAGE_SIZE) {
            showToast.error("حجم تصویر نباید بیشتر از 2 مگابایت باشد");
            return;
          }
        }
        
        workData.file = file;
      }

      console.log("📤 Updating work:", {
        work_id: workId,
        title: data.title,
        description: data.description,
        has_new_file: !!(data.file && data.file.length > 0),
      });

      // Simulate upload progress
      if (data.file && data.file.length > 0) {
        const uploadInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(uploadInterval);
              return prev;
            }
            return prev + 10;
          });
        }, 200);

        // بروزرسانی اثر با API
        await festivalService.updateWork(parseInt(workId), workData);
        
        clearInterval(uploadInterval);
        setUploadProgress(100);
      } else {
        // بروزرسانی بدون فایل
        await festivalService.updateWork(parseInt(workId), workData);
      }

      showToast.success("اثر شما با موفقیت بروزرسانی شد");
      router.push(`/dashboard/festival-registration/${registrationId}/works`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "خطا در بروزرسانی اثر. لطفاً دوباره تلاش کنید";
      showToast.error(errorMessage);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 بایت";
    const k = 1024;
    const sizes = ["بایت", "کیلوبایت", "مگابایت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleFileButtonClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">در حال بارگذاری...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Link
              href="/dashboard"
              className="hover:text-purple-600 transition-colors"
            >
              داشبورد
            </Link>
            <span>/</span>
            <Link
              href="/dashboard/festival-registration"
              className="hover:text-purple-600 transition-colors"
            >
              ثبت‌نام‌های جشنواره
            </Link>
            <span>/</span>
            <Link
              href={`/dashboard/festival-registration/${registrationId}`}
              className="hover:text-purple-600 transition-colors"
            >
              جزئیات ثبت‌نام
            </Link>
            <span>/</span>
            <Link
              href={`/dashboard/festival-registration/${registrationId}/works`}
              className="hover:text-purple-600 transition-colors"
            >
              آثار ارسالی
            </Link>
            <span>/</span>
            <span className="text-purple-600">ویرایش اثر</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ویرایش اثر</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                عنوان اثر <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", {
                  required: "عنوان اثر الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل 3 کاراکتر باشد",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="عنوان اثر خود را وارد کنید"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                توضیحات <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                rows={5}
                {...register("description", {
                  required: "توضیحات الزامی است",
                  minLength: {
                    value: 10,
                    message: "توضیحات باید حداقل 10 کاراکتر باشد",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="توضیحات اثر خود را وارد کنید"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Current File Display */}
            {currentFileUrl && !previewUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  فایل فعلی
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  {fileType === "image" ? (
                    <img
                      src={currentFileUrl}
                      alt="فایل فعلی"
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : fileType === "video" ? (
                    <video
                      src={currentFileUrl}
                      controls
                      className="max-w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-900">فایل اثر</p>
                        <a
                          href={currentFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-purple-600 hover:text-purple-700"
                        >
                          مشاهده فایل
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  برای تغییر فایل، یک فایل جدید انتخاب کنید
                </p>
              </div>
            )}

            {/* File Upload Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                فایل جدید (اختیاری)
              </label>
              <input
                type="file"
                {...fileRegister}
                accept={[...ACCEPTED_VIDEO_TYPES, ...ACCEPTED_IMAGE_TYPES].join(
                  ","
                )}
                className="hidden"
              />
              <button
                type="button"
                onClick={handleFileButtonClick}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>انتخاب فایل جدید</span>
              </button>
              <p className="mt-2 text-xs text-gray-500">
                فرمت‌های مجاز: ویدیو (MP4, WebM, OGG) - حداکثر 5MB | تصویر (JPG,
                PNG, WebP, GIF) - حداکثر 2MB
              </p>
            </div>

            {/* File Info */}
            {fileList && fileList.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      فایل جدید انتخاب شده
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      نام فایل: {fileList[0].name}
                    </p>
                    <p className="text-sm text-blue-700">
                      حجم: {formatFileSize(fileList[0].size)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* File Preview */}
            {previewUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  پیش‌نمایش
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  {fileType === "image" && (
                    <img
                      src={previewUrl}
                      alt="پیش‌نمایش"
                      className="max-w-full h-auto rounded-lg"
                    />
                  )}
                  {fileType === "video" && (
                    <video
                      src={previewUrl}
                      controls
                      className="max-w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    در حال آپلود...
                  </span>
                  <span className="text-sm text-gray-600">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? "در حال بروزرسانی..." : "بروزرسانی اثر"}
              </button>
              <Link
                href={`/dashboard/festival-registration/${registrationId}/works`}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors text-center"
              >
                انصراف
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

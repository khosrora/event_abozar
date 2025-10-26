"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { festivalService } from "@/services";
import { CreateWorkData } from "@/types/api";
import {
  MAX_VIDEO_SIZE,
  MAX_IMAGE_SIZE,
  MAX_PDF_SIZE,
  ACCEPTED_VIDEO_TYPES,
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_PDF_TYPES,
} from "@/constants";
import { toast } from "sonner";


type WorkSubmissionFormValues = {
  title: string;
  description: string;
  publish_link?: string;
  file: FileList;
};

export default function SubmitWorkPage() {
  const router = useRouter();
  const params = useParams();
  const registrationId = params.id as string;
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<WorkSubmissionFormValues>();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const selectedFile = watch("file")?.[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFilePreview(null);
      setValue("file", null as any); // Clear the value in form
      return;
    }

    // Validate file type
    const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);
    const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
    const isPDF = ACCEPTED_PDF_TYPES.includes(file.type);

    if (!isVideo && !isImage && !isPDF) {
      toast.error("فرمت فایل پشتیبانی نمی‌شود. لطفاً فایل ویدیو، تصویر یا PDF ارسال کنید");
      e.target.value = "";
      setValue("file", null as any);
      setFilePreview(null);
      return;
    }

    // Validate file size
    let maxSize = MAX_IMAGE_SIZE;
    if (isVideo) maxSize = MAX_VIDEO_SIZE;
    if (isPDF) maxSize = MAX_PDF_SIZE;
    
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      toast.error(`حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      e.target.value = "";
      setValue("file", null as any);
      setFilePreview(null);
      return;
    }

    // Create preview for images
    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const onSubmit: SubmitHandler<WorkSubmissionFormValues> = async (data) => {
    if (!data.file || data.file.length === 0) {
      toast.error("لطفاً فایل اثر خود را انتخاب کنید");
      return;
    }

    try {
      const file = data.file[0];
      
      // Create work data
      const workData: CreateWorkData = {
        festival_registration: parseInt(registrationId),
        title: data.title,
        description: data.description,
        publish_link: data.publish_link || undefined,
        file: file,
      };



      // Simulate upload progress (در واقعیت باید از XMLHttpRequest یا axios config استفاده کنید)
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // ارسال اثر با API
      await festivalService.createWork(workData);
      
      clearInterval(uploadInterval);
      setUploadProgress(100);

      toast.success("اثر شما با موفقیت ارسال شد");
      router.push(`/dashboard/festival-registration/${registrationId}/works`);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "خطا در ارسال اثر. لطفاً دوباره تلاش کنید";
      toast.error(errorMessage);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={`/dashboard/festival-registration/${registrationId}`}
          className="btn btn-ghost btn-circle"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">ارسال اثر</h1>
          <p className="text-base-content/60 mt-1">
            اثر خود را برای جشنواره ارسال کنید
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="text-sm">
          <p>حداکثر حجم فایل برای ویدیو: <strong>5 مگابایت</strong></p>
          <p>حداکثر حجم فایل برای تصویر: <strong>2 مگابایت</strong></p>
          <p>حداکثر حجم فایل برای PDF: <strong>10 مگابایت</strong></p>
          <p>فرمت‌های پشتیبانی شده: MP4, WEBM, OGG, MOV, JPG, PNG, GIF, WEBP, PDF</p>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* عنوان اثر */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  عنوان اثر <span className="text-error">*</span>
                </span>
              </label>
              <input
                {...register("title", { required: "عنوان اثر الزامی است" })}
                className="input input-bordered w-full"
                placeholder="عنوان اثر خود را وارد کنید"
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.message}
                  </span>
                </label>
              )}
            </div>

            {/* توضیحات */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  توضیحات <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                {...register("description", { required: "توضیحات الزامی است" })}
                className="textarea textarea-bordered w-full h-32"
                placeholder="توضیحات اثر خود را وارد کنید"
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            {/* لینک منتشرشده */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  لینک منتشرشده (اختیاری)
                </span>
              </label>
              <input
                type="url"
                {...register("publish_link")}
                className="input input-bordered w-full"
                placeholder="https://example.com/news-link"
              />
       

            </div>

            {/* فایل */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">
                  فایل اثر <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="file"
                {...register("file", { 
                  required: "انتخاب فایل الزامی است",
                  validate: (value) => {
                    if (!value || value.length === 0) {
                      return "لطفاً فایل اثر خود را انتخاب کنید";
                    }
                    return true;
                  }
                })}
                onChange={(e) => {
                  handleFileChange(e);
                  // Also trigger react-hook-form's onChange
                  register("file").onChange(e);
                }}
                className="file-input file-input-bordered w-full"
                accept={[...ACCEPTED_VIDEO_TYPES, ...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_PDF_TYPES].join(",")}
              />
              {errors.file && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.file.message}
                  </span>
                </label>
              )}
            </div>

            {/* File Info & Preview */}
            {selectedFile && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    {/* Preview */}
                    {filePreview ? (
                      <div className="avatar">
                        <div className="w-24 rounded">
                          <img src={filePreview} alt="Preview" />
                        </div>
                      </div>
                    ) : ACCEPTED_PDF_TYPES.includes(selectedFile.type) ? (
                      <div className="w-24 h-24 rounded bg-error/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ) : ACCEPTED_VIDEO_TYPES.includes(selectedFile.type) ? (
                      <div className="w-24 h-24 rounded bg-primary/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    ) : null}

                    {/* File Info */}
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-base-content/60">
                        حجم: {formatFileSize(selectedFile.size)}
                      </p>
                      <p className="text-sm text-base-content/60">
                        نوع: {selectedFile.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>در حال آپلود...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={uploadProgress}
                  max="100"
                />
              </div>
            )}

            {/* دکمه‌ها */}
            <div className="flex gap-3 justify-end mt-6">
              <Link
                href={`/dashboard/festival-registration/${registrationId}`}
                className="btn btn-ghost"
              >
                انصراف
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting || (uploadProgress > 0 && uploadProgress < 100)}
              >
                {isSubmitting || uploadProgress > 0 ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    در حال ارسال...
                  </>
                ) : (
                  "ارسال اثر"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

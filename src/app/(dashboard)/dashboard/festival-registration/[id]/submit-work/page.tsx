"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { festivalService } from "@/services";
import { CreateWorkData } from "@/types/api";
import {
  MAX_VIDEO_SIZE,
  MAX_IMAGE_SIZE,
  ACCEPTED_VIDEO_TYPES,
  ACCEPTED_IMAGE_TYPES,
} from "@/constants";
import { toast } from "sonner";


type WorkSubmissionFormValues = {
  title: string;
  description: string;
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
    formState: { errors, isSubmitting },
  } = useForm<WorkSubmissionFormValues>();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedFile = watch("file")?.[0];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFilePreview(null);
      return;
    }

    // Validate file type
    const isVideo = ACCEPTED_VIDEO_TYPES.includes(file.type);
    const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);

    if (!isVideo && !isImage) {
      toast.error("فرمت فایل پشتیبانی نمی‌شود");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Validate file size
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      const maxSizeMB = maxSize / (1024 * 1024);
      toast.error(`حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد`);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
          <p>حداکثر حجم فایل برای ویدئو: <strong>100 مگابایت</strong></p>
          <p>حداکثر حجم فایل برای تصویر: <strong>10 مگابایت</strong></p>
          <p>فرمت‌های پشتیبانی شده: MP4, AVI, MOV, MKV, JPG, PNG, GIF, WEBP</p>
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
                  onChange: handleFileChange
                })}
                className="file-input file-input-bordered w-full"
                accept={[...ACCEPTED_VIDEO_TYPES, ...ACCEPTED_IMAGE_TYPES].join(",")}
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
                    {filePreview && (
                      <div className="avatar">
                        <div className="w-24 rounded">
                          <img src={filePreview} alt="Preview" />
                        </div>
                      </div>
                    )}

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

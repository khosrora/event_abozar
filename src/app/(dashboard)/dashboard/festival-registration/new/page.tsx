"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { province, cities } from "@/constants/cities";
import { validatePhoneNumber } from "@/utils/validation";
import { FESTIVAL_FORMATS, FESTIVAL_TOPICS } from "@/constants";
import { festivalApi } from "@/services/api";
import type { FestivalRegistrationData } from "@/types/api";

type FestivalRegistrationFormValues = {
  fullName: string;
  education: string;
  fatherName: string;
  gender: "male" | "female";
  mediaName: string;
  nationalId: string;
  phoneNumber: string;
  virtualNumber: string;
  province: string;
  city: string;
  category: string;
  topic: string;
  specialSection: string;
};

const educationOptions = [
  "زیر دیپلم",
  "دیپلم",
  "کاردانی",
  "کارشناسی",
  "کارشناسی ارشد",
  "دکتری",
];

const specialSections = [
  { value: "progress_narrative", label: "روایت پیشرفت" },
  { value: "field_narrative_12days", label: "روایت میدان در جنگ ۱۲ روزه" },
];

export default function NewFestivalRegistrationPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FestivalRegistrationFormValues>();

  const [educationQuery, setEducationQuery] = useState("");
  const [showEducationList, setShowEducationList] = useState(false);

  // Province & City state
  const [provinceQuery, setProvinceQuery] = useState("");
  const [showProvinceList, setShowProvinceList] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  const [cityQuery, setCityQuery] = useState("");
  const [showCityList, setShowCityList] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FestivalRegistrationFormValues> = async (data) => {
    // Validation
    if (!data.fullName || !data.fatherName || !data.nationalId || !data.gender || 
        !data.education || !data.phoneNumber || !selectedProvinceId || !selectedCityId ||
        !data.mediaName || !data.category || !data.topic) {
      toast.error("لطفاً همه فیلدهای الزامی را پر کنید");
      return;
    }


    if (!validatePhoneNumber(data.phoneNumber)) {
      toast.error("شماره موبایل نامعتبر است");
      return;
    }

    try {
      const requestData: FestivalRegistrationData = {
        full_name: data.fullName,
        father_name: data.fatherName,
        national_id: data.nationalId,
        gender: data.gender,
        education: data.education,
        phone_number: data.phoneNumber,
        virtual_number: data.virtualNumber || undefined,
        province_id: selectedProvinceId!,
        city_id: selectedCityId!,
        media_name: data.mediaName,
        festival_format: data.category,
        festival_topic: data.topic,
        special_section: data.specialSection || undefined,
      };

      console.log("📤 Submitting festival registration:", requestData);
      
      await festivalApi.register(requestData);
      
      toast.success("ثبت‌نام در جشنواره با موفقیت انجام شد");
      router.push("/dashboard/festival-registration");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید";
      toast.error(errorMessage);
    }
  };

  const handleEducationSelect = (value: string) => {
    setEducationQuery(value);
    setValue("education", value);
    setShowEducationList(false);
  };

  const filteredEducation = educationOptions.filter((e) =>
    e.toLowerCase().includes(educationQuery.toLowerCase())
  );

  const filteredProvinces = province.filter((p) =>
    p.fields.name.toLowerCase().includes(provinceQuery.toLowerCase())
  );

  const filteredCities = cities.filter(
    (c) =>
      selectedProvinceId &&
      c.fields.province_id === selectedProvinceId &&
      c.fields.name.toLowerCase().includes(cityQuery.toLowerCase())
  );

  const handleProvinceSelect = (id: number, name: string) => {
    setProvinceQuery(name);
    setValue("province", name);
    setSelectedProvinceId(id);
    setShowProvinceList(false);
    setCityQuery("");
    setValue("city", "");
    setSelectedCityId(null);
  };

  const handleCitySelect = (id: number, name: string) => {
    setCityQuery(name);
    setValue("city", name);
    setSelectedCityId(id);
    setShowCityList(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/festival-registration" className="btn btn-ghost btn-circle">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">ثبت‌نام در جشنواره</h1>
          <p className="text-base-content/60 mt-1">
            برای شرکت در جشنواره رسانه‌ای ابوذر فرم زیر را تکمیل نمایید
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* نام و نام خانوادگی */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">نام و نام خانوادگی <span className="text-error">*</span></span>
              </label>
              <input
                {...register("fullName", { required: "وارد کردن نام و نام خانوادگی الزامی است" })}
                className="input input-bordered w-full"
                placeholder="نام و نام خانوادگی خود را وارد کنید"
              />
              {errors.fullName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.fullName.message}</span>
                </label>
              )}
            </div>

            {/* تحصیلات */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">تحصیلات <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                value={educationQuery}
                onChange={(e) => {
                  setEducationQuery(e.target.value);
                  setShowEducationList(true);
                }}
                onFocus={() => setShowEducationList(true)}
                placeholder="جستجو یا انتخاب کنید..."
                className="input input-bordered w-full"
              />
              {showEducationList && filteredEducation.length > 0 && (
                <ul className="absolute z-10 w-full bg-base-100 border border-base-300 rounded-lg max-h-40 overflow-y-auto shadow-lg mt-1 top-full">
                  {filteredEducation.map((edu) => (
                    <li
                      key={edu}
                      className="px-3 py-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleEducationSelect(edu)}
                    >
                      {edu}
                    </li>
                  ))}
                </ul>
              )}
              {errors.education && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.education.message}</span>
                </label>
              )}
            </div>

            {/* نام پدر */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">نام پدر <span className="text-error">*</span></span>
              </label>
              <input
                {...register("fatherName", { required: "نام پدر الزامی است" })}
                className="input input-bordered w-full"
                placeholder="نام پدر خود را وارد کنید"
              />
              {errors.fatherName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.fatherName.message}</span>
                </label>
              )}
            </div>

            {/* جنسیت */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">جنسیت <span className="text-error">*</span></span>
              </label>
              <select
                {...register("gender", { required: "جنسیت را انتخاب کنید" })}
                className="select select-bordered w-full"
              >
                <option value="">انتخاب کنید</option>
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
              {errors.gender && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.gender.message}</span>
                </label>
              )}
            </div>

            {/* نام رسانه */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">نام رسانه <span className="text-error">*</span></span>
              </label>
              <input
                {...register("mediaName", { required: "نام رسانه الزامی است" })}
                className="input input-bordered w-full"
                placeholder="نام رسانه خود را وارد کنید"
              />
              {errors.mediaName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.mediaName.message}</span>
                </label>
              )}
            </div>

            {/* کد ملی */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">کد ملی <span className="text-error">*</span></span>
              </label>
              <input
                {...register("nationalId", { required: "وارد کردن کد ملی الزامی است" })}
                className="input input-bordered w-full"
                placeholder="کد ملی خود را وارد کنید"
                
              />
              {errors.nationalId && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.nationalId.message}</span>
                </label>
              )}
            </div>

            {/* شماره تماس */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">شماره تماس <span className="text-error">*</span></span>
              </label>
              <input
                {...register("phoneNumber", { required: "وارد کردن شماره تماس الزامی است" })}
                className="input input-bordered w-full"
                placeholder="09xxxxxxxxx"
                maxLength={11}
              />
              {errors.phoneNumber && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phoneNumber.message}</span>
                </label>
              )}
            </div>

            {/* شماره مجازی */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">شماره مجازی</span>
              </label>
              <input
                {...register("virtualNumber")}
                className="input input-bordered w-full"
                placeholder="شماره مجازی (اختیاری)"
              />
            </div>

            {/* استان */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">استان <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                value={provinceQuery}
                onChange={(e) => {
                  setProvinceQuery(e.target.value);
                  setShowProvinceList(true);
                }}
                onFocus={() => setShowProvinceList(true)}
                placeholder="جستجو کنید..."
                className="input input-bordered w-full"
              />
              {showProvinceList && filteredProvinces.length > 0 && (
                <ul className="absolute z-10 w-full bg-base-100 border border-base-300 rounded-lg max-h-40 overflow-y-auto shadow-lg mt-1 top-full">
                  {filteredProvinces.map((p) => (
                    <li
                      key={p.pk}
                      className="px-3 py-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleProvinceSelect(p.pk, p.fields.name)}
                    >
                      {p.fields.name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.province && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.province.message}</span>
                </label>
              )}
            </div>

            {/* شهر */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-medium">شهر <span className="text-error">*</span></span>
              </label>
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setShowCityList(true);
                }}
                onFocus={() => setShowCityList(true)}
                placeholder={selectedProvinceId ? "جستجو کنید..." : "ابتدا استان را انتخاب کنید"}
                className="input input-bordered w-full"
                disabled={!selectedProvinceId}
              />
              {showCityList && selectedProvinceId && filteredCities.length > 0 && (
                <ul className="absolute z-10 w-full bg-base-100 border border-base-300 rounded-lg max-h-40 overflow-y-auto shadow-lg mt-1 top-full">
                  {filteredCities.map((c) => (
                    <li
                      key={c.pk}
                      className="px-3 py-2 hover:bg-base-200 cursor-pointer"
                      onClick={() => handleCitySelect(c.pk, c.fields.name)}
                    >
                      {c.fields.name}
                    </li>
                  ))}
                </ul>
              )}
              {errors.city && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.city.message}</span>
                </label>
              )}
            </div>

            {/* قالب جشنواره */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">قالب جشنواره <span className="text-error">*</span></span>
              </label>
              <select
                {...register("category", { required: "انتخاب قالب جشنواره الزامی است" })}
                className="select select-bordered w-full"
              >
                <option value="">انتخاب کنید</option>
                {FESTIVAL_FORMATS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.category.message}</span>
                </label>
              )}
            </div>

            {/* محور جشنواره */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">محور جشنواره <span className="text-error">*</span></span>
              </label>
              <select
                {...register("topic", { required: "محوریت جشنواره باید انتخاب کنید" })}
                className="select select-bordered w-full"
              >
                <option value="">انتخاب کنید</option>
                {FESTIVAL_TOPICS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {errors.topic && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.topic.message}</span>
                </label>
              )}
            </div>

            {/* بخش ویژه */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-medium">بخش‌های ویژه (اختیاری)</span>
              </label>
              <select
                {...register("specialSection")}
                className="select select-bordered w-full"
              >
                <option value="">انتخاب کنید (اختیاری)</option>
                {specialSections.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* دکمه‌ها */}
            <div className="md:col-span-2 flex gap-3 justify-end mt-4">
              <Link href="/dashboard/festival-registration" className="btn btn-ghost">
                انصراف
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    در حال ارسال...
                  </>
                ) : (
                  "ثبت‌نام در جشنواره"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
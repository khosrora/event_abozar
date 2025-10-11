"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { festivalApi } from "@/services/api";
import { province, cities } from "@/constants/cities";
import { validateNationalId, validatePhoneNumber } from "@/utils/validation";
import { FESTIVAL_FORMATS, FESTIVAL_TOPICS } from "@/constants";

type FormValues = {
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

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [educationQuery, setEducationQuery] = useState("");
  const [showEducationList, setShowEducationList] = useState(false);

  // 🔹 State for Province Search
  const [provinceQuery, setProvinceQuery] = useState("");
  const [showProvinceList, setShowProvinceList] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  // 🔹 State for City Search
  const [cityQuery, setCityQuery] = useState("");
  const [showCityList, setShowCityList] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Validation: check all required fields
    if (!data.fullName || !data.fatherName || !data.nationalId || !data.gender || 
        !data.education || !data.phoneNumber || !selectedProvinceId || !selectedCityId ||
        !data.mediaName || !data.category || !data.topic) {
      toast.error("لطفاً همه فیلدهای الزامی را پر کنید");
      return;
    }

    // Validate national ID using utility function
    if (!validateNationalId(data.nationalId)) {
      toast.error("کد ملی نامعتبر است");
      return;
    }

    // Validate phone number using utility function
    if (!validatePhoneNumber(data.phoneNumber)) {
      toast.error("شماره موبایل نامعتبر است");
      return;
    }

    try {
      const requestData = {
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

      await festivalApi.register(requestData);
      toast.success("ثبت‌نام با موفقیت انجام شد ✅");
      
      // Reset form or redirect
      window.location.href = "/";
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

  // 🔸 Filtered Education List
  const filteredEducation = educationOptions.filter((e) =>
    e.toLowerCase().includes(educationQuery.toLowerCase())
  );

  // 🔸 Filter provinces based on search
  const filteredProvinces = province.filter((p) =>
    p.fields.name.toLowerCase().includes(provinceQuery.toLowerCase())
  );

  // 🔸 Filter cities based on search and selected province
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
    // reset city when province changes
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
         ثبت نام جشنواره
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* نام و نام خانوادگی */}
        <div className="form-control">
          <label className="label">نام و نام خانوادگی:</label>
          <input
            {...register("fullName", { required: "وارد کردن نام و نام خانوادگی الزامی هست" })}
            className="input input-bordered w-full text-right"
          />
          {errors.fullName && (
            <p className="text-error text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="form-control relative">
          <label className="label">تحصیلات:</label>
          <input
            type="text"
            value={educationQuery}
            onChange={(e) => {
              setEducationQuery(e.target.value);
              setShowEducationList(true);
            }}
            onFocus={() => setShowEducationList(true)}
            placeholder="جستجو یا انتخاب کنید..."
            className="input input-bordered w-full text-right"
          />
          {showEducationList && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg max-h-40 overflow-y-auto shadow-md mt-1 text-right">
              {filteredEducation.length > 0 ? (
                filteredEducation.map((edu) => (
                  <li
                    key={edu}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleEducationSelect(edu)}
                  >
                    {edu}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">یافت نشد</li>
              )}
            </ul>
          )}
          {errors.education && (
            <p className="text-error text-sm mt-1">
              {errors.education.message}
            </p>
          )}
        </div>

        {/* نام پدر */}
        <div className="form-control">
          <label className="label">نام پدر:</label>
          <input
            {...register("fatherName", { required: "نام پدر الزامی است" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* جنسیت */}
        <div className="form-control">
          <label className="label">جنسیت:</label>
          <select
            {...register("gender", { required: "جنسیت را انتخاب کنید" })}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید</option>
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
        </div>

        {/* نام رسانه */}
        <div className="form-control">
          <label className="label">نام رسانه:</label>
          <input
            {...register("mediaName", { required: "نام رسانه الزامی است" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* کد ملی */}
        <div className="form-control">
          <label className="label">کد ملی:</label>
          <input
            {...register("nationalId", { required: "وارد کردن کد ملی الزامی است" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* شماره تماس */}
        <div className="form-control">
          <label className="label">شماره تماس:</label>
          <input
            {...register("phoneNumber", { required: "وارد کردن نشکاره تماس الزامی است" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* شماره مجازی */}
        <div className="form-control">
          <label className="label">شماره مجازی:</label>
          <input
            {...register("virtualNumber")}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* 🔸 Province Search */}
        <div className="form-control relative">
          <label className="label">استان: <span className="text-error">*</span></label>
          <input
            type="text"
            value={provinceQuery}
            onChange={(e) => {
              setProvinceQuery(e.target.value);
              setShowProvinceList(true);
            }}
            onFocus={() => setShowProvinceList(true)}
            placeholder="جستجو کنید..."
            className="input input-bordered w-full text-right"
          />
          {showProvinceList && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg max-h-40 overflow-y-auto shadow-md mt-1 text-right">
              {filteredProvinces.length > 0 ? (
                filteredProvinces.map((p) => (
                  <li
                    key={p.pk}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleProvinceSelect(p.pk, p.fields.name)}
                  >
                    {p.fields.name}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">یافت نشد</li>
              )}
            </ul>
          )}
          {errors.province && (
            <p className="text-error text-sm mt-1">{errors.province.message}</p>
          )}
        </div>

        {/* 🔸 City Search */}
        <div className="form-control relative">
          <label className="label">شهر: <span className="text-error">*</span></label>
          <input
            type="text"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setShowCityList(true);
            }}
            onFocus={() => setShowCityList(true)}
            placeholder={selectedProvinceId ? "جستجو کنید..." : "ابتدا استان را انتخاب کنید"}
            className="input input-bordered w-full text-right"
            disabled={!selectedProvinceId}
          />
          {showCityList && selectedProvinceId && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg max-h-40 overflow-y-auto shadow-md mt-1 text-right">
              {filteredCities.length > 0 ? (
                filteredCities.map((c) => (
                  <li
                    key={c.pk}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCitySelect(c.pk, c.fields.name)}
                  >
                    {c.fields.name}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">یافت نشد</li>
              )}
            </ul>
          )}
          {errors.city && (
            <p className="text-error text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        {/* قالب جشنواره */}
        <div className="form-control">
          <label className="label">قالب‌های جشنواره: <span className="text-error">*</span></label>
          <select
            {...register("category", { required: "انتخاب قالب جشنواره الزامی است" })}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید</option>
            {FESTIVAL_FORMATS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-error text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* محور جشنواره */}
        <div className="form-control">
          <label className="label">محورهای جشنواره: <span className="text-error">*</span></label>
          <select
            {...register("topic", { required: "محوریت چشنواره باید انتخاب کنید" })}
            className="select select-bordered w-full text-right mt-1"
          >
            <option value="">انتخاب کنید</option>
            {FESTIVAL_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className="text-error text-sm mt-1">{errors.topic.message}</p>
          )}
        </div>

        {/* بخش ویژه */}
        <div className="form-control md:col-span-2">
          <label className="label">بخش‌های ویژه (اختیاری):</label>
          <select
            {...register("specialSection")}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید (اختیاری)</option>
            {specialSections.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* دکمه */}
        <div className="md:col-span-2">
          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                در حال ارسال...
              </>
            ) : (
              "ارسال فرم"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

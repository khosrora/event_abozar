"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { province, cities } from "@/constants/cities";

type FormValues = {
  fullName: string;
  education: string;
  fatherName: string;
  gender: string;
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

const categories = [
  "گزارش خبری",
  "مصاحبه",
  "یادداشت و سرمقاله",
  "تیتر",
  "اینفوگرافی",
  "موشن گرافی",
  "عکس",
  "کلیپ و گزارش ویدیویی",
  "مستند",
  "پادکست",
];

const topics = [
  "شعار سال",
  "جهاد تبیین",
  "پیوند رسانه و صنعت",
  "مقابله با آسیب‌های اجتماعی",
  "دستاوردهای انقلاب اسلامی",
  "بسیج و حوزه‌های اقدام",
  "امید و نشاط آفرینی",
  "خانواده ،جامعه و فرزندآوری",
  "سبک زندگی ایرانی اسلامی",
  "ایثار و شهادت",
  "صرفه‌جویی در مصرف آب و برق",
];

const specialSections = ["روایت پیشرفت", "روایت میدان در جنگ ۱۲ روزه"];

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const [educationQuery, setEducationQuery] = useState("");
  const [showEducationList, setShowEducationList] = useState(false);

  // 🔹 State for Province Search
  const [provinceQuery, setProvinceQuery] = useState("");
  const [showProvinceList, setShowProvinceList] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );

  // 🔹 State for City Search
  const [cityQuery, setCityQuery] = useState("");
  const [showCityList, setShowCityList] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    alert("فرم با موفقیت ارسال شد ✅");
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
  };

  const handleCitySelect = (name: string) => {
    setCityQuery(name);
    setValue("city", name);
    setShowCityList(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        فرم ثبت نام یازدهمین جشنواره رسانه ای ابوذر
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* نام و نام خانوادگی */}
        <div className="form-control">
          <label className="label">نام و نام خانوادگی:</label>
          <input
            {...register("fullName", { required: "الزامی" })}
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
            {...register("fatherName", { required: "الزامی" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* جنسیت */}
        <div className="form-control">
          <label className="label">جنسیت:</label>
          <select
            {...register("gender", { required: "الزامی" })}
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
            {...register("mediaName", { required: "الزامی" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* کد ملی */}
        <div className="form-control">
          <label className="label">کد ملی:</label>
          <input
            {...register("nationalId", { required: "الزامی" })}
            className="input input-bordered w-full text-right"
          />
        </div>

        {/* شماره تماس */}
        <div className="form-control">
          <label className="label">شماره تماس:</label>
          <input
            {...register("phoneNumber", { required: "الزامی" })}
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
          <label className="label">استان:</label>
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
        </div>

        {/* 🔸 City Search */}
        <div className="form-control relative">
          <label className="label">شهر:</label>
          <input
            type="text"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value);
              setShowCityList(true);
            }}
            onFocus={() => setShowCityList(true)}
            placeholder="جستجو کنید..."
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
                    onClick={() => handleCitySelect(c.fields.name)}
                  >
                    {c.fields.name}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">یافت نشد</li>
              )}
            </ul>
          )}
        </div>

        {/* قالب جشنواره */}
        <div className="form-control">
          <label className="label">قالب‌های جشنواره:</label>
          <select
            {...register("category", { required: "الزامی" })}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* محور جشنواره */}
        <div className="form-control">
          <label className="label">محورهای جشنواره:</label>
          <select
            {...register("topic", { required: "الزامی" })}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* بخش ویژه */}
        <div className="form-control md:col-span-2">
          <label className="label">بخش‌های ویژه:</label>
          <select
            {...register("specialSection")}
            className="select select-bordered w-full text-right"
          >
            <option value="">انتخاب کنید (اختیاری)</option>
            {specialSections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* دکمه */}
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-primary w-full mt-4">
            ارسال فرم
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Contact Form Data:", data);
    alert("پیام شما با موفقیت ارسال شد ✅");
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 max-w-5xl mx-auto space-y-12">
      <h1 className="text-4xl font-bold text-center mb-6">تماس با ما</h1>

      {/* Contact Form */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="form-control w-full">
            <label className="label">نام و نام خانوادگی:</label>
            <input
              {...register("name", { required: "وارد کردن نام الزامی است" })}
              className="input input-bordered w-full text-right"
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="form-control w-full">
            <label className="label">شماره تماس:</label>
            <input
              {...register("phone", { required: "شماره تماس الزامی است" })}
              className="input input-bordered w-full text-right"
            />
            {errors.phone && (
              <p className="text-error text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-control w-full">
            <label className="label">ایمیل:</label>
            <input
              {...register("email", { required: "ایمیل الزامی است" })}
              className="input input-bordered w-full text-right"
            />
            {errors.email && (
              <p className="text-error text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="form-control w-full">
            <label className="label">پیام شما:</label>
            <textarea
              {...register("message", {
                required: "وارد کردن پیام الزامی است",
              })}
              className="textarea textarea-bordered w-full text-right"
              rows={5}
            />
            {errors.message && (
              <p className="text-error text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            ارسال پیام
          </button>
        </form>

        {/* Google Map */}
        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.1234567890!2d51.3890!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0123456789ab%3A0xabcdef1234567890!2z2YXYs9mE2YjYsdmK2Kkg2KfZhNi52YrYjCDZhtmE2LPZgdmK2LHZhdmKINin2YTZiNio2Kkg2YjYtdmK2YrYp9iqINmI2YTYudmK2YQg2KfZhNmF2LPZgdi52Kog2YrYp9mG2KfZhiDZg9mH2YTYp9iz2Kkg2YTZhdin2Kkg2KfZhNi02Kkg2LPZgNin2YTYqNin2Kkg2KfZhNin2YbZitmF!5e0!3m2!1sen!2s!4v1697070000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}

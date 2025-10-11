"use client";

export default function AboutPage() {
  const heroImage =
    "https://lh3.googleusercontent.com/proxy/fD3l2yuxNWryA5LoLxE9HfsYNTplzj9w-KwNcJBPlcZYfJGtpzRS5JTIWYXq7Jp01QwuuqkOBJfGjwcOI1s9GxedKPrWnranGflaf0-VsVwcQvwkvV2ObeGRvQ"; // Replace with actual banner image if needed

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Image */}
      <section className="relative w-full h-[400px]">
        <img
          src={heroImage}
          alt="بسیج رسانه"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
            معرفی بسیج رسانه
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 px-6 py-12 max-w-5xl mx-auto space-y-8 text-right">
        <p className="text-lg leading-relaxed">
        تحولات در عرصه ارتباطات به ویژه در دو دهه اخیر، تمامی مناسبات بشری را دگرگون ساخته و دسترسی بشر به ابزار های نوین ارتباطی از قبیل شبکه های اجتماعی، فناوری های پیشرفته و به تبع آن سرمایه گذاری  کلان دولت ها در این زمینه، تعریف جدیدی از مولفه های قدرت و موازنه آن ارائه نموده است.
        </p>
        <p className="text-lg leading-relaxed">
        از منظری دیگر عصر حاضر، عصر حاکمیت رو به رشد افکار عمومی بر سرنوشت جوامع به شمار می رود  بنابراین به طور توامان رسانه ها و افکار عمومی به عنوان متغیر بسیاری از تحولات اجتماعی، سیاسی و فرهنگی جوامع، نقش موثری ایفا می کند تاجایی که مظاهر و مولفه های قدرت سخت نیز با نحوه بکارگیری رسانه رابطه مستقیم پیدا می کنداین تحولات در حالی رخ می دهد که با وجود برنامه ریزی های صورت گرفته در حوزه رسانه، هنوز انسجام لازم و کافی در بین عناصر رسانه ای کشور  حلقه گم شده است لذا ایجاب می کند نهاد نهادهای  انقلابی از جمله بسیج،  این تحولات را مورد توجه قرار دهد دهند.
        </p>

        <p className="text-lg leading-relaxed">
          بر این اساس سازمان بسیج رسانه به عنوان یکی از اقشار تخصصی بسیج، اصحاب
          رسانه را نمایندگی کرده و وظیفه جذب، سازماندهی و نقش آفرینی آنان را به
          عهده دارد.
        </p>

        <p className="text-lg leading-relaxed">
          از آنجائیکه رسالت بسیج رسانه، عبارت از «بسیج ظرفیت های رسانه ای برای
          نقش آفرینی در عرصه های پاسداری از انقلاب اسلامی و دستاوردهای آن و کمک
          به تحقق مردم سالاری دینی، جامعه اسلامی و تمدن نوین اسلامی» می باشد.
        </p>
      </main>
    </div>
  );
}

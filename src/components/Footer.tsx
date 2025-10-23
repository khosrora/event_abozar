export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-8 md:py-12 px-4 md:px-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* درباره ما */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg md:text-xl font-bold mb-4 text-primary title-kalameh">درباره ما</h3>
            <p className="text-sm md:text-sm leading-relaxed opacity-90 mb-4 text-justify">
              سازمان ما با هدف توسعه رسانه‌های فرهنگی و تربیتی فعالیت می‌کند و در
              حوزه آموزش، رویدادها و اخبار رسانه‌ای فعالیت گسترده دارد.
            </p>
            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-3">
              {[
                { name: "تلگرام", icon: "📱" },
                { name: "اینستاگرام", icon: "📷" },
                { name: "واتساپ", icon: "💬" }
              ].map((social) => (
                <a 
                  key={social.name}
                  href="#" 
                  className="btn btn-ghost btn-sm btn-square hover:btn-primary transition-all duration-300"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">دسترسی سریع</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "خانه" },
                { href: "/education", label: "آموزش" },
                { href: "/events", label: "رویدادها" },
                { href: "/news", label: "اخبار" },
                { href: "/about", label: "درباره ما" },
                { href: "/contact", label: "تماس با ما" }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm md:text-base hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-primary/60 rounded-full"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* خدمات */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">خدمات</h3>
            <ul className="space-y-2 text-justify">
              {[
                "آموزش رسانه‌ای",
                "برگزاری رویدادها",
                "پوشش خبری",
                "مشاوره فرهنگی",
                "تولید محتوا"
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm md:text-base opacity-80 flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary/60 rounded-full"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4 text-primary">تماس با ما</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">📞</span>
                <div>
                  <p className="text-sm font-semibold">تلفن</p>
                  <p className="text-sm opacity-80">031-36040360</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">📍</span>
                <div>
                  <p className="text-sm font-semibold">آدرس</p>
                  <p className="text-sm opacity-80 leading-relaxed">اصفهان خیابان شهدای صفه روبروی بیمارستان الزهرا</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-primary mt-1">✉️</span>
                <div>
                  <p className="text-sm font-semibold">ایمیل</p>
                  <p className="text-sm opacity-80">info@abozar-isfahan.ir</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* خط جداکننده و حق کپی‌رایت */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-base-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80">
                © ۱۴۰۳ سازمان بسیج رسانه استان اصفهان. تمامی حقوق محفوظ است.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs opacity-60">
              <a href="#" className="hover:opacity-100 transition-opacity">حریم خصوصی</a>
              <span>|</span>
              <a href="#" className="hover:opacity-100 transition-opacity">قوانین و مقررات</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

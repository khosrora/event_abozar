export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Short Introduction */}
        <div>
          <h3 className="text-xl font-bold mb-3">درباره ما</h3>
          <p className="text-sm">
            سازمان ما با هدف توسعه رسانه‌های فرهنگی و تربیتی فعالیت می‌کند و در
            حوزه آموزش، رویدادها و اخبار رسانه‌ای فعالیت گسترده دارد.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">لینک‌ها</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                خانه
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                ثبت نام
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                درباره ما
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                تماس با ما
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-3">تماس با ما</h3>
          <p className="text-sm mb-1">
            <span className="font-semibold">تلفن:</span> ۰۲۱-۱۲۳۴۵۶۷۸
          </p>
          <p className="text-sm mb-1">
            <span className="font-semibold">آدرس:</span> تهران، خیابان نمونه،
            پلاک ۱۰
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">ایمیل:</span> info@example.com
          </p>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-base-300 pt-4">
        © ۲۰۲۵ سازمان رسانه‌ای ابوذر. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}

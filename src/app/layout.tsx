import { iransans , kalameh } from "@/lib/local_fonts";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import DevelopmentBanner from "@/components/DevelopmentBanner";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "سازمان بسیج رسانه استان اصفهان",
  description: "پلتفرمی برای آموزش، رویدادها و پوشش خبری کانون‌ها در سراسر کشور",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${iransans.variable} ${kalameh.variable} bg-[#f1f2f3] antialiased`}>
        <ErrorBoundary>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
        <DevelopmentBanner />
        <Toaster 
          position="top-center" 
          dir="rtl"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-iransans)',
              direction: 'rtl',
              textAlign: 'right',
            },
          }}
        />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/NavBar";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const Layout = async ({ children, params }: LayoutProps) => {
  const locale = (await params).locale;

  const messages = await getMessages();

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          <main className="flex items-center justify-center min-h-[calc(100vh-65px)] bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
              {children}
              <Toaster />
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export { metadata };
export default Layout;

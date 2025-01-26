"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const locale = useLocale();

  return (
    <div className="absolute top-0 right-0 p-4 bg-gray-400">
      <button
        className="px-2 py-1"
        onClick={() => {
          router.replace(pathname, {
            ...params,
            locale: locale === "en" ? "ar" : "en",
          });
        }}
      >
        {locale === "en" ? "ar" : "en"}
      </button>
    </div>
  );
}

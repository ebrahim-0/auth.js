import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { getTranslations } from "next-intl/server";

const NavBar = async () => {
  const t = await getTranslations({ namespace: "navbar" });

  return (
    <nav className="bg-gray-800 relative">
      <ul className="flex justify-center gap-4 py-5">
        <li>
          <Link href="/" className="text-white">
            {t("home")}
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-white">
            {t("dashboard")}
          </Link>
        </li>
        <li>
          <Link href="/sign-in" className="text-white">
            {t("signin")}
          </Link>
        </li>
        <li>
          <Link href="/sign-up" className="text-white">
            {t("signup")}
          </Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
  );
};

export default NavBar;

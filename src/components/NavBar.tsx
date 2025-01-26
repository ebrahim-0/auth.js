import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 relative">
      <ul className="flex justify-center gap-4 py-5">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className="text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/sign-in" className="text-white">
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/sign-up" className="text-white">
            Sign Up
          </Link>
        </li>
      </ul>
      <LocaleSwitcher />
    </nav>
  );
};

export default NavBar;

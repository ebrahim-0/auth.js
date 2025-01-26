import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

const SignOut = async () => {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/sign-in" });
  };

  const t = await getTranslations({ namespace: "home" });

  return (
    <form action={handleSignOut} className="flex justify-center">
      <Button variant="destructive">{t("sign_out")}</Button>
    </form>
  );
};

export { SignOut };

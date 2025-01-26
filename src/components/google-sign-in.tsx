import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Google } from "@/components/ui/google";
import { getTranslations } from "next-intl/server";

const GoogleSignIn = async () => {
  const t = await getTranslations({ namespace: "signin" });

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button className="w-full" variant="outline">
        <Google />
        {t("login_with_google")}
      </Button>
    </form>
  );
};

export { GoogleSignIn };

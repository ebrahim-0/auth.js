import { Button } from "@/components/ui/button";
import { Github } from "@/components/ui/github";
import { signIn } from "@/lib/auth";
import { getTranslations } from "next-intl/server";

const GithubSignIn = async () => {
  const t = await getTranslations({ namespace: "signin" });

  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <Button className="w-full" variant="outline">
        <Github />
        {t("login_with_github")}
      </Button>
    </form>
  );
};

export { GithubSignIn };

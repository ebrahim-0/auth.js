import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { Google } from "@/components/ui/google";

const GoogleSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button className="w-full" variant="outline">
        <Google />
        Continue with Google
      </Button>
    </form>
  );
};

export { GoogleSignIn };

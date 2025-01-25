import AuthForm from "@/components/AuthForm";
import { GithubSignIn } from "@/components/github-sign-in";
import { GoogleSignIn } from "@/components/google-sign-in";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/action";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const actionFn = async (_: unknown, formData: FormData) => {
    "use server";
    const res = await signUp(formData);
    if (res.success) {
      redirect("/sign-in");
    }
    return res;
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <GithubSignIn />

      <GoogleSignIn />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <AuthForm actionFn={actionFn} type="sign-up" />

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;

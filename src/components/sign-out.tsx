import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

const SignOut = () => {
  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <form action={handleSignOut} className="flex justify-center">
      <Button variant="destructive">Sign Out</Button>
    </form>
  );
};

export { SignOut };

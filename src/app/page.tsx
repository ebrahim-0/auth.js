/* eslint-disable @next/next/no-img-element */
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  console.log("🚀 ~ Page ~ session:", session);

  if (!session) redirect("/sign-in");

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <div>
          {session?.user?.image && (
            <img
              width={48}
              height={48}
              className="rounded-full h-12 w-12 mx-auto my-2"
              src={session?.user?.image}
              alt=""
            />
          )}
          <p className="font-medium">
            {session?.user?.name} <br /> ({session?.user?.email})
          </p>
        </div>
      </div>

      <SignOut />
    </>
  );
};

export default Page;

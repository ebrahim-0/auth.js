"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState } from "react";

const initialState = {
  success: false,
  message: "",
};

const AuthForm = ({
  actionFn,
  type,
}: {
  actionFn: (
    prevState: unknown,
    formData: FormData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;
  type: "sign-in" | "sign-up";
}) => {
  const [state, formAction] = useActionState(actionFn, initialState);

  return (
    <>
      {/* Email/Password Sign In */}
      <form className="space-y-4" action={formAction}>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>

        {state.message && (
          <div
            className={`${
              state.success ? "text-green-600" : "text-red-600"
            } text-center`}
          >
            {state.message}
          </div>
        )}
      </form>
    </>
  );
};

export default AuthForm;

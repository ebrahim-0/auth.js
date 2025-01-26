"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState } from "react";
import { useTranslations } from "next-intl";

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
  const [state, formAction, isPending] = useActionState(actionFn, initialState);
  console.log("🚀 ~ state:", state);

  const t = useTranslations("signin");

  return (
    <>
      {/* Email/Password Sign In */}
      <form className="space-y-4" action={formAction}>
        <Input
          name="email"
          placeholder={t("email")}
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder={t("password")}
          type="password"
          required
          autoComplete="current-password"
        />
        <Button className="w-full" type="submit" disabled={isPending}>
          {type === "sign-in" ? t("btn_signin") : t("btn_signup")}

          {isPending && (
            <svg
              className="animate-spin -mr-1 ml-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8s-3.582 8-8 8V4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
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

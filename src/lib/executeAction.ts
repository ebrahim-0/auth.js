"use server";

import { getTranslations } from "next-intl/server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: {
    namespace: string;
    key: string;
    fallback: string;
  };
};

const executeAction = async <T>({
  actionFn,
  successMessage = {
    namespace: "common",
    key: "success",
    fallback: "Action executed successfully",
  },
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();

    const t = await getTranslations({ namespace: successMessage?.namespace });

    return {
      success: true,
      message: t(successMessage?.key) || successMessage?.fallback,
    };
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message:
        error?.message || "An error has occurred during executing the action",
    };
  }
};

export { executeAction };

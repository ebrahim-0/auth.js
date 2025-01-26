import { getLocale, getTranslations } from "next-intl/server";
import db from "./db";
import { executeAction } from "./executeAction";
import { schema } from "./schema";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { InvalidError } from "./auth";

export const signUp = async (formData: FormData) => {
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");

      const validate = schema.parse({ email, password });

      const existingUser = await db.user.findUnique({
        where: {
          email: validate.email,
        },
      });

      if (existingUser?.id) {
        const t = await getTranslations({ namespace: "auth" });

        throw new InvalidError(t("user_exists"));
        return;
      }

      const lang = await getLocale();

      const name = lang === "en" ? "User" : "مستخدم";

      await db.user.create({
        data: {
          email: validate.email.toLocaleLowerCase(),
          password: await hashPassword(validate.password),
          name,
        },
      });
    },
    successMessage: {
      namespace: "auth",
      key: "sign_up_success",
      fallback: "User has been created successfully",
    },
  });
};

export const hashPassword = async (password: string) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const isMatch = async (password: string, hash: string) => {
  return await compare(password, hash);
};

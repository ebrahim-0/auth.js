import db from "./db";
import { executeAction } from "./executeAction";
import { schema } from "./schema";

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
        throw new Error("User already exists");
        return;
      }

      await db.user.create({
        data: {
          email: validate.email.toLocaleLowerCase(),
          password: await hashPassword(validate.password),
          name: "User",
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

export const hashPassword = async (password: string) => {
  const crypto = await import("crypto");

  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(password, "salt", 12, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(derivedKey.toString("hex"));
    });
  });
};

export const isMatch = async (password: string, hash: string) => {
  const crypto = await import("crypto");

  return new Promise<boolean>((resolve, reject) => {
    crypto.pbkdf2(password, "salt", 12, 64, "sha512", (err, derivedKey) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(derivedKey.toString("hex") === hash);
    });
  });
};

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
          password: validate.password,
          name: "User",
        },
      });
    },
    successMessage: "Signed up successfully",
  });
};

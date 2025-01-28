"use server";

import db from "./db";

export const getUserByToken = async (token: string) => {
  if (!token) return null;

  const user = await db.session.findFirst({
    where: {
      sessionToken: token,
    },
  });
  return user || null;
};

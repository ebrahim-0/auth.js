import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const hashPassword = async (password: string, salt = 10) => {
  const generatedSalt = genSaltSync(salt);
  return hashSync(password, generatedSalt);
};

export const isMatch = async (password: string, hash: string) => {
  return await compare(password, hash);
};

export const authCookiesName =
  process.env.NODE_ENV === "development"
    ? "authjs.session-token"
    : "__Secure-authjs.session-token";

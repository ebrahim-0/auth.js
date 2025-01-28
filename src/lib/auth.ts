import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";

import db from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { schema } from "./schema";
import { authCookiesName, isMatch } from "./utils";
import { getTranslations } from "next-intl/server";
import { publicRoutes, testPathnameRegex } from "./checkRoute";
import { NextResponse } from "next/server";

const adapter = PrismaAdapter(db);

export class InvalidError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const t = await getTranslations({ namespace: "auth" });

        const validate = schema.parse(credentials);

        const existingUser = await db.user.findFirst({
          where: {
            email: validate.email,
          },
        });

        if (!existingUser) {
          throw new InvalidError(t("invalid_credentials"));
        }

        const mathPass = await isMatch(
          validate.password,
          existingUser?.password || ""
        );

        if (!mathPass) {
          throw new InvalidError(t("invalid_credentials"));
        }

        // to make only one session per user

        await db.session.deleteMany({
          where: {
            userId: existingUser.id,
          },
        });

        return existingUser;
      },
    }),
  ],

  callbacks: {
    async authorized({ request: { cookies, nextUrl } }) {
      const token = cookies.get(authCookiesName)?.value;

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { userId: isAuth } = await res.json();

      const isPublicPage = testPathnameRegex(publicRoutes, nextUrl.pathname);
      const lang = nextUrl.pathname.split("/")[1];

      if (isAuth && isPublicPage) {
        return NextResponse.redirect(new URL(`/${lang}`, nextUrl));
      }

      if (!isAuth && !isPublicPage) {
        return NextResponse.redirect(new URL(`/${lang}/sign-in`, nextUrl));
      }

      return true;
    },

    session: async ({ session, user }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user as {
        password?: string;
        id: string;
        email: string;
        emailVerified: Date | null;
      };
      session.user = userWithoutPassword;
      return session;
    },
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          const t = await getTranslations({ namespace: "auth" });

          throw new InvalidError(t("no_user"));
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new InvalidError("Failed to create session");
        }

        return sessionToken;
      }

      return defaultEncode(params);
    },
  },
});

import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const lang = await getLocale();
  redirect(`/${lang}`);
}

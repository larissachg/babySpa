"use server";

import { cookies, headers } from "next/headers";

export const getLocale = () => {
  const cookieLocale = cookies().get("language")?.value;
  const headerLocale = headers()
    .get("accept-language")
    ?.split(",")[0]
    ?.split("-")[0];

  const supportedLocales = ["es", "pt"];
  const defaultLocale = "es";

  const locale =
    cookieLocale && supportedLocales.includes(cookieLocale)
      ? cookieLocale
      : headerLocale && supportedLocales.includes(headerLocale)
      ? headerLocale
      : defaultLocale;

  return locale;
};

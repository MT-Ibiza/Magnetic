import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  locales,
  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|es|de)/:path*"],
};

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
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
  // Match only internationalized pathnames
  // matcher: ["/", "/(en|es|de)/:path*"],
};

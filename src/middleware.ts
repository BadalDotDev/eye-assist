import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routes } from "./constants/Routes";

const PUBLIC_PATHS = [routes.authSignin, routes.authSignup];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  // 🚫 If not logged in and trying to access protected route
  if (!token && !isPublic) {
    const loginUrl = new URL(routes.authSignin, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ If logged in and trying to access auth routes, redirect to home
  if (token && isPublic) {
    return NextResponse.redirect(new URL(routes.home, request.url));
  }

  // ✅ Otherwise, continue
  return NextResponse.next();
}

// This tells Next.js which routes to run the middleware on
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // Matches all routes except assets, API, favicon
};

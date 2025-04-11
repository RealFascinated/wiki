import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const before: number = Date.now();
  const response: NextResponse = NextResponse.next();
  if (process.env.NODE_ENV === "production") {
    const ip: string | null =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For");
    console.log(
      `${ip} | ${request.method} ${request.nextUrl.pathname} ${response.status} in ${(Date.now() - before).toFixed(0)}ms`
    );
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

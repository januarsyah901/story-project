import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/errors";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle API routes yang tidak ada
  if (pathname.startsWith("/api/")) {
    // Jika endpoint tidak ada, akan di-handle oleh Next.js
    // Tapi kita bisa menambahkan logging di sini
    console.log("API Request:", {
      method: request.method,
      pathname,
      timestamp: new Date().toISOString(),
    });
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};

// Helper untuk menangani method yang tidak diizinkan di API routes
export function handleMethodNotAllowed(allowedMethods: string[]) {
  const errorResponse = createErrorResponse({
    name: "MethodNotAllowedError",
    message: `Method tidak diizinkan. Gunakan: ${allowedMethods.join(", ")}`,
    statusCode: 405,
  } as any);

  return Response.json(errorResponse, {
    status: 405,
    headers: {
      Allow: allowedMethods.join(", "),
      "Content-Type": "application/json",
    },
  });
}

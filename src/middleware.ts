import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { NextResponse } from "next/server";

export default async function middleware(req: any) {
  try {
    const { pathname } = req.nextUrl;

    const user = req.cookies.get("sb-uvhvgcrczfdfvoujarga-auth-token");

    // add here those route which you want to protect
    const protectedPaths = ["/dashboard", "/private", "/settings", "/"];

    const isRootPath = pathname === "/";
    // Check if the current path is one of the protected paths
    const isProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    console.log(
      `Pathname: ${pathname}, IsRootPath: ${isRootPath}, IsProtectedPath: ${isProtectedPath}`
    );

    // Redirect to login if user is not authenticated and is trying to access a protected path
    if (
      (isRootPath || isProtectedPath) &&
      !user &&
      pathname !== "/login" &&
      pathname !== "/error"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Allow access to public routes or if the user is authenticated
    return NextResponse.next();
  } catch (error) {
    console.log("error in middleware", error);
  }
}

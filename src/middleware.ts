import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {jwtDecode } from "jwt-decode"; 

const commonAccessRoutes = ['/dashboard', '/dashboard/change-password'];

const roleBasedPrivateRoutes = {
    USER: [/^\/dashboard\/user/],
    AGENT: [/^\/dashboard\/agent/],
    ADMIN: [/^\/dashboard\/admin/],
    SUPER_ADMIN: [/^\/dashboard\/super_admin/],
};

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const accessToken = cookies().get('accessToken')?.value;
    if (!accessToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (commonAccessRoutes.includes(pathname)) {
        return NextResponse.next();
    }
    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }
    const role = decodedData?.role;
    type Role = keyof typeof roleBasedPrivateRoutes;
    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ["/dashboard/:path*"],
};

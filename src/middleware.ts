import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const token = await req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}
// export const config = {
//   matcher: [
//     // "/",
//     // "/home",
//     // "/profile",
//     // "/add-state",
//     // "/add-callerId",
//     // "/loop-states",
//     // "/profile:path*",
//   ],
// };

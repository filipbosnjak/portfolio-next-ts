import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_EMAIL,
  OAUTH_STATE_COOKIE,
  adminPath,
  googleClient,
  randomToken,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Starts the Google sign-in flow for the visits dashboard. */
export function GET(req: NextRequest) {
  if (!adminPath()) return new NextResponse(null, { status: 404 });

  const state = randomToken();
  const url = googleClient(req.nextUrl.origin).generateAuthUrl({
    scope: ["openid", "email"],
    state,
    prompt: "select_account",
    login_hint: ADMIN_EMAIL,
  });

  const res = NextResponse.redirect(url);
  res.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 600,
  });
  return res;
}

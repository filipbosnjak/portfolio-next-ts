import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_EMAIL,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  adminPath,
  createSessionToken,
  googleClient,
  sessionCookieOptions,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

const notFound = () => new NextResponse(null, { status: 404 });

export async function GET(req: NextRequest) {
  const path = adminPath();
  if (!path) return notFound();

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expectedState = req.cookies.get(OAUTH_STATE_COOKIE)?.value;
  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  const client = googleClient(req.nextUrl.origin);
  let email: string | undefined;
  let verified = false;
  try {
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token) throw new Error("No id_token in token response");
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    email = payload?.email?.toLowerCase();
    verified = payload?.email_verified === true;
  } catch (err) {
    console.error("Google sign-in failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Sign-in failed" }, { status: 400 });
  }

  // Anyone who is not the owner gets the same 404 as a wrong URL.
  if (!verified || email !== ADMIN_EMAIL) return notFound();

  const res = NextResponse.redirect(new URL(`/${path}`, req.nextUrl.origin));
  res.cookies.set(SESSION_COOKIE, createSessionToken(email), sessionCookieOptions());
  res.cookies.set(OAUTH_STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
  return res;
}

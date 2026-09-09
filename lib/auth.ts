import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { OAuth2Client } from "google-auth-library";
import { site } from "@/lib/site";

/** The only Google account allowed into the dashboard. */
export const ADMIN_EMAIL = site.email.toLowerCase();
export const SESSION_COOKIE = "admin_session";
export const OAUTH_STATE_COOKIE = "oauth_state";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function secret(): string {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

/** Secret URL segment for the dashboard, e.g. "v-abc123". Null disables the page. */
export function adminPath(): string | null {
  const p = process.env.ADMIN_PATH;
  return p && /^[a-z0-9-]{8,}$/i.test(p) ? p : null;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): { email: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const { email, exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof email !== "string" || typeof exp !== "number") return null;
    if (exp < Date.now() / 1000) return null;
    if (email.toLowerCase() !== ADMIN_EMAIL) return null;
    return { email };
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function randomToken(): string {
  return randomBytes(16).toString("base64url");
}

export function googleClient(origin: string): OAuth2Client {
  const clientId = process.env.GOOGLE_AUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_AUTH_CLIENT_ID / GOOGLE_AUTH_CLIENT_SECRET are not set");
  }
  return new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri: `${origin}/api/auth/google/callback`,
  });
}

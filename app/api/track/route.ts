import { NextResponse, after } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { looksLikeBot, recordDuration, recordVisit } from "@/lib/visits";

export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_DURATION_MS = 6 * 60 * 60 * 1000;

const ok = () => new NextResponse(null, { status: 204 });

function clientIp(headers: Headers): string | null {
  const fwd = headers.get("x-forwarded-for");
  const first = fwd?.split(",")[0]?.trim();
  return first || headers.get("x-real-ip") || null;
}

function decode(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function POST(req: Request) {
  // sendBeacon cannot set custom headers, so parse the body as text first.
  const raw = await req.text();
  if (raw.length > 4096) return ok();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return ok();
  }

  const visitId = typeof body.visitId === "string" ? body.visitId : "";
  if (!UUID.test(visitId)) return ok();

  // Never record the owner's own browsing.
  if (await getAdminSession()) return ok();

  if (body.type === "leave") {
    const durationMs = Number(body.durationMs);
    if (!Number.isFinite(durationMs) || durationMs < 0) return ok();
    const clamped = Math.min(Math.round(durationMs), MAX_DURATION_MS);
    after(() =>
      recordDuration(visitId, clamped).catch((err) =>
        console.error("track: duration failed:", err instanceof Error ? err.message : err),
      ),
    );
    return ok();
  }

  if (body.type !== "view") return ok();

  const userAgent = req.headers.get("user-agent");
  if (looksLikeBot(userAgent)) return ok();

  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";
  const path = typeof body.path === "string" ? body.path.slice(0, 512) : "";
  if (!sessionId || !path.startsWith("/")) return ok();
  const referrer =
    typeof body.referrer === "string" && body.referrer ? body.referrer.slice(0, 1024) : null;

  const h = req.headers;
  const visit = {
    visitId,
    sessionId,
    ip: clientIp(h),
    country: h.get("x-vercel-ip-country"),
    region: decode(h.get("x-vercel-ip-country-region")),
    city: decode(h.get("x-vercel-ip-city")),
    path,
    referrer,
    userAgent: userAgent?.slice(0, 512) ?? null,
  };

  after(() =>
    recordVisit(visit).catch((err) =>
      console.error("track: insert failed:", err instanceof Error ? err.message : err),
    ),
  );
  return ok();
}

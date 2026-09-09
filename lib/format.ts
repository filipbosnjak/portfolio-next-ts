const TZ = "Europe/Zagreb";

const dateTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const dayKey = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const shortDay = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "short",
});

export function formatDateTime(iso: string): string {
  return dateTime.format(new Date(iso));
}

/** Today's date in Zagreb as YYYY-MM-DD. */
export function todayKey(): string {
  return dayKey.format(new Date());
}

/** Returns the last `n` day keys (YYYY-MM-DD) ending today, oldest first. */
export function lastDays(n: number): string[] {
  const [y, m, d] = todayKey().split("-").map(Number);
  const end = Date.UTC(y, m - 1, d);
  return Array.from({ length: n }, (_, i) =>
    new Date(end - (n - 1 - i) * 86_400_000).toISOString().slice(0, 10),
  );
}

export function formatDayLabel(key: string): string {
  return shortDay.format(new Date(`${key}T00:00:00Z`));
}

export function formatDuration(ms: number | null): string {
  if (ms == null) return "–";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rest = s % 60;
  if (m < 60) return `${m}m ${rest.toString().padStart(2, "0")}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${(m % 60).toString().padStart(2, "0")}m`;
}

export function compact(n: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function referrerHost(ref: string | null): string {
  if (!ref) return "";
  try {
    return new URL(ref).host.replace(/^www\./, "");
  } catch {
    return ref;
  }
}

export function describeUserAgent(ua: string | null): string {
  if (!ua) return "–";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\//.test(ua)
      ? "Opera"
      : /Firefox\//.test(ua)
        ? "Firefox"
        : /Chrome\//.test(ua)
          ? "Chrome"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Other";
  const os = /iPhone|iPad/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Windows/.test(ua)
        ? "Windows"
        : /Mac OS X/.test(ua)
          ? "macOS"
          : /Linux/.test(ua)
            ? "Linux"
            : "";
  return os ? `${browser} · ${os}` : browser;
}

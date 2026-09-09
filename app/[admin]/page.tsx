import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SESSION_COOKIE, adminPath, getAdminSession } from "@/lib/auth";
import {
  compact,
  describeUserAgent,
  formatDateTime,
  formatDayLabel,
  formatDuration,
  lastDays,
  referrerHost,
} from "@/lib/format";
import { RETENTION_DAYS, loadDashboard, pruneOldVisits, type TopRow } from "@/lib/visits";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Visits",
  robots: { index: false, follow: false, nocache: true },
};

const RANGES = [7, 30, 90] as const;

type Props = {
  params: Promise<{ admin: string }>;
  searchParams: Promise<{ days?: string; ip?: string }>;
};

export default async function VisitsPage({ params, searchParams }: Props) {
  const { admin } = await params;
  const expected = adminPath();
  if (!expected || admin !== expected) notFound();

  const session = await getAdminSession();
  if (!session) return <SignIn />;

  const query = await searchParams;
  const days = RANGES.find((d) => String(d) === query.days) ?? 30;
  const ip = query.ip?.trim() || null;

  await pruneOldVisits();
  const data = await loadDashboard({ days, ip });

  const base = `/${admin}`;
  const href = (next: { days?: number; ip?: string | null }) => {
    const p = new URLSearchParams();
    const d = next.days ?? days;
    const i = next.ip === undefined ? ip : next.ip;
    if (d !== 30) p.set("days", String(d));
    if (i) p.set("ip", i);
    const qs = p.toString();
    return qs ? `${base}?${qs}` : base;
  };

  async function signOut() {
    "use server";
    (await cookies()).delete(SESSION_COOKIE);
    redirect("/");
  }

  const byDay = new Map(data.perDay.map((r) => [r.day, r]));
  const series = lastDays(days).map((day) => ({
    day,
    views: byDay.get(day)?.views ?? 0,
    visitors: byDay.get(day)?.visitors ?? 0,
  }));
  const max = Math.max(1, ...series.map((s) => s.views));

  return (
    <main className="ds-container py-10 text-white sm:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="ds-text-heading">Visits</h1>
          <p className="ds-text-caption mt-1 text-ds-description">
            Signed in as {session.email} · your own visits are not recorded while signed in
          </p>
        </div>
        <div className="flex items-center gap-2">
          <nav className="flex overflow-hidden rounded-full border border-ds-border-subtle bg-ds-surface-2">
            {RANGES.map((d) => (
              <Link
                key={d}
                href={href({ days: d })}
                className={`px-4 py-2 text-sm transition-colors ${
                  d === days ? "bg-ds-surface-5 text-white" : "text-ds-description hover:text-white"
                }`}
              >
                {d}d
              </Link>
            ))}
          </nav>
          <form action={signOut}>
            <button type="submit" className="ds-btn ds-btn-ghost px-4 py-2 text-sm">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {ip && (
        <p className="ds-text-caption mt-6 flex items-center gap-3 text-ds-secondary">
          <span>
            Filtered to IP <code className="font-mono text-white">{ip}</code>
          </span>
          <Link href={href({ ip: null })} className="text-ds-brand hover:underline">
            Clear
          </Link>
        </p>
      )}

      <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Page views" value={compact(data.stats.views)} />
        <Stat label="Unique IPs" value={compact(data.stats.visitors)} />
        <Stat label="Sessions" value={compact(data.stats.sessions)} />
        <Stat label="Avg. time on page" value={formatDuration(data.stats.avg_ms)} />
      </section>

      <Panel title={`Page views per day · last ${days} days`} className="mt-6">
        <DayChart series={series} max={max} />
        <details className="mt-3">
          <summary className="ds-text-caption cursor-pointer text-ds-description">
            Show as table
          </summary>
          <table className="ds-text-caption mt-2 w-full max-w-sm">
            <thead className="text-ds-description">
              <tr>
                <th className="py-1 text-left font-normal">Day</th>
                <th className="py-1 text-right font-normal">Views</th>
                <th className="py-1 text-right font-normal">IPs</th>
              </tr>
            </thead>
            <tbody>
              {series.map((s) => (
                <tr key={s.day} className="border-t border-ds-border">
                  <td className="py-1">{s.day}</td>
                  <td className="py-1 text-right tabular-nums">{s.views}</td>
                  <td className="py-1 text-right tabular-nums">{s.visitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </Panel>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Locations">
          <TopList rows={data.countries} />
        </Panel>
        <Panel title="Pages">
          <TopList rows={data.paths} />
        </Panel>
        <Panel title="Referrers">
          <TopList rows={data.referrers.map((r) => ({ ...r, key: referrerHost(r.key) || r.key }))} />
        </Panel>
      </section>

      <Panel title={`Recent visits · ${data.recent.length} shown`} className="mt-6">
        {data.recent.length === 0 ? (
          <p className="ds-text-caption text-ds-description">Nothing recorded yet.</p>
        ) : (
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="ds-text-caption w-full min-w-[820px]">
              <thead className="text-ds-description">
                <tr>
                  <Th>When</Th>
                  <Th>IP</Th>
                  <Th>Location</Th>
                  <Th>Page</Th>
                  <Th>Referrer</Th>
                  <Th>Client</Th>
                  <Th right>Time</Th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((v) => (
                  <tr key={v.id} className="border-t border-ds-border align-top">
                    <Td nowrap>{formatDateTime(v.created_at)}</Td>
                    <Td nowrap>
                      {v.ip ? (
                        <Link href={href({ ip: v.ip })} className="font-mono hover:text-ds-brand">
                          {v.ip}
                        </Link>
                      ) : (
                        "–"
                      )}
                    </Td>
                    <Td nowrap>{[v.city, v.region, v.country].filter(Boolean).join(", ") || "–"}</Td>
                    <Td>
                      <span className="font-mono">{v.path}</span>
                    </Td>
                    <Td>
                      <span title={v.referrer ?? undefined}>{referrerHost(v.referrer) || "–"}</span>
                    </Td>
                    <Td nowrap>
                      <span title={v.user_agent ?? undefined}>{describeUserAgent(v.user_agent)}</span>
                    </Td>
                    <Td right nowrap>
                      {formatDuration(v.duration_ms)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <p className="ds-text-caption mt-8 text-ds-placeholder">
        Visits older than {RETENTION_DAYS} days are deleted automatically. Times shown in
        Europe/Zagreb.
      </p>
    </main>
  );
}

function SignIn() {
  return (
    <main className="ds-container flex min-h-svh flex-col items-center justify-center text-center text-white">
      <h1 className="ds-text-heading">Visits</h1>
      <p className="ds-text-body mt-3 text-ds-description">Owner access only.</p>
      <a href="/api/auth/google" className="ds-btn ds-btn-primary ds-btn-m mt-8">
        Continue with Google
      </a>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ds-border bg-ds-surface-2 px-5 py-4">
      <p className="ds-text-caption text-ds-description">{label}</p>
      <p className="mt-1 font-sans text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Panel({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`rounded-2xl border border-ds-border bg-ds-surface-2 p-5 ${className}`}>
      <h2 className="ds-text-title mb-4">{title}</h2>
      {children}
    </section>
  );
}

function DayChart({
  series,
  max,
}: {
  series: { day: string; views: number; visitors: number }[];
  max: number;
}) {
  const ticks = max >= 2 ? [max, Math.round(max / 2), 0] : [max, 0];
  const labelEvery = series.length > 31 ? 15 : series.length > 7 ? 7 : 1;
  return (
    <div className="flex gap-3">
      <div className="ds-text-caption flex h-40 flex-col justify-between text-right text-ds-placeholder tabular-nums">
        {ticks.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative flex h-40 items-end gap-[2px] border-b border-ds-border-subtle">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-ds-border" />
          {series.map((s) => (
            <div
              key={s.day}
              title={`${formatDayLabel(s.day)}: ${s.views} views, ${s.visitors} IPs`}
              className="group flex h-full flex-1 items-end justify-center"
            >
              <div
                className="w-full max-w-6 rounded-t-[4px] bg-ds-brand transition-opacity group-hover:opacity-80"
                style={{ height: `${s.views > 0 ? Math.max(2, (s.views / max) * 100) : 0}%` }}
              />
            </div>
          ))}
        </div>
        <div className="ds-text-caption mt-1 flex gap-[2px] text-ds-placeholder">
          {series.map((s, i) => (
            <div key={s.day} className="flex-1 overflow-visible text-center whitespace-nowrap">
              {i % labelEvery === 0 ? formatDayLabel(s.day) : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopList({ rows }: { rows: TopRow[] }) {
  if (rows.length === 0) {
    return <p className="ds-text-caption text-ds-description">No data.</p>;
  }
  const max = Math.max(1, ...rows.map((r) => r.views));
  return (
    <ul className="ds-text-caption space-y-2">
      {rows.map((r) => (
        <li key={r.key} className="relative">
          <div
            className="absolute inset-y-0 left-0 rounded-[4px] bg-ds-brand/15"
            style={{ width: `${(r.views / max) * 100}%` }}
          />
          <div className="relative flex items-center justify-between gap-3 px-2 py-1">
            <span className="truncate" title={r.key}>
              {r.key}
            </span>
            <span className="shrink-0 text-ds-description tabular-nums">
              {r.views} <span className="text-ds-placeholder">/ {r.visitors} IPs</span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Th({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th className={`py-2 pr-4 font-normal ${right ? "text-right" : "text-left"}`}>{children}</th>
  );
}

function Td({
  children,
  right = false,
  nowrap = false,
}: {
  children: React.ReactNode;
  right?: boolean;
  nowrap?: boolean;
}) {
  return (
    <td
      className={`py-2 pr-4 ${right ? "text-right tabular-nums" : ""} ${nowrap ? "whitespace-nowrap" : ""}`}
    >
      {children}
    </td>
  );
}

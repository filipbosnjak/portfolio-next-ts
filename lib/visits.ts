import { ensureSchema, query, sql } from "@/lib/db";

export const RETENTION_DAYS = 90;

export type NewVisit = {
  visitId: string;
  sessionId: string;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  path: string;
  referrer: string | null;
  userAgent: string | null;
};

export type VisitRow = {
  id: number;
  visit_id: string;
  session_id: string;
  ip: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  duration_ms: number | null;
  created_at: string;
};

export type Stats = {
  views: number;
  visitors: number;
  sessions: number;
  avg_ms: number | null;
};

export type DayRow = { day: string; views: number; visitors: number };
export type TopRow = { key: string; views: number; visitors: number };

const BOT_UA =
  /bot|crawl|spider|slurp|fetch|monitor|headless|lighthouse|pingdom|curl\/|wget\/|python-requests|go-http-client|facebookexternalhit|preview/i;

export function looksLikeBot(userAgent: string | null): boolean {
  return !userAgent || BOT_UA.test(userAgent);
}

export async function recordVisit(v: NewVisit): Promise<void> {
  await ensureSchema();
  await sql()`
    insert into visits (visit_id, session_id, ip, country, region, city, path, referrer, user_agent)
    values (${v.visitId}, ${v.sessionId}, ${v.ip}, ${v.country}, ${v.region}, ${v.city},
            ${v.path}, ${v.referrer}, ${v.userAgent})
    on conflict (visit_id) do nothing`;
}

export async function recordDuration(visitId: string, durationMs: number): Promise<void> {
  await ensureSchema();
  await sql()`
    update visits
    set duration_ms = greatest(coalesce(duration_ms, 0), ${durationMs})
    where visit_id = ${visitId}`;
}

export async function pruneOldVisits(): Promise<void> {
  await ensureSchema();
  await sql()`delete from visits where created_at < now() - make_interval(days => ${RETENTION_DAYS})`;
}

export type Filter = { days: number; ip: string | null };

export async function loadDashboard(f: Filter) {
  await ensureSchema();
  const days = f.days;
  const ip = f.ip;

  const [stats, perDay, countries, paths, referrers, recent] = await Promise.all([
    query<Stats>`
      select count(*)::int as views,
             count(distinct ip)::int as visitors,
             count(distinct session_id)::int as sessions,
             avg(duration_ms)::int as avg_ms
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})`,
    query<DayRow>`
      select to_char((created_at at time zone 'Europe/Zagreb')::date, 'YYYY-MM-DD') as day,
             count(*)::int as views,
             count(distinct ip)::int as visitors
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})
      group by 1 order by 1`,
    query<TopRow>`
      select coalesce(nullif(city, '') || ', ', '') || coalesce(country, 'unknown') as key,
             count(*)::int as views, count(distinct ip)::int as visitors
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})
      group by 1 order by 2 desc limit 10`,
    query<TopRow>`
      select path as key, count(*)::int as views, count(distinct ip)::int as visitors
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})
      group by 1 order by 2 desc limit 10`,
    query<TopRow>`
      select referrer as key, count(*)::int as views, count(distinct ip)::int as visitors
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})
        and referrer is not null
      group by 1 order by 2 desc limit 10`,
    query<VisitRow>`
      select id, visit_id, session_id, ip, country, region, city, path, referrer, user_agent,
             duration_ms, created_at
      from visits
      where created_at > now() - make_interval(days => ${days})
        and (${ip}::text is null or ip = ${ip})
      order by created_at desc limit 150`,
  ]);

  return {
    stats: stats[0],
    perDay,
    countries,
    paths,
    referrers,
    recent,
  };
}

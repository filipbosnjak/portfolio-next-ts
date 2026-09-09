import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null = null;
let schemaReady: Promise<void> | null = null;

export function sql(): Sql {
  if (!client) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    client = neon(url);
  }
  return client;
}

/** Tagged-template query with a typed row result: query<Row>`select ...`. */
export function query<T>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  return sql()(strings, ...values) as unknown as Promise<T[]>;
}

/** Creates the visits table on first use. Safe to call on every request. */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = sql();
      await db`
        create table if not exists visits (
          id bigserial primary key,
          visit_id uuid not null unique,
          session_id text not null,
          ip text,
          country text,
          region text,
          city text,
          path text not null,
          referrer text,
          user_agent text,
          duration_ms integer,
          created_at timestamptz not null default now()
        )`;
      await db`create index if not exists visits_created_at_idx on visits (created_at desc)`;
      await db`create index if not exists visits_ip_idx on visits (ip)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

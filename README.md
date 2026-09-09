# Portfolio — filipbosnjak.dev

[Live link](https://www.filipbosnjak.dev)

Personal portfolio and blog built with [Next.js](https://nextjs.org/) (App Router) and [Tailwind CSS v4](https://tailwindcss.com/).

## Tech stack

- **Next.js 16** — App Router, React Server Components, `next/font`, Metadata API
- **React 19** + **TypeScript**
- **Tailwind CSS 4** — all styling (no Sass/CSS modules)
- **gray-matter** — front matter parsing for blog posts
- **googleapis** — contact form email delivery via the Gmail API
- **react-icons** — icon set

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  layout.tsx            # root layout, fonts, metadata
  page.tsx              # home page (hero, about, skills, works, contact)
  globals.css           # Tailwind theme tokens + background utilities
  blog/page.tsx         # blog index (static)
  blog/[slug]/page.tsx  # blog posts (SSG from posts/*.html)
  api/sendemail/        # contact form route handler (Gmail API)
components/             # UI components
lib/posts.ts            # blog post loading/parsing
posts/                  # blog posts as HTML with YAML front matter
images/                 # statically imported images (portrait, work previews)
public/images/          # CSS background images
```

## Blog posts

Add a post by dropping an `.html` file into `posts/` with YAML front matter
(`title`, `postTitle`, `shortIntro`, `description`, `author`, `date`, `slug`,
`minutes`, `tags`). Pages are statically generated at build time.

## Contact form email

The contact form sends mail through the Gmail API. Required env vars:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN` (one-time OAuth with scope `https://www.googleapis.com/auth/gmail.send`)

Optional: `GOOGLE_REDIRECT_URI`, `GMAIL_SENDER_EMAIL`.

## Visitor tracking dashboard

`components/VisitTracker.tsx` posts one page view per route change (and the time on
page on leave) to `app/api/track/`, which stores IP, Vercel geo headers (country,
region, city), path, referrer and user agent in a Neon Postgres table. Bots and the
signed-in owner are skipped; rows older than 90 days are pruned.

The dashboard lives at `/<ADMIN_PATH>` (`app/[admin]/page.tsx`) and requires a Google
sign-in with the owner's address (`app/api/auth/google/`). Every other path or account
gets a 404. Required env vars (see `.env.example`): `DATABASE_URL` (Neon integration),
`GOOGLE_AUTH_CLIENT_ID`, `GOOGLE_AUTH_CLIENT_SECRET`, `AUTH_SECRET`, `ADMIN_PATH`.

## Deploy

Deployed on [Vercel](https://vercel.com/). `pnpm build` produces the production build.

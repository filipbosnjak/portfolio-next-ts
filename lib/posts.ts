import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  author: string;
  date: string;
  description: string;
  label: string;
  postTitle: string;
  shortIntro: string;
  slug: string;
  title: string;
  minutes: number;
  tags: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".html"))
    .map((file) => file.replace(/\.html$/, ""));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.html`), "utf-8");
  const { data, content } = matter(raw);
  const meta = {
    ...(data as PostMeta),
    slug: data.slug ?? slug,
    // Front matter dates may parse as Date objects; keep them serializable.
    date: String(data.date ?? ""),
  };
  return { meta, content };
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs().map((slug) => getPost(slug).meta);
}

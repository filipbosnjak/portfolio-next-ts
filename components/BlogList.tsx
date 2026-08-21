"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CiTimer } from "react-icons/ci";
import type { PostMeta } from "@/lib/posts";
import Badge from "@/components/Badge";

const BlogList = ({ posts }: { posts: PostMeta[] }) => {
  const [currentTag, setCurrentTag] = useState("All");

  const tags = useMemo(
    () => ["All", ...new Set(posts.flatMap((post) => post.tags.split(", ")))],
    [posts],
  );

  const visiblePosts =
    currentTag === "All"
      ? posts
      : posts.filter((post) => post.tags.includes(currentTag));

  return (
    <div className="min-h-svh w-full pt-32 pb-24 md:pt-40">
      <div className="ds-container">
        <Badge>Writing</Badge>
        <h1 className="ds-text-heading mt-4 mb-3 text-white">Notes from the stack</h1>
        <p className="ds-text-body mb-10 max-w-[560px] text-ds-description">
          Java, Kotlin, Spring Boot, Node.js, and the rest of the workbench.
        </p>

        <div className="mb-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setCurrentTag(tag)}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors ${
                currentTag === tag
                  ? "border-white bg-white text-[#0a0a0a]"
                  : "border-white/15 text-ds-description hover:border-white/40 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {visiblePosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="ds-card block p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="ds-text-title text-white">{post.postTitle}</div>
              <div className="ds-text-body mt-2 text-ds-description">
                {post.shortIntro}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-ds-placeholder">
                <div>{post.tags}</div>
                <div className="flex items-center">
                  <CiTimer className="mr-1" />
                  {post.minutes} min
                </div>
                <div>{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;

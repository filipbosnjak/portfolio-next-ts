import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Filip Bošnjak's blog — Java, Kotlin, Spring Boot, Node.js, and software engineering articles.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  return (
    <>
      <Navbar />
      <BlogList posts={posts} />
      <Footer />
    </>
  );
}

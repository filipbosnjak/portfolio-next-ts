import type { Metadata } from "next";
import { CiTimer } from "react-icons/ci";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, getPostSlugs } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPost(slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const { meta, content } = getPost(slug);

  return (
    <>
      <Navbar />
      <div className="flex min-h-svh w-full justify-center pt-32 pb-24 md:pt-40">
        <article className="ds-container w-full">
          <div className="mx-auto max-w-[760px]">
            <h1 className="ds-text-hero text-center text-white">{meta.title}</h1>
            <div className="mt-8 mb-12 flex flex-col justify-center gap-1 text-ds-description md:flex-row md:gap-8">
              <div>Author: {meta.author}</div>
              <div>Date: {meta.date}</div>
              <div className="flex items-center justify-center gap-1">
                <CiTimer />
                {meta.minutes} min
              </div>
            </div>
            <div
              className="prose-post"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}

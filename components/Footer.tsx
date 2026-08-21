"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { site } from "@/lib/site";

const socials = [
  { label: "GitHub", href: site.github, icon: FaGithub },
  { label: "LinkedIn", href: site.linkedin, icon: FaLinkedin },
];

const Footer = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute top-20 left-0 z-0 h-[500px] w-full">
          <div className="absolute bottom-[-100px] left-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(103,153,254,0.12),transparent_70%)] opacity-30" />
          <div className="absolute bottom-[-50px] left-1/2 size-[700px] h-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(115,163,210,0.1),transparent_70%)] opacity-40" />
        </div>

        <section className="ds-container relative z-10 flex scroll-mt-[100px] flex-col items-center pt-40 pb-60 text-center">
          <h2 className="ds-text-heading text-white">Open to consulting work</h2>
          <p className="ds-text-body mt-5 max-w-[652px] text-ds-description">
            Available for freelance engagements on enterprise backends, modern
            web stacks, and applied AI. If a system needs to ship — and keep
            working — we should talk.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/#contact" className="ds-btn ds-btn-primary ds-btn-m">
              Contact me
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-secondary ds-btn-m"
            >
              View on GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="ds-btn ds-btn-secondary ds-btn-m"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </div>

      <footer className="ds-container pb-8">
        <div className="h-px w-full bg-ds-border-subtle" />
        <div className="flex flex-col items-center gap-4 pt-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:items-center">
          <div className="flex items-center gap-6 xl:justify-self-start">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ds-secondary transition-colors hover:text-white"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
          <p className="ds-text-caption text-center text-ds-description">
            &copy; {new Date().getFullYear()} · Designed & built by{" "}
            <Link href="/blog" className="text-white transition-opacity hover:opacity-70">
              {site.name}
            </Link>
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 xl:justify-self-end">
            <Link
              href="/#about"
              className="ds-text-caption whitespace-nowrap text-white transition-opacity hover:opacity-70"
            >
              About
            </Link>
            <span className="ds-text-caption text-ds-description">·</span>
            <Link
              href="/blog"
              className="ds-text-caption whitespace-nowrap text-white transition-opacity hover:opacity-70"
            >
              Blog
            </Link>
          </nav>
        </div>
      </footer>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0 })}
        className={`ds-btn ds-btn-secondary fixed right-6 bottom-6 z-50 size-11 p-0 ${
          visible ? "flex" : "hidden"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 19V5M12 5L6 11M12 5L18 11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
};

export default Footer;

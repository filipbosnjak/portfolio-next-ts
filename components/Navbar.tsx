"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { site } from "@/lib/site";

const links = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY >= 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeAndMaybeScrollHome = (href: string) => {
    setIsOpen(false);
    if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 mx-auto w-[min(100%-48px,1140px)] pt-2 min-[1560px]:w-[min(100%-160px,1280px)]">
        <div className={`header-bar ${isSticky ? "is-scrolled" : ""}`}>
          <Link
            href="/"
            onClick={() => closeAndMaybeScrollHome("/")}
            className="flex min-w-0 items-center gap-2 px-2 py-1 text-white"
          >
            <span className="font-display text-[15px] font-medium tracking-[-0.02em] sm:text-[16px]">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 text-[14px] font-medium text-ds-description transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="ml-1 flex size-9 items-center justify-center text-white transition-opacity hover:opacity-70"
            >
              <FaGithub className="text-lg" />
            </a>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex size-10 items-center justify-center text-white md:hidden"
          >
            <span className="flex w-[18px] flex-col gap-[5px]">
              <span
                className={`block h-px w-full bg-white transition-transform ${isOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-full bg-white transition-transform ${isOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ds-page transition-opacity duration-200 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <span className="font-display text-[15px] font-medium">{site.name}</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="flex size-10 items-center justify-center text-white"
          >
            <span className="relative block size-4">
              <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-white" />
              <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-white" />
            </span>
          </button>
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="border-b border-ds-divider py-6 text-[18px] font-medium text-white"
            >
              {label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="border-b border-ds-divider py-6 text-[18px] font-medium text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

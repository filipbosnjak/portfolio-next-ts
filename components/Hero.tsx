"use client";

import { useState } from "react";
import Atmosphere from "@/components/Atmosphere";
import ParticleMark from "@/components/ParticleMark";
import { site } from "@/lib/site";

const commands = {
  contact: `$ whoami
${site.name.toLowerCase()}

$ location
${site.location.toLowerCase()}

$ email
${site.email}`,
  stack: `$ stack --list
java / spring boot
kotlin / graphql
typescript / next.js
ai & machine learning`,
} as const;

type Tab = keyof typeof commands;

const tabs: { id: Tab; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "stack", label: "Stack" },
];

const linkItems = [
  { label: "View on GitHub", href: site.github, external: true },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "Read the blog", href: "/blog", external: false },
  { label: "Download CV", href: site.resume, external: false, download: true },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7 17L17 7M17 7H9M17 7V15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero = () => {
  const [tab, setTab] = useState<Tab>("contact");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands[tab]);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative flex min-h-svh w-full items-center overflow-hidden">
      <Atmosphere />
      <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
        <ParticleMark />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0a]/65 via-[#0a0a0a]/20 to-transparent md:from-[#0a0a0a]/55 md:via-[#0a0a0a]/10" />
      <div className="ds-container relative z-10 grid grid-cols-1 items-center gap-20 pt-40 pb-40 md:grid-cols-[60fr_40fr]">
        <div className="order-1 flex flex-col gap-10">
          <div
            className="hero-enter flex flex-col items-start gap-4"
            style={{ animationDelay: "0.05s" }}
          >
            <p className="pl-[3px] font-sans text-[16px] font-medium leading-none tracking-[-0.01em] text-white sm:text-[17px] md:text-[18px]">
              {site.name}
            </p>
            <h1 className="ds-text-hero text-white">
              Senior software
              <br />
              consultant.
            </h1>
          </div>

          <div
            className="hero-enter flex max-w-[580px] flex-col gap-2"
            style={{ animationDelay: "0.18s", ["--enter-y" as string]: "20px" }}
          >
            <p className="ds-text-body text-ds-description">
              Freelance specialist in enterprise-grade solutions — helping
              businesses ship reliable software.
            </p>
            <p className="ds-text-body text-ds-description">
              Java/Spring Boot, Kotlin/GraphQL, TypeScript/Next.js, and applied
              AI. Every capability is chosen to fit the system, not the other
              way around.
            </p>
          </div>

          <div
            className="hero-enter mt-2 hidden w-fit grid-cols-2 gap-[14px] md:grid"
            style={{ animationDelay: "0.32s" }}
          >
            {linkItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                {...(item.download ? { download: true } : {})}
                className="ds-btn ds-btn-text"
              >
                {item.label}
                <Arrow />
              </a>
            ))}
          </div>
        </div>

        <div
          className="hero-enter order-2 flex flex-col gap-3"
          style={{ animationDelay: "0.4s", ["--enter-y" as string]: "20px" }}
        >
          <div className="ml-[6px] flex gap-1 px-1">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`cursor-pointer rounded-t-[8px] border border-b-0 px-4 py-2 text-[13px] font-medium transition-all ${
                  tab === id
                    ? "border-white/[0.08] bg-black/20 text-white backdrop-blur-xl"
                    : "border-transparent bg-transparent text-ds-description hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="-mt-[13px] overflow-hidden rounded-[10px] border border-white/[0.08] bg-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-ds-border px-4 py-3">
              <div className="flex items-center gap-[7px]">
                <span className="size-[11px] rounded-full bg-[#ff5f57]" />
                <span className="size-[11px] rounded-full bg-[#febc2e]" />
                <span className="size-[11px] rounded-full bg-[#28c840]" />
              </div>
              <button
                type="button"
                onClick={copy}
                className="flex cursor-pointer items-center gap-2 text-[12px] text-ds-description transition-colors hover:text-white"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-5">
              <pre className="font-mono text-[14px] leading-relaxed whitespace-pre-wrap text-white">
                {commands[tab].split("\n").map((line, i) => (
                  <span key={i}>
                    {line.startsWith("$") ? (
                      <>
                        <span className="text-ds-brand select-none">$ </span>
                        {line.slice(2)}
                      </>
                    ) : (
                      line
                    )}
                    {i < commands[tab].split("\n").length - 1 ? "\n" : null}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>

        <div className="order-3 flex flex-wrap items-center gap-4 md:hidden">
          <a href="#contact" className="ds-btn ds-btn-primary ds-btn-m">
            Contact me
          </a>
          <a href={site.resume} download className="ds-btn ds-btn-secondary ds-btn-m">
            Download CV
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="ds-btn ds-btn-secondary ds-btn-m"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

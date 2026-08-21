import type { ReactNode } from "react";
import Image from "next/image";
import portrait from "@/images/portrait.jpg";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

function wholeYearsSinceAug2020(): number {
  const now = new Date();
  const months = (now.getFullYear() - 2020) * 12 + (now.getMonth() - 7);
  return Math.max(0, Math.floor(months / 12));
}

const cards = (
  experienceYears: number,
): { title: string; body: string; icon: ReactNode }[] => [
  {
    title: "Enterprise expertise",
    body: `${experienceYears}+ years of professional experience since August 2020 building scalable backend systems and full-stack applications.`,
    icon: (
      <svg aria-hidden width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="36" cy="36" r="1.5" fill="currentColor" />
        <ellipse
          cx="36"
          cy="36"
          rx="25"
          ry="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
          transform="rotate(90 36 36)"
        />
        <ellipse
          cx="36"
          cy="36"
          rx="25"
          ry="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
          transform="rotate(30 36 36)"
        />
        <ellipse
          cx="36"
          cy="36"
          rx="25"
          ry="11"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.7"
          transform="rotate(-30 36 36)"
        />
      </svg>
    ),
  },
  {
    title: "Technical leadership",
    body: "Proven track record in Java/Spring Boot, Kotlin/GraphQL, and modern web technologies — from architecture to delivery.",
    icon: (
      <svg aria-hidden width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="18" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="36" cy="10" r="4" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="58.5" cy="23" r="4" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="58.5" cy="49" r="4" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="36" cy="62" r="4" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="13.5" cy="49" r="4" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="13.5" cy="23" r="4" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    title: "Innovation focus",
    body: "Passionate about AI/ML applications and emerging technologies in software development, applied where they actually help.",
    icon: (
      <svg aria-hidden width="72" height="72" viewBox="0 0 72 72" fill="none">
        <rect x="18" y="22" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <rect x="18" y="41" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <rect x="37" y="41" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <rect
          x="37"
          y="22"
          width="15"
          height="15"
          rx="3"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeDasharray="2.5 2.5"
          opacity="0.45"
        />
        <rect x="47" y="12" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
  },
];

const About = () => {
  const experienceYears = wholeYearsSinceAug2020();
  const items = cards(experienceYears);

  return (
    <section id="about" className="ds-container scroll-mt-24 pt-20 pb-40">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
        <Reveal>
          <Image
            src={portrait}
            alt="Filip Bošnjak"
            className="size-[140px] rounded-[10px] object-cover md:size-[160px]"
            priority
          />
        </Reveal>
        <Reveal delay={40}>
          <Badge>Consultant = craft + systems</Badge>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="ds-text-heading text-white">
            <span
              className="inline-block -translate-y-[0.08em] align-middle font-[family-name:var(--font-host)] text-[34px] font-medium tracking-[0.04em] uppercase md:text-[50px]"
              style={{ WebkitTextStroke: "0.04em #0a0a0a" }}
            >
              Software
            </span>
            <br />
            that keeps businesses working in the real world
          </h2>
        </Reveal>
        <Reveal delay={140} className="flex max-w-[760px] flex-col">
          <p className="ds-text-body text-ds-description">
            Senior Software Consultant (freelance) specializing in
            enterprise-grade solutions and helping businesses achieve their
            goals.
          </p>
          <p className="ds-text-body text-ds-description">
            With a proven track record of delivering high-quality software
            solutions — and a Master&apos;s in Physics and Computer Science from{" "}
            <a
              href={site.university}
              target="_blank"
              rel="noreferrer"
              className="text-white transition-opacity hover:opacity-70"
            >
              University of Zagreb
            </a>
            .
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <div className="ds-card flex h-full flex-col items-center p-8 text-center">
              <div className="mb-4 text-white opacity-70">{item.icon}</div>
              <h3 className="ds-text-title mb-2 text-white">{item.title}</h3>
              <p className="ds-text-caption text-ds-description">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default About;

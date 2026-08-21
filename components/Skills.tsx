import type { IconType } from "react-icons";
import {
  SiSpringboot,
  SiTypescript,
  SiNextdotjs,
  SiTensorflow,
  SiKotlin,
  SiGraphql,
} from "react-icons/si";
import { FaBuffer, FaDatabase, FaPython } from "react-icons/fa";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";

type Skill = {
  title: string;
  body: string;
  icons: IconType[];
};

const skills: Skill[] = [
  {
    title: "Java & Spring Boot",
    body: "Enterprise backends, security, and production services built to last.",
    icons: [SiSpringboot],
  },
  {
    title: "Kotlin & GraphQL",
    body: "Typed APIs and services with Kotlin and Netflix DGS / GraphQL.",
    icons: [SiKotlin, SiGraphql],
  },
  {
    title: "TypeScript & Next.js",
    body: "Full-stack web apps with App Router, React, and a strict type system.",
    icons: [SiTypescript, SiNextdotjs],
  },
  {
    title: "Databases & Docker",
    body: "Schema design, persistence, and containers that ship the same everywhere.",
    icons: [FaDatabase],
  },
  {
    title: "Data structures & algorithms",
    body: "The fundamentals behind systems that stay fast as they grow.",
    icons: [FaBuffer],
  },
  {
    title: "AI and machine learning",
    body: "Practical ML and AI integrations — Python, TensorFlow, and applied models.",
    icons: [FaPython, SiTensorflow],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="ds-container scroll-mt-24 py-[120px]">
      <div className="grid w-full grid-cols-1 gap-16 md:grid-cols-[42fr_58fr]">
        <div>
          <Reveal>
            <Badge>The stack</Badge>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="ds-text-heading mt-4 mb-10 max-w-[680px] whitespace-pre-line text-white">
              Every capability is chosen.{"\n"}Every layer is intentional.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="ds-text-body max-w-[480px] text-ds-description">
              Pick the capability, compose it, keep the rest swappable. The
              stack is a set of modules — not a single lock-in.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skills.map(({ title, body, icons }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="ds-card flex h-full flex-col p-8">
                <div className="mb-5 flex items-center gap-2.5 text-white opacity-70">
                  {icons.map((Icon, index) => (
                    <Icon key={index} className="text-[28px]" />
                  ))}
                </div>
                <h3 className="ds-text-title mb-2 text-white">{title}</h3>
                <p className="ds-text-caption text-ds-description">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

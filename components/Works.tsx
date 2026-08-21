import Image, { type StaticImageData } from "next/image";
import auth from "@/images/works/auth.jpg";
import gameoflife from "@/images/works/gameoflife.png";
import crudhilla from "@/images/works/crudhilla.png";
import kotlingraphqlapi from "@/images/works/kotlingraphqlapi.png";
import electronwappbot from "@/images/works/electronwhatsappbot.png";
import apachekafkanodejs from "@/images/works/apachekafkanodejs.png";
import kotlinds from "@/images/works/kotlinds.png";
import javagmailreader from "@/images/works/javagmailreader.png";
import springsecurityjwt from "@/images/works/springsecurityjwt.png";
import chatApp from "@/images/works/chatApp.png";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

type Work = {
  title: string;
  stack: string;
  href: string;
  image: StaticImageData;
};

const works: Work[] = [
  {
    title: "Authentication & Registration",
    stack: "Next.js · TypeScript · Next-Auth · Prisma",
    href: "https://next-auth-starter-two.vercel.app/",
    image: auth,
  },
  {
    title: "Game of life",
    stack: "Next.js · TypeScript",
    href: "https://game-of-life-nextjs-ts.vercel.app/",
    image: gameoflife,
  },
  {
    title: "Simple CRUD App",
    stack: "React · Spring Boot · Hilla",
    href: "https://spring-boot-react-hilla-production.up.railway.app/",
    image: crudhilla,
  },
  {
    title: "Kotlin/GraphQL API Starter",
    stack: "Kotlin · GraphQL (DGS)",
    href: "https://github.com/filipbosnjak/kotlin-graphql-api",
    image: kotlingraphqlapi,
  },
  {
    title: "WhatsApp Bot with Electron",
    stack: "Electron · Vite · TypeScript",
    href: "https://github.com/filipbosnjak/wapp-bot1",
    image: electronwappbot,
  },
  {
    title: "Apache Kafka & Node.js",
    stack: "Apache Kafka · Node.js · TypeScript",
    href: "https://github.com/filipbosnjak/apache-kafka-typescript-node",
    image: apachekafkanodejs,
  },
  {
    title: "Data Structures in Kotlin",
    stack: "Kotlin",
    href: "https://github.com/filipbosnjak/kotlin-data-structures",
    image: kotlinds,
  },
  {
    title: "Gmail Reader in Java",
    stack: "Java · Gmail API",
    href: "https://github.com/filipbosnjak/java-gmail-reader",
    image: javagmailreader,
  },
  {
    title: "Spring Security & JWT",
    stack: "Java · Spring Security · JWT",
    href: "https://github.com/filipbosnjak/spring-security-jwt",
    image: springsecurityjwt,
  },
  {
    title: "Realtime Chat App",
    stack: "React · Firebase · Redux",
    href: "http://dominis.phy.hr/~fbosnjak/ChatApp/",
    image: chatApp,
  },
];

const Works = () => {
  return (
    <section id="works" className="ds-container scroll-mt-24 py-[120px]">
      <div className="flex flex-col items-start">
        <Reveal>
          <Badge>Selected work</Badge>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="ds-text-heading mt-4 mb-4 max-w-[680px] text-white">
            Projects that made it out of the editor.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="ds-text-body mb-14 max-w-[560px] text-ds-description">
            Frontend, backend, and the wiring in between. For more backend work,
            see{" "}
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-white transition-opacity hover:opacity-70"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map(({ title, stack, href, image }, i) => (
          <Reveal key={title} delay={(i % 3) * 80}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="ds-card group block overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="aspect-[8/5] overflow-hidden bg-ds-surface-3">
                <Image
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <h3 className="ds-text-title text-white">{title}</h3>
                <p className="ds-text-caption mt-1 text-ds-description">{stack}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Works;

import type { Metadata } from "next";
import { DM_Sans, Fragment_Mono, Host_Grotesk, Montserrat } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  weight: ["500", "600"],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--font-fragment",
  weight: "400",
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-host",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Filip Bošnjak",
    template: "%s | Filip Bošnjak",
  },
  description:
    "Filip Bošnjak — Senior Software Consultant. Full stack development, Java/Spring Boot, Kotlin/GraphQL, TypeScript/Next.js, AI and machine learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${montserrat.variable} ${fragmentMono.variable} ${hostGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

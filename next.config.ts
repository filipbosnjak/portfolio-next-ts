import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["googleapis"],
  turbopack: { root: __dirname },
};

export default nextConfig;

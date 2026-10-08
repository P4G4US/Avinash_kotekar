import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  typescript: { tsconfigPath: "tsconfig.pages.json" },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: { unoptimized: true },
};

export default nextConfig;

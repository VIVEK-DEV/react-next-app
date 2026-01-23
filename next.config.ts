import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // ✅ Add this line
  reactStrictMode: true,
};

export default nextConfig;

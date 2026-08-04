import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["localhost:3000", "192.168.1.25", "192.168.1.25:3000"],
};

export default nextConfig;

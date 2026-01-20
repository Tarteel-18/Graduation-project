import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the multiple lockfiles warning
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;

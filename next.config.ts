import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/conversation", destination: "/blueprint", permanent: true }];
  },
};

export default nextConfig;

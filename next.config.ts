import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/tools/transactions-terminal", destination: "/tools/transactions", permanent: false },
      { source: "/tools/line-intelligence", destination: "/tools/lines", permanent: false },
      { source: "/geography", destination: "/map", permanent: false },
    ];
  },
};

export default nextConfig;

const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // Required for monorepo / shared packages
  outputFileTracingRoot: path.resolve(__dirname, ".."),
};

module.exports = nextConfig;

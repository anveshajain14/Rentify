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
  serverExternalPackages: ["pdfkit", "fontkit"],
  webpack: (config) => {
    // Allow files imported from ../backend to resolve deps from frontend/node_modules
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      ...(config.resolve.modules || []),
    ];
    return config;
  },
};

module.exports = nextConfig;

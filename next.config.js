const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "auth-musketeers-lgl5ef.zitadel.cloud",
      },
    ],
  },
};

module.exports = nextConfig;

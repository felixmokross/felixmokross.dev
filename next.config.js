/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: ["ik.imagekit.io"],
  },
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
});

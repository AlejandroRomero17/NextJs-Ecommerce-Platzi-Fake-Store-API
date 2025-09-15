/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
  },
  pageExtensions: ["tsx", "jsx", "js", "ts"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

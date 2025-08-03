/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com', 'www.coingecko.com', 'coin-images.coingecko.com'],
  },
  experimental: {
    serverActions: {},
  },
  turbopack: {
    enabled: true
  }
};

module.exports = nextConfig;

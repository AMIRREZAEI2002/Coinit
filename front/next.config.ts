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
    appDir: true,
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
    future: { webpackBuild:  true }
  }
};

module.exports = nextConfig;

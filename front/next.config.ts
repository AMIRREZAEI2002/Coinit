/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: ['images.pexels.com', 'www.coingecko.com'],
  },
  experimental: {
    turbo: true,
    serverActions: true,
  },
};

module.exports = nextConfig;

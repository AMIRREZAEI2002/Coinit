// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
  
//   images: {
//     domains: ['your-domain.com'],
//   },
//   experimental: {
//     turbo: true,
//     serverActions: true,
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // فعال‌سازی پروفایل React برای تحلیل دقیق
    reactRoot: true,
    profiling: true,
  },
};

module.exports = nextConfig;

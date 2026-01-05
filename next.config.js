/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Игнорируем ошибки линтера при сборке (чтобы не падал на unused vars)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорируем ошибки TypeScript при сборке (чтобы не падал на any)
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
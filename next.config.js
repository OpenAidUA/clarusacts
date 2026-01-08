const withPWA = require('next-pwa').default;

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // Дополнительные настройки PWA можно добавить здесь
});

module.exports = nextConfig;

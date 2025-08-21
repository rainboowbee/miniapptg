/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['t.me', 'cdn4.telegram-cdn.org', 'cdn5.telegram-cdn.org'],
  },
}

module.exports = nextConfig

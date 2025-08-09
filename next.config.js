const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '127.0.0.1:3000',
        'optimizemyresume.pro',
        'www.optimizemyresume.pro'
      ]
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'optimizemyresume.pro',
      },
      {
        protocol: 'https',
        hostname: 'www.optimizemyresume.pro',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
}

module.exports = withNextIntl(nextConfig)
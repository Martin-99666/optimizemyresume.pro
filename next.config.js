/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 确保输出到 out 目录（Cloudflare Pages 默认期望的目录）
  distDir: '.next',
  assetPrefix: undefined,
}

module.exports = nextConfig
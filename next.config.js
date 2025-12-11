/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // For GitHub Pages: use 'export' for static export
  output: process.env.NEXT_OUTPUT || 'export',
  // GitHub Pages base path (empty string for root domain)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true, // Required for static export
  },
  // Production optimizations
  poweredByHeader: false,
  trailingSlash: false,
}

module.exports = nextConfig


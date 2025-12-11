/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'Portfolioterm'

const nextConfig = {
  reactStrictMode: true,
  // For GitHub Pages: use 'export' for static export
  output: isGithubPages || process.env.NEXT_OUTPUT === 'export' ? 'export' : undefined,
  // GitHub Pages base path (repository name for GitHub Pages, empty for custom domain)
  basePath: isGithubPages ? `/${repoName}` : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
  assetPrefix: isGithubPages ? `/${repoName}` : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
  images: {
    unoptimized: true, // Required for static export
  },
  // Production optimizations
  poweredByHeader: false,
  trailingSlash: true, // GitHub Pages works better with trailing slashes
}

module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only add basePath and assetPrefix if your repo name is NOT your-username.github.io
  // Replace 'your-repo-name' with your actual repository name
  basePath: process.env.NODE_ENV === 'production' ? '/blackbox' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/blackbox/' : '',
}

module.exports = nextConfig

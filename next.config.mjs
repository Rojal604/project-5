/** @type {import('next').NextConfig} */
const repoName = 'project-5';
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig

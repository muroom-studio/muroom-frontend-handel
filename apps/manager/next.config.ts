import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@muroom/ui', '@muroom/tailwind-config'],
};

export default nextConfig;

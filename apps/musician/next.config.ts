// next.config.ts
import type { NextConfig } from 'next';

import { BE_BASE_URL } from '@/config/constants';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      // -------------------------------------------------------
      // [개발 환경 스토리지]
      // -------------------------------------------------------
      {
        protocol: 'https',
        hostname: 'mr-dev-private-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mr-dev-public-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-dev-private-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-dev-public-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-bach-dev-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },

      // -------------------------------------------------------
      // [운영 환경 스토리지]
      // -------------------------------------------------------
      {
        protocol: 'https',
        hostname: 'mr-prod-private-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mr-prod-public-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-prod-private-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-prod-public-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'muroom-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${BE_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

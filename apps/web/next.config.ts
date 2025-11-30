import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    buildActivity: false, // 기존 빌드 인디케이터 (우측 하단 로딩) 끄기
    appIsrStatus: false, // ✨ [핵심] Next.js 15 추가: 정적 라우트 표시기 끄기
  },
};

export default nextConfig;

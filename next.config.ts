import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  // 성능 최적화 설정
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-markdown'],
  },
  
  // 이미지 최적화
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 컴프레션 활성화
  compress: true,
  
  // PoweredByHeader 제거 (보안)
  poweredByHeader: false,
  
  // 개발 환경에서 React Strict Mode 활성화
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);

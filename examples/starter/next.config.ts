import type { NextConfig } from 'next';
import './shop.config';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  outputFileTracingIncludes: {
    '/': ['shop.config.js'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/*': ['./prisma/**/*'],
      '/api/**/*': ['./prisma/**/*'],
      '/result/**/*': ['./prisma/**/*'],
      '/apply/**/*': ['./prisma/**/*']
    }
  }
};

export default nextConfig;

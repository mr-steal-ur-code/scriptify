/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixed: moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['@prisma/client'],
  output: 'standalone',
  images: {
    domains: ['i.pravatar.cc'],
  },
  // Add this to fix CSS loading in Docker
  trailingSlash: false,

  // Turbopack configuration (replaces webpack config when using --turbopack)
  turbopack: {
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    resolveAlias: {
      // Add any path aliases here if needed
    },
  },

  // Keep webpack config for non-turbopack mode
  webpack: (config: { resolve: { fallback: any }; }, { isServer }: any) => {
    // Add any custom webpack configuration here
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
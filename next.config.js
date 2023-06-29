/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/workspaces',
        permanent: false,
      },
    ]
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'redux',],
    ignoreDuringBuilds: true,
  },

};

module.exports = nextConfig

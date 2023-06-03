/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/workspaces",
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all requests starting with /api
        destination: "http://localhost:4000/api/v1/api/:path*", // Proxy to the Node.js server
      },
    ];
  },
};

export default nextConfig;

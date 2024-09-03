/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all requests starting with /api
        destination: "http://localhost:3000/api/:path*", // Proxy to the Node.js server
      },
    ];
  },
};

export default nextConfig;

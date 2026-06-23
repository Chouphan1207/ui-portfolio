import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 70, 75],
  },
  // Add this line to allow your local network IP
  allowedDevOrigins: ['192.168.0.47'],
};

export default nextConfig;

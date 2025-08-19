import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "export",
  webpack: (config) => {
    config.resolve.alias['@'] = './src';
    config.module.rules.push({
      test: /\.json$/,
      type: "javascript/auto",
      include: path.resolve(__dirname, "data"),
    });
    return config;
  },
};

export default nextConfig;

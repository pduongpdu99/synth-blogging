import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: "javascript/auto",
      include: path.resolve(__dirname, "data"),
    });
    return config;
  },
};

export default nextConfig;

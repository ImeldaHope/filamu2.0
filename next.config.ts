import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */

const nextConfig: NextConfig = {
  images: {    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.themoviedb.org",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);

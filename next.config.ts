import type { NextConfig } from "next";
import path from "node:path";
import {
  CITIES_HUB_PATH,
  RETIRED_CITY_LANDER_REDIRECTS,
} from "./lib/landers";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep resolution inside this repo (parent /Users/navszt lockfile exists).
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return Object.entries(RETIRED_CITY_LANDER_REDIRECTS).map(
      ([source, destination]) => ({
        source,
        destination: destination || CITIES_HUB_PATH,
        permanent: true,
      }),
    );
  },
};

export default nextConfig;

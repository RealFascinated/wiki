import nextMDX from "@next/mdx";

import { recmaPlugins } from "./src/lib/mdx/recma.js";
import { rehypePlugins } from "./src/lib/mdx/rehype.js";
import { remarkPlugins } from "./src/lib/mdx/remark.js";
import withSearch from "./src/lib/mdx/search.js";

const withMDX = nextMDX({
  options: {
    remarkPlugins,
    rehypePlugins,
    recmaPlugins,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        hostname: "cdn.fascinated.cc",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default withSearch(withMDX(nextConfig));

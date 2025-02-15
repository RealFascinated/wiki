import nextMDX from "@next/mdx";

import { recmaPlugins } from "./src/mdx/recma.js";
import { rehypePlugins } from "./src/mdx/rehype.js";
import { remarkPlugins } from "./src/mdx/remark.js";
import withSearch from "./src/mdx/search.js";

const withMDX = nextMDX({
	options: {
		remarkPlugins,
		rehypePlugins,
		recmaPlugins,
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
	images: {
		remotePatterns: [
			{
				hostname: "s40vlb3kca.ufs.sh",
				pathname: "/f/*",
			},
		],
	},
};

export default withSearch(withMDX(nextConfig));

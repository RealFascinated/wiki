import * as mdxComponents from "@/components/mdx/mdx";
import { type MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    ...mdxComponents,
  };
}

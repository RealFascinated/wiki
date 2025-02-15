import { type Section } from "@/provider/section-provider";
import glob from "fast-glob";

import { Layout } from "./client-layout";

export default async function DocsLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  let pages = await glob("**/*.mdx", { cwd: "src/app/(docs)" });
  let allSectionsEntries = (await Promise.all(
    pages.map(async filename => [
      "/" + filename.replace(/(^|\/)page\.mdx$/, ""),
      (await import(`./${filename}`)).sections,
    ])
  )) as Array<[string, Array<Section>]>;
  let allSections = Object.fromEntries(allSectionsEntries);

  return (
    <div className="w-full">
      <Layout allSections={allSections}>{props.children}</Layout>
    </div>
  );
}

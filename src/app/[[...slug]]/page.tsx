import DocsFooter from "@/components/docs-footer";
import Embed from "@/components/embed";
import { CustomMDX } from "@/components/mdx";
import OnThisPage from "@/components/on-this-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import config from "@/config";
import { getDocsContent } from "@/lib/mdx";
import { capitalizeWords } from "@/lib/string";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactElement } from "react";

/**
 * The page to render the documentation markdown content.
 *
 * @param params the url params
 */
const DocsPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<ReactElement> => {
  const slug: string = (((await params).slug as string[]) || undefined)?.join(
    "/"
  );

  // Get the content to display based on the provided slug
  const pages: DocsContentMetadata[] = await getDocsContent();
  const decodedSlug: string = decodeURIComponent(slug || "");
  const page: DocsContentMetadata | undefined = pages.find(
    (metadata: DocsContentMetadata): boolean =>
      metadata.slug === (decodedSlug || pages[0].slug)
  );
  if (!page) {
    notFound();
  }
  const splitSlug: string[] = page.slug?.split("/") || [];

  return (
    <main className="w-full flex flex-col">
      {/* Breadcrumb */}
      <Breadcrumb className="pt-4 pb-3 select-none">
        <BreadcrumbList>
          {splitSlug
            .slice(0, -1)
            .map((part: string, index: number): ReactElement => {
              const slug: string = splitSlug
                .slice(1, index + 2) // Include one more to account for the index shift
                .join("/");
              return (
                <div className="flex items-center" key={part}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={slug} draggable={false}>
                      {capitalizeWords(part)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < splitSlug.length - 1 && ( // Adjusted to avoid separator after the last breadcrumb
                    <BreadcrumbSeparator className="pl-1.5" />
                  )}
                </div>
              );
            })}
          <BreadcrumbItem className="text-primary">
            <BreadcrumbLink href="#" draggable={false}>
              {page.title}{" "}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Content */}
      <div className="flex gap-5 justify-between">
        <div className="flex flex-col">
          <CustomMDX source={page.content} />
        </div>
        <div className="hidden xl:flex">
          <OnThisPage page={page} />
        </div>
      </div>
      <div className="mt-auto">
        <DocsFooter pages={pages} />
      </div>
    </main>
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata | undefined> => {
  const slug: string = (((await params).slug as string[]) || undefined)?.join(
    "/"
  );
  if (slug) {
    const pages: DocsContentMetadata[] = await getDocsContent();
    const decodedSlug: string = decodeURIComponent(slug || "");
    const page: DocsContentMetadata | undefined = pages.find(
      (metadata: DocsContentMetadata): boolean =>
        metadata.slug === (decodedSlug || pages[0].slug)
    );
    if (page) {
      return Embed({
        title: page.title,
        description: page.summary,
        thumbnail: config.ogApiUrl.replace("{title}", page.title),
      });
    }
  }
};

export default DocsPage;

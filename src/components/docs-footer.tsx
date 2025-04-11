"use client";

import SimpleTooltip from "@/components/simple-tooltip";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

const DocsFooter = ({
  pages,
}: {
  pages: DocsContentMetadata[];
}): ReactElement => {
  const path: string = decodeURIComponent(usePathname());

  const current: number = pages.findIndex(
    (page: DocsContentMetadata) =>
      (path === "/" && page.slug === pages[0].slug) || path === `/${page.slug}`
  );
  const previous: DocsContentMetadata | undefined =
    current > 0 ? pages[current - 1] : undefined;
  const next: DocsContentMetadata | undefined =
    current < pages.length - 1 ? pages[current + 1] : undefined;

  const [updatedDate, setUpdatedDate] = useState<string | null>(
    DateTime.fromISO(pages[current]?.updated).toRelative()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatedDate(DateTime.fromISO(pages[current]?.updated).toRelative());
    }, 1000);
    return () => clearInterval(interval);
  }, [current, pages]);

  return (
    <footer className="xs:mx-5 sm:mx-10 my-2 flex flex-col select-none transition-all transform-gpu">
      {/* updated Date */}
      <div className="ml-auto pt-4">
        <SimpleTooltip
          content={`Last updated on ${DateTime.fromISO(
            pages[current]?.updated
          ).toLocaleString(DateTime.DATETIME_MED)}`}
        >
          <span className="text-xs sm:text-sm opacity-75 transition-all transform-gpu">
            Updated {updatedDate}
          </span>
        </SimpleTooltip>
      </div>

      {/* Pages */}
      {previous || next ? (
        <Separator className="my-4 dark:bg-separator-gradient" />
      ) : undefined}
      <div className="flex justify-between text-xs sm:text-base">
        {/* Previous */}
        {previous && (
          <Link
            className="flex gap-2 items-end hover:opacity-75 transition-all transform-gpu group"
            href={`/${previous.slug}` || "#"}
            draggable={false}
          >
            <ChevronLeft className="pb-1 w-4 h-4 group-hover:-translate-x-0.5 transition-all transform-gpu" />
            <div className="flex flex-col">
              <h1 className="text-sm opacity-75">Previous</h1>
              <p>{previous.title}</p>
            </div>
          </Link>
        )}

        {/* Next */}
        {next && (
          <Link
            className="ml-auto flex gap-2 items-end hover:opacity-75 transition-all transform-gpu group"
            href={`/${next.slug}` || "#"}
            draggable={false}
          >
            <div className="flex flex-col">
              <h1 className="text-sm opacity-75">Next</h1>
              <p>{next.title}</p>
            </div>
            <ChevronRight className="pb-1 w-4 h-4 group-hover:translate-x-0.5 transition-all transform-gpu" />
          </Link>
        )}
      </div>
    </footer>
  );
};
export default DocsFooter;

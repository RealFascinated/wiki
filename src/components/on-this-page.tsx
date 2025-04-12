"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import config from "@/config";
import { truncateText } from "@/lib/string";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { AlignLeftIcon, ArrowUpFromDot, MoveRight } from "lucide-react";
import Link from "next/link";
import { ReactElement, useEffect, useRef, useState } from "react";

type Header = {
  id: string;
  text: string;
  level: number;
};

const OnThisPage = ({ page }: { page: DocsContentMetadata }): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [activeHeader, setActiveHeader] = useState<string | undefined>(
    undefined
  );
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    // Regular expression to match markdown headers
    const headerRegex: RegExp = /^(#{1,6})\s+(.*)$/gm;
    const extractedHeaders: Header[] = [];

    let match;
    while ((match = headerRegex.exec(page.content)) !== null) {
      const level: number = match[1].length; // The number of # symbols determines the header level
      const text: string = match[2].trim().replace(/<[^>]*>/g, "");
      const id: string = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      extractedHeaders.push({ id, text, level });
    }

    setHeaders(extractedHeaders);
    setLoading(false);
  }, [page.content]);

  useEffect(() => {
    // Cleanup existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setActiveHeader(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0.1 }
    );
    observerRef.current = observer;

    // Observe all header elements
    headers.forEach((header: Header) => {
      const element: HTMLElement | null = document.getElementById(header.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headers]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-[7.5rem] w-52 max-h-[calc(100vh-3.5rem)] flex flex-col gap-2 text-sm select-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Title */}
      <div className="flex gap-2.5 items-center">
        <AlignLeftIcon className="w-5 h-5" />
        <h1>On This Page</h1>
      </div>

      {/* Headers */}
      <ul className="relative">
        {loading ? (
          <Skeleton className="w-full h-5 bg-accent rounded-lg" />
        ) : headers.length === 0 ? (
          <span className="opacity-75">Nothing ):</span>
        ) : (
          headers.map((header: Header) => (
            <li
              key={header.id}
              className={cn(
                "hover:opacity-80 transition-all transform-gpu relative",
                activeHeader === header.id
                  ? "font-semibold text-primary"
                  : "opacity-65"
              )}
              style={{
                paddingLeft: `${(header.level - 1) * 16}px`,
              }}
            >
              {/* Indentation */}
              {header.level > 1 && (
                <div
                  className="absolute left-0 top-0 bottom-0 border-l border-accent"
                  style={{
                    left: `${(header.level - 2) * 16 + 4}px`,
                  }}
                />
              )}

              {/* Header */}
              <Link
                href={`#${header.id}`}
                draggable={false}
                className="block py-1"
              >
                {truncateText(header.text, 28)}
              </Link>
            </li>
          ))
        )}
      </ul>

      {/* Footer */}
      <div>
        <Separator className="mt-1 mb-3.5 dark:bg-separator-gradient" />
        <Footer page={page} />
      </div>
    </motion.div>
  );
};

const Footer = ({ page }: { page: DocsContentMetadata }): ReactElement => {
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="flex flex-col opacity-75">
      {/* Edit on Git */}
      <Link
        className="flex gap-1.5 items-center text-xs hover:opacity-75 transition-all transform-gpu group"
        href={config.contentEditUrl
          .replace("{slug}", page.slug as string)
          .replace("{ext}", page.extension as string)}
        target="_blank"
        draggable={false}
      >
        <span>Edit this page on GitHub</span>
        <MoveRight className="w-4 h-4 group-hover:translate-x-px transition-all transform-gpu" />
      </Link>

      {/* Scroll to Top */}
      <div
        className={cn(
          "transition-opacity transform-gpu",
          hasScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Button
          className="p-0 justify-start flex gap-1.5 items-center text-xs hover:bg-transparent hover:opacity-75 transition-all transform-gpu group"
          variant="ghost"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span>Scroll to Top</span>
          <ArrowUpFromDot className="w-4 h-4 group-hover:-translate-y-px transition-all transform-gpu" />
        </Button>
      </div>
    </footer>
  );
};

export default OnThisPage;

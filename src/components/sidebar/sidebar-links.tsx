"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useMemo, useState } from "react";

const SidebarLinks = ({
  pages,
}: {
  pages: DocsContentMetadata[];
}): ReactElement => {
  const tree = useMemo(() => buildTree(pages), [pages]);
  return (
    <div className="flex flex-col gap-1">
      {Object.values(tree).map((node: TreeNode) => (
        <CategoryItem key={node.slug} pages={pages} node={node} />
      ))}
    </div>
  );
};

type TreeNode = {
  title: string;
  slug: string;
  isFolder: boolean;
  children: Record<string, TreeNode>;
};

const CategoryItem = ({
  pages,
  node,
  depth = 0,
  isLast = true,
}: {
  pages: DocsContentMetadata[];
  node: TreeNode;
  depth?: number;
  isLast?: boolean;
}) => {
  const path = decodeURIComponent(usePathname());
  const active =
    (path === "/" && node.slug === pages[0].slug) || path === `/${node.slug}`;
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = Object.keys(node.children).length > 0;

  return (
    <div className={cn(`relative select-none`, depth > 0 && "ml-3")}>
      {/* Indentation */}
      {depth > 0 && (
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 border-l border-accent",
            active && "border-primary"
          )}
        />
      )}

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Trigger */}
        <CollapsibleTrigger asChild>
          <Link href={node.isFolder ? "#" : `/${node.slug}`} draggable={false}>
            <Button
              className={cn(
                `relative w-full px-2 h-auto min-h-9 py-1.5 hover:bg-accent/35 hover:opacity-90 text-left`,
                node.isFolder ? "mb-0.5 text-sm font-semibold" : "text-sm lg:text-sm",
                depth > 0 && "pl-4",
                active && "text-primary/95 font-semibold hover:text-primary"
              )}
              variant="ghost"
            >
              <div className="flex items-start justify-between w-full gap-2">
                <span className="flex-1 break-words whitespace-normal">{node.title}</span>
                {hasChildren && (
                  <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 self-start mt-0.5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            </Button>
          </Link>
        </CollapsibleTrigger>

        {/* Content */}
        <AnimatePresence initial={false}>
          {hasChildren && isOpen && (
            <CollapsibleContent forceMount>
              <motion.div
                className="relative overflow-hidden"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                  },
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                {Object.values(node.children).map((child, index, array) => (
                  <CategoryItem
                    key={child.slug}
                    pages={pages}
                    node={child}
                    depth={depth + 1}
                    isLast={index === array.length - 1}
                  />
                ))}
              </motion.div>
            </CollapsibleContent>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
};

const buildTree = (pages: DocsContentMetadata[]): Record<string, TreeNode> => {
  const tree: Record<string, TreeNode> = {};

  pages.forEach((page: DocsContentMetadata) => {
    const parts: string[] | undefined = page.slug?.split("/");
    let currentLevel = tree;

    parts?.forEach((part: string, index: number) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {
          title: part,
          slug: parts.slice(0, index + 1).join("/"),
          isFolder: index < parts.length - 1,
          children: {},
        };
      }
      if (index === parts.length - 1) {
        currentLevel[part].title = page.title;
        currentLevel[part].isFolder = false;
      }
      currentLevel = currentLevel[part].children;
    });
  });
  return tree;
};

export default SidebarLinks;

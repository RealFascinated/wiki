"use client";

import { ReactElement, useMemo, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const SidebarLinks = ({
    pages,
}: {
    pages: DocsContentMetadata[];
}): ReactElement => {
    const tree = useMemo(() => buildTree(pages), [pages]);
    return (
        <>
            {Object.values(tree).map((node: TreeNode) => (
                <CategoryItem key={node.slug} node={node} />
            ))}
        </>
    );
};

type TreeNode = {
    title: string;
    slug: string;
    isFolder: boolean;
    children: Record<string, TreeNode>;
};

const CategoryItem = ({
    node,
    depth = 0,
    isLast = true,
}: {
    node: TreeNode;
    depth?: number;
    isLast?: boolean;
}) => {
    const path = usePathname();
    const active =
        (path === "/" && node.slug === "intro") || path === `/${node.slug}`;
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = Object.keys(node.children).length > 0;

    return (
        <div className={cn(`relative select-none`, depth > 0 && "ml-2.5")}>
            {/* Indentation */}
            {depth > 0 && (
                <div
                    className={cn(
                        "absolute left-0 bottom-0 border-l border-muted",
                        isLast ? "h-[32px]" : "h-[100%]",
                        active && "border-primary"
                    )}
                />
            )}

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                {/* Trigger */}
                <CollapsibleTrigger asChild>
                    <Link
                        href={node.isFolder ? "#" : `/${node.slug}`}
                        draggable={false}
                    >
                        <Button
                            className={cn(
                                `relative w-full px-1.5 h-8 text-base justify-between hover:bg-accent/20`,
                                depth > 0 && "pl-4",
                                active &&
                                    "text-primary/95 font-bold hover:text-primary"
                            )}
                            variant="ghost"
                        >
                            {node.title}
                            {hasChildren && (
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: isOpen ? 90 : 180 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </motion.div>
                            )}
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
                                {Object.values(node.children).map(
                                    (child, index, array) => (
                                        <CategoryItem
                                            key={child.slug}
                                            node={child}
                                            depth={depth + 1}
                                            isLast={index === array.length - 1}
                                        />
                                    )
                                )}
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

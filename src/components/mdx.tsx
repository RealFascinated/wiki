import ImageViewer from "@/components/image-viewer";
import { capitalizeWords } from "@/lib/string";
import { cn } from "@/lib/utils";
import {
  Activity,
  CircleAlert,
  Lightbulb,
  MessageSquareWarning,
  OctagonAlert,
  TriangleAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { isValidElement, ReactElement, ReactNode } from "react";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "remote-mdx/rsc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { getDocsContent } from "@/lib/mdx";

const RecentDocs = async (): Promise<ReactElement> => {
  const pages = await getDocsContent();
  const recentDocs = pages
    .filter((page) => page.title != "Welcome")
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
    .slice(0, 10);

  return (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
      {recentDocs.map((doc) => (
        <li key={doc.slug} className="leading-7 flex justify-between items-center">
          <Link href={`/${doc.slug}`} className="text-primary hover:text-primary/80 transition-colors underline underline-offset-4">
            {doc.title}
          </Link>
          <span className="text-muted-foreground text-sm">
            {new Date(doc.updated).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

const blockquoteStyles: { [key: string]: any } = {
  NOTE: {
    icon: <CircleAlert className="w-4 h-4" />,
    style: "text-[#0969DA] border-[#0969DA] bg-[#0969DA]/5",
  },
  TIP: {
    icon: <Lightbulb className="w-4 h-4" />,
    style: "text-[#1A7F37] border-[#1A7F37] bg-[#1A7F37]/5",
  },
  IMPORTANT: {
    icon: <MessageSquareWarning className="w-4 h-4" />,
    style: "text-[#8250DF] border-[#8250DF] bg-[#8250DF]/5",
  },
  WARNING: {
    icon: <TriangleAlert className="w-4 h-4" />,
    style: "text-[#9A6700] border-[#9A6700] bg-[#9A6700]/5",
  },
  CAUTION: {
    icon: <OctagonAlert className="w-4 h-4" />,
    style: "text-[#CF222E] border-[#CF222E] bg-[#CF222E]/5",
  },
};

/**
 * The MDX components to style.
 */
const components = {
  // Headings
  h1: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h1" size={1} className="text-3xl font-bold border-b border-border pb-3 mb-6">
      {children}
    </Heading>
  ),
  h2: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h2" size={2} className="text-2xl font-bold border-b border-border pb-3 mb-4">
      {children}
    </Heading>
  ),
  h3: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h3" size={3} className="text-xl font-bold">
      {children}
    </Heading>
  ),
  h4: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h4" size={4} className="text-lg font-bold">
      {children}
    </Heading>
  ),
  h5: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h5" size={5} className="text-base font-bold">
      {children}
    </Heading>
  ),
  h6: ({ children }: { children: ReactNode }): ReactElement => (
    <Heading as="h6" size={6} className="text-sm font-bold">
      {children}
    </Heading>
  ),

  // Text
  a: ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }): ReactElement => (
    <Link
      className="text-[#0969DA] hover:underline"
      href={href}
      draggable={false}
    >
      {children}
    </Link>
  ),
  p: ({ children }: { children: ReactNode }): ReactElement => (
    <p className="leading-7 [&:not(:first-child)]:mt-4">{children}</p>
  ),
  strong: ({ children }: { children: ReactNode }): ReactElement => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }): ReactElement => (
    <em className="italic">{children}</em>
  ),
  del: ({ children }: { children: ReactNode }): ReactElement => (
    <del className="line-through text-muted-foreground">{children}</del>
  ),

  // Lists
  ul: ({ children }: { children: ReactNode }): ReactElement => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }): ReactElement => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }): ReactElement => (
    <li className="leading-7">{children}</li>
  ),

  // Code
  code: ({ children, className }: { children: ReactNode; className?: string }): ReactElement => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        className="rounded-md my-4"
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          backgroundColor: "#0D1117",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className="relative rounded bg-[#0D1117] px-[0.3rem] py-[0.2rem] font-mono text-sm text-[#E6EDF3]">
        {children}
      </code>
    );
  },

  // Media
  img: ({ src, alt }: { src: string; alt: string }): ReactElement => (
    <ImageViewer className="my-6">
      <Image
        className="rounded-md ring-1 ring-border"
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        unoptimized
        draggable={false}
      />
    </ImageViewer>
  ),

  // Blockquotes
  blockquote: ({ children }: { children: ReactNode }): ReactElement => {
    const match = extractBlockQuoteText(children).match(
      /^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)]\s*(.*)/i
    );
    let style: any;
    if (!match || !(style = blockquoteStyles[match[1]])) {
      return (
        <blockquote className="mt-4 border-l-2 pl-4 italic text-muted-foreground">
          {children}
        </blockquote>
      );
    }
    return (
      <blockquote
        className={cn(
          "my-4 pl-4 py-3 flex flex-col gap-2 border-l-[3px] rounded-r-md",
          style.style
        )}
      >
        <h1 className="flex gap-2 items-center font-semibold">
          {style.icon}
          {capitalizeWords(match[1])}
        </h1>
        <p className="text-foreground opacity-85">{match[2]}</p>
      </blockquote>
    );
  },

  // Tables
  table: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <div className="my-4 w-full overflow-y-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <thead className="border-b bg-[#0D1117]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <tr className="m-0 border-t p-0 even:bg-[#0D1117]" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <th className="border px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children: ReactNode }): ReactElement => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </td>
  ),
  RecentDocs,
};

/**
 * The custom render for MDX.
 *
 * @param props the props for the MDX
 * @return the custom mdx
 */
export const CustomMDX = (props: any): ReactElement => (
  <MDXRemote
    {...props}
    components={{
      ...components,
      ...(props.components || {}),
      Link,
      Activity,
    }}
    options={{
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    }}
  />
);

/**
 * A heading component.
 *
 * @param as the type of heading
 * @param className the class name of the heading
 * @param size the size of the heading
 * @param children the children within the heading
 * @return the heading jsx
 */
const Heading = ({
  as: Component,
  className,
  size,
  children,
}: {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className: string;
  size: number;
  children: ReactNode;
}): ReactElement => {
  const id: string | undefined =
    typeof children === "string" ? slugify(children) : undefined;
  return (
    <Component
      id={id}
      className={cn(
        "py-3 font-bold select-none",
        size >= 2 && "pt-5",
        className
      )}
    >
      {children}
    </Component>
  );
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .trim();

const extractBlockQuoteText = (node: ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map(extractBlockQuoteText).join("");
  }
  if (isValidElement(node)) {
    const element = node as ReactElement<{ children: ReactNode }>;
    return extractBlockQuoteText(element.props.children);
  }
  return "";
};

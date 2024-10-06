import { ReactElement, ReactNode } from "react";
import { MDXRemote } from "remote-mdx/rsc";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";

/**
 * The MDX components to style.
 */
const components = {
    h1: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={1} className="text-4xl">
            {children}
        </Heading>
    ),
    h2: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={2} className="text-3xl">
            {children}
        </Heading>
    ),
    h3: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={3} className="text-2xl">
            {children}
        </Heading>
    ),
    h4: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={4} className="text-xl">
            {children}
        </Heading>
    ),
    h5: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={5} className="text-lg">
            {children}
        </Heading>
    ),
    h6: ({ children }: { children: ReactNode }): ReactElement => (
        <Heading size={5} className="text-md">
            {children}
        </Heading>
    ),
    a: ({
        href,
        children,
    }: {
        href: string;
        children: ReactNode;
    }): ReactElement => (
        <a
            className="text-minecraft-green-4 cursor-pointer hover:opacity-85 transition-all transform-gpu"
            href={href}
        >
            {children}
        </a>
    ),
    p: ({ children }: { children: ReactNode }): ReactElement => (
        <p className="leading-4 text-zinc-300/80">{children}</p>
    ),
    ul: ({ children }: { children: ReactNode }): ReactElement => (
        <ul className="px-3 list-disc list-inside">{children}</ul>
    ),
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
 * @param className the class name of the heading
 * @param size the size of the heading
 * @param children the children within the heading
 * @return the heading jsx
 */
const Heading = ({
    className,
    size,
    children,
}: {
    className: string;
    size: number;
    children: ReactNode;
}): ReactElement => (
    <h1 className={cn("pt-2.5 font-bold", size >= 2 && "pt-7", className)}>
        {children}
    </h1>
);

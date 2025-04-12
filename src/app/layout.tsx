import Footer from "@/components/footer";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import config from "@/config";
import { getDocsContent } from "@/lib/mdx";
import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { ReactElement, ReactNode } from "react";
import "./styles/globals.css";

/**
 * The metadata for this app.
 */
export const metadata: Metadata = config.metadata;
export const viewport: Viewport = config.viewport;

export const dynamic = "force-dynamic";

/**
 * The primary layout for this app.
 */
const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>): Promise<ReactElement> => {
  const pages: DocsContentMetadata[] = await getDocsContent();
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className="scroll-smooth antialiased"
          style={{
            background: "var(--background-gradient)",
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={100}>
              <div className="px-3 md:px-7 max-w-[1700px] min-h-screen mx-auto flex flex-col transition-transform">
                <Navbar pages={pages} />
                <div className="pt-[4.5rem] w-full h-full flex grow gap-5 sm:gap-8 transition-transform transform-gpu">
                  <div className="relative hidden md:flex">
                    <Sidebar pages={pages} />
                  </div>
                  {children}
                </div>
              </div>
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
};
export default RootLayout;

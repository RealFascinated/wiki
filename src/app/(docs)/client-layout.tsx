"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroPattern } from "@/components/hero-pattern";
import Logo from "@/components/logo";
import { Navigation } from "@/components/navigation";
import { SectionProvider, type Section } from "@/provider/section-provider";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export function Layout({
  children,
  allSections,
}: {
  children: React.ReactNode;
  allSections: Record<string, Array<Section>>;
}) {
  let pathname = usePathname();

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex">
              <Logo />
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>

        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">
            <HeroPattern />
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  );
}

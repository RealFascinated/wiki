"use client";

import QuickSearchDialog from "@/components/navbar/search-dialog";
import Sidebar from "@/components/sidebar/sidebar";
import SocialLink from "@/components/social-link";
import config from "@/config";
import { SocialLinkType } from "@/types/config";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement } from "react";

const Navbar = ({ pages }: { pages: DocsContentMetadata[] }): ReactElement => (
  <nav className="fixed left-0 inset-x-0 bg-white/95 dark:bg-white/[0.007] backdrop-saturate-100 backdrop-blur-xl border-b z-50">
    <div className="px-3 md:px-7 max-w-[1700px] mx-auto py-4 flex justify-between items-center transition-all transform-gpu">
      {/* Branding */}
      <Link
        className="flex gap-2 items-center hover:opacity-75 transition-all transform-gpu select-none"
        href="/"
        draggable={false}
      >
        <Image
          src="https://cdn.fascinated.cc/v3mcsT0F.jpg"
          alt={config.siteName}
          width={32}
          height={32}
          className="rounded-lg"
        />
        <h1 className="text-lg font-semibold">{config.siteName}</h1>
      </Link>

      {/* Right */}
      <div className="flex gap-5 sm:gap-7 items-center transition-all transform-gpu">
        {/* Search */}
        <div className="hidden md:flex">
          <QuickSearchDialog pages={pages} bindKeybind />
        </div>

        {/* Social */}
        <div className="flex gap-5 items-center">
          {config.socialLinks
            .filter((link: SocialLinkType) => link.navbar)
            .map((link: SocialLinkType) => (
              <SocialLink key={link.name} {...link} />
            ))}
        </div>

        {/* Mobile Sidebar */}
        <div className="flex md:hidden">
          <Sidebar pages={pages} />
        </div>
      </div>
    </div>
  </nav>
);
export default Navbar;

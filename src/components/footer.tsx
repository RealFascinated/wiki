"use client";

import SocialLink from "@/components/social-link";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import config from "@/config";
import { cn } from "@/lib/utils";
import { SocialLinkType } from "@/types/config";
import { ExternalLink } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ReactElement, ReactNode } from "react";

const Footer = (): ReactElement => (
  <footer className="relative mt-3 h-[19.5rem] md:h-[17rem] flex justify-center border-t border-zinc-700/75 overflow-hidden select-none">
    <div className="w-full md:max-w-[65rem]">
      <div className="px-5 py-5 md:py-10 w-full flex flex-col md:flex-row items-center justify-around md:items-start gap-7">
        {/* Top */}
        <div className="flex flex-col gap-2.5 items-center md:items-start">
          <Branding />

          {/* Socials */}
          <div className="pl-1 flex gap-2.5 items-center z-50">
            {config.socialLinks.map((link: SocialLinkType) => (
              <SocialLink key={link.name} className="w-5 h-5" {...link} />
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-7 md:gap-12 transition-all transform-gpu">
          {Object.entries(config.footer.links).map(([title, links]) => (
            <LinkCategory key={title} title={title}>
              {links.map(link => (
                <FooterLink key={link.name} {...link} />
              ))}
            </LinkCategory>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="absolute inset-x-0 bottom-3.5 flex text-sm text-center justify-center opacity-60">
        Copyright &copy; {new Date().getFullYear()} {config.siteName}. All
        rights reserved.
      </p>
    </div>

    {/* Background */}
    <AnimatedGridPattern
      className="inset-x-0 skew-y-12 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      numSquares={30}
      maxOpacity={0.1}
      duration={3}
      repeatDelay={1}
    />
  </footer>
);

const Branding = () => (
  <Link
    className="flex gap-3 items-center hover:opacity-75 transition-all transform-gpu"
    href={config.footer.homeUrl}
    draggable={false}
  >
    <Image
      src="https://cdn.fascinated.cc/v3mcsT0F.jpg"
      alt={`${config.siteName} Logo`}
      width={40}
      height={40}
      draggable={false}
      className="rounded-md"
    />
    <h1 className="text-xl font-bold">{config.siteName}</h1>
  </Link>
);

const LinkCategory = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactElement => (
  <div className="flex flex-col gap-0.5">
    <h1 className="text-lg font-semibold">{title}</h1>
    {children}
  </div>
);

const FooterLink = ({
  name,
  shortName,
  href,
}: {
  name: string;
  shortName?: string | undefined;
  href: string;
}): ReactElement => {
  const external: boolean = !href.startsWith("/");
  return (
    <Link
      className="flex gap-2 items-center hover:opacity-75 transition-all transform-gpu"
      href={href}
      target={external ? "_blank" : undefined}
      draggable={false}
    >
      <span className={cn("hidden sm:flex", !shortName && "flex")}>{name}</span>
      {shortName && <span className="flex sm:hidden">{shortName}</span>}
      {external && <ExternalLink className="w-3.5 h-3.5" />}
    </Link>
  );
};

export default Footer;

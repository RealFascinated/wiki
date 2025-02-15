export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

type SiteConfig = {
  /**
   * The name of the website.
   */
  websiteName: string;

  /**
   * The socials for the site.
   */
  socials: {
    discord: string;
    github: string;
  };

  /**
   * The navigation groups for the site.
   */
  navigation: Array<NavGroup>;
};

export const config: SiteConfig = {
  websiteName: "Fascinated's Wiki",
  socials: {
    discord: "https://discord.fascinated.cc",
    github: "https://github.com/realfascinated/wiki",
  },
  navigation: [
    {
      title: "Docker",
      links: [{ title: "Install Docker", href: "/docs/docker/install" }],
    },
  ],
};

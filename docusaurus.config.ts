import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Fascinated's Wiki",
  tagline: "Wiki for Homelabbers and related projects",
  favicon: "https://cdn.fascinated.cc/v3mcsT0F.jpg",

  // Set the production url of your site here
  url: "https://wiki.fascinated.cc",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "realfascinated", // Usually your GitHub org/user name.
  projectName: "wiki", // Usually your repo name.

  onBrokenLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    require.resolve("docusaurus-lunr-search"),
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],

  scripts: [
    {
      src: "https://analytics.fascinated.cc/script.js",
      defer: true,
      "data-website-id": "183f5103-6932-4764-8d56-cdb222b512ad",
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/realfascinated/wiki/tree/master",
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Fascinated's Wiki",
      logo: {
        alt: "Fascinated's Wiki Logo",
        src: "https://cdn.fascinated.cc/v3mcsT0F.jpg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "wikiSidebar",
          position: "left",
          label: "Wiki",
        },
        {
          type: "docSidebar",
          sidebarId: "homelabSidebar",
          position: "left",
          label: "Homelab",
        },
        {
          type: "docSidebar",
          sidebarId: "minecraftSidebar",
          position: "left",
          label: "Minecraft Archives",
        },
        {
          href: "https://github.com/realfascinated/wiki",
          label: "GitHub",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Wiki",
              to: "wiki/intro",
            },
            {
              label: "Minecraft Archives",
              to: "minecraft-archives/intro",
            },
            {
              label: "Homelab",
              to: "homelab/intro",
            },
            {
              label: "Homelab",
              to: "homelab/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.fascinated.cc",
            },
            {
              label: "GitHub",
              href: "https://github.com/realfascinated/wiki",
            },
          ],
        },
        {
          title: "Misc",
          items: [
            {
              label: "Status",
              href: "https://status.fascinated.cc/status/home",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fascinated.`,
    },
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        "bash",
        "docker",
        "yaml",
        "json",
        "typescript",
        "javascript",
      ],
    },
    metadata: [
      {
        name: "keywords",
        content:
          "wiki, homelab, documentation, guide, self-hosted, server, networking",
      },
      {
        name: "description",
        content:
          "Comprehensive wiki and documentation for homelabbers, covering server setup, networking, and self-hosted applications.",
      },
      { name: "author", content: "Fascinated" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Fascinated's Wiki" },
      {
        property: "og:description",
        content: "Wiki for Homelabbers and related projects",
      },
      {
        property: "og:image",
        content: "https://wiki.fascinated.cc/img/docusaurus-social-card.jpg",
      },
      { property: "og:url", content: "https://wiki.fascinated.cc" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    announcementBar: {
      id: "support_us",
      content:
        '⭐️ If you like this wiki, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/realfascinated/wiki">GitHub</a>!',
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
      isCloseable: true,
    },
    markdown: {
      hooks: {
        onBrokenMarkdownLinks: "warn",
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

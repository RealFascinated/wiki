import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Fascinated\'s Wiki',
  tagline: 'Wiki for Homelabbers and related projects',
  favicon: 'https://cdn.fascinated.cc/v3mcsT0F.jpg',

  // Set the production url of your site here
  url: 'https://wiki.fascinated.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'realfascinated', // Usually your GitHub org/user name.
  projectName: 'wiki', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/realfascinated/wiki/tree/master',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
          createSitemapItems: async (params) => {
            const {defaultCreateSitemapItems, ...rest} = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes('/page/'));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Fascinated\'s Wiki',
      logo: {
        alt: 'Fascinated\'s Wiki Logo',
        src: 'https://cdn.fascinated.cc/v3mcsT0F.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'wikiSidebar',
          position: 'left',
          label: 'Wiki',
        },
        {
          type: 'docSidebar',
          sidebarId: 'homelabSidebar',
          position: 'left',
          label: 'Homelab',
        },
        {
          type: 'docSidebar',
          sidebarId: 'toolsSidebar',
          position: 'left',
          label: 'Tools',
        },
        {
          href: 'https://github.com/realfascinated/wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Wiki',
              to: '/wiki/intro',
            },
            {
              label: 'Homelab',
              to: '/homelab/intro',
            },
            {
              label: 'Tools',
              to: '/tools/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.fascinated.cc',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/realfascinated/wiki',
            },
          ],
        },
        {
          title: 'Misc',
          items: [
            {
              label: 'Status',
              href: 'https://status.fascinated.cc/status/home',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fascinated.`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'docker', 'yaml', 'json'],
    },
    metadata: [
      {name: 'keywords', content: 'wiki, homelab, documentation, guide'},
    ],
  } satisfies Preset.ThemeConfig,
};

export default config;

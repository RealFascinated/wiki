import React, { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

type DocLink = { label: string; to: string } | { label: string; href: string };

type Section = {
  title: string;
  to: string;
  description: string;
  links: DocLink[];
};

const sections: Section[] = [
  {
    title: "Wiki",
    to: "/wiki/intro",
    description: "Guides for Linux and the things I self-host.",
    links: [
      { label: "Linux basics", to: "/wiki/linux/linux-basics" },
      {
        label: "Installing Docker on Ubuntu",
        to: "/wiki/docker/docker-installation-ubuntu-24.04",
      },
      {
        label: "Creating a systemd service",
        to: "/wiki/systemd/creating-a-systemd-service",
      },
      { label: "Cronjob examples", to: "/wiki/linux/cronjobs" },
      { label: "Gaming on CachyOS", to: "/wiki/cachyos/gaming/about" },
    ],
  },
  {
    title: "Homelab",
    to: "/homelab/intro",
    description: "The machines this site runs on, and what's on them.",
    links: [
      { label: "Proxmox server", to: "/homelab/server-builds/proxmox" },
      { label: "Unraid NAS", to: "/homelab/server-builds/unraid-nas" },
      { label: "Grafana", to: "/wiki/apps/grafana" },
      { label: "Uptime Kuma", to: "/wiki/apps/uptime-kuma" },
    ],
  },
  {
    title: "Minecraft Archives",
    to: "/minecraft-archives/intro",
    description: "Beta-era mods and resources I want to keep around.",
    links: [
      {
        label: "OptiFine for b1.7.3",
        to: "/minecraft-archives/mods/b1.7.3/optifine",
      },
    ],
  },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;

  return (
    <Layout
      title={siteConfig.title}
      description="Notes and guides for Linux, self-hosting, and a small Minecraft archive."
    >
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>
            Notes and guides for Linux, self-hosting, and a small Minecraft
            archive. Mostly written so I don't have to look things up twice.
          </p>
          <p className={styles.heroLinks}>
            <Link className={styles.buttonPrimary} to="/wiki/intro">
              Browse the wiki
            </Link>
            <Link className={styles.buttonSecondary} href={repoUrl}>
              GitHub
            </Link>
          </p>
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <div className={styles.sections}>
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className={styles.sectionTitle}>
                  <Link to={section.to}>{section.title}</Link>
                </h2>
                <p className={styles.sectionDescription}>
                  {section.description}
                </p>
                <ul className={styles.sectionLinks}>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {"to" in link ? (
                        <Link to={link.to}>{link.label}</Link>
                      ) : (
                        <Link href={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className={styles.note}>
            Something wrong or out of date?{" "}
            <Link href={`${repoUrl}/issues`}>Open an issue</Link> and I'll fix
            it.
          </p>
        </div>
      </main>
    </Layout>
  );
}

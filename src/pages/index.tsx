import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={styles.container}>
        <img
          src="https://cdn.fascinated.cc/v3mcsT0F.jpg"
          alt="Fascinated's Wiki Logo"
          className={styles.heroLogo}
        />
        <Heading as="h1" className={styles.hero__title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.hero__subtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              styles.button,
              styles["button--primary"],
              styles["button--lg"]
            )}
            to="/wiki/intro"
          >
            Get Started →
          </Link>
          <Link
            className={clsx(
              styles.button,
              styles["button--secondary"],
              styles["button--lg"]
            )}
            to={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <Feature
            title="Comprehensive Guides"
            description="Detailed documentation covering various aspects of homelabbing, from basic setup to advanced configurations."
          />
          <Feature
            title="Open Source"
            description="All content is open source and community-driven. Feel free to contribute and improve the documentation."
          />
          <Feature
            title="Regular Updates"
            description="Content is regularly updated to keep up with the latest technologies and best practices."
          />
        </div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <Heading as="h2" className="text--center">
          Quick Links
        </Heading>
        <div className={clsx("row", styles.quickLinksContainer)}>
          <div className="col col--4">
            <Link to="/wiki/Linux/linux-basics" className={styles.quickLink}>
              <div className={styles.quickLinkContent}>
                <Heading as="h3">Linux Basics</Heading>
                <p>Learn about Linux administration and configuration</p>
              </div>
            </Link>
          </div>
          <div className="col col--4">
            <Link to="/wiki/Linux/cronjobs" className={styles.quickLink}>
              <div className={styles.quickLinkContent}>
                <Heading as="h3">Cron Jobs</Heading>
                <p>Schedule and manage automated tasks</p>
              </div>
            </Link>
          </div>
          <div className="col col--4">
            <Link to="/wiki/intro" className={styles.quickLink}>
              <div className={styles.quickLinkContent}>
                <Heading as="h3">Getting Started</Heading>
                <p>Begin your homelab journey</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Modern Documentation`}
      description="A modern, beautiful documentation site built with Docusaurus"
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <QuickLinksSection />
      </main>
    </Layout>
  );
}

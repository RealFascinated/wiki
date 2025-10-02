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
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.hero__title}>
              Welcome to Fascinated's Wiki
            </Heading>
            <p className={styles.hero__subtitle}>
              Your comprehensive guide to homelabbing, Linux administration, and
              system automation
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx(
                  styles.button,
                  styles["button--primary"],
                  styles["button--lg"]
                )}
                to="/wiki/intro"
              >
                Start Learning →
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
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.cardIcon}>📚</div>
              <h3>Comprehensive Guides</h3>
              <p>From basics to advanced configurations</p>
            </div>
            <div className={styles.heroCard}>
              <div className={styles.cardIcon}>⚡</div>
              <h3>Quick Solutions</h3>
              <p>Fast answers to common problems</p>
            </div>
            <div className={styles.heroCard}>
              <div className={styles.cardIcon}>🔧</div>
              <h3>Practical Tips</h3>
              <p>Real-world examples and best practices</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
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
        <div className={styles.sectionHeader}>
          <Heading as="h2">Why Choose Our Wiki?</Heading>
          <p>
            Everything you need to master homelabbing and system administration
          </p>
        </div>
        <div className="row">
          <Feature
            title="Comprehensive Guides"
            description="Detailed documentation covering various aspects of homelabbing, from basic setup to advanced configurations."
            icon="📖"
          />
          <Feature
            title="Open Source"
            description="All content is open source and community-driven. Feel free to contribute and improve the documentation."
            icon="🤝"
          />
          <Feature
            title="Regular Updates"
            description="Content is regularly updated to keep up with the latest technologies and best practices."
            icon="🔄"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A comprehensive wiki for homelab enthusiasts, featuring guides on Linux administration, automation, and system configuration."
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
      </main>
    </Layout>
  );
}

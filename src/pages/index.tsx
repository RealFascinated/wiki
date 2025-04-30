import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.container}>
        <Heading as="h1" className={styles.hero__title}>
          {siteConfig.title}
        </Heading>
        <p className={styles.hero__subtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className={clsx(styles.button, styles['button--secondary'])}
            to="/docs/wiki/intro">
            Get Started →
          </Link>
          <Link
            className={clsx(styles.button, styles["button--secondary"])}
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

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Modern Documentation`}
      description="A modern, beautiful documentation site built with Docusaurus">
      <HomepageHeader />
      <main>
        {/* Add more sections here if needed */}
      </main>
    </Layout>
  );
}

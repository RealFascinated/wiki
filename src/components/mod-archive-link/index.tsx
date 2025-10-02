import React from 'react';
import styles from './styles.module.css';

export default function ModArchiveLink({ href, text, info }: { href: string, text: string, info?: string }) {
  return (
    <div className={styles.modArchiveBanner}>
      <a href={href} className={styles.navLink}>
        <span className={styles.modArchiveText}>{text}</span>
      </a>
      {info && <div className={styles.modArchiveInfo}>{info}</div>}
    </div>
  );
} 
import React from 'react';
import styles from './styles.module.css';

export default function NavBanner({ href, text }: { href: string; text: string }) {
  return (
    <div className={styles.navBanner}>
      <a href={href} className={styles.navLink}>
        <span className={styles.navIcon}>←</span>
        <span className={styles.navText}>{text}</span>
      </a>
    </div>
  );
} 
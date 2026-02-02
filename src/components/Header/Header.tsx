'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Interview Setup' },
    { href: '/interview', label: 'Practice' },
    { href: '/results', label: 'Results' },
    { href: '/summary', label: 'Summary' }
  ];

  // Hide header on interview page
  if (pathname?.startsWith('/interview')) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎯</span>
          <span className={styles.logoText}>TechPrepAI</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn}>
            <span>🌙</span>
          </button>
          <button className={styles.iconBtn}>
            <span>⚙️</span>
          </button>
          <div className={styles.avatar}>
            <span>C</span>
          </div>
        </div>
      </div>
    </header>
  );
}

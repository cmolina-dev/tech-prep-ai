'use client';

import { useRouter } from 'next/navigation';
import SummaryMetrics from '@/components/SummaryMetrics';
import PerformanceChart from '@/components/PerformanceChart/PerformanceChart';
import SessionQuestions from '@/components/SessionQuestions';
import { performanceHistory } from '@/data/mockData';
import styles from './page.module.css';

export default function SessionSummary() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Session Summary</h1>
          <p className={styles.subtitle}>Great job! Here is how you performed in your latest mock interview.</p>
        </div>
        <button className={styles.compareBtn}>
          Compare with Previous
        </button>
      </header>

      <div className={styles.content}>
        <SummaryMetrics />
        
        <PerformanceChart data={performanceHistory} />
        
        <SessionQuestions />
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Want to try again? <button className={styles.linkBtn} onClick={() => router.push('/')}>Start a new practice session</button></p>
      </div>
    </div>
  );
}

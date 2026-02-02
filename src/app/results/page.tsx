'use client';

import { useRouter } from 'next/navigation';
import AnalysisMetrics from '@/components/AnalysisMetrics';
import TranscriptPanel from '@/components/TranscriptPanel';
import FeedbackPanel from '@/components/FeedbackPanel';
import styles from './page.module.css';

export default function AnalysisResults() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <button className={styles.backBtn} onClick={() => router.push('/')}>
            ← Back to Dashboard
          </button>
        </div>
        
        <h1 className={styles.title}>Analysis Results</h1>
        
        <div className={styles.questionBar}>
          <p className={styles.questionText}>
            <span className={styles.questionLabel}>Question 3:</span> Explain the concept of dependency injection and its benefits in testing.
          </p>
          <div className={styles.actions}>
            <button className={styles.retryBtn}>↺ Retry</button>
            <button className={styles.nextBtn} onClick={() => router.push('/summary')}>
              Next Question →
            </button>
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        <AnalysisMetrics />

        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <TranscriptPanel />
          </div>
          <div className={styles.rightColumn}>
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

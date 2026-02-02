'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SummaryMetrics from '@/components/SummaryMetrics';
import PerformanceChart from '@/components/PerformanceChart/PerformanceChart';
import SessionQuestions from '@/components/SessionQuestions';
import { performanceHistory } from '@/data/mockData'; // Keep this for now or fetch extended history
import styles from './page.module.css';

function SessionSummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
        // If no session, maybe just load generic/mock or redirect
        // For now, let's try to load a default if testing, or just set loading false
        setLoading(false);
        return;
    }

    async function fetchSummary() {
        try {
            const res = await fetch(`/api/session/${sessionId}/summary`);
            if (res.ok) {
                const data = await res.json();
                setSummaryData(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    fetchSummary();
  }, [sessionId]);

  if (loading) return <div className={styles.container}>Loading summary...</div>;

  // Use real data or fallback to empty state
  const stats = summaryData?.stats || { overallScore: 0 };
  const questions = summaryData?.questions || [];

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
        <SummaryMetrics stats={stats} />
        
        <PerformanceChart data={performanceHistory} />
        
        <SessionQuestions questions={questions} />
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Want to try again? <button className={styles.linkBtn} onClick={() => router.push('/')}>Start a new practice session</button></p>
      </div>
    </div>
  );
}

export default function SessionSummary() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SessionSummaryContent />
        </Suspense>
    );
}

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SummaryMetrics from '@/components/SummaryMetrics';
import PerformanceChart from '@/components/PerformanceChart/PerformanceChart';
import SessionQuestions from '@/components/SessionQuestions';
import { performanceHistory } from '@/data/mockData'; // Keep this for now or fetch extended history


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

  if (loading) return <div className="min-h-screen bg-background text-white p-10">Loading summary...</div>;

  // Use real data or fallback to empty state
  const stats = summaryData?.stats || { overallScore: 0 };
  const questions = summaryData?.questions || [];

  return (
    <div className="min-h-screen bg-background text-white p-10">
      <header className="max-w-[1000px] mx-auto mb-10 flex justify-between items-center md:flex-row flex-col max-md:items-start max-md:gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Session Summary</h1>
          <p className="text-slate-400 text-base m-0">Great job! Here is how you performed in your latest mock interview.</p>
        </div>
        <button className="bg-blue-500 text-white border-none font-semibold py-3 px-5 rounded-md text-sm cursor-pointer shadow-md transition-colors hover:bg-blue-600">
          Compare with Previous
        </button>
      </header>

      <div className="max-w-[1000px] mx-auto">
        <SummaryMetrics stats={stats} />
        
        <PerformanceChart data={performanceHistory} />
        
        <SessionQuestions questions={questions} />
      </div>

      <div className="text-center mt-16 mb-8">
        <p className="text-slate-400 text-sm">Want to try again? <button className="bg-transparent border-none text-blue-500 font-medium cursor-pointer p-0 text-sm ml-1 hover:underline" onClick={() => router.push('/')}>Start a new practice session</button></p>
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

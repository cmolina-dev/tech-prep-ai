'use client';

import { useRouter } from 'next/navigation';
import AnalysisMetrics from '@/components/AnalysisMetrics';
import TranscriptPanel from '@/components/TranscriptPanel';
import FeedbackPanel from '@/components/FeedbackPanel';


export default function AnalysisResults() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <header className="mb-8 max-w-[1200px] mx-auto">
        <div className="mb-4">
          <button className="bg-transparent border-none text-slate-400 text-sm cursor-pointer p-0 flex items-center gap-2 hover:text-white transition-colors" onClick={() => router.push('/')}>
            ← Back to Dashboard
          </button>
        </div>
        
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Analysis Results</h1>
        
        <div className="flex justify-between items-center border-b border-white/10 pb-6">
          <p className="text-slate-400 text-base m-0">
            <span className="text-blue-500 font-semibold mr-2">Question 3:</span> Explain the concept of dependency injection and its benefits in testing.
          </p>
          <div className="flex gap-4">
            <button className="bg-white/10 border-none rounded-md text-white px-4 py-2 font-medium cursor-pointer transition-colors hover:bg-white/20">↺ Retry</button>
            <button className="bg-blue-500 border-none rounded-md text-white px-5 py-2 font-semibold cursor-pointer transition-colors hover:bg-blue-600" onClick={() => router.push('/summary')}>
              Next Question →
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto">
        <AnalysisMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          <div>
            <TranscriptPanel />
          </div>
          <div>
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

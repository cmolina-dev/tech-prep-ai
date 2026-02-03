'use client';

import { PerformanceDataPoint } from '@/data/mockData';


interface PerformanceChartProps {
  data: PerformanceDataPoint[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const maxScore = 100;
  const minScore = 60; // Fixed baseline for better visual
  const range = maxScore - minScore;

  const getY = (score: number) => {
    return 100 - ((score - minScore) / range) * 100;
  };

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = getY(d.score);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 mb-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-white text-base font-semibold mb-1 m-0">Performance Trend</h3>
          <p className="text-slate-400 text-xs m-0">Fluency & Technical Accuracy over last 5 sessions</p>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-slate-400 text-xs"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Fluency</span>
          <span className="flex items-center gap-2 text-slate-400 text-xs"><span className="w-2 h-2 rounded-full bg-slate-600"></span> Avg.</span>
        </div>
      </div>
      
      <div className="relative h-[200px] w-full">
        <svg className="w-full h-full visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#areaGradient)"
            points={areaPoints}
          />
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            points={points}
          />
        </svg>
        
        {/* X Axis Labels */}
        <div className="flex justify-between mt-4 px-[10px]">
          <span className="text-slate-500 text-xs">Session 1</span>
          <span className="text-slate-500 text-xs">Session 2</span>
          <span className="text-slate-500 text-xs">Session 3</span>
          <span className="text-slate-500 text-xs">Session 4</span>
          <span className="text-blue-500 text-xs font-semibold">Current</span>
        </div>
      </div>
    </div>
  );
}

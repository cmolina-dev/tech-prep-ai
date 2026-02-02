'use client';

import { PerformanceDataPoint } from '@/data/mockData';
import styles from './PerformanceChart.module.css';

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
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Performance Trend</h3>
          <p className={styles.subtitle}>Fluency & Technical Accuracy over last 5 sessions</p>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.dotFluency}></span> Fluency</span>
          <span className={styles.legendItem}><span className={styles.dotAvg}></span> Avg.</span>
        </div>
      </div>
      
      <div className={styles.chartArea}>
        <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none">
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
        <div className={styles.xAxis}>
          <span className={styles.xLabel}>Session 1</span>
          <span className={styles.xLabel}>Session 2</span>
          <span className={styles.xLabel}>Session 3</span>
          <span className={styles.xLabel}>Session 4</span>
          <span className={styles.xLabelActive}>Current</span>
        </div>
      </div>
    </div>
  );
}

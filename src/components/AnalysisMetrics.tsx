import styles from './AnalysisMetrics.module.css';

interface MetricCardProps {
  title: string;
  value: number;
  trend: number;
  label: string;
}

function MetricCard({ title, value, trend, label }: MetricCardProps) {
  const isPositive = trend > 0;
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {/* Placeholder for icon/chart */}
        <div className={styles.iconPlaceholder} />
      </div>
      <div className={styles.content}>
        <div className={styles.valueRow}>
          <span className={styles.value}>{value}%</span>
          <span className={`${styles.trend} ${isPositive ? styles.positive : styles.negative}`}>
            {isPositive ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        </div>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}

export default function AnalysisMetrics() {
  const metrics = [
    { title: 'PRONUNCIATION', value: 88, trend: 5, label: 'Clear articulation, minor stress errors.' },
    { title: 'GRAMMAR ACCURACY', value: 95, trend: -2, label: 'Mostly correct, watch subject-verb agreement.' },
    { title: 'FLUENCY RATING', value: 92, trend: 4, label: 'Good pacing, few hesitation markers.' },
  ];

  return (
    <div className={styles.container}>
      {metrics.map((m) => (
        <MetricCard key={m.title} {...m} />
      ))}
    </div>
  );
}

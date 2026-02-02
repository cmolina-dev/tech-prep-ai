import styles from './SummaryMetrics.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: string;
  colorClass: string;
  changeLabel?: string;
}

function MetricCard({ title, value, change, icon, colorClass, changeLabel }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={`${styles.icon} ${styles[colorClass]}`}>{icon}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        {change && (
          <span className={styles.change}>
            {change}
            {changeLabel && <span className={styles.changeLabel}>{changeLabel}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

interface SummaryMetricsProps {
    stats: {
        overallScore?: number;
        accuracy?: number;
        // extended stats
    }
}

export default function SummaryMetrics({ stats }: SummaryMetricsProps) {
  return (
    <div className={styles.grid}>
      <MetricCard
        title="Fluency Score"
        value={`${stats.overallScore || 0}/100`}
        change="-"
        icon="🔊"
        colorClass="blue"
      />
      <MetricCard
        title="Grammar Accuracy"
        value="N/A"
        change="-"
        icon="Aq"
        colorClass="blue"
      />
      <MetricCard
        title="Technical Clarity"
        value="N/A"
        change="-"
        icon="⚙️"
        colorClass="blue"
        changeLabel="" 
      />
    </div>
  );
}

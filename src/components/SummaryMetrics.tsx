import styles from './SummaryMetrics.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  scoreValue?: string; // For "8/10" vs "92%" vs "High"
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

export default function SummaryMetrics() {
  return (
    <div className={styles.grid}>
      <MetricCard
        title="Fluency Score"
        value="8/10"
        change="↗ 10%"
        icon="🔊"
        colorClass="blue"
      />
      <MetricCard
        title="Grammar Accuracy"
        value="92%"
        change="↗ 5%"
        icon="Aq"
        colorClass="blue"
      />
      <MetricCard
        title="Technical Clarity"
        value="High"
        change="Consistent"
        icon="⚙️"
        colorClass="blue"
        changeLabel="" // Just displaying "Consistent" with checkmark essentially
      />
    </div>
  );
}

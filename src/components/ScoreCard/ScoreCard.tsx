'use client';

import styles from './ScoreCard.module.css';

interface ScoreCardProps {
  score: number;
  label: string;
  category: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ScoreCard({ score, label, category, color = '#22c55e', size = 'medium' }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`${styles.card} ${styles[size]}`}>
      <div className={styles.circleWrapper}>
        <svg className={styles.circle} viewBox="0 0 100 100">
          <circle
            className={styles.bg}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
          />
          <circle
            className={styles.progress}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              stroke: color
            }}
          />
        </svg>
        <div className={styles.scoreText}>
          <span className={styles.scoreValue}>{score}%</span>
          <span className={styles.badge} style={{ backgroundColor: `${color}20`, color }}>
            {label}
          </span>
        </div>
      </div>
      <p className={styles.category}>{category}</p>
    </div>
  );
}

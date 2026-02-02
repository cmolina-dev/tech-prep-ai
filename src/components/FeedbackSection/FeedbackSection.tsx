'use client';

import { useState } from 'react';
import { FeedbackItem } from '@/data/mockData';
import styles from './FeedbackSection.module.css';

interface FeedbackSectionProps {
  feedback: FeedbackItem;
}

export default function FeedbackSection({ feedback }: FeedbackSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (feedback.type) {
      case 'strength':
        return '✓';
      case 'improvement':
        return '!';
      case 'suggestion':
        return '💡';
      default:
        return '•';
    }
  };

  const getTypeLabel = () => {
    switch (feedback.type) {
      case 'strength':
        return 'Strength';
      case 'improvement':
        return 'Area for Improvement';
      case 'suggestion':
        return 'Suggestion';
      default:
        return '';
    }
  };

  return (
    <div className={`${styles.section} ${styles[feedback.type]}`}>
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.iconWrapper}>
          <span className={styles.icon}>{getIcon()}</span>
        </div>
        <div className={styles.info}>
          <span className={styles.typeLabel}>{getTypeLabel()}</span>
          <h4 className={styles.title}>{feedback.title}</h4>
        </div>
        <button className={styles.expandBtn}>
          <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </button>
      </div>
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        <p className={styles.description}>{feedback.content}</p>
        {feedback.details && feedback.details.length > 0 && (
          <ul className={styles.details}>
            {feedback.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

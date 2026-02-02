'use client';

import Image from 'next/image';
import { InterviewPath } from '@/data/mockData';
import styles from './PathCard.module.css';

interface PathCardProps {
  path: InterviewPath;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PathCard({ path, isSelected, onSelect }: PathCardProps) {
  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <div className={styles.imageContainer}>
        <Image
          src={path.image}
          alt={path.title}
          fill
          className={styles.image}
          unoptimized
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{path.title}</h3>
            {isSelected && (
              <div className={styles.checkmark}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <p className={styles.description}>{path.description}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.topics}>
            {path.topics.map((topic, index) => (
              <span key={index} className={styles.topic}>
                {topic}
              </span>
            ))}
          </div>
          {isSelected && (
            <span className={styles.activeLabel}>Active Path</span>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PathCard from '@/components/PathCard';
import { interviewPaths, difficultyOptions } from '@/data/mockData';
import styles from './page.module.css';

export default function InterviewSetup() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<string>('backend');
  const [difficulty, setDifficulty] = useState('mid');
  const [sessionMode, setSessionMode] = useState<'mock' | 'practice'>('mock');

  const handleStartSession = () => {
    router.push('/interview');
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Interview Setup</h1>
        <p className={styles.pageSubtitle}>
          Configure your practice session parameters to simulate real-world scenarios.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Select Path</h2>
            <span className={styles.stepIndicator}>STEP 1 OF 2</span>
          </div>
          <div className={styles.pathList}>
            {interviewPaths.map((path) => (
              <PathCard
                key={path.id}
                path={path}
                isSelected={selectedPath === path.id}
                onSelect={() => setSelectedPath(path.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Configuration</h2>
            <span className={styles.stepIndicator}>STEP 2 OF 2</span>
          </div>

          <div className={styles.configCard}>
            <div className={styles.configSection}>
              <div className={styles.configLabel}>
                <span className={styles.configIcon}>🎚️</span>
                Difficulty Level
              </div>
              <div className={styles.difficultyList}>
                {difficultyOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`${styles.difficultyOption} ${difficulty === option.id ? styles.difficultyActive : ''}`}
                  >
                    <div className={styles.radioContainer}>
                      <div 
                        className={styles.radio}
                        style={{ 
                          borderColor: difficulty === option.id ? option.color : undefined,
                          backgroundColor: difficulty === option.id ? option.color : undefined 
                        }}
                      >
                        {difficulty === option.id && (
                          <div className={styles.radioInner} />
                        )}
                      </div>
                    </div>
                    <div className={styles.difficultyInfo}>
                      <span className={styles.difficultyTitle}>{option.title}</span>
                      <span className={styles.difficultyDescription}>{option.description}</span>
                    </div>
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.id}
                      checked={difficulty === option.id}
                      onChange={() => setDifficulty(option.id)}
                      className={styles.hiddenRadio}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.configSection}>
              <div className={styles.configLabel}>
                <span className={styles.configIcon}>⚡</span>
                Session Mode
              </div>
              <div className={styles.modeToggle}>
                <button
                  className={`${styles.modeBtn} ${sessionMode === 'mock' ? styles.modeBtnActive : ''}`}
                  onClick={() => setSessionMode('mock')}
                >
                  Mock Interview
                </button>
                <button
                  className={`${styles.modeBtn} ${sessionMode === 'practice' ? styles.modeBtnActive : ''}`}
                  onClick={() => setSessionMode('practice')}
                >
                  Practice
                </button>
              </div>
              <p className={styles.modeDescription}>
                <span className={styles.modeHighlight}>Mock Interview:</span> Timed session, AI acts as an interviewer with follow-up questions.
              </p>
            </div>

            <button className={styles.startBtn} onClick={handleStartSession}>
              <span className={styles.playIcon}>▶</span>
              Start Session
            </button>
            <p className={styles.durationNote}>Estimated duration: ~45 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

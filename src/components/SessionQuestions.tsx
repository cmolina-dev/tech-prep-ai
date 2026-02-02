import { sessionQuestions } from '@/data/mockData';
import styles from './SessionQuestions.module.css';

export default function SessionQuestions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Session Questions & Feedback</h2>
      <div className={styles.list}>
        {sessionQuestions.map((q, idx) => {
          const isExpanded = idx === 0; // Just expand the first one for the demo
          return (
            <div key={q.id} className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}>
              <div className={styles.header}>
                <div className={styles.questionMeta}>
                  <span className={styles.qTag}>Q{idx + 1}</span>
                  <span className={styles.timeTag}>{q.startTime} - {q.endTime}</span>
                </div>
              </div>
              
              <div className={styles.questionContent}>
                <h3 className={styles.questionText}>{q.question}</h3>
                
                {/* Actions */}
                <div className={styles.actions}>
                  <button className={styles.reviewBtn}>👁 Review</button>
                  <button className={styles.docBtn}>📄</button>
                </div>
              </div>

              {isExpanded && (
                <div className={styles.expandedContent}>
                  <p className={styles.feedbackText}>{q.answer}</p>
                  
                  {/* Audio Player */}
                  <div className={styles.audioPlayer}>
                    <button className={styles.playBtn}>▶</button>
                    <div className={styles.waveform}>
                      {/* CSS-generated visual waveform lines */}
                      <span className={styles.bar} style={{ height: '40%' }}></span>
                      <span className={styles.bar} style={{ height: '70%' }}></span>
                      <span className={styles.bar} style={{ height: '100%' }}></span>
                      <span className={styles.bar} style={{ height: '60%' }}></span>
                      <span className={styles.bar} style={{ height: '80%' }}></span>
                      <span className={styles.bar} style={{ height: '50%' }}></span>
                      <span className={styles.bar} style={{ height: '30%' }}></span>
                      <div className={styles.progressLine} /> 
                    </div>
                    <span className={styles.duration}>02:15</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

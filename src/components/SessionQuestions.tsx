import styles from './SessionQuestions.module.css';

interface SessionQuestionsProps {
    questions: any[];
}

export default function SessionQuestions({ questions }: SessionQuestionsProps) {
  if (!questions || questions.length === 0) {
      return (
          <div className={styles.container}>
              <h2 className={styles.title}>Session Questions & Feedback</h2>
              <p>No analyzed questions available for this session yet.</p>
          </div>
      );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Session Questions & Feedback</h2>
      <div className={styles.list}>
        {questions.map((q, idx) => {
          const isExpanded = idx === 0;
          return (
            <div key={q.id || idx} className={`${styles.card} ${isExpanded ? styles.expanded : ''}`}>
              <div className={styles.header}>
                <div className={styles.questionMeta}>
                  <span className={styles.qTag}>Q{idx + 1}</span>
                  <span className={styles.timeTag}>{q.startTime ? new Date(q.startTime).toLocaleTimeString() : 'N/A'}</span>
                </div>
              </div>
              
              <div className={styles.questionContent}>
                <h3 className={styles.questionText}>{q.question}</h3>
                
                <div className={styles.actions}>
                  <button className={styles.reviewBtn}>👁 Review</button>
                  <button className={styles.docBtn}>📄</button>
                </div>
              </div>

              {isExpanded && (
                <div className={styles.expandedContent}>
                  <p className={styles.feedbackText}>{q.userAnswer || q.answer || "No answer recorded"}</p>
                  
                  <div className={styles.audioPlayer}>
                    <button className={styles.playBtn}>▶</button>
                    <div className={styles.waveform}>
                      <span className={styles.bar} style={{ height: '40%' }}></span>
                      <span className={styles.bar} style={{ height: '70%' }}></span>
                      <span className={styles.bar} style={{ height: '100%' }}></span>
                      <div className={styles.progressLine} /> 
                    </div>
                    <span className={styles.duration}>N/A</span>
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

import styles from './TranscriptPanel.module.css';

export default function TranscriptPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWithIcon}>
          <span className={styles.icon}>🗣️</span>
          <h2>Transcript & Pronunciation</h2>
        </div>
        <div className={styles.controls}>
          <button className={styles.controlBtn}>▶</button>
          <button className={styles.controlBtn}>🐌</button>
        </div>
      </div>

      <div className={styles.transcriptCard}>
        <p className={styles.text}>
          "So, <span className={styles.error}>fundamentally</span>, dependency injection is a design pattern where objects receive their dependencies from an external source rather than creating them <span className={styles.error}>theirselves</span>. This allows <span className={styles.suggestion}>decouple</span> components. In terms of testing, it makes it super easier to swap real implementations with <span className={styles.error}>mocks objects</span> during unit tests."
        </p>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.dotError}></span> Pronunciation/Grammar Error
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dotSuggestion}></span> Phrasing Suggestion
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dotGood}></span> Strong Vocabulary
          </div>
        </div>
      </div>

      <div className={styles.focusSection}>
        <div className={styles.focusHeader}>
          <span className={styles.focusIcon}>🔊</span>
          <h3>FOCUS WORDS</h3>
        </div>
        
        <div className={styles.wordCard}>
          <button className={styles.playWordBtn}>🔊</button>
          <div className={styles.wordInfo}>
            <div className={styles.wordTop}>
              <span className={styles.word}>Mocks</span>
              <span className={styles.scoreLow}>Low Score</span>
            </div>
            <div className={styles.wordDetails}>
              You said: <span className={styles.phonetic}>/mouks/</span> • Correct: <span className={styles.phonetic}>/moks/</span>
            </div>
          </div>
        </div>

        <div className={styles.wordCard}>
          <button className={styles.playWordBtn}>🔊</button>
          <div className={styles.wordInfo}>
            <div className={styles.wordTop}>
              <span className={styles.word}>Dependencies</span>
              <span className={styles.scoreMed}>Medium Score</span>
            </div>
            <div className={styles.wordDetails}>
              Stress on 3rd syllable: de-pen-DEN-cies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

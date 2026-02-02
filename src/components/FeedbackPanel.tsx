import styles from './FeedbackPanel.module.css';

export default function FeedbackPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span className={styles.icon}>🛠️</span>
        <h2 className={styles.title}>Grammar Corrections</h2>
      </div>

      <div className={styles.card}>
        <div className={styles.correctionItem}>
          <div className={styles.correctionRow}>
            <span className={styles.incorrectIcon}>❌</span>
            <span className={styles.text}>...creating them <span className={styles.incorrect}>theirselves</span>.</span>
          </div>
          <div className={styles.correctionRow}>
            <span className={styles.correctIcon}>✓</span>
            <span className={styles.text}>...creating them <span className={styles.correct}>themselves</span>.</span>
          </div>
          <div className={styles.explanation}>
            "Theirselves" is non-standard. Use reflexive pronoun "themselves" for plural objects.
          </div>
        </div>

        <div className={styles.correctionItem}>
          <div className={styles.correctionRow}>
            <span className={styles.incorrectIcon}>❌</span>
            <span className={styles.text}>This allows <span className={styles.incorrect}>decouple components</span>.</span>
          </div>
          <div className={styles.correctionRow}>
            <span className={styles.correctIcon}>✓</span>
            <span className={styles.text}>This allows <span className={styles.correct}>us to decouple</span> components.</span>
          </div>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <span className={styles.icon}>✨</span>
        <h2 className={styles.title}>Natural Phrasing</h2>
      </div>

      <div className={styles.gradientCard}>
        <div className={styles.upgradeHeader}>
          <span className={styles.upgradeLabel}>PROFESSIONAL UPGRADE</span>
          <span className={styles.quoteIcon}>❞</span>
        </div>
        
        <div className={styles.phraseBlock}>
          <p className={styles.phraseLabel}>Instead of:</p>
          <p className={styles.phraseText}>"It makes it super easier to swap real implementations..."</p>
        </div>

        <div className={styles.phraseBlock}>
          <p className={styles.phraseLabel}>Try saying:</p>
          <p className={styles.improvedText}>
            "It significantly <span className={styles.highlight}>streamlines the process</span> of swapping implementations..."
          </p>
        </div>

        <button className={styles.listenBtn}>
          🔊 Listen to example
        </button>
      </div>

      <div className={styles.sectionHeader}>
        <span className={styles.icon}>🎓</span>
        <h2 className={styles.title}>Vocabulary Upskill</h2>
      </div>

      <div className={styles.vocabContainer}>
        <div className={styles.vocabRow}>
          <span className={styles.vocabOriginal}>super easier</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.vocabBetter}>facilitates / simplifies</span>
        </div>
        <div className={styles.vocabRow}>
          <span className={styles.vocabOriginal}>external source</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.vocabBetter}>IoC Container</span>
        </div>
      </div>
    </div>
  );
}

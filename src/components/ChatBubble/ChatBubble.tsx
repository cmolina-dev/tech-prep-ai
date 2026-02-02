'use client';

import { Message } from '@/data/mockData';
import styles from './ChatBubble.module.css';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isAI = message.role === 'ai';

  return (
    <div className={`${styles.bubble} ${isAI ? styles.ai : styles.user}`}>
      {isAI && (
        <div className={styles.avatar}>
          <span>👩‍💻</span>
        </div>
      )}
      
      <div className={styles.messageGroup}>
        <span className={styles.senderName}>
          {isAI ? 'AI Interviewer' : 'You'}
        </span>
        <div className={styles.content}>
          <p className={styles.text}>{message.content}</p>
        </div>
      </div>

      {!isAI && (
        <div className={styles.avatar}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className={styles.avatarImg} 
          />
        </div>
      )}
    </div>
  );
}

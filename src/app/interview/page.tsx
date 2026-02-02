'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ChatBubble from '@/components/ChatBubble';
import { useInterview } from '@/hooks/useInterview';
import styles from './page.module.css';

import { 
  Settings, 
  User, 
  Mic, 
  Trash2, 
  RefreshCw, 
  Send 
} from 'lucide-react';

export default function InterviewChat() {
  const router = useRouter();
  const { 
    messages, 
    status, 
    currentTranscript, 
    sessionId,
    startSession, 
    sendMessage, 
    startListening, 
    stopListening 
  } = useInterview();

  const [inputValue, setInputValue] = useState('');

  // Start session on mount
  useEffect(() => {
    startSession('backend', 'mid');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update input when transcript changes
  useEffect(() => {
    if (status === 'listening') {
        setInputValue(currentTranscript);
    }
  }, [currentTranscript, status]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleMicClick = () => {
    if (status === 'listening') {
        stopListening();
    } else {
        startListening();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
            <div className={styles.brandSection}>
            <div className={styles.logoIcon}>💻</div>
            <div className={styles.brandInfo}>
                <h1 className={styles.brandName}>TechPrepAI</h1>
                <span className={styles.brandSubtitle}>System Design Interview</span>
            </div>
            </div>
        </Link>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>Practice</button>
          <button className={styles.tab}>History</button>
          <button className={styles.tab}>Stats</button>
        </div>

        <div className={styles.headerControls}>
          <button 
            onClick={() => sessionId && router.push(`/summary?sessionId=${sessionId}`)}
            style={{ 
                marginRight: '1rem', 
                padding: '0.5rem 1rem', 
                background: '#22c55e', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                color: 'white',
                fontWeight: 600
            }}
          >
            Finish
          </button>
          <button className={styles.iconBtn}>
            <Settings size={20} />
          </button>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <div className={styles.statusIndicators}>
          <div className={`${styles.statusItem} ${status === 'listening' ? styles.activeStatus : ''}`}>
            <span className={styles.statusDotRed}></span> LISTENING
          </div>
          <div className={`${styles.statusItem} ${status === 'thinking' ? styles.activeStatus : ''}`}>
            <span className={styles.statusIcon}>💭</span> Thinking
          </div>
          <div className={`${styles.statusItem} ${status === 'speaking' ? styles.activeStatus : ''}`}>
             <span className={styles.statusIcon}>🔊</span> Speaking
          </div>
        </div>
        <div className={styles.sessionTime}>Session Active</div>
      </div>

      {/* Chat Area */}
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {status === 'thinking' && (
            <div className={styles.typingIndicator}>
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className={styles.bottomSection}>
        {/* Listening Text */}
        {status === 'listening' && (
            <div className={styles.listeningText}>
                {currentTranscript || "Listening..."} ▍
            </div>
        )}

        {/* Input Box */}
        <div className={styles.inputBox}>
          <Mic size={20} className={styles.micIconSmall} />
          <input 
            type="text" 
            className={styles.textInput}
            placeholder={status === 'listening' ? "Listening..." : "Type your answer..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={status === 'listening' || status === 'thinking'}
          />
          <button className={styles.deleteBtn} onClick={() => setInputValue('')}>
            <Trash2 size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <button className={styles.controlBtn}>
              <RefreshCw size={24} />
            </button>
            <span className={styles.controlLabel}>Try Again</span>
          </div>

          <button 
            className={`${styles.mainMicBtn} ${status === 'listening' ? styles.micActive : ''}`} 
            onClick={handleMicClick}
          >
             <Mic size={32} />
          </button>

          <div className={styles.controlGroup}>
            <button className={styles.controlBtn} onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={24} />
            </button>
             <span className={styles.controlLabel}>Send</span>
          </div>
        </div>
        
        <div className={styles.footerNote}>Press spacebar to toggle mute</div>
      </div>
    </div>
  );
}

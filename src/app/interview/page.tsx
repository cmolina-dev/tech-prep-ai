'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ChatBubble from '@/components/ChatBubble';
import { mockMessages, Message } from '@/data/mockData';
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
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState<'listening' | 'thinking' | 'feedback'>('listening');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);
    setStatus('thinking');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "That's a valid point. Can you give me a specific example of a schema design that benefits from this?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setStatus('feedback');
    }, 2000);
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
          <div className={`${styles.statusItem} ${status === 'feedback' ? styles.activeStatus : ''}`}>
             <span className={styles.statusIcon}>✔️</span> Feedback Ready
          </div>
        </div>
        <div className={styles.sessionTime}>Session started at 10:42 AM</div>
      </div>

      {/* Chat Area */}
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className={styles.typingIndicator}>
              <span>Listening...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className={styles.bottomSection}>
        {/* Listening Text */}
        <div className={styles.listeningText}>
            Sure, for example if we are building a user profile system where the attributes... ▍
        </div>

        {/* Input Box */}
        <div className={styles.inputBox}>
          <Mic size={20} className={styles.micIconSmall} />
          <input 
            type="text" 
            className={styles.textInput}
            placeholder="Sure, for example if we are building a user profile system..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.deleteBtn}>
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

          <button className={styles.mainMicBtn} onClick={handleSendMessage}>
             <Mic size={32} />
          </button>

          <div className={styles.controlGroup}>
            <button className={styles.controlBtn} onClick={handleSendMessage}>
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

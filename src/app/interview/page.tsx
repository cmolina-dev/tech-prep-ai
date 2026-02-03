'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ChatBubble from '@/components/ChatBubble';
import { useInterview } from '@/hooks/useInterview';


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
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 bg-secondary border-b border-border shrink-0">
        <Link href="/" className="no-underline">
            <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-xl">💻</div>
            <div className="flex flex-col">
                <h1 className="text-base font-bold leading-tight m-0">TechPrepAI</h1>
                <span className="text-xs text-secondary-foreground">System Design Interview</span>
            </div>
            </div>
        </Link>
        <div className="flex bg-background p-1 rounded-md gap-0.5">
          <button className="px-4 py-1.5 rounded-sm bg-blue-500/10 text-blue-500 text-sm font-medium border-none cursor-pointer transition-all duration-200">Practice</button>
          <button className="px-4 py-1.5 rounded-sm bg-transparent text-secondary-foreground text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-white/5">History</button>
          <button className="px-4 py-1.5 rounded-sm bg-transparent text-secondary-foreground text-sm font-medium border-none cursor-pointer transition-all duration-200 hover:bg-white/5">Stats</button>
        </div>

        <div className="flex items-center gap-4">
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
          <button className="bg-transparent border-none text-xl text-secondary-foreground cursor-pointer flex items-center justify-center">
            <Settings size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-yellow-200 flex items-center justify-center text-xl border-2 border-border text-black">
            <User size={20} />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-4 flex flex-col items-center gap-2 bg-background">
        <div className="flex items-center gap-4 bg-card px-4 py-2 rounded-full border border-border">
          <div className={`flex items-center gap-1.5 text-sm font-medium transition-all ${status === 'listening' ? 'opacity-100 text-red-500 bg-red-500/10 px-2 py-[2px] rounded-sm' : 'opacity-60 text-muted-foreground'}`}>
            <span className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]"></span> LISTENING
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium transition-all ${status === 'thinking' ? 'opacity-100 text-foreground' : 'opacity-60 text-muted-foreground'}`}>
            <span className="">💭</span> Thinking
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium transition-all ${status === 'speaking' ? 'opacity-100 text-foreground' : 'opacity-60 text-muted-foreground'}`}>
             <span className="">🔊</span> Speaking
          </div>
        </div>
        <div className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">Session Active</div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-[10%] lg:px-[20%] pb-[200px]">
        <div className="flex flex-col gap-8">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          {status === 'thinking' && (
            <div className="flex justify-end text-xs text-muted-foreground italic -mt-2.5">
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-background px-[10%] lg:px-[20%] py-6 flex flex-col gap-6 z-10">
        {/* Listening Text */}
        {status === 'listening' && (
            <div className="text-center text-secondary-foreground text-lg font-medium opacity-80 border border-dashed border-border p-4 rounded-lg">
                {currentTranscript || "Listening..."} ▍
            </div>
        )}

        {/* Input Box */}
        <div className="flex items-center bg-card px-6 py-4 rounded-lg border border-border gap-4">
          <Mic size={20} className="text-secondary-foreground" />
          <input 
            type="text" 
            className="flex-1 bg-transparent border-none text-foreground text-lg outline-none font-medium placeholder:text-muted-foreground"
            placeholder={status === 'listening' ? "Listening..." : "Type your answer..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={status === 'listening' || status === 'thinking'}
          />
          <button className="bg-transparent border-none text-muted-foreground cursor-pointer text-lg flex items-center justify-center" onClick={() => setInputValue('')}>
            <Trash2 size={20} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-12 relative">
          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 rounded-full bg-card border-none text-secondary-foreground text-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-muted hover:text-foreground">
              <RefreshCw size={24} />
            </button>
            <span className="text-xs text-muted-foreground">Try Again</span>
          </div>

          <button 
            className={`w-20 h-20 rounded-full border-none text-white text-3xl flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform duration-200 hover:scale-105 ${status === 'listening' ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-gradient-to-br from-blue-500 to-blue-600'}`} 
            onClick={handleMicClick}
          >
             <Mic size={32} />
          </button>

          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 rounded-full bg-card border-none text-secondary-foreground text-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-muted hover:text-foreground" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={24} />
            </button>
             <span className="text-xs text-muted-foreground">Send</span>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground mt-4 opacity-50">Press spacebar to toggle mute</div>
      </div>
    </div>
  );
}

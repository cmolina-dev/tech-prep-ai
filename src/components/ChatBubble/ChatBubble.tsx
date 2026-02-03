'use client';

import { Message } from '@/data/mockData';

interface ChatBubbleProps {
  message: Message;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isAI = message.role === 'ai';

  return (
    <div className={`flex gap-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-full ${isAI ? 'justify-start' : 'justify-end'}`}>
      {isAI && (
        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center shrink-0 text-[2.5rem] bg-transparent overflow-hidden">
          <span>👩‍💻</span>
        </div>
      )}
      
      <div className="flex flex-col gap-1 max-w-[70%]">
        <span className={`text-xs text-muted-foreground font-medium ${isAI ? 'ml-1' : 'self-end mr-1'}`}>
          {isAI ? 'AI Interviewer' : 'You'}
        </span>
        <div className={`p-4 px-6 rounded-2xl relative leading-relaxed ${
          isAI 
            ? 'bg-card border border-border rounded-tl-sm text-foreground' 
            : 'bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-blue-600/20'
        }`}>
          <p className="text-base m-0">{message.content}</p>
        </div>
      </div>

      {!isAI && (
        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-2xl bg-muted overflow-hidden">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
            alt="User" 
            className="w-full h-full object-cover" 
          />
        </div>
      )}
    </div>
  );
}

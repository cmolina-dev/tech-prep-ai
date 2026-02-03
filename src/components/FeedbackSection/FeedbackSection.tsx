'use client';

import { useState } from 'react';
import { FeedbackItem } from '@/data/mockData';


interface FeedbackSectionProps {
  feedback: FeedbackItem;
}

export default function FeedbackSection({ feedback }: FeedbackSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (feedback.type) {
      case 'strength': return '✓';
      case 'improvement': return '!';
      case 'suggestion': return '💡';
      default: return '•';
    }
  };

  const getTypeLabel = () => {
    switch (feedback.type) {
      case 'strength': return 'Strength';
      case 'improvement': return 'Area for Improvement';
      case 'suggestion': return 'Suggestion';
      default: return '';
    }
  };

  const typeConfig = {
    strength: { border: 'border-l-green-500', iconBg: 'bg-green-500/15', iconColor: 'text-green-500', labelColor: 'text-green-500' },
    improvement: { border: 'border-l-amber-500', iconBg: 'bg-amber-500/15', iconColor: 'text-amber-500', labelColor: 'text-amber-500' },
    suggestion: { border: 'border-l-primary', iconBg: 'bg-primary/15', iconColor: 'text-primary', labelColor: 'text-primary' },
    default: { border: 'border-l-slate-500', iconBg: 'bg-slate-500/15', iconColor: 'text-slate-500', labelColor: 'text-slate-500' }
  };

  const config = typeConfig[feedback.type as keyof typeof typeConfig] || typeConfig.default;

  return (
    <div className={`bg-card border border-border border-l-[3px] rounded-lg overflow-hidden transition-all duration-200 hover:border-secondary-foreground/20 ${config.border}`}>
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.iconBg} ${config.iconColor}`}>
          <span className="text-sm font-bold">{getIcon()}</span>
        </div>
        <div className="flex-1">
          <span className={`text-xs uppercase tracking-wider ${config.labelColor}`}>{getTypeLabel()}</span>
          <h4 className="text-base font-semibold text-foreground mt-[2px]">{feedback.title}</h4>
        </div>
        <button className="w-8 h-8 flex items-center justify-center bg-transparent text-muted-foreground transition-transform duration-200">
          <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px] p-4 pt-0' : 'max-h-0'}`}>
        <p className="text-sm text-secondary-foreground leading-relaxed pl-12">{feedback.content}</p>
        {feedback.details && feedback.details.length > 0 && (
          <ul className="mt-4 pl-16 list-none">
            {feedback.details.map((detail, index) => (
              <li key={index} className="text-sm text-muted-foreground py-1 relative before:content-['•'] before:absolute before:-left-4 before:text-muted-foreground">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

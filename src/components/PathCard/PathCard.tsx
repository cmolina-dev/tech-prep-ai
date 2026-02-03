'use client';

import Image from 'next/image';
import { InterviewPath } from '@/data/mockData';

interface PathCardProps {
  path: InterviewPath;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PathCard({ path, isSelected, onSelect }: PathCardProps) {
  return (
    <div 
      className={`flex bg-card border-2 border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:border-slate-500 hover:bg-card/80 ${
        isSelected ? 'border-primary bg-primary/15' : ''
      }`}
      onClick={onSelect}
    >
      <div className="relative w-[160px] min-w-[160px] h-[120px] shrink-0">
        <Image
          src={path.image}
          alt={path.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-4 px-6 min-w-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-semibold text-white">{path.title}</h3>
            {isSelected && (
              <div className="w-6 h-6 flex items-center justify-center bg-primary rounded-full text-white shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
          <p className="text-sm text-secondary-foreground leading-relaxed">{path.description}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {path.topics.map((topic, index) => (
              <span key={index} className="px-2 py-1 bg-secondary border border-border rounded text-xs text-secondary-foreground">
                {topic}
              </span>
            ))}
          </div>
          {isSelected && (
            <span className="text-sm font-medium text-primary">Active Path</span>
          )}
        </div>
      </div>
    </div>
  );
}

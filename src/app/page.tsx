'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PathCard from '@/components/PathCard';
import { interviewPaths, difficultyOptions } from '@/data/mockData';

export default function InterviewSetup() {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState<string>('backend');
  const [difficulty, setDifficulty] = useState('mid');
  const [sessionMode, setSessionMode] = useState<'mock' | 'practice'>('mock');

  const handleStartSession = () => {
    router.push('/interview');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 py-8">
      <div className="max-w-[1400px] mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Interview Setup</h1>
        <p className="text-base text-secondary-foreground">
          Configure your practice session parameters to simulate real-world scenarios.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Select Path</h2>
            <span className="text-xs text-muted-foreground tracking-widest">STEP 1 OF 2</span>
          </div>
          <div className="flex flex-col gap-4">
            {interviewPaths.map((path) => (
              <PathCard
                key={path.id}
                path={path}
                isSelected={selectedPath === path.id}
                onSelect={() => setSelectedPath(path.id)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 sticky top-[calc(64px+32px)]">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-semibold text-white">Configuration</h2>
              <span className="text-xs text-muted-foreground tracking-widest">STEP 2 OF 2</span>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <span className="text-base">🎚️</span>
                Difficulty Level
              </div>
              <div className="flex flex-col gap-2">
                {difficultyOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-4 p-2 px-4 bg-secondary border border-border rounded-md cursor-pointer transition-all hover:border-slate-500 ${
                      difficulty === option.id ? 'bg-primary/10 border-primary' : ''
                    }`}
                  >
                    <div className="flex items-center justify-center shrink-0">
                      <div 
                        className="w-5 h-5 border-2 border-slate-600 rounded-full flex items-center justify-center transition-all"
                        style={{ 
                          borderColor: difficulty === option.id ? option.color : undefined,
                          backgroundColor: difficulty === option.id ? option.color : undefined 
                        }}
                      >
                        {difficulty === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="text-sm font-medium text-white">{option.title}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </div>
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.id}
                      checked={difficulty === option.id}
                      onChange={() => setDifficulty(option.id)}
                      className="absolute opacity-0 pointer-events-none"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                <span className="text-base">⚡</span>
                Session Mode
              </div>
              <div className="flex bg-secondary rounded-md p-1 gap-1">
                <button
                  className={`flex-1 py-2 px-4 bg-transparent rounded text-sm text-secondary-foreground transition-all hover:text-white ${
                    sessionMode === 'mock' ? 'bg-muted text-white' : ''
                  }`}
                  onClick={() => setSessionMode('mock')}
                >
                  Mock Interview
                </button>
                <button
                  className={`flex-1 py-2 px-4 bg-transparent rounded text-sm text-secondary-foreground transition-all hover:text-white ${
                    sessionMode === 'practice' ? 'bg-muted text-white' : ''
                  }`}
                  onClick={() => setSessionMode('practice')}
                >
                  Practice
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium">Mock Interview:</span> Timed session, AI acts as an interviewer with follow-up questions.
              </p>
            </div>

            <button 
              className="w-full p-4 bg-gradient-brand text-white font-semibold rounded-md flex items-center justify-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-green-500/20"
              onClick={handleStartSession}
              style={{
                background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)'
              }}
            >
              <span className="text-sm">▶</span>
              Start Session
            </button>
            <p className="text-center mt-2 text-xs text-muted-foreground">Estimated duration: ~45 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

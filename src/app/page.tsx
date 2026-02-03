'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PathCard from '@/components/PathCard/PathCard';
import StepIndicator from '@/components/StepIndicator';
import TechSelector from '@/components/TechSelector';
import { interviewPaths, difficultyOptions } from '@/data/mockData';

export default function InterviewSetup() {
  const router = useRouter();
  
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<string>('backend');
  const [selectedTechs, setSelectedTechs] = useState<string[]>(['node', 'sql']);
  const [difficulty, setDifficulty] = useState('mid');
  const [sessionMode, setSessionMode] = useState<'mock' | 'practice'>('mock');

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(curr => curr + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleStartSession();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartSession = () => {
    router.push('/interview');
  };

  const toggleTech = (techId: string) => {
    setSelectedTechs(prev => 
        prev.includes(techId) 
            ? prev.filter(t => t !== techId)
            : [...prev, techId]
    );
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      <div className="flex-1 px-6 py-12 pb-32 max-w-[1200px] mx-auto w-full">
        
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Step 1: Path Selection */}
        {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white mb-3">Choose your career path</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Select the domain you want to practice your technical interview for. 
                        Each path is tailored to industry-standard expectations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        )}

        {/* Step 2: Technologies */}
        {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                <TechSelector 
                    stack={selectedPath} 
                    selectedTechs={selectedTechs} 
                    onToggle={toggleTech} 
                />
            </div>
        )}

        {/* Step 3: Configuration */}
        {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2">Final Configuration</h2>
                    <p className="text-slate-400">Customize your interview session parameters.</p>
                </div>

                <div className="bg-card border border-border rounded-xl p-8 shadow-2xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                            <span className="text-base">🎚️</span>
                            Difficulty Level
                        </div>
                        <div className="flex flex-col gap-2">
                            {difficultyOptions.map((option) => (
                            <label
                                key={option.id}
                                className={`flex items-center gap-4 p-3 px-4 bg-secondary border border-border rounded-lg cursor-pointer transition-all hover:border-slate-500 ${
                                difficulty === option.id ? 'bg-blue-500/10 border-blue-500' : ''
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

                    <div className="mb-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-white mb-4">
                            <span className="text-base">⚡</span>
                            Session Mode
                        </div>
                        <div className="flex bg-secondary rounded-lg p-1 gap-1">
                            <button
                            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                                sessionMode === 'mock' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            onClick={() => setSessionMode('mock')}
                            >
                            Mock Interview
                            </button>
                            <button
                            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                                sessionMode === 'practice' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                            }`}
                            onClick={() => setSessionMode('practice')}
                            >
                            Practice
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground leading-relaxed text-center px-4">
                            {sessionMode === 'mock' ? (
                                <span><strong className="text-blue-400">Mock Mode:</strong> Timed session, strict AI interviewer, no retries allowed.</span>
                            ) : (
                                <span><strong className="text-green-400">Practice Mode:</strong> Relaxed, hints enabled, unlimited retries.</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        )}

      </div>

      {/* Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0B1120]/80 backdrop-blur-lg border-t border-white/5 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-end gap-4">
            {currentStep > 1 && (
                <button 
                    onClick={handleBack}
                    className="px-6 py-3 rounded-lg font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Back
                </button>
            )}

            <button className="px-6 py-3 rounded-lg font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors hidden sm:block">
                Save Draft
            </button>

            <button 
                onClick={handleNext}
                className="px-8 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:transform active:scale-95 transition-all flex items-center gap-2"
            >
                {currentStep === totalSteps ? 'Start Session' : 'Next: ' + (currentStep === 1 ? 'Technologies' : 'Configuration')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
}

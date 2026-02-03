
import { GitFork, Terminal, Settings, Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: "SELECT PATH", icon: GitFork },
    { id: 2, label: "TECHNOLOGIES", icon: Terminal },
    { id: 3, label: "CONFIGURATION", icon: Settings },
  ];

  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto mb-16">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isPending = currentStep < step.id;

        return (
          <div key={step.id} className="flex items-center w-full last:w-auto">
            {/* Step Icon & Label Container */}
            <div className="flex flex-col items-center gap-3 relative z-10 w-32">
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 border-2 ${
                  isCurrent 
                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25 scale-110' 
                    : isCompleted
                      ? 'bg-blue-500/20 border-blue-500 text-blue-500' 
                      : 'bg-white/5 border-white/10 text-slate-500'
                }`}
              >
                {isCompleted ? <Check size={20} strokeWidth={3} /> : <Icon size={20} />}
              </div>
              <span 
                className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isCurrent ? 'text-blue-400' : isCompleted ? 'text-blue-500/70' : 'text-slate-600'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line (not for last item) */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-[2px] -mx-4 -mt-6 bg-white/5 relative overflow-hidden">
                <div 
                    className={`absolute inset-0 bg-blue-500 transition-all duration-500 ${
                        isCompleted ? 'translate-x-0' : '-translate-x-full'
                    }`} 
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

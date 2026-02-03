
import { Check } from 'lucide-react';
import { techOptions } from '@/data/mockData';

interface TechSelectorProps {
  stack: string; // 'frontend' | 'backend' | 'mobile'
  selectedTechs: string[];
  onToggle: (techId: string) => void;
}

export default function TechSelector({ stack, selectedTechs, onToggle }: TechSelectorProps) {
  const options = techOptions[stack] || techOptions.frontend;

  return (
    <div className="w-full">
        <h3 className="text-xl font-semibold text-white text-center mb-8">
            Select technologies you want to focus on
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((tech) => {
            const isSelected = selectedTechs.includes(tech.id);
            return (
            <div 
                key={tech.id}
                onClick={() => onToggle(tech.id)}
                className={`
                    cursor-pointer relative overflow-hidden group
                    flex flex-col items-center justify-center p-6 gap-3
                    rounded-xl border-2 transition-all duration-200
                    ${isSelected 
                        ? 'bg-blue-500/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                        : 'bg-white/[0.03] border-white/5 hover:border-white/10 hover:bg-white/5'}
                `}
            >
                <span className="text-3xl filter drop-shadow-lg">{tech.icon}</span>
                <span className={`font-medium text-sm transition-colors ${isSelected ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {tech.name}
                </span>

                {isSelected && (
                    <div className="absolute top-3 right-3 text-blue-500 animate-in zoom-in duration-200">
                        <Check size={16} strokeWidth={3} />
                    </div>
                )}
            </div>
            );
        })}
        </div>
    </div>
  );
}

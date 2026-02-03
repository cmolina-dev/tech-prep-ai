'use client';



interface ScoreCardProps {
  score: number;
  label: string;
  category: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function ScoreCard({ score, label, category, color = '#22c55e', size = 'medium' }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    small: {
      wrapper: 'w-20 h-20',
      text: 'text-lg',
    },
    medium: {
      wrapper: 'w-[120px] h-[120px]',
      text: 'text-2xl',
    },
    large: {
      wrapper: 'w-40 h-40',
      text: 'text-3xl',
    },
  };

  return (
    <div className={`flex flex-col items-center gap-2`}>
      <div className={`relative flex items-center justify-center ${sizeClasses[size].wrapper}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-muted"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
          />
          <circle
            className="transition-[stroke-dashoffset] duration-500 ease-out"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              stroke: color
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center gap-1">
          <span className={`font-bold text-foreground ${sizeClasses[size].text}`}>{score}%</span>
          <span className="px-2 py-[2px] rounded-full text-xs font-medium" style={{ backgroundColor: `${color}20`, color }}>
            {label}
          </span>
        </div>
      </div>
      <p className="text-sm text-secondary-foreground text-center">{category}</p>
    </div>
  );
}

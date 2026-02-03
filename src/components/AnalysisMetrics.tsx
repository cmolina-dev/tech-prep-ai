

interface MetricCardProps {
  title: string;
  value: number;
  trend: number;
  label: string;
}

function MetricCard({ title, value, trend, label }: MetricCardProps) {
  const isPositive = trend > 0;
  
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{title}</span>
        {/* Placeholder for icon/chart */}
        <div className="w-8 h-8 bg-white/5 rounded" />
      </div>
      <div className="flex flex-col justify-between h-full"> 
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[2.5rem] font-bold text-white leading-none">{value}%</span>
            <span className={`text-sm font-semibold px-2 py-1 rounded ${isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
              {isPositive ? '↗' : '↘'} {Math.abs(trend)}%
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed m-0">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function AnalysisMetrics() {
  const metrics = [
    { title: 'PRONUNCIATION', value: 88, trend: 5, label: 'Clear articulation, minor stress errors.' },
    { title: 'GRAMMAR ACCURACY', value: 95, trend: -2, label: 'Mostly correct, watch subject-verb agreement.' },
    { title: 'FLUENCY RATING', value: 92, trend: 4, label: 'Good pacing, few hesitation markers.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {metrics.map((m) => (
        <MetricCard key={m.title} {...m} />
      ))}
    </div>
  );
}

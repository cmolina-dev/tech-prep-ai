

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: string;
  colorClass: string;
  changeLabel?: string;
}

function MetricCard({ title, value, change, icon, colorClass, changeLabel }: MetricCardProps) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-md flex items-center justify-center text-base bg-blue-500/10 text-blue-500">{icon}</span>
        <span className="text-slate-400 text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change && (
          <span className="text-green-500 text-sm font-semibold flex items-center gap-1">
            {change}
            {changeLabel && <span className="">{changeLabel}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

interface SummaryMetricsProps {
    stats: {
        overallScore?: number;
        accuracy?: number;
        // extended stats
    }
}

export default function SummaryMetrics({ stats }: SummaryMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <MetricCard
        title="Fluency Score"
        value={`${stats.overallScore || 0}/100`}
        change="-"
        icon="🔊"
        colorClass="blue"
      />
      <MetricCard
        title="Grammar Accuracy"
        value="N/A"
        change="-"
        icon="Aq"
        colorClass="blue"
      />
      <MetricCard
        title="Technical Clarity"
        value="N/A"
        change="-"
        icon="⚙️"
        colorClass="blue"
        changeLabel="" 
      />
    </div>
  );
}

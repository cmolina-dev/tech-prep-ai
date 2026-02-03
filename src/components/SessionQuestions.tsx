

interface SessionQuestionsProps {
    questions: any[];
}

export default function SessionQuestions({ questions }: SessionQuestionsProps) {
  if (!questions || questions.length === 0) {
      return (
          <div className="mt-8">
              <h2 className="text-lg font-semibold text-white mb-4">Session Questions & Feedback</h2>
              <p>No analyzed questions available for this session yet.</p>
          </div>
      );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-white mb-4">Session Questions & Feedback</h2>
      <div className="flex flex-col gap-4">
        {questions.map((q, idx) => {
          const isExpanded = idx === 0;
          return (
            <div key={q.id || idx} className={`bg-white/[0.03] border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors ${isExpanded ? '' : ''}`}>
              <div className="mb-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded">Q{idx + 1}</span>
                  <span className="text-slate-400 text-xs font-mono">{q.startTime ? new Date(q.startTime).toLocaleTimeString() : 'N/A'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-white text-base font-semibold m-0 leading-relaxed flex-1">{q.question}</h3>
                
                <div className="flex gap-2">
                  <button className="bg-blue-500/10 text-blue-500 border-none rounded-md px-3 py-1.5 text-sm font-medium cursor-pointer flex items-center gap-1">👁 Review</button>
                  <button className="bg-white/5 text-slate-400 border-none rounded-md w-8 h-8 flex items-center justify-center cursor-pointer">📄</button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{q.userAnswer || q.answer || "No answer recorded"}</p>
                  
                  <div className="flex items-center gap-4 bg-black/20 rounded-full p-2">
                    <button className="w-8 h-8 rounded-full bg-blue-500 border-none text-white flex items-center justify-center cursor-pointer">▶</button>
                    <div className="flex-1 h-6 flex items-center gap-[3px] relative overflow-hidden">
                      <span className="w-[3px] bg-blue-500/50 rounded-[1px]" style={{ height: '40%' }}></span>
                      <span className="w-[3px] bg-blue-500/50 rounded-[1px]" style={{ height: '70%' }}></span>
                      <span className="w-[3px] bg-blue-500/50 rounded-[1px]" style={{ height: '100%' }}></span>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> 
                    </div>
                    <span className="text-xs text-slate-400 font-mono mr-2">N/A</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

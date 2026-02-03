

export default function TranscriptPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-xl">🗣️</span>
          <h2 className="text-lg font-semibold text-white m-0">Transcript & Pronunciation</h2>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/10 border-none rounded-full w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors">▶</button>
          <button className="bg-white/10 border-none rounded-full w-8 h-8 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-colors">🐌</button>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <p className="text-lg leading-relaxed text-slate-300 mb-8">
          "So, <span className="underline decoration-red-500 underline-offset-4 decoration-2">fundamentally</span>, dependency injection is a design pattern where objects receive their dependencies from an external source rather than creating them <span className="underline decoration-red-500 underline-offset-4 decoration-2">theirselves</span>. This allows <span className="underline decoration-amber-500 underline-offset-4 decoration-2">decouple</span> components. In terms of testing, it makes it super easier to swap real implementations with <span className="underline decoration-red-500 underline-offset-4 decoration-2">mocks objects</span> during unit tests."
        </p>

        <div className="flex gap-6 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Pronunciation/Grammar Error
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Phrasing Suggestion
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Strong Vocabulary
          </div>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🔊</span>
          <h3 className="text-xs font-bold text-white uppercase m-0 tracking-wider">FOCUS WORDS</h3>
        </div>
        
        <div className="bg-black/20 rounded-lg p-4 flex items-center gap-4 mb-3 last:mb-0">
          <button className="bg-blue-500/20 border-none w-9 h-9 rounded-full text-blue-500 flex items-center justify-center cursor-pointer">🔊</button>
          <div className="flex-1">
            <div className="flex justify-between mb-1 items-center">
              <span className="font-semibold text-white">Mocks</span>
              <span className="text-red-500 text-xs font-semibold">Low Score</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              You said: <span className="text-slate-300">/mouks/</span> • Correct: <span className="text-slate-300">/moks/</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-4 flex items-center gap-4 mb-3 last:mb-0">
          <button className="bg-blue-500/20 border-none w-9 h-9 rounded-full text-blue-500 flex items-center justify-center cursor-pointer">🔊</button>
          <div className="flex-1">
            <div className="flex justify-between mb-1 items-center">
              <span className="font-semibold text-white">Dependencies</span>
              <span className="text-amber-500 text-xs font-semibold">Medium Score</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Stress on 3rd syllable: de-pen-DEN-cies
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

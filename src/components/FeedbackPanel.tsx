

export default function FeedbackPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="text-orange-500 text-xl">🛠️</span>
        <h2 className="text-white text-lg font-semibold m-0">Grammar Corrections</h2>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-red-500 text-xs mt-[2px]">❌</span>
            <span className="text-slate-300 text-sm">...creating them <span className="line-through text-red-500">theirselves</span>.</span>
          </div>
          <div className="flex items-start gap-3 mb-2">
            <span className="text-green-500 text-xs mt-[2px]">✓</span>
            <span className="text-slate-300 text-sm">...creating them <span className="text-green-500 font-medium">themselves</span>.</span>
          </div>
          <div className="bg-white/[0.03] p-3 rounded-md text-xs text-slate-400 ml-6 mt-2">
            "Theirselves" is non-standard. Use reflexive pronoun "themselves" for plural objects.
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3 mb-2">
            <span className="text-red-500 text-xs mt-[2px]">❌</span>
            <span className="text-slate-300 text-sm">This allows <span className="line-through text-red-500">decouple components</span>.</span>
          </div>
          <div className="flex items-start gap-3 mb-2">
            <span className="text-green-500 text-xs mt-[2px]">✓</span>
            <span className="text-slate-300 text-sm">This allows <span className="text-green-500 font-medium">us to decouple</span> components.</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-orange-500 text-xl">✨</span>
        <h2 className="text-white text-lg font-semibold m-0">Natural Phrasing</h2>
      </div>

      <div className="relative p-6 rounded-xl border border-blue-500/20 bg-gradient-to-br from-slate-800/60 to-slate-900/80">
        <div className="flex justify-between mb-4">
          <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold px-2 py-1 rounded tracking-wider">PROFESSIONAL UPGRADE</span>
          <span className="text-2xl text-blue-500/20 leading-none font-serif">❞</span>
        </div>
        
        <div className="mb-4">
          <p className="text-slate-500 text-xs mb-1">Instead of:</p>
          <p className="text-slate-400 italic text-sm">"It makes it super easier to swap real implementations..."</p>
        </div>

        <div className="mb-4">
          <p className="text-slate-500 text-xs mb-1">Try saying:</p>
          <p className="text-white text-base font-medium">
            "It significantly <span className="text-blue-500">streamlines the process</span> of swapping implementations..."
          </p>
        </div>

        <button className="flex items-center gap-2 bg-transparent border-none text-blue-500 text-xs font-semibold cursor-pointer p-0 mt-4">
          🔊 Listen to example
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-orange-500 text-xl">🎓</span>
        <h2 className="text-white text-lg font-semibold m-0">Vocabulary Upskill</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3 px-4 flex justify-between items-center">
          <span className="text-slate-400 text-sm">super easier</span>
          <span className="text-slate-600 text-sm">→</span>
          <span className="text-white font-medium text-sm">facilitates / simplifies</span>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-lg p-3 px-4 flex justify-between items-center">
          <span className="text-slate-400 text-sm">external source</span>
          <span className="text-slate-600 text-sm">→</span>
          <span className="text-white font-medium text-sm">IoC Container</span>
        </div>
      </div>
    </div>
  );
}

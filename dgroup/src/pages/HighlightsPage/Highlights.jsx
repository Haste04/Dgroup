import { highlightsData } from '../../data/groupData'

export default function Highlights() {
  return (
    <div className="p-10 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-extrabold text-white mb-2">Highlights</h1>
      <p className="text-cyan-500 font-mono text-sm mb-12 uppercase tracking-tighter">
        Moments worth remembering
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {highlightsData.map((item) => (
          <div 
            key={item.id} 
            className="group overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
          >
            {/* Image Placeholder - Dark cool gradient */}
            <div className="h-48 bg-gradient-to-br from-slate-800 to-black flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
               <span className="text-slate-700 font-bold text-4xl uppercase tracking-tighter opacity-20">Memory</span>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">
                  {item.category}
                </span>
                <span className="text-slate-500 text-xs">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
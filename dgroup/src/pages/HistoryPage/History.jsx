import { timelineData } from '../../data/groupData'

export default function History() {
  return (
    <div className="p-10 max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-12 pb-2">
        Our Journey
      </h1>

      <div className="relative border-l border-white/10 ml-4">
        {timelineData.map((item) => (
          <div key={item.id} className="mb-10 ml-9 relative">
            {/* The Dot on the Timeline */}
            <div className="absolute -left-[45px] mt-1.5 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] border-4 border-[#0A0C10]" />
            
            <span className="text-xs font-mono text-cyan-500/60 uppercase tracking-widest">
              {item.year}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
            <p className="text-slate-400 mt-2 leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
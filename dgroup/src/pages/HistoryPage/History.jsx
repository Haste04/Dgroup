import { timelineData } from '../../data/groupData'

export default function History() {
  return (
    <div className="p-10 max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-12 pb-2">
        Our Journey
      </h1>

      <div className="relative border-l border-white/10 ml-4">
        {timelineData.map((item) => (
          <div key={item.id} className="mb-16 ml-9 relative group">
            {/* The Dot on the Timeline */}
            <div className="absolute -left-[45px] mt-1.5 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] border-4 border-[#0A0C10] z-10" />
            
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-cyan-500/60 uppercase tracking-widest">
                {item.year}
              </span>
              {/* 1. IMAGE CONTAINER */}
              {item.img && (
                <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-xl group-hover:border-cyan-500/30 transition-all duration-500">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              )}

              {/* 2. TEXT CONTENT */}
              <div>
                <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl text-base">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
import { useState } from 'react' // Added useState
import { highlightsData } from '../../data/groupData'

export default function Highlights() {
  // 1. State to track the selected year
  const [activeYear, setActiveYear] = useState('ALL')
  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

  // 2. Filter logic (assumes item.date includes the year string)
  const filteredHighlights = activeYear === 'ALL' 
    ? highlightsData 
    : highlightsData.filter(item => item.date.includes(activeYear))

  return (
    <div className="p-10 max-w-5xl mx-auto animate-fade-in">
      {/* 3. Header Container with Flex for Side-by-Side layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-white mb-2">Highlights</h1>
          <p className="text-cyan-500 font-mono text-sm uppercase tracking-tighter">
            Moments worth remembering
          </p>
        </div>

        {/* 4. Year Buttons Container */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveYear('ALL')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${activeYear === 'ALL' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            ALL
          </button>
          {years.map(year => (
            <button 
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-5 py-2 rounded-full text-[12px] font-bold cursor-pointer transition-all ${activeYear === year ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-400 hover:bg-slate-700' }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Render filtered data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredHighlights.length > 0 ? (
          filteredHighlights.map((item) => (
            <div 
              key={item.id} 
              className="group overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-500"
            >
              {/* Image Placeholder */}
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
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-500 italic">No memories captured in {activeYear} yet...</p>
          </div>
        )}
      </div>
    </div>
  )
}
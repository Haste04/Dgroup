import { useState } from 'react'
import { highlightsData } from '../../data/groupData'

export default function Highlights() {
  const [activeYear, setActiveYear] = useState('ALL')
  
  // 1. New State: Track the entire highlight object and the current photo index
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

  const filteredHighlights = activeYear === 'ALL' 
    ? highlightsData 
    : highlightsData.filter(item => item.date.includes(activeYear))

  // 2. Navigation Handlers
  const nextImage = (e) => {
    e.stopPropagation(); // Prevents clicking the image from closing the modal
    setCurrentIndex((prev) => (prev + 1) % selectedGallery.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto animate-fade-in">
      {/* Header Section (Unchanged) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-white mb-2">Highlights</h1>
          <p className="text-cyan-500 font-mono text-sm uppercase tracking-tighter">Moments worth remembering</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['ALL', ...years].map(year => (
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

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredHighlights.map((item) => (
          <div key={item.id} className="group overflow-hidden rounded-3xl bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
            {/* 3. Updated Click Logic: Pass the whole item and set index to 0 */}
            <div 
              className="h-48 overflow-hidden bg-slate-800 cursor-zoom-in relative"
              onClick={() => {
                if (item.images?.length > 0) {
                  setSelectedGallery(item);
                  setCurrentIndex(0);
                }
              }}
            >
              {item.images?.[0] ? (
                <>
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {/* Indicator if there are multiple photos */}
                  {item.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white border border-white/10">
                      + {item.images.length - 1} more
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-black">
                  <span className="text-slate-700 font-bold text-4xl opacity-20 uppercase">Memory</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                <span className="text-slate-500 text-xs">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. NEW MULTI-PHOTO LIGHTBOX MODAL */}
      {selectedGallery && (
        <div 
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 pt-10 md:pt-16 animate-fade-in overflow-y-auto"
          onClick={() => setSelectedGallery(null)}
        >
          {/* Close Button */}
          <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl z-[210] p-2">✕</button>
          
          {/* Navigation Arrows (Only show if more than 1 image) */}
          {selectedGallery.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-10 z-[210] mt-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white text-4xl transition-all"
              >‹</button>
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-10 z-[210] mt-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white text-4xl transition-all"
              >›</button>
            </>
          )}

          {/* Image & Caption Wrapper */}
          <div className="relative flex flex-col items-center max-w-7xl w-full">
            <img 
              key={currentIndex} // Key helps trigger animation on image change
              src={selectedGallery.images[currentIndex]} 
              alt="Fullscreen view" 
              className="max-h-[80vh] max-w-full rounded-lg shadow-2xl animate-zoom-in object-contain"
              onClick={(e) => e.stopPropagation()} 
            />
            
            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-bold">{selectedGallery.title}</h3>
              <p className="text-cyan-400 font-mono text-sm mt-1">
                {currentIndex + 1} / {selectedGallery.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
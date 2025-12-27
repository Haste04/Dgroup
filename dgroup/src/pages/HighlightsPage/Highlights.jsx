import { useState, useEffect } from 'react'
import { highlightsData } from '../../data/groupData'

export default function Highlights() {
  const [activeYear, setActiveYear] = useState('ALL')
  const [selectedGallery, setSelectedGallery] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 1. State to remember the user's scroll position
  const [scrollPosition, setScrollPosition] = useState(0)

  const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026']

  const filteredHighlights = activeYear === 'ALL' 
    ? highlightsData 
    : highlightsData.filter(item => item.date.includes(activeYear))

  // 2. Teleportation: Save position and jump to top
  const handleOpenGallery = (item) => {
    setScrollPosition(window.scrollY) // Record current spot
    setSelectedGallery(item)
    setCurrentIndex(0)
    window.scrollTo({ top: 0, behavior: 'instant' }) // Teleport to top
  }

  // 3. Reverse Teleportation: Return to original spot
  const handleCloseGallery = () => {
    setSelectedGallery(null)
    // Small timeout ensures the DOM updates before we scroll back
    setTimeout(() => {
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
    }, 10)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % selectedGallery.images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + selectedGallery.images.length) % selectedGallery.images.length)
  }

  return (
    <div className="p-10 max-w-5xl mx-auto animate-fade-in">
      {/* Header Section */}
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
            <div 
              className="h-48 overflow-hidden bg-slate-800 cursor-zoom-in relative"
              onClick={() => handleOpenGallery(item)} // Trigger Teleport
            >
              {item.images?.[0] && (
                <>
                  <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {item.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white border border-white/10">
                      + {item.images.length - 1} more
                    </div>
                  )}
                </>
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

      {/* MULTI-PHOTO LIGHTBOX MODAL */}
      {selectedGallery && (
      /* Main Container */
      <div className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-xl animate-fade-in">
        
        {/* 1. Close Button - Absolute to the whole screen */}
        <button 
          className="absolute top-6 right-6 text-white/50 hover:text-white text-5xl z-[700] p-2 transition-colors"
          onClick={handleCloseGallery}
        >
          ✕
        </button>

        {/* 2. Navigation Buttons - Fixed to screen center, outside the flex container */}
        {selectedGallery.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="fixed left-4 md:left-8 top-75 -translate-y-1/2 z-[700] w-16 h-16 flex items-start justify-center rounded-full bg-white/5 hover:bg-cyan-500 hover:scale-110 text-white text-5xl transition-all border border-white/10 shadow-2xl"
            >
              ‹
            </button>
            <button 
              onClick={nextImage}
              className="fixed right-4 md:right-8 top-75 -translate-y-1/2 z-[700] w-16 h-16 flex items-start justify-center rounded-full bg-white/5 hover:bg-cyan-500 hover:scale-110 text-white text-5xl transition-all border border-white/10 shadow-2xl"
            >
              ›
            </button>
          </>
        )}

        {/* 3. Image & Text Container - Handles the "Top of Page" alignment */}
        <div 
          className="w-full h-full flex items-start justify-center p-4 md:p-12 pt-10 md:pt-16 overflow-y-auto"
          onClick={handleCloseGallery}
        >
          <div 
            className="relative flex flex-col items-center max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              key={currentIndex}
              src={selectedGallery.images[currentIndex]} 
              alt="Fullscreen view" 
              className="max-h-[80vh] max-w-full rounded-lg shadow-2xl animate-zoom-in object-contain border border-white/10"
            />
            
            <div className="mt-6 text-center">
              <h3 className="text-white text-2xl font-bold">{selectedGallery.title}</h3>
              <p className="text-cyan-400 font-mono text-lg mt-1">
                {currentIndex + 1} / {selectedGallery.images.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}
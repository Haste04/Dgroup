import { useState, useEffect } from 'react'
import { timelineData } from '../../data/groupData'

export default function History() {
  const [selectedImg, setSelectedImg] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  
  // 1. New State to track if the "Back to Top" button should be visible
  const [showTopBtn, setShowTopBtn] = useState(false)

  // 2. Monitor scroll for the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenImage = (img) => {
    setScrollPosition(window.scrollY)
    setSelectedImg(img)
    window.scrollTo(0, 0)
  }

  const handleCloseImage = () => {
    setSelectedImg(null)
    setTimeout(() => {
      window.scrollTo(0, scrollPosition)
    }, 10)
  }

  // Smooth scroll to top function
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedImg])

  return (
    <div className="p-10 max-w-4xl mx-auto animate-fade-in relative">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-12 pb-2">
        Our Journey
      </h1>

      {/* Timeline Content */}
      <div className="relative border-l border-white/10 ml-4">
        {timelineData.map((item) => (
          <div key={item.id} className="mb-16 ml-9 relative group">
            <div className="absolute -left-[45px] mt-1.5 w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] border-4 border-[#0A0C10] z-10" />
            <div className="flex flex-col gap-6">
              <span className="text-xs font-mono text-cyan-500/60 uppercase tracking-widest">{item.year}</span>
              {item.img && (
                <div 
                  className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-xl group-hover:border-cyan-500/30 transition-all duration-500 cursor-zoom-in"
                  onClick={() => handleOpenImage(item.img)}
                >
                  <img src={item.img} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-slate-400 mt-3 leading-relaxed max-w-2xl text-base">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. FLOATING BACK TO TOP BUTTON */}
      <button
        onClick={goToTop}
        className={`fixed bottom-22 right-1 z-[100] w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-110 active:scale-95 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <span className="text-2xl font-bold">↑</span>
      </button>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[500] flex items-start justify-center bg-black/95 backdrop-blur-xl p-4 animate-fade-in"
          onClick={handleCloseImage}
        >
          <button className="fixed top-6 right-6 text-white text-4xl hover:text-cyan-400 z-[510]">✕</button>
          <img 
            src={selectedImg} 
            alt="Fullscreen view" 
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl animate-zoom-in object-contain"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  )
}
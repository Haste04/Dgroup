import { useState } from 'react'
import { members } from '../../data/groupData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'

export default function Members() {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    /* Added overflow-x-hidden to the main wrapper to prevent the "White Screen" scroll */
    <div className="p-10 max-w-7xl mx-auto animate-fade-in flex flex-col items-center justify-center min-h-[80vh] overflow-x-hidden">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-white tracking-tighter">
          The <span className="text-cyan-400">Sunday Gang 😎❤️</span>
        </h1>
        <p className="text-slate-500 mt-2 font-mono uppercase tracking-widest text-sm">
          Swipe through the family
        </p>
      </header>

      {/* Container for Swiper + Outside Buttons */}
      <div className="relative w-full flex items-center justify-center gap-4 md:gap-8 px-4">
        
        {/* Custom Prev Button - Added flex-shrink-0 and fixed dimensions */}
        <button className="swiper-prev-custom flex-shrink-0 w-12 h-12 flex items-center justify-center text-cyan-400 hover:text-white text-5xl transition-all cursor-pointer z-10 hidden md:flex">
          ‹
        </button>

        <div className="w-full max-w-[920px]">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'} 
            initialSlide={0}
            coverflowEffect={{
              rotate: 35,     
              stretch: 0,   
              depth: 250,   
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.swiper-next-custom',
              prevEl: '.swiper-prev-custom',
            }}
            modules={[EffectCoverflow, Navigation]}
            className="py-12"
          >
            {members.map((person) => (
              <SwiperSlide key={person.id} className="max-w-[320px] md:max-w-[380px]">
                <div 
                  onClick={() => setSelectedMember(person)}
                  className={`relative bg-slate-900 border border-white/20 p-8 rounded-3xl cursor-pointer shadow-2xl h-[450px] flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:border-transparent`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${person.color} blur-3xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <span className={`text-xs font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${person.color}`}>
                      {person.role}
                    </span>
                    <h2 className="text-4xl font-black text-white mt-2 leading-tight">{person.name}</h2>
                  </div>

                  <div className="relative z-10 border-t border-white/10 pt-4 italic text-slate-300 text-sm">
                    "Click to see more"
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Next Button - Added flex-shrink-0 and fixed dimensions */}
        <button className="swiper-next-custom flex-shrink-0 w-12 h-12 flex items-center justify-center text-cyan-400 hover:text-white text-5xl transition-all cursor-pointer z-10 hidden md:flex">
          ›
        </button>
      </div>

      {selectedMember && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
        {/* Added 'max-h-[90vh]' and 'overflow-y-auto' 
          This prevents the modal from disappearing off the top/bottom of mobile screens 
        */}
        <div className="bg-[#0A0C10] border border-white/20 rounded-3xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
          
          {/* 1. TOP/LEFT SIDE: IMAGE */}
          <div className="w-full md:w-2/5 aspect-square md:aspect-auto md:h-auto relative border-b md:border-b-0 md:border-r border-white/10 flex-shrink-0">
            <img 
              src={selectedMember.img} 
              alt={selectedMember.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0A0C10] to-transparent opacity-60" />
          </div>

          {/* 2. BOTTOM/RIGHT SIDE: DETAILS */}
          <div className="w-full md:w-3/5 p-6 md:p-8 relative">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${selectedMember.color}`} />
            
            {/* Close Button - Increased padding for easier tapping on mobile */}
            <button 
              onClick={() => setSelectedMember(null)} 
              className="absolute top-4 right-4 md:right-6 text-slate-500 hover:text-white text-3xl md:text-2xl z-20 p-2"
            >
              ✕
            </button>

            <span className={`font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r ${selectedMember.color}`}>
              {selectedMember.role}
            </span>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 leading-tight">{selectedMember.name}</h2>
            <p className="text-slate-500 font-mono mb-4 md:mb-6 text-xs md:text-sm">
              AKA: {selectedMember.nickname} <br className="md:hidden" /> | 🎂 {selectedMember.birthday}
            </p>

            <div className="space-y-5 md:space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-wider">Favorite Verse</h4>
                <p className={`italic text-base md:text-lg font-serif bg-clip-text text-transparent bg-gradient-to-r ${selectedMember.color} brightness-125 leading-relaxed`}>
                  "{selectedMember.verse}"
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-wider">Brief Bio</h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {selectedMember.bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}
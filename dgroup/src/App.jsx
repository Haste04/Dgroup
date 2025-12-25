import { useState } from 'react'
import Login from './pages/LoginPage/Login'
import History from './pages/HistoryPage/History'
import Highlights from './pages/HighlightsPage/Highlights'
import Members from './pages/MembersPage/Members'

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [currentPage, setCurrentPage] = useState('history') // Default page after login

  // This function runs when the password is correct
  const handleUnlock = () => {
    setIsLocked(false)
    setCurrentPage('history') // Directs them straight to history
  }

  if (isLocked) {
    return <Login onUnlock={handleUnlock} />
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white flex overflow-x-hidden">
      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'history' && <History />}
        {currentPage === 'highlights' && <Highlights />}
        {currentPage === 'members' && <Members />}
      </main>

      {/* Navigation Buttons - Added "fixed right-0" */}
      <nav className="fixed right-0 w-24 flex flex-col items-center gap-8 bg-black/40 backdrop-blur-md h-fit">
        <NavButton 
          icon="/history.png"     
          tooltip="History"
          active={currentPage === 'history'} 
          onClick={() => setCurrentPage('history')} 
        />

        <NavButton 
          icon="/highlights.png" 
          tooltip="Highlights"
          active={currentPage === 'highlights'} 
          onClick={() => setCurrentPage('highlights')} 
        />

        <NavButton 
          icon="/members.png"    
          tooltip="Members"
          active={currentPage === 'members'} 
          onClick={() => setCurrentPage('members')} 
        />
      </nav>
    </div>
  )
}

// Small helper component for the buttons
function NavButton({ icon, tooltip, active, onClick }) {
  return (
    <div className="group relative flex items-center justify-center">
      {/* The Tooltip */}
      <span className="nav-tooltip shadow-[0_0_15px_rgba(6,182,212,0.5)]">
        {tooltip}
      </span>

      <button 
        onClick={onClick}
        className={`w-14 h-14 rounded-full border transition-all duration-300 flex items-center justify-center p-3
          ${active 
            ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
            : 'bg-transparent border-white/10 hover:border-white/30'}`}
      >
        <img 
          src={icon} 
          alt={tooltip} 
          className={`w-full h-full object-contain transition-all 
            ${active ? 'brightness-125' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}`} 
        />
      </button>
    </div>
  )
}

export default App
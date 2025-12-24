import { useState } from 'react'

export default function Login({ onUnlock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [tries, setTries] = useState(0)

  const CORRECT_PASSWORD = "Nestea"

  const handleLogin = (e) => {
    e.preventDefault()
    if (password.toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      onUnlock() // Tell the parent component we are in!
    } else {
      setError(true)
      setTries(prev => prev + 1)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center p-4">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-tight">Pstt... What is the Password?</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="What is the password?"
            className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition-all active:scale-95">
            Enter Password
          </button>
        </form>

        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-400 font-medium mb-2 animate-bounce">Wrong Password!</p>
            {tries >= 3 && (
              <p className="text-slate-500 text-sm mt-4 border-t border-white/10 pt-4 animate-fade-in">
                <span className="text-cyan-500/80">Hint:</span> The password is the nickname of our Dgroup Leader
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
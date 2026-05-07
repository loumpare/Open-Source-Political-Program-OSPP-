import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Proposals', to: '/proposals' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <span className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-black">OS</span>
          <span className="hidden sm:block">OpenPolicy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === n.to
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <Globe size={15} />
            EN
          </button>
          <a
            href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/proposals"
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            View proposals
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4 pt-2 space-y-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === n.to ? 'bg-slate-100 text-slate-900' : 'text-slate-600'
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/proposals"
            onClick={() => setOpen(false)}
            className="block mt-2 px-3 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg text-center"
          >
            View proposals
          </Link>
        </div>
      )}
    </header>
  )
}

import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLanguage, LANG_META, type LangCode } from '../../i18n'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { pathname }            = useLocation()
  const { t, lang, setLang }    = useLanguage()
  const langRef                 = useRef<HTMLDivElement>(null)

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const NAV = [
    { label: t.nav.home,       to: '/' },
    { label: t.nav.proposals,  to: '/proposals' },
    { label: t.nav.simulation, to: '/simulations' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <span className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-black">
            OS
          </span>
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

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600
                         hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="text-base">{LANG_META[lang].flag}</span>
              <span className="font-medium">{lang.toUpperCase()}</span>
              <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl
                              border border-slate-200 shadow-lg py-1 z-50">
                {(Object.keys(LANG_META) as LangCode[]).map(code => (
                  <button
                    key={code}
                    onClick={() => { setLang(code); setLangOpen(false) }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm
                                hover:bg-slate-50 transition-colors text-left
                                ${lang === code ? 'font-semibold text-indigo-600' : 'text-slate-700'}`}
                  >
                    <span className="text-base">{LANG_META[code].flag}</span>
                    {LANG_META[code].label}
                    {lang === code && (
                      <svg className="ml-auto w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            {t.footer.github}
          </a>
          <Link
            to="/proposals"
            className="px-4 py-2 bg-slate-900 text-white text-sm font-medium
                       rounded-lg hover:bg-slate-700 transition-colors"
          >
            {t.home.cta_proposals}
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
          {/* Mobile language buttons */}
          <div className="flex gap-2 pt-2">
            {(Object.keys(LANG_META) as LangCode[]).map(code => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`flex-1 py-2 text-xs rounded-lg border transition-colors
                  ${lang === code
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-600 border-slate-200'}`}
              >
                {LANG_META[code].flag} {code.toUpperCase()}
              </button>
            ))}
          </div>
          <Link
            to="/proposals"
            onClick={() => setOpen(false)}
            className="block mt-2 px-3 py-2.5 bg-slate-900 text-white
                       text-sm font-medium rounded-lg text-center"
          >
            {t.home.cta_proposals}
          </Link>
        </div>
      )}
    </header>
  )
}

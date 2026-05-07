import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-3">
              <span className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center text-white text-xs font-black">OS</span>
              OpenPolicy
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The first open-source political platform combining citizen collaboration, peer-reviewed science, and LLM-powered impact simulation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-semibold text-slate-900 mb-3">Platform</p>
              <ul className="space-y-2 text-slate-500">
                <li><Link to="/proposals" className="hover:text-slate-900">Proposals</Link></li>
                <li><a href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900">Contribute on GitHub</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-3">Science</p>
              <ul className="space-y-2 text-slate-500">
                <li><span>208 peer-reviewed sources</span></li>
                <li><span>4 domains covered</span></li>
                <li><span>GNU AGPL-3.0</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <span>© 2026 OpenPolicy — Open Source Political Program</span>
          <a
            href="https://github.com/loumpare/Open-Source-Political-Program-OSPP-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-700 transition-colors"
          >
            <Github size={13} />
            View source on GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

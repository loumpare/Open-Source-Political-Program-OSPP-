import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Share, Plus } from 'lucide-react'
import { usePwa } from '../../hooks/usePwa'

export default function InstallPrompt() {
  const { install, dismiss, showBanner, isIos } = usePwa()

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-start">
            {/* App icon */}
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-900 text-sm shrink-0">
              OS
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">Install OpenPolicy</p>
              {isIos ? (
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Tap <Share size={11} className="inline mx-0.5 mb-0.5" /> then{' '}
                  <span className="inline-flex items-center gap-0.5 bg-slate-700 px-1.5 py-0.5 rounded text-xs">
                    <Plus size={10} /> Add to Home Screen
                  </span>
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-0.5">
                  Works offline · No account needed
                </p>
              )}
              {!isIos && (
                <button
                  onClick={install}
                  className="mt-2.5 flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-900 font-semibold text-xs px-3 py-1.5 rounded-lg"
                >
                  <Download size={12} />
                  Install app
                </button>
              )}
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              className="text-slate-500 hover:text-white transition-colors p-1 shrink-0"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

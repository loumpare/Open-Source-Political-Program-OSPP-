import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdatePrompt() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW()

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm">
            <RefreshCw size={15} className="text-emerald-400" />
            <span>New version available</span>
            <button
              onClick={() => updateServiceWorker(true)}
              className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Update
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

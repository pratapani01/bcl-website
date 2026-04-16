// TermsModal.jsx
// ✅ CHANGE 3: Terms & Conditions popup shown before redirecting to any Google Form.
// Usage: <TermsModal formUrl="..." roleLabel="Batsman" onClose={() => setOpen(false)} />

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TermsModal({ formUrl, roleLabel, onClose }) {
  const [agreed, setAgreed] = useState(false)

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleContinue = () => {
    if (!agreed) return
    window.open(formUrl, '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="terms-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        {/* Modal panel — stop click propagation so clicking inside doesn't close */}
        <motion.div
          key="terms-panel"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bcl-gradient px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Before You Register
              </p>
              <h2 className="text-white font-black text-lg mt-0.5">
                Terms &amp; Conditions
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 flex flex-col gap-5">

            {/* Role badge */}
            {roleLabel && (
              <div className="flex items-center gap-3 bg-bcl-blue/5 border border-bcl-blue/10 rounded-xl px-4 py-3">
                <span className="text-xl">🏏</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Registering as</p>
                  <p className="text-bcl-blue font-black text-sm">{roleLabel}</p>
                </div>
              </div>
            )}

            {/* Terms text box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5 flex-shrink-0">⚠️</span>
                <p className="text-amber-900 text-sm font-bold leading-snug">
                  Eligibility Restriction
                </p>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                Players who have played any official <strong>Board-level or National-level cricket</strong>{' '}
                (e.g., BCCI tournaments, state-level official tournaments) are{' '}
                <strong>NOT allowed to participate</strong>.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl px-5 py-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                By proceeding, you confirm that:
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {[
                  'You are not a national or board-level cricket player.',
                  'All information provided during registration is accurate.',
                  'You agree to abide by BCL\'s rules and code of conduct.',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <div className="relative mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    agreed
                      ? 'bg-bcl-blue border-bcl-blue'
                      : 'border-gray-300 group-hover:border-bcl-blue bg-white'
                  }`}
                >
                  {agreed && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-snug">
                I agree to the{' '}
                <strong className="text-bcl-blue">terms and conditions</strong>{' '}
                and confirm I am eligible to participate in BCL Season 1.
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                disabled={!agreed}
                className={`flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300 ${
                  agreed
                    ? 'bg-bcl-blue text-white hover:bg-bcl-gold hover:text-bcl-blue shadow-lg hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue →
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

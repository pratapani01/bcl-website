// BCLWelcomePopup.jsx
// Auto-appearing popup after 5-7 seconds or on first scroll.
// Shows BCL welcome info and a WhatsApp CTA button.
// Once closed, does not reappear in the same session.

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_LINK = 'https://chat.whatsapp.com/Jk8TEuezlcC7D8jUHaHHJe?mode=gi_t'
const SESSION_KEY = 'bcl_welcome_popup_closed'

export default function BCLWelcomePopup() {
  const [visible, setVisible] = useState(false)
  const shown = useRef(false)

  const show = () => {
    if (shown.current) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    shown.current = true
    setVisible(true)
  }

  const close = () => {
    setVisible(false)
    sessionStorage.setItem(SESSION_KEY, '1')
  }

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(SESSION_KEY)) return

    // Trigger on first scroll
    const handleScroll = () => {
      show()
      window.removeEventListener('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also trigger after 6 seconds (mid-point of 5-7s range)
    const timer = setTimeout(() => {
      show()
      window.removeEventListener('scroll', handleScroll)
    }, 6000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!visible) return
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible])

  const handleWhatsApp = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer')
    close()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="bcl-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
          onClick={close}
        >
          <motion.div
            key="bcl-popup-panel"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bcl-popup-title"
          >
            {/* Header gradient */}
            <div className="bcl-gradient px-6 py-5 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-white/5" />

              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-bcl-gold text-xs font-bold uppercase tracking-widest mb-1">
                    Bharatiya Cricket League – Season 1
                  </p>
                  <h2
                    id="bcl-popup-title"
                    className="text-white font-black text-xl leading-tight"
                  >
                    Welcome to BCL! 🏏🔥
                  </h2>
                </div>
                <button
                  onClick={close}
                  aria-label="Close popup"
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white text-lg leading-none transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Before you proceed, please note:
              </p>

              {/* Info points */}
              <ul className="flex flex-col gap-2.5">
                {[
                  { icon: '🎂', text: 'Age Eligibility: Only participants between 18 to 45 years are allowed' },
                  { icon: '🏏', text: 'Open Registration: Players from all backgrounds can participate' },
                  { icon: '📋', text: 'Selection Process: Registration → Trials → Auction → Team Finalisation' },
                  { icon: '💰', text: 'Auction Base Price starts from ₹51,000 for selected players' },
                  { icon: '🏟️', text: 'Matches will be played on professional grounds' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                    <span className="text-sm text-gray-700 leading-snug">{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* Agreement note */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                <p className="text-blue-800 text-xs leading-relaxed">
                  By continuing, you agree to follow all league rules and guidelines.
                </p>
              </div>

              {/* CTA */}
              <p className="text-center text-bcl-blue font-bold text-sm">
                👉 Get ready to showcase your talent!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={close}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Continue Browsing
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3 rounded-xl font-black text-sm bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" width="18" height="18" aria-hidden="true">
                    <path d="M16.004 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.346.634 4.543 1.738 6.437L2.667 29.333l7.098-1.708A13.28 13.28 0 0016.004 29.333C23.37 29.333 29.333 23.362 29.333 16c0-7.362-5.963-13.333-13.329-13.333zm0 2.666c5.887 0 10.663 4.776 10.663 10.667 0 5.89-4.776 10.667-10.663 10.667a10.62 10.62 0 01-5.438-1.493l-.39-.236-4.216 1.015 1.044-4.097-.257-.402A10.61 10.61 0 015.333 16c0-5.891 4.783-10.667 10.671-10.667zm-3.064 5.6c-.234 0-.614.088-.936.44-.322.353-1.23 1.201-1.23 2.927s1.258 3.396 1.434 3.63c.175.233 2.443 3.887 6.012 5.3 2.971 1.17 3.57.938 4.213.879.643-.059 2.074-.849 2.367-1.668.293-.819.293-1.521.205-1.668-.088-.146-.322-.234-.673-.41-.351-.175-2.074-1.024-2.396-1.14-.322-.117-.555-.175-.789.175-.234.351-.908 1.14-1.112 1.374-.205.234-.41.263-.76.088-.352-.176-1.484-.547-2.826-1.745-1.045-.933-1.75-2.085-1.955-2.436-.205-.351-.022-.54.154-.715.158-.157.352-.41.527-.614.176-.205.234-.351.352-.585.117-.234.059-.44-.03-.614-.087-.175-.778-1.912-1.083-2.61-.27-.638-.551-.643-.789-.651l-.686-.012z" />
                  </svg>
                  Join WhatsApp Group
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

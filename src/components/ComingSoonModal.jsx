import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

export default function ComingSoonModal({ onClose }) {
  const { settings } = useSettings()
  const number = settings.whatsappNumber || '919250324379'

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-bcl-blue h-2 w-full" />
          <div className="p-8">
            <h2 className="text-2xl font-black text-bcl-blue text-center mb-3">Coming Soon 🚀</h2>
            <p className="text-gray-600 text-center text-sm leading-relaxed mb-6">
              {settings.comingSoonText || "BCL T20 registrations will open shortly. Stay connected and don't miss your chance to play."}
            </p>
            <hr className="border-gray-200 mb-5" />
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-4">Follow us for updates</p>
            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                <span className="text-xl">💬</span>
                <div><p className="text-xs text-gray-500 font-medium">WhatsApp</p><p className="text-sm font-bold text-green-700">+{number}</p></div>
              </a>
              <a href="https://www.instagram.com/bcl.t20.cricket/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
                <span className="text-xl">📸</span>
                <div><p className="text-xs text-gray-500 font-medium">Instagram</p><p className="text-sm font-bold text-pink-600">@bcl.t20.cricket</p></div>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61570680840778" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                <span className="text-xl">📘</span>
                <div><p className="text-xs text-gray-500 font-medium">Facebook</p><p className="text-sm font-bold text-blue-600">BCL T20</p></div>
              </a>
            </div>
            <button onClick={onClose} className="mt-6 w-full bg-bcl-blue text-white py-3 rounded-full text-sm font-semibold hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300">Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

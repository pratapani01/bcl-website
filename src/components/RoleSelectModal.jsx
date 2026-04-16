// RoleSelectModal.jsx
// ✅ CHANGE 2 (mobile): Popup shown when user taps "Register Now" in the mobile menu.
// Displays role cards; selecting one triggers TermsModal before opening the Google Form.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TermsModal from './TermsModal'

const roles = [
  {
    icon: '🏏',
    label: 'Batsman',
    price: '₹2,000',
    formUrl: 'https://forms.gle/TkUSWHGjo6NGrpG28',
    color: '#1B3A6B',
    bg: '#EEF2FF',
  },
  {
    icon: '⚾',
    label: 'Bowler',
    price: '₹2,000',
    formUrl: 'https://forms.gle/QUT1S3Sa195uS4YPA',
    color: '#E63946',
    bg: '#FEF2F2',
  },
  {
    icon: '⭐',
    label: 'All Rounder',
    price: '₹3,000',
    formUrl: 'https://forms.gle/thqKgAwsuTqt4VARA',
    color: '#C9A227',
    bg: '#FFF8E1',
    popular: true,
  },
]

export default function RoleSelectModal({ onClose }) {
  // selectedRole holds { label, formUrl } when user picks a role → triggers TermsModal
  const [selectedRole, setSelectedRole] = useState(null)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape closes role modal (unless terms modal is open)
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && !selectedRole) onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, selectedRole])

  return (
    <>
      <AnimatePresence>
        {/* Backdrop */}
        <motion.div
          key="role-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          {/* Bottom sheet panel */}
          <motion.div
            key="role-panel"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            className="bg-white rounded-t-3xl w-full max-w-md pb-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">BCL Season 1</p>
                <h2 className="text-bcl-blue font-black text-lg mt-0.5">Choose Your Role</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Role options */}
            <div className="px-6 pt-5 flex flex-col gap-3">
              {roles.map((role, i) => (
                <motion.button
                  key={role.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelectedRole({ label: role.label, formUrl: role.formUrl })}
                  className="w-full flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative"
                  style={{ borderColor: role.color + '40', backgroundColor: role.bg }}
                >
                  {role.popular && (
                    <span
                      className="absolute -top-2.5 right-4 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest"
                      style={{ backgroundColor: role.color }}
                    >
                      Popular
                    </span>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: role.color + '20' }}
                  >
                    {role.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-gray-800 text-base">{role.label}</p>
                    <p className="text-xs mt-0.5 font-semibold" style={{ color: role.color }}>
                      {role.price} registration fee
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: role.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ))}

              <p className="text-center text-xs text-gray-400 pt-1">
                Select your role to view terms and proceed
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ✅ CHANGE 3: Terms modal opens on top when a role is selected */}
      {selectedRole && (
        <TermsModal
          formUrl={selectedRole.formUrl}
          roleLabel={selectedRole.label}
          onClose={() => {
            setSelectedRole(null)
            onClose() // also close the role modal after terms are done / cancelled
          }}
        />
      )}
    </>
  )
}

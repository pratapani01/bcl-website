// Navbar.jsx — Updated with 3 targeted changes:
//   ✅ CHANGE 1: Mobile center "BCL" text between logo and hamburger
//   ✅ CHANGE 2: Mobile menu shows single "Register Now" button → opens RoleSelectModal
//   ✅ CHANGE 3: T&C modal (via RoleSelectModal → TermsModal) before any form redirect
//
// ⚠️  Desktop layout, desktop dropdown, all animations, and all other code are UNCHANGED.

import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TermsModal from './TermsModal'
import RoleSelectModal from './RoleSelectModal'
import ComingSoonModal from './ComingSoonModal'
import REGISTRATION_OPEN from '../registrationConfig'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  // ✅ CHANGE 2 & 3: State for mobile role-select modal and desktop T&C modal
  const [mobileRoleModalOpen, setMobileRoleModalOpen] = useState(false)
  const [desktopTerms, setDesktopTerms] = useState(null) // { label, formUrl }

  // Coming Soon modal state
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setRegisterOpen(false)
  }, [location.pathname])

  // ✅ CLICK OUTSIDE CLOSE (unchanged)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRegisterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/teams', label: 'Teams' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  // Desktop dropdown role items — clicking opens T&C modal (CHANGE 3)
  const desktopRoles = [
    { icon: '🏏', label: 'Batsman',     formUrl: 'https://forms.gle/TkUSWHGjo6NGrpG28' },
    { icon: '⚾', label: 'Bowler',      formUrl: 'https://forms.gle/QUT1S3Sa195uS4YPA' },
    { icon: '⭐', label: 'All Rounder', formUrl: 'https://forms.gle/thqKgAwsuTqt4VARA' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo — unchanged */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-bcl-blue flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src="/assets/logo.png"
                alt="BCL Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = '<span class="text-white font-black text-lg">BCL</span>'
                }}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-bcl-blue font-black text-sm leading-none tracking-widest uppercase">Bharatiya</p>
              <p className="text-bcl-gold font-black text-sm leading-none tracking-widest uppercase">Cricket League</p>
            </div>
          </Link>

          {/* ✅ CHANGE 1: Centered "BCL" label — mobile only (hidden at sm breakpoint = 640px+) */}
          <span className="sm:hidden absolute left-1/2 -translate-x-1/2 text-bcl-blue font-black text-base tracking-widest uppercase pointer-events-none select-none">
            Bharatiya Cricket League
          </span>

          {/* Desktop Nav — unchanged */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-600 tracking-wide transition-colors duration-200 relative group ${
                    isActive ? 'text-bcl-blue font-bold' : 'text-gray-600 hover:text-bcl-blue'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-bcl-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4 relative">

            {/* ✅ Desktop Register dropdown — CHANGE 3: clicking a role now opens TermsModal */}
            <div ref={dropdownRef} className="hidden md:inline-flex relative">
              <button
                onClick={() => {
                  if (!REGISTRATION_OPEN) {
                    setComingSoonOpen(true)
                  } else {
                    setRegisterOpen(!registerOpen)
                  }
                }}
                className="flex items-center gap-2 bg-bcl-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Register Now
                {REGISTRATION_OPEN && (
                  <span className={`transition-transform duration-300 ${registerOpen ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                )}
              </button>

              <AnimatePresence>
                {REGISTRATION_OPEN && registerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border w-56 overflow-hidden z-50"
                  >
                    {desktopRoles.map((role) => (
                      <button
                        key={role.label}
                        onClick={() => {
                          setRegisterOpen(false)
                          setDesktopTerms({ label: role.label, formUrl: role.formUrl })
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                      >
                        {role.icon} {role.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger — unchanged */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                {/* Nav links — unchanged */}
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-sm font-medium py-2 px-4 rounded-lg transition-colors ${
                        isActive ? 'bg-bcl-blue text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}

                {/* ✅ CHANGE 2: Single "Register Now" button replaces the 3 direct role links */}
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    if (!REGISTRATION_OPEN) {
                      setComingSoonOpen(true)
                    } else {
                      setMobileRoleModalOpen(true)
                    }
                  }}
                  className="bg-bcl-gold text-bcl-blue px-5 py-3 rounded-full text-sm font-black text-center hover:bg-bcl-blue hover:text-white transition-all duration-300"
                >
                  🏏 Register Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ✅ CHANGE 2 + 3: Mobile role-select modal (outside header to avoid stacking context issues) */}
      {mobileRoleModalOpen && (
        <RoleSelectModal onClose={() => setMobileRoleModalOpen(false)} />
      )}

      {/* ✅ CHANGE 3: Desktop T&C modal triggered from dropdown role selection */}
      {desktopTerms && (
        <TermsModal
          formUrl={desktopTerms.formUrl}
          roleLabel={desktopTerms.label}
          onClose={() => setDesktopTerms(null)}
        />
      )}

      {/* Coming Soon modal — shown when REGISTRATION_OPEN === false */}
      {comingSoonOpen && (
        <ComingSoonModal onClose={() => setComingSoonOpen(false)} />
      )}
    </>
  )
}

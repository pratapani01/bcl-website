import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

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

  // ✅ CLICK OUTSIDE CLOSE
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

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-bcl-blue flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <img
              src="/assets/logo.png"
              alt="BCL Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML = `<span class="text-white font-black text-lg">BCL</span>`
              }}
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-bcl-blue font-black text-sm leading-none tracking-widest uppercase">Bharatiya</p>
            <p className="text-bcl-gold font-black text-sm leading-none tracking-widest uppercase">Cricket League</p>
          </div>
        </Link>

        {/* Desktop Nav */}
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

          {/* ✅ REGISTER DROPDOWN */}
          <div ref={dropdownRef} className="hidden md:inline-flex relative">

            <button
              onClick={() => setRegisterOpen(!registerOpen)}
              className="flex items-center gap-2 bg-bcl-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Register Now

              {/* Arrow */}
              <span className={`transition-transform duration-300 ${registerOpen ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <AnimatePresence>
              {registerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border w-56 overflow-hidden z-50"
                >
                  <a href="https://forms.gle/TkUSWHGjo6NGrpG28" target="_blank" className="block px-4 py-3 text-sm hover:bg-gray-100">
                    🏏 Batsman
                  </a>
                  <a href="https://forms.gle/QUT1S3Sa195uS4YPA" target="_blank" className="block px-4 py-3 text-sm hover:bg-gray-100">
                    ⚾ Bowler
                  </a>
                  <a href="https://forms.gle/thqKgAwsuTqt4VARA" target="_blank" className="block px-4 py-3 text-sm hover:bg-gray-100">
                    ⭐ All Rounder
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Hamburger */}
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

              {/* Mobile Register Options */}
              <a href="https://forms.gle/TkUSWHGjo6NGrpG28" target="_blank" className="bg-bcl-gold text-bcl-blue px-5 py-2.5 rounded-full text-sm font-bold text-center">
                🏏 Batsman
              </a>
              <a href="https://forms.gle/QUT1S3Sa195uS4YPA" target="_blank" className="bg-bcl-gold text-bcl-blue px-5 py-2.5 rounded-full text-sm font-bold text-center">
                ⚾ Bowler
              </a>
              <a href="https://forms.gle/thqKgAwsuTqt4VARA" target="_blank" className="bg-bcl-gold text-bcl-blue px-5 py-2.5 rounded-full text-sm font-bold text-center">
                ⭐ All Rounder
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
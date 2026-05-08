import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TermsModal from './TermsModal'
import RoleSelectModal from './RoleSelectModal'
import ComingSoonModal from './ComingSoonModal'
import { useSettings } from '../contexts/SettingsContext'

export default function Navbar() {
  const { settings } = useSettings()
  const REGISTRATION_OPEN = settings.registrationOpen || false

  const [scrolled, setScrolled]               = useState(false)
  const [menuOpen, setMenuOpen]               = useState(false)
  const [registerOpen, setRegisterOpen]       = useState(false)
  const [mobileRoleModalOpen, setMobileRole]  = useState(false)
  const [desktopTerms, setDesktopTerms]       = useState(null)
  const [comingSoonOpen, setComingSoon]        = useState(false)

  const location    = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setMenuOpen(false); setRegisterOpen(false) }, [location.pathname])

  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setRegisterOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/teams', label: 'Teams' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const desktopRoles = [
    { icon: '🏏', label: 'Batsman',     formUrl: settings.batsmanFormLink    || 'https://forms.gle/TkUSWHGjo6NGrpG28' },
    { icon: '⚾', label: 'Bowler',      formUrl: settings.bowlerFormLink     || 'https://forms.gle/QUT1S3Sa195uS4YPA' },
    { icon: '⭐', label: 'All Rounder', formUrl: settings.allRounderFormLink || 'https://forms.gle/thqKgAwsuTqt4VARA' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-bcl-blue flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <img src="/assets/logo.png" alt="BCL Logo" className="w-full h-full object-cover"
                onError={e => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span class="text-white font-black text-lg">BCL</span>' }} />
            </div>
            <div className="hidden sm:block">
              <p className="text-bcl-blue font-black text-sm leading-none tracking-widest uppercase">Bharatiya</p>
              <p className="text-bcl-gold font-black text-sm leading-none tracking-widest uppercase">Cricket League</p>
            </div>
          </Link>

          <span className="sm:hidden absolute left-1/2 -translate-x-1/2 text-bcl-blue font-black text-base tracking-widest uppercase pointer-events-none select-none">
            Bharatiya Cricket League
          </span>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to}
                className={({ isActive }) => `text-sm font-600 tracking-wide transition-colors duration-200 relative group ${isActive ? 'text-bcl-blue font-bold' : 'text-gray-600 hover:text-bcl-blue'}`}
              >
                {({ isActive }) => (<>{link.label}<span className={`absolute -bottom-1 left-0 h-0.5 bg-bcl-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} /></>)}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 relative">
            <div ref={dropdownRef} className="hidden md:inline-flex relative">
              <button
                onClick={() => REGISTRATION_OPEN ? setRegisterOpen(!registerOpen) : setComingSoon(true)}
                className="flex items-center gap-2 bg-bcl-blue text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Register Now
                {REGISTRATION_OPEN && <span className={`transition-transform duration-300 ${registerOpen ? 'rotate-180' : ''}`}>▼</span>}
              </button>
              <AnimatePresence>
                {REGISTRATION_OPEN && registerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border w-56 overflow-hidden z-50"
                  >
                    {desktopRoles.map(role => (
                      <button key={role.label}
                        onClick={() => { setRegisterOpen(false); setDesktopTerms({ label: role.label, formUrl: role.formUrl }) }}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                      >
                        {role.icon} {role.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-bcl-blue transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <NavLink key={link.to} to={link.to}
                    className={({ isActive }) => `text-sm font-medium py-2 px-4 rounded-lg transition-colors ${isActive ? 'bg-bcl-blue text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {link.label}
                  </NavLink>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); REGISTRATION_OPEN ? setMobileRole(true) : setComingSoon(true) }}
                  className="bg-bcl-gold text-bcl-blue px-5 py-3 rounded-full text-sm font-black text-center hover:bg-bcl-blue hover:text-white transition-all duration-300">
                  🏏 Register Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {mobileRoleModalOpen && <RoleSelectModal onClose={() => setMobileRole(false)} />}
      {desktopTerms         && <TermsModal formUrl={desktopTerms.formUrl} roleLabel={desktopTerms.label} onClose={() => setDesktopTerms(null)} />}
      {comingSoonOpen       && <ComingSoonModal onClose={() => setComingSoon(false)} />}
    </>
  )
}

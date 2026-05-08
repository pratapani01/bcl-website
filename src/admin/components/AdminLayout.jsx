import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const ADMIN_NAV = [
  { to: '/admin',              icon: '🏠', label: 'Dashboard',           end: true },
  { to: '/admin/registration', icon: '📋', label: 'Registration'                    },
  { to: '/admin/forms',        icon: '🔗', label: 'Registration Links'              },
  { to: '/admin/popup',        icon: '📢', label: 'Popup & Announcement'           },
  { to: '/admin/homepage',     icon: '🏏', label: 'Homepage Controls'              },
  { to: '/admin/sections',     icon: '👁️', label: 'Section Visibility'             },
]

const MANAGER_NAV = [
  { to: '/manager',            icon: '🏠', label: 'Dashboard',           end: true },
  { to: '/manager/settings',   icon: '⚙️', label: 'View Settings'                  },
]

export default function AdminLayout({ children }) {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isAdmin = role === 'admin'
  const navItems = isAdmin ? ADMIN_NAV : MANAGER_NAV

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#1B3A6B] to-[#0f2347]">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img src="/assets/logo.png" alt="BCL"
              className="w-full h-full object-cover"
              onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-white font-black text-xs">BCL</span>' }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-sm leading-none truncate">BCL Admin</p>
            <p className="text-white/40 text-[11px] mt-0.5">
              {isAdmin ? '👑 Owner Admin' : '👔 Manager'}
            </p>
          </div>
        </div>
      </div>

      {/* User pill */}
      <div className="mx-3 mt-4 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
        <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">Signed as</p>
        <p className="text-white/80 text-xs font-semibold truncate mt-0.5">{user?.email}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white text-bcl-blue shadow font-bold'
                  : 'text-white/65 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
        <a href="/" target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/45 hover:text-white/70 transition-colors"
        >
          <span>🌐</span> View Website
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/45 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 fixed top-0 left-0 h-full z-30 flex-col shadow-2xl">
        <Sidebar />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 w-64 h-full z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <Sidebar />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className="h-0.5 bg-gray-600 rounded" />
                <span className="h-0.5 bg-gray-600 rounded" />
                <span className="h-0.5 bg-gray-600 rounded" />
              </div>
            </button>
            <div>
              <p className="text-bcl-blue font-black text-sm">
                {isAdmin ? '👑 Owner Admin Panel' : '👔 Manager Panel'}
              </p>
              <p className="text-gray-400 text-[11px]">Bharatiya Cricket League</p>
            </div>
          </div>
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${isAdmin ? 'bg-bcl-gold/20 text-bcl-blue' : 'bg-blue-100 text-blue-700'}`}>
            {isAdmin ? '👑 Admin' : '👔 Manager'}
          </span>
        </header>

        {/* Page */}
        <main className="flex-1 p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}

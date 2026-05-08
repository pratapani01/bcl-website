import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminLayout from '../components/AdminLayout'
import { Stat, Card, CardHead } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { useAuth } from '../../contexts/AuthContext'

const QUICK = [
  { to: '/admin/registration', icon: '📋', label: 'Toggle Registration',    color: 'bg-green-50 border-green-200 text-green-800' },
  { to: '/admin/forms',        icon: '🔗', label: 'Update Form Links',       color: 'bg-blue-50 border-blue-200 text-blue-800'   },
  { to: '/admin/popup',        icon: '📢', label: 'Edit Popup Text',         color: 'bg-purple-50 border-purple-200 text-purple-800' },
  { to: '/admin/homepage',     icon: '🏏', label: 'Homepage Controls',       color: 'bg-orange-50 border-orange-200 text-orange-800' },
  { to: '/admin/sections',     icon: '👁️', label: 'Section Visibility',      color: 'bg-teal-50 border-teal-200 text-teal-800'   },
]

export default function AdminDashboard() {
  const { settings } = useSettings()
  const { user } = useAuth()

  return (
    <AdminLayout>
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-bcl-blue to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden mb-7"
      >
        <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-bcl-gold font-bold text-xs uppercase tracking-widest mb-1">👑 Owner Admin</p>
          <h1 className="text-2xl font-black">Welcome back!</h1>
          <p className="text-white/50 text-sm mt-0.5">{user?.email}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <Stat icon="📋" label="Registrations"  value={settings.registrationOpen ? 'OPEN' : 'CLOSED'} green={settings.registrationOpen} red={!settings.registrationOpen} />
        <Stat icon="🏙️" label="Trial Cities"   value={settings.trialsCityCount || '20+'} />
        <Stat icon="🏆" label="Winner Prize"   value={settings.prizeWinner || '₹15 Lakhs'} />
        <Stat icon="💰" label="Runner-Up Prize" value={settings.prizeRunnerUp || '₹7 Lakhs'} />
      </div>

      {/* Quick actions */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-7">
        {QUICK.map((q, i) => (
          <motion.div key={q.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={q.to} className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center text-xs font-bold transition-all hover:shadow-md hover:-translate-y-0.5 ${q.color}`}>
              <span className="text-2xl">{q.icon}</span>
              {q.label}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Current status snapshot */}
      <Card>
        <CardHead icon="⚡" title="Live Settings Snapshot" subtitle="What visitors are seeing right now" />
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Registration',    value: settings.registrationOpen ? '✅ Open' : '🚫 Closed' },
            { label: 'WhatsApp',        value: settings.whatsappNumber || '—' },
            { label: 'Trial Cities',    value: settings.trialsCityCount || '—' },
            { label: 'Winner Prize',    value: settings.prizeWinner || '—' },
            { label: 'Runner-Up Prize', value: settings.prizeRunnerUp || '—' },
            { label: 'Auction Base',    value: settings.prizeAuctionBase || '—' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-semibold">{row.label}</span>
              <span className="text-xs font-bold text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  )
}

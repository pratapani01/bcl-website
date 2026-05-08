import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { Stat, Card, CardHead } from '../components/UI'
import { useSettings } from '../../contexts/SettingsContext'
import { useAuth } from '../../contexts/AuthContext'

export default function ManagerDashboard() {
  const { settings } = useSettings()
  const { user } = useAuth()

  return (
    <AdminLayout>
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden mb-6"
      >
        <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-white/5" />
        <div className="relative">
          <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-1">👔 Manager Panel</p>
          <h1 className="text-2xl font-black">Manager Dashboard</h1>
          <p className="text-white/50 text-sm mt-0.5">{user?.email}</p>
        </div>
      </motion.div>

      {/* Read-only notice */}
      <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-semibold">
        👔 Manager view — you have read-only access. Contact the Owner Admin to make changes.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <Stat icon="📋" label="Registrations"   value={settings.registrationOpen ? 'OPEN' : 'CLOSED'} green={settings.registrationOpen} red={!settings.registrationOpen} />
        <Stat icon="🏙️" label="Trial Cities"    value={settings.trialsCityCount || '—'} />
        <Stat icon="🏆" label="Winner Prize"    value={settings.prizeWinner || '—'} />
        <Stat icon="💰" label="Runner-Up"       value={settings.prizeRunnerUp || '—'} />
      </div>

      {/* Nav card */}
      <div className="mb-7">
        <Link to="/manager/settings"
          className="flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-bcl-blue hover:shadow-md transition-all"
        >
          <span className="text-3xl">⚙️</span>
          <div>
            <p className="font-bold text-bcl-blue text-sm">View All Settings</p>
            <p className="text-gray-400 text-xs mt-0.5">See the full read-only settings snapshot</p>
          </div>
          <span className="ml-auto text-gray-300 text-lg">→</span>
        </Link>
      </div>

      {/* Live snapshot */}
      <Card>
        <CardHead icon="⚡" title="Live Settings Snapshot" subtitle="Current live configuration" />
        <div className="p-5 flex flex-col gap-2">
          {[
            { label: 'Registration',     value: settings.registrationOpen ? '✅ Open' : '🚫 Closed' },
            { label: 'WhatsApp',         value: settings.whatsappNumber        || '—' },
            { label: 'Trial Cities',     value: settings.trialsCityCount       || '—' },
            { label: 'Winner Prize',     value: settings.prizeWinner           || '—' },
            { label: 'Runner-Up Prize',  value: settings.prizeRunnerUp         || '—' },
            { label: 'Auction Base',     value: settings.prizeAuctionBase      || '—' },
            { label: 'Batsman Form',     value: settings.batsmanFormLink    ? '✅ Set' : '⚠️ Not set' },
            { label: 'Bowler Form',      value: settings.bowlerFormLink     ? '✅ Set' : '⚠️ Not set' },
            { label: 'All-Rounder Form', value: settings.allRounderFormLink ? '✅ Set' : '⚠️ Not set' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between px-4 py-2.5 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 font-semibold">{row.label}</span>
              <span className="text-xs font-bold text-gray-800 text-right max-w-[60%] truncate">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </AdminLayout>
  )
}

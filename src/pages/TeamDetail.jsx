import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { teamsData } from '../data/teams'
import RoleSelectModal from '../components/RoleSelectModal'

export default function TeamDetail() {
  const { teamName } = useParams()
  const navigate = useNavigate()
  const [roleModalOpen, setRoleModalOpen] = useState(false)

  const team = teamsData.find(
    (t) => t.name.toLowerCase() === decodeURIComponent(teamName).toLowerCase()
  ) || teamsData[0]

  const color = team.colors[0]

  return (
    <div className="pt-20 min-h-screen bg-bcl-light">
      {/* Hero */}
      <div
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${team.colors[0]} 0%, ${team.colors[1]} 100%)` }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-8 transition-colors"
          >
            ← Back to Teams
          </button>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-end gap-8"
          >
            {/* Logo */}
            <div className="w-36 h-36 rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0">
              <img
                src={team.logo}
                alt={team.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.innerHTML = `<span style="color:white;font-size:2.5rem;font-weight:900">${team.abbr}</span>`
                }}
              />
            </div>

            <div>
              <span className="text-white/60 text-xs font-bold tracking-widest uppercase">BCL Season 1</span>
              <h1 className="text-4xl md:text-5xl font-black text-white mt-1 mb-2" style={{ letterSpacing: '-1px' }}>
                {team.name}
              </h1>
              <p className="text-white/80 text-lg italic">{team.tagline}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xl">📍</span>
                <span className="text-white/70 font-medium">{team.city}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-xl font-black text-bcl-blue mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ backgroundColor: color }}>ℹ</span>
              About {team.name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">{team.about}</p>

            {team.motto && (
              <div className="mt-6 bg-bcl-light border-l-4 rounded-r-xl px-5 py-4" style={{ borderColor: color }}>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">Team Motto</p>
                <p className="font-black italic" style={{ color }}>"{ team.motto }"</p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-base font-bold text-bcl-blue mb-4">Team Identity</h3>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {team.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Team Colors</span>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Quick Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-bcl-blue mb-4 uppercase tracking-wider">Quick Info</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Home City', value: team.city, icon: '📍' },
                  { label: 'Abbreviation', value: team.abbr, icon: '🏏' },
                  { label: 'Season', value: 'BCL Season 1', icon: '📅' },
                  { label: 'Status', value: 'Recruiting', icon: '🟢' },
                  ...(team.captain ? [{ label: 'Captain', value: team.captain, icon: '👑' }] : []),
                  ...(team.strength ? [{ label: 'Team Strength', value: team.strength, icon: '💪' }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Players Coming Soon */}
            <div className="bg-bcl-blue/5 border border-bcl-blue/20 rounded-2xl p-6">
              <div className="text-center">
                <span className="text-3xl block mb-2">🏏</span>
                <h3 className="font-bold text-bcl-blue text-sm mb-1">Players Announced Soon</h3>
                <p className="text-gray-500 text-xs leading-relaxed">The squad will be revealed after the BCL Auction. Stay tuned!</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setRoleModalOpen(true)}
              className="w-full py-4 rounded-xl font-bold text-sm text-center text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-1 shadow-lg"
              style={{ backgroundColor: color }}
            >
              Register to Play in BCL →
            </button>
          </motion.div>
        </div>
      </div>

      {roleModalOpen && (
        <RoleSelectModal onClose={() => setRoleModalOpen(false)} />
      )}
    </div>
  )
}

import { motion } from 'framer-motion'
import TeamCard from '../components/TeamCard'
import { teamsData } from '../data/teams'

export default function Teams() {
  return (
    <div className="pt-24 pb-20 bg-bcl-light min-h-screen">
      {/* Header */}
      <div className="bcl-gradient py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-bcl-gold text-bcl-blue text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Season 1
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-1px' }}>
              BCL Franchises
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              10 cities. 10 franchises. One winner. Explore every team competing in BCL Season 1.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {teamsData.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

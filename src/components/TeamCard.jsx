import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const teamColors = [
  '#E63946', '#1B3A6B', '#C9A227', '#2d5a9e', '#E07340',
  '#4CAF50', '#9C27B0', '#FF5722', '#00BCD4', '#607D8B'
]

export default function TeamCard({ team, index }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/team/${encodeURIComponent(team.name)}`)
  }

  const color = teamColors[index % teamColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={handleClick}
      className="cursor-pointer group"
    >
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        {/* Logo */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-md group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: color }}
        >
          <img
            src={team.logo}
            alt={team.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentNode.innerHTML = `<span class="text-white font-black text-xl">${team.abbr}</span>`
            }}
          />
        </div>

        {/* Name */}
        <div className="text-center">
          <h3 className="font-bold text-bcl-blue text-sm leading-snug">{team.name}</h3>
          <p className="text-gray-400 text-xs mt-1">{team.city}</p>
        </div>

        {/* Arrow */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ backgroundColor: color }}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

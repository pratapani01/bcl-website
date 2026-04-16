import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import HeroSlider from '../components/HeroSlider'
import Timeline from '../components/Timeline'
import TeamCard from '../components/TeamCard'
import TermsModal from '../components/TermsModal'
import { teamsData } from '../data/teams'

const GOOGLE_FORM_URL = 'https://forms.google.com'

// ——————————————————————————————
// Section wrapper with fade-in
// ——————————————————————————————
function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ——————————————————————————————
// Prize Section
// ——————————————————————————————
function PrizeSection() {
  return (
    <section className="py-20 bg-bcl-blue relative overflow-hidden">
      {/* decorative */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
            Prizes & Rewards
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">Massive Prize Pool</h2>
          <p className="text-white/60 text-center max-w-xl mx-auto mb-12">The biggest prize pool in grassroots cricket. Compete for glory and life-changing rewards.</p>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Runner Up */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">🥈</div>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">Runner Up</p>
            <p className="text-4xl font-black text-white">₹7 Lakhs</p>
            <p className="text-white/50 text-sm mt-2">Cash Prize + Trophy</p>
          </motion.div>

          {/* Winner – center, bigger */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="bg-gradient-to-br from-bcl-gold to-yellow-400 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl shadow-bcl-gold/30 md:-mt-4 md:mb-4"
          >
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-bcl-blue text-sm font-bold uppercase tracking-widest mb-2">Winner</p>
            <p className="text-5xl font-black text-bcl-blue">₹15 Lakhs</p>
            <p className="text-bcl-blue/70 text-sm mt-2">Cash Prize + Trophy + Medal</p>
            <span className="mt-4 bg-bcl-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Grand Prize
            </span>
          </motion.div>

          {/* Auction base */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <div className="text-5xl mb-4">💰</div>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">Player Auction</p>
            <p className="text-4xl font-black text-white">₹51K</p>
            <p className="text-white/50 text-sm mt-2">Minimum Base Price</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Trials Cities Strip
// ——————————————————————————————
function TrialsSection() {
  const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Jaipur', 'Lucknow', 'Ahmedabad', 'Chandigarh', 'Indore', 'Bhopal', 'Nagpur', 'Surat', 'Patna', 'Ranchi', 'Kochi', 'Bhubaneswar', 'Coimbatore']
  return (
    <section className="py-16 bg-bcl-light overflow-hidden" id="trials">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
            Nationwide
          </span>
          <h2 className="section-title">Trials in 20+ Cities</h2>
          <p className="section-subtitle">We're coming to your city. Register and attend trials at your nearest venue.</p>
        </Section>

        {/* Scrolling city strip */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="flex gap-4 whitespace-nowrap"
          >
            {[...cities, ...cities].map((city, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-bcl-blue font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm flex-shrink-0"
              >
                📍 {city}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Role Registration Cards
// ——————————————————————————————
// ✅ CHANGE 3 applied here: role card buttons now open TermsModal before redirecting to form.
// Only the button element is changed — all card layout, styling, and animation is untouched.
function RoleCards() {
  // Track which role's T&C modal is open; null = closed
  const [activeTerms, setActiveTerms] = useState(null) // { label, formUrl }

  const roles = [
  {
    icon: '🏏',
    title: 'Batsman',
    price: '₹2,000',
    desc: 'Power hitters, elegant stroke players, and consistent run-scorers — show your batting class.',
    features: ['Solo batting trials', 'Power hitting assessment', 'Technical evaluation'],
    color: '#1B3A6B',
    formLink: 'https://forms.gle/TkUSWHGjo6NGrpG28',
  },
  {
    icon: '⚾',
    title: 'Bowler',
    price: '₹2,000',
    desc: 'Pace demons, spin wizards, and swing kings — let your bowling do the talking.',
    features: ['Speed gun assessment', 'Line & length analysis', 'Variation testing'],
    color: '#E63946',
    popular: false,
    formLink: 'https://forms.gle/QUT1S3Sa195uS4YPA',
  },
  {
    icon: '⭐',
    title: 'All Rounder',
    price: '₹3,000',
    desc: 'The complete package — bat, bowl, and field. The most sought-after profile in BCL.',
    features: ['Full batting + bowling trials', 'Fielding drills', 'Premium category'],
    color: '#C9A227',
    popular: true,
    formLink: 'https://forms.gle/thqKgAwsuTqt4VARA',
  },
]

  return (
    <>
      <section className="py-20 bg-white" id="register">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
              Registration
            </span>
            <h2 className="section-title">Choose Your Role</h2>
            <p className="section-subtitle">Select the category that matches your strengths and register for trials.</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {roles.map((role, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl border-2 p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  role.popular
                    ? 'border-bcl-gold shadow-xl shadow-bcl-gold/20'
                    : 'border-gray-200 shadow-md'
                }`}
              >
                {role.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bcl-gold text-bcl-blue text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    ⭐ Most Popular
                  </span>
                )}

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: role.color + '15' }}
                >
                  {role.icon}
                </div>

                <div>
                  <h3 className="text-xl font-black text-bcl-blue">{role.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{role.desc}</p>
                </div>

                <div
                  className="text-3xl font-black"
                  style={{ color: role.color }}
                >
                  {role.price}
                  <span className="text-sm text-gray-400 font-normal ml-1">registration fee</span>
                </div>

                <ul className="flex flex-col gap-2">
                  {role.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* ✅ CHANGE 3: button opens TermsModal instead of navigating directly to form */}
                <button
                  onClick={() => setActiveTerms({ label: role.title, formUrl: role.formLink })}
                  className="mt-auto text-center py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: role.popular ? role.color : 'transparent',
                    color: role.popular ? 'white' : role.color,
                    border: `2px solid ${role.color}`,
                  }}
                >
                  Register as {role.title} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ CHANGE 3: TermsModal rendered at page level, outside the card grid */}
      {activeTerms && (
        <TermsModal
          formUrl={activeTerms.formUrl}
          roleLabel={activeTerms.label}
          onClose={() => setActiveTerms(null)}
        />
      )}
    </>
  )
}

// ——————————————————————————————
// Why Join BCL
// ——————————————————————————————
function WhyJoin() {
  const perks = [
    { icon: '🏟️', title: 'National & International Stadiums', desc: 'Play on iconic grounds across India — venues that have hosted world-class cricket.' },
    { icon: '📺', title: 'Live Media Broadcasting', desc: 'Every match streamed live. Millions of eyes on your performance.' },
    { icon: '🎖️', title: 'Professional Tournament Experience', desc: 'Experience the full lifecycle of professional cricket — from trials to finals.' },
    { icon: '💰', title: 'High Prize Pool', desc: '₹22+ Lakhs in prizes. The richest grassroots cricket tournament in India.' },
    { icon: '🔭', title: 'Scout Exposure', desc: 'Top scouts and franchise teams watching every trial and match.' },
    { icon: '🤝', title: 'Team Franchise System', desc: 'Get auctioned, join a franchise, and represent your city with pride.' },
  ]

  return (
    <section className="py-20 bg-bcl-light" id="about-bcl">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
            Benefits
          </span>
          <h2 className="section-title">Why Join BCL?</h2>
          <p className="section-subtitle">More than a tournament — a launchpad for your cricket career.</p>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-bcl-blue/5 flex items-center justify-center text-2xl flex-shrink-0">
                {perk.icon}
              </div>
              <div>
                <h3 className="font-bold text-bcl-blue text-sm mb-1">{perk.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Gallery
// ——————————————————————————————
function Gallery() {
  const images = Array.from({ length: 8 }, (_, i) => `/assets/img${i + 1}.jpg`)
  const gradients = [
    'from-bcl-blue to-blue-800',
    'from-red-500 to-red-800',
    'from-bcl-gold to-yellow-600',
    'from-green-500 to-green-800',
    'from-purple-500 to-purple-800',
    'from-orange-500 to-orange-800',
    'from-teal-500 to-teal-800',
    'from-pink-500 to-pink-800',
  ]
  const labels = ['Opening Match', 'Trial Day', 'Auction Event', 'Team Practice', 'Award Ceremony', 'Stadium View', 'Player Highlight', 'Fan Moment']

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
            Gallery
          </span>
          <h2 className="section-title">BCL in Action</h2>
          <p className="section-subtitle">A glimpse into the world of Bharatiya Cricket League.</p>
        </Section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
            >
              <img
                src={src}
                alt={labels[i]}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentNode.style.background = ''
                  e.target.parentNode.classList.add(`bg-gradient-to-br`, ...gradients[i].split(' '))
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold">{labels[i]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Teams Section
// ——————————————————————————————
function TeamsSection() {
  return (
    <section className="py-20 bg-bcl-light" id="teams">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">
            Franchises
          </span>
          <h2 className="section-title">BCL Teams</h2>
          <p className="section-subtitle">10 powerful franchises. 10 cities. One champion. Click any team to learn more.</p>
        </Section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {teamsData.map((team, i) => (
            <TeamCard key={team.id} team={team} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Tagline Section
// ——————————————————————————————
function Tagline() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-bcl-blue leading-tight"
          style={{ letterSpacing: '-1px' }}
        >
          Where{' '}
          <span className="text-bcl-gold">Passion</span>
          {' '}Meets{' '}
          <span className="text-bcl-accent">Opportunity</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 text-lg"
        >
          India's most exciting grassroots cricket league — BCL Season 1
        </motion.p>
      </div>
    </section>
  )
}

// ——————————————————————————————
// Final CTA
// ——————————————————————————————
function CtaSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-20 bcl-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-bcl-gold text-bcl-blue text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest mb-6">
            ⚡ Limited Slots
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: '-1px' }}>
            Limited Slots Available
          </h2>

          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Don't miss your chance to play in BCL Season 1. Registrations are filling up fast — secure your spot today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            {/* ✅ UPDATED BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-bcl-gold text-bcl-blue px-10 py-4 rounded-full font-black text-base hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20"
            >
              🏏 Register Now — It's Free to Start
            </button>

            <a
              href="https://wa.me/919250324379"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-bcl-blue transition-all duration-300"
            >
              💬 WhatsApp Us
            </a>

          </div>
        </motion.div>
      </div>

      {/* ✅ POPUP */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center"
            >
              <h2 className="text-xl font-bold mb-4">Select Your Role</h2>

              <div className="flex flex-col gap-3">

                <a href="https://forms.gle/TkUSWHGjo6NGrpG28" target="_blank" className="bg-bcl-blue text-white py-3 rounded-lg">
                  🏏 Batsman
                </a>

                <a href="https://forms.gle/QUT1S3Sa195uS4YPA" target="_blank" className="bg-red-500 text-white py-3 rounded-lg">
                  ⚾ Bowler
                </a>

                <a href="https://forms.gle/thqKgAwsuTqt4VARA" target="_blank" className="bg-yellow-500 text-white py-3 rounded-lg">
                  ⭐ All Rounder
                </a>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-4 text-sm text-gray-500"
              >
                Cancel
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

// ——————————————————————————————
// HOME PAGE
// ——————————————————————————————
export default function Home() {
  return (
    <>
      <HeroSlider />
      <Tagline />
      <PrizeSection />
      <TrialsSection />
      <Timeline />
      <RoleCards />
      <WhyJoin />
      <TeamsSection />
      <Gallery />
      <CtaSection />
    </>
  )
}

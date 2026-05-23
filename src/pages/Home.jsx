import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroSlider from '../components/HeroSlider'
import Timeline from '../components/Timeline'
import TeamCard from '../components/TeamCard'
import TermsModal from '../components/TermsModal'
import RoleSelectModal from '../components/RoleSelectModal'
import ComingSoonModal from '../components/ComingSoonModal'
import { useSettings } from '../contexts/SettingsContext'
import { teamsData } from '../data/teams'

function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className={className}>
      {children}
    </motion.div>
  )
}

function PrizeSection() {
  const { settings } = useSettings()
  return (
    <section className="py-20 bg-bcl-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">Prizes & Rewards</span>
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-4">Massive Prize Pool</h2>
          <p className="text-white/60 text-center max-w-xl mx-auto mb-12">The biggest prize pool in grassroots cricket. Compete for glory and life-changing rewards.</p>
        </Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="text-5xl mb-4">🥈</div>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">Runner Up</p>
            <p className="text-4xl font-black text-white">{settings.prizeRunnerUp || '₹7 Lakhs'}</p>
            <p className="text-white/50 text-sm mt-2">Cash Prize + Trophy</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} className="bg-gradient-to-br from-bcl-gold to-yellow-400 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl shadow-bcl-gold/30 md:-mt-4 md:mb-4">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-bcl-blue text-sm font-bold uppercase tracking-widest mb-2">Winner</p>
            <p className="text-5xl font-black text-bcl-blue">{settings.prizeWinner || '₹15 Lakhs'}</p>
            <p className="text-bcl-blue/70 text-sm mt-2">Cash Prize + Trophy + Medal</p>
            <span className="mt-4 bg-bcl-blue text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Grand Prize</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="text-5xl mb-4">💰</div>
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">Player Auction</p>
            <p className="text-4xl font-black text-white">{settings.prizeAuctionBase || '₹51K'}</p>
            <p className="text-white/50 text-sm mt-2">{settings.auctionText || 'Minimum Base Price'}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrialsSection() {
  const { settings } = useSettings()
  const cityCount = settings.trialsCityCount || '20+'
  const cities = ['Delhi','Mumbai','Kolkata','Chennai','Bengaluru','Hyderabad','Pune','Jaipur','Lucknow','Ahmedabad','Chandigarh','Indore','Bhopal','Nagpur','Surat','Patna','Ranchi','Kochi','Bhubaneswar','Coimbatore']
  return (
    <section className="py-16 bg-bcl-light overflow-hidden" id="trials">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">Nationwide</span>
          <h2 className="section-title">Trials in {cityCount} Cities</h2>
          <p className="section-subtitle">We're coming to your city. Register and attend trials at your nearest venue.</p>
        </Section>
        <div className="relative overflow-hidden">
          <motion.div animate={{ x: [0, -2000] }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} className="flex gap-4 whitespace-nowrap">
            {[...cities, ...cities].map((city, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white border border-gray-200 text-bcl-blue font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm flex-shrink-0">📍 {city}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RoleCards() {
  const { settings } = useSettings()
  const REGISTRATION_OPEN = settings.registrationOpen || false
  const [activeTerms, setActiveTerms]     = useState(null)
  const [comingSoonOpen, setComingSoon]   = useState(false)

  const roles = [
    { icon: '🏏', title: 'Batsman',     price: '₹1,500', color: '#1B3A6B', features: ['Solo batting trials', 'Power hitting assessment', 'Technical evaluation'],       formUrl: settings.batsmanFormLink    || 'https://forms.gle/TkUSWHGjo6NGrpG28' },
    { icon: '⚾', title: 'Bowler',      price: '₹1,500', color: '#E63946', features: ['Speed gun assessment', 'Line & length analysis', 'Variation testing'],           formUrl: settings.bowlerFormLink     || 'https://forms.gle/QUT1S3Sa195uS4YPA' },
    { icon: '⭐', title: 'All Rounder', price: '₹2,500', color: '#C9A227', features: ['Full batting + bowling trials', 'Fielding drills', 'Premium category'], popular: true, formUrl: settings.allRounderFormLink || 'https://forms.gle/thqKgAwsuTqt4VARA' },
  ]

  return (
    <>
      <section className="py-20 bg-white" id="register">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">Registration</span>
            <h2 className="section-title">Choose Your Role</h2>
            <p className="section-subtitle">Select the category that matches your strengths and register for trials.</p>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {roles.map((role, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl border-2 p-8 flex flex-col gap-5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${role.popular ? 'border-bcl-gold shadow-xl shadow-bcl-gold/20' : 'border-gray-200 shadow-md'}`}>
                {role.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bcl-gold text-bcl-blue text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">⭐ Most Popular</span>}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: role.color + '15' }}>{role.icon}</div>
                <div>
                  <h3 className="text-xl font-black text-bcl-blue">{role.title}</h3>
                </div>
                <div className="text-3xl font-black" style={{ color: role.color }}>{role.price}<span className="text-sm text-gray-400 font-normal ml-1">registration fee</span></div>
                <ul className="flex flex-col gap-2">
                  {role.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs text-green-600 flex-shrink-0">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => REGISTRATION_OPEN ? setActiveTerms({ label: role.title, formUrl: role.formUrl }) : setComingSoon(true)}
                  className="mt-auto text-center py-3 px-6 rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300"
                  style={{ backgroundColor: role.popular ? role.color : 'transparent', color: role.popular ? 'white' : role.color, border: `2px solid ${role.color}` }}
                >
                  Register as {role.title} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {activeTerms    && <TermsModal formUrl={activeTerms.formUrl} roleLabel={activeTerms.label} onClose={() => setActiveTerms(null)} />}
      {comingSoonOpen && <ComingSoonModal onClose={() => setComingSoon(false)} />}
    </>
  )
}

function WhyJoin() {
  const perks = [
    { icon: '🏟️', title: 'National & International Stadiums', desc: 'Play on iconic grounds across India.' },
    { icon: '📺', title: 'Live Media Broadcasting',            desc: 'Every match streamed live.' },
    { icon: '🎖️', title: 'Professional Tournament Experience', desc: 'Full lifecycle of professional cricket.' },
    { icon: '💰', title: 'High Prize Pool',                    desc: '₹22+ Lakhs in prizes.' },
    { icon: '🔭', title: 'Scout Exposure',                     desc: 'Top scouts watching every trial and match.' },
    { icon: '🤝', title: 'Team Franchise System',              desc: 'Get auctioned and represent your city.' },
  ]
  return (
    <section className="py-20 bg-bcl-light" id="about-bcl">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">Benefits</span>
          <h2 className="section-title">Why Join BCL?</h2>
          <p className="section-subtitle">More than a tournament — a launchpad for your cricket career.</p>
        </Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-bcl-blue/5 flex items-center justify-center text-2xl flex-shrink-0">{perk.icon}</div>
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

function TeamsSection() {
  return (
    <section className="py-20 bg-bcl-light" id="teams">
      <div className="max-w-7xl mx-auto px-6">
        <Section>
          <span className="block text-center text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 w-fit mx-auto px-4 py-1.5 rounded-full mb-4">Franchises</span>
          <h2 className="section-title">BCL Teams</h2>
          <p className="section-subtitle">10 powerful franchises. 10 cities. One champion.</p>
        </Section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {teamsData.map((team, i) => <TeamCard key={team.id} team={team} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function Tagline() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-bcl-blue leading-tight" style={{ letterSpacing: '-1px' }}>
          Where <span className="text-bcl-gold">Passion</span> Meets <span className="text-bcl-accent">Opportunity</span>
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-gray-400 mt-4 text-lg">
          India's most exciting grassroots cricket league — BCL Season 1
        </motion.p>
      </div>
    </section>
  )
}

function CtaSection() {
  const { settings } = useSettings()
  const REGISTRATION_OPEN = settings.registrationOpen || false
  const number = settings.whatsappNumber || '919250324379'
  const [open, setOpen]             = useState(false)
  const [comingSoonOpen, setComingSoon] = useState(false)
  return (
    <section className="py-20 bcl-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px,white 1px,transparent 0)', backgroundSize: '30px 30px' }} />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block bg-bcl-gold text-bcl-blue text-xs font-black px-5 py-1.5 rounded-full uppercase tracking-widest mb-6">⚡ Limited Slots</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight" style={{ letterSpacing: '-1px' }}>Limited Slots Available</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">Don't miss your chance to play in BCL Season 1. Registrations are filling up fast — secure your spot today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => REGISTRATION_OPEN ? setOpen(true) : setComingSoon(true)}
              className="inline-flex items-center justify-center gap-2 bg-bcl-gold text-bcl-blue px-10 py-4 rounded-full font-black text-base hover:bg-white transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20">
              🏏 Register Now — It's Free to Start
            </button>
            <a href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white hover:text-bcl-blue transition-all duration-300">
              💬 WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
      {open           && <RoleSelectModal  onClose={() => setOpen(false)} />}
      {comingSoonOpen && <ComingSoonModal  onClose={() => setComingSoon(false)} />}
    </section>
  )
}

export default function Home() {
  const { settings } = useSettings()
  return (
    <>
      <HeroSlider />
      <Tagline />
      {settings.showPrizeSection  !== false && <PrizeSection />}
      {settings.showTrialsSection !== false && <TrialsSection />}
      {settings.showTimeline      !== false && <Timeline />}
      <RoleCards />
      <WhyJoin />
      {settings.showTeamsSection  !== false && <TeamsSection />}
      <CtaSection />
    </>
  )
}

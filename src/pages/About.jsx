import { motion } from 'framer-motion'

const stats = [
  { value: '10', label: 'Franchise Teams', icon: '🏏' },
  { value: '20+', label: 'Trial Cities', icon: '📍' },
  { value: '₹22L', label: 'Prize Pool', icon: '🏆' },
  { value: '∞', label: 'Dreams Fuelled', icon: '⭐' },
]

const values = [
  {
    icon: '🎯',
    title: 'Our Vision',
    desc: 'To become India\'s most respected grassroots cricket league — a platform that bridges the gap between local talent and professional cricket. We envision a future where every passionate cricketer gets a fair shot at their dream.',
    color: '#1B3A6B',
  },
  {
    icon: '🚀',
    title: 'Our Mission',
    desc: 'To discover, develop, and showcase India\'s raw cricket talent through a structured, professional tournament. BCL provides real trials, real auctions, real franchises — and real opportunities.',
    color: '#E63946',
  },
  {
    icon: '💡',
    title: 'What Makes Us Different',
    desc: 'Unlike other local tournaments, BCL operates like a professional league — with franchise teams, a player auction system, live broadcasting, national stadium venues, and direct scout exposure. We are not just a tournament; we are a career launchpad.',
    color: '#C9A227',
  },
]

const milestones = [
  { year: '2024', event: 'BCL Founded', desc: 'Bharatiya Cricket League established with a vision to transform grassroots cricket.' },
  { year: 'Early 2025', event: 'City Trials Begin', desc: 'Trials kick off across 20+ cities. Thousands of players attend.' },
  { year: 'Mid 2025', event: 'BCL Auction', desc: 'Selected players enter the franchise auction. Base price: ₹51,000.' },
  { year: 'Late 2025', event: 'Season 1 Begins', desc: 'BCL Season 1 launches with 10 franchises playing across national stadiums.' },
]

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="bcl-gradient py-24 relative overflow-hidden">
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-1px' }}>
              About BCL
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Bharatiya Cricket League was born from a simple belief — India's cricket talent extends far beyond the stadiums on TV. Every gully, every maidan, every open ground hides a future champion.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-4xl font-black text-bcl-blue">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About BCL */}
      <section className="py-20 bg-bcl-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 px-4 py-1.5 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl font-black text-bcl-blue mb-6 leading-tight" style={{ letterSpacing: '-0.5px' }}>
                India's Premier Grassroots Cricket League
              </h2>
              <div className="flex flex-col gap-4 text-gray-600 leading-relaxed">
                <p>
                  The Bharatiya Cricket League (BCL) is a professionally organized franchise-based cricket league designed to give India's grassroots cricketers a legitimate pathway to professional play.
                </p>
                <p>
                  From open trials in 20+ cities to a televised auction and national stadium matches — BCL mirrors the IPL structure at the grassroots level, giving players the full experience of professional cricket.
                </p>
                <p>
                  With a prize pool of ₹22+ Lakhs and player auction base prices of ₹51,000, BCL is not just a tournament — it is a career-defining opportunity for thousands of cricketers across India.
                </p>
              </div>
            </motion.div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bcl-gradient rounded-3xl p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
                <div className="text-7xl mb-6">🏏</div>
                <h3 className="text-2xl font-black mb-3">BCL Season 1</h3>
                <p className="text-white/70 leading-relaxed mb-6">
                  The inaugural season of Bharatiya Cricket League promises to be a landmark moment in Indian cricket history.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { val: '10', lbl: 'Teams' },
                    { val: '20+', lbl: 'Cities' },
                    { val: '₹15L', lbl: 'Top Prize' },
                    { val: '51K', lbl: 'Auction Base' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
                      <p className="text-2xl font-black text-bcl-gold">{s.val}</p>
                      <p className="text-white/60 text-xs mt-1">{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Difference */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 px-4 py-1.5 rounded-full mb-4">
              Our Foundation
            </span>
            <h2 className="section-title">Vision, Mission & Difference</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ backgroundColor: val.color + '15' }}
                >
                  {val.icon}
                </div>
                <h3
                  className="text-xl font-black mb-3"
                  style={{ color: val.color }}
                >
                  {val.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-bcl-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 px-4 py-1.5 rounded-full mb-4">
              Journey
            </span>
            <h2 className="section-title">BCL Milestones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-6 shadow-sm flex gap-5 items-start"
              >
                <div className="bg-bcl-blue text-white text-xs font-black px-3 py-2 rounded-xl flex-shrink-0 text-center leading-snug">
                  {m.year.split(' ').map((word, j) => <div key={j}>{word}</div>)}
                </div>
                <div>
                  <h3 className="font-bold text-bcl-blue mb-1">{m.event}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bcl-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Be Part of the BCL Story
            </h2>
            <p className="text-white/70 mb-8">
              Season 1 is just the beginning. Join now and become a founding player of the Bharatiya Cricket League.
            </p>
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-bcl-gold text-bcl-blue px-10 py-4 rounded-full font-black text-base hover:bg-white transition-all duration-300 hover:scale-105"
            >
              🏏 Register for Season 1
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

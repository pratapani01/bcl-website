import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    icon: '📝',
    number: '01',
    title: 'Registration',
    desc: 'Fill your player profile online. Choose your role and pay the registration fee.',
    color: '#1B3A6B',
  },
  {
    icon: '🏟️',
    number: '02',
    title: 'Trials',
    desc: 'Attend trials in your nearest city. Show your skills to our expert selectors.',
    color: '#2d5a9e',
  },
  {
    icon: '💰',
    number: '03',
    title: 'Auction',
    desc: 'Selected players enter the BCL Auction with a base price of ₹51,000.',
    color: '#C9A227',
    highlight: true,
  },
  {
    icon: '🤝',
    number: '04',
    title: 'Team Finalisation',
    desc: 'Join your franchise team. Meet your captain and teammates. Begin preparation.',
    color: '#1B3A6B',
  },
  {
    icon: '🏆',
    number: '05',
    title: 'Play in BCL S1',
    desc: 'Take the field in BCL Season 1. Play in national stadiums under live coverage.',
    color: '#E63946',
  },
]

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 px-4 py-1.5 rounded-full mb-4">
            How It Works
          </span>
          <h2 className="section-title">Registration Process</h2>
          <p className="section-subtitle">
            Your journey from registration to playing in BCL Season 1 — five simple steps.
          </p>
        </motion.div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative">
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            <motion.div
              className="absolute top-12 left-0 h-0.5 bg-bcl-gold z-0"
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
            />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle */}
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl shadow-lg mb-6 border-4 border-white relative ${
                      step.highlight ? 'ring-4 ring-bcl-gold/30' : ''
                    }`}
                    style={{ backgroundColor: step.highlight ? '#FFF8E1' : '#EEF2FF', border: `4px solid ${step.color}` }}
                  >
                    {step.icon}
                    {step.highlight && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-bcl-gold rounded-full flex items-center justify-center text-xs font-bold text-white">★</span>
                    )}
                  </div>

                  {/* Step number */}
                  <span className="text-xs font-bold tracking-widest text-gray-400 mb-1">STEP {step.number}</span>

                  {/* Title */}
                  <h3 className="font-bold text-bcl-blue text-base mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex gap-6 relative"
            >
              {/* Left: number + connector */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md flex-shrink-0 border-4 border-white"
                  style={{ backgroundColor: step.highlight ? '#FFF8E1' : '#EEF2FF', border: `3px solid ${step.color}` }}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gray-200 my-2 min-h-[40px]" />
                )}
              </div>

              {/* Right: content */}
              <div className={`pb-8 flex-1 ${i === steps.length - 1 ? '' : ''}`}>
                <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">Step {step.number}</span>
                <h3 className="font-bold text-bcl-blue text-base mt-1 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {step.highlight && (
                  <span className="inline-block mt-2 text-xs font-semibold text-bcl-gold bg-bcl-gold/10 px-3 py-1 rounded-full">
                    ⭐ Base Price: ₹51,000
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

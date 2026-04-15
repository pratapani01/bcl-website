import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GOOGLE_FORM_URL = 'https://forms.google.com'

const slides = [
  {
    image: '/assets/img-hero1.jpg',
    badge: 'Season 1 – 2025',
    title: 'Bharatiya Cricket League',
    subtitle: 'Season 1 Registrations Coming Soon',
    cta: 'Register Now',
    accent: '#C9A227',
  },
  {
    image: '/assets/img-hero2.jpg',
    badge: '20+ Cities · Nationwide',
    title: 'Your Stage Awaits',
    subtitle: 'Trials happening across India. Get scouted, get auctioned, get playing.',
    cta: 'Join the League',
    accent: '#E63946',
  },
  {
    image: '/assets/img-hero3.webp',
    badge: 'Prize Pool',
    title: '₹22 Lakhs in Prizes',
    subtitle: 'Winner takes ₹15 Lakhs · Runner Up wins ₹7 Lakhs',
    cta: 'Register Now',
    accent: '#C9A227',
  },
]

// Placeholder background when no image is available
const gradients = [
  'linear-gradient(135deg, #1B3A6B 0%, #0d2240 40%, #2d5a9e 100%)',
  'linear-gradient(135deg, #0d2240 0%, #1B3A6B 50%, #1a4a8a 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ background: gradients[current] }}
        >
          {!imgErrors[current] && (
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setImgErrors(prev => ({ ...prev, [current]: true }))}
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-bcl-blue/90 via-bcl-blue/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Cricket pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
                style={{ backgroundColor: slide.accent, color: slide.accent === '#C9A227' ? '#1B3A6B' : 'white' }}
              >
                {slide.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
                style={{ letterSpacing: '-1px' }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{ backgroundColor: slide.accent, color: slide.accent === '#C9A227' ? '#1B3A6B' : 'white' }}
                >
                  🏏 {slide.cta}
                </a>
                <a
                  href="#about-bcl"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 border-white/40 text-white hover:bg-white hover:text-bcl-blue transition-all duration-300"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? 'w-8 h-2.5 bg-bcl-gold' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 right-8 text-white/50 flex flex-col items-center gap-1 z-20"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'

const WA_NUMBER = '919250324379'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const text = encodeURIComponent(
      `Hello BCL Team!\n\nName: ${form.name}\nPhone: ${form.phone}\n\nMessage: ${form.message || 'I am interested in BCL Season 1 registration.'}`
    )
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
    setSubmitted(true)
  }

  const contactInfo = [
    {
      icon: '💬',
      label: 'WhatsApp',
      value: '+91 92503 24379',
      href: `https://wa.me/${WA_NUMBER}`,
      cta: 'Chat on WhatsApp',
      color: '#25D366',
      bg: '#dcfce7',
    },
    {
      icon: '📧',
      label: 'Email',
      value: 'bcl.t20.cricket@gmail.com',
      href: 'mailto:bcl.t20.cricket@gmail.com',
      cta: 'Send Email',
      color: '#E63946',
      bg: '#FEF2F2',
    },
    {
      icon: '📞',
      label: 'Call Us',
      value: '92503 24379',
      href: 'tel:9250324379',
      cta: 'Call Now',
      color: '#1B3A6B',
      bg: '#EEF2FF',
    },
    {
      icon: '📍',
      label: 'Headquarters',
      value: 'Lucknow, Uttar Pradesh',
      href: null,
      cta: null,
      color: '#C9A227',
      bg: '#FFF8E1',
    },
  ]

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
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-1px' }}>
              Contact BCL
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Questions about registration, trials, or partnerships? We're here to help. Reach out anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-bcl-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-8"
            >
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-gold bg-bcl-gold/10 px-4 py-1.5 rounded-full mb-4">
                  Reach Us
                </span>
                <h2 className="text-2xl font-black text-bcl-blue mb-3">We'd Love to Hear from You</h2>
                <p className="text-gray-500 leading-relaxed">
                  Whether you're a player looking to register, a city looking to host trials, or a brand interested in sponsorship — the BCL team is ready to connect.
                </p>
              </div>

              {/* Contact Cards — stacked layout to prevent mobile overflow */}
              <div className="flex flex-col gap-4">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Top row: icon + label/value */}
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: item.bg }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
                        <p className="font-bold text-bcl-blue mt-0.5 text-sm break-all">{item.value}</p>
                      </div>
                    </div>

                    {/* CTA button below — full width on its own row, no overflow */}
                    {item.href && item.cta && (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="mt-4 block w-full text-center text-sm font-bold px-4 py-2.5 rounded-xl text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.cta}
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-bcl-blue mb-4 uppercase tracking-wider">Follow BCL</h3>
                <div className="flex gap-4">
                  {[
                    { icon: '📸', label: 'Instagram', href: 'https://instagram.com', color: '#E1306C' },
                    { icon: '👍', label: 'Facebook', href: 'https://facebook.com', color: '#1877F2' },
                    { icon: '▶️', label: 'YouTube', href: 'https://youtube.com', color: '#FF0000' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 flex-1 py-4 rounded-xl border-2 border-gray-100 hover:border-current transition-colors hover:shadow-sm"
                      style={{ '--tw-border-opacity': 1 }}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-xs font-semibold text-gray-500">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div> */}
            </motion.div>

            {/* RIGHT: Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-bcl-blue bg-bcl-blue/10 px-4 py-1.5 rounded-full mb-5">
                  Enquiry Form
                </span>
                <h2 className="text-2xl font-black text-bcl-blue mb-2">Send an Enquiry</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Fill the form below and we'll redirect you to WhatsApp with your message pre-filled.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-black text-bcl-blue mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-6">You've been redirected to WhatsApp. Our team will reply shortly.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', message: '' }) }}
                      className="bg-bcl-blue text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-bcl-accent">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-bcl-blue focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-bcl-accent">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          required
                          className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-bcl-blue focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="I'd like to know more about BCL Season 1 registration..."
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-bcl-blue focus:outline-none transition-colors text-sm font-medium placeholder:text-gray-300 resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={!form.name || !form.phone}
                      className="w-full py-4 rounded-xl font-black text-base text-white bg-bcl-blue hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    >
                      <span>💬</span>
                      Send via WhatsApp
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Your message will open in WhatsApp. No data is stored.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-bcl-blue text-center mb-10">Common Questions</h2>
          <div className="flex flex-col gap-4">
            {[
              { q: 'How do I register for BCL Season 1?', a: 'Click the "Register Now" button on the homepage, fill out the Google Form with your details, and pay the registration fee based on your role.' },
              { q: 'What is the registration fee?', a: 'Batsmen and Bowlers: ₹2,000. All Rounders: ₹3,000. This covers your trial entry and player profile creation.' },
              { q: 'Which cities have BCL trials?', a: 'BCL is conducting trials in 20+ cities including Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Lucknow, Jaipur, Pune, Ahmedabad, and more.' },
              { q: 'What is the auction base price?', a: 'Selected players enter the BCL Auction with a minimum base price of ₹51,000. Franchise teams bid for your services.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-bcl-light rounded-2xl p-6"
              >
                <h3 className="font-bold text-bcl-blue mb-2 flex items-start gap-3">
                  <span className="bg-bcl-gold text-bcl-blue text-xs font-black w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">Q</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

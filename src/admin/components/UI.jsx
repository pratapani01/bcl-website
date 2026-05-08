import { motion } from 'framer-motion'

/* ── Section card ─────────────────────────────────── */
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

/* ── Card heading row ─────────────────────────────── */
export function CardHead({ icon, title, subtitle }) {
  return (
    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
      {icon && (
        <span className="w-9 h-9 rounded-xl bg-bcl-blue/5 flex items-center justify-center text-lg flex-shrink-0">
          {icon}
        </span>
      )}
      <div>
        <h3 className="text-bcl-blue font-bold text-sm">{title}</h3>
        {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

/* ── Page title ───────────────────────────────────── */
export function PageTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-black text-bcl-blue flex items-center gap-2">
        <span>{icon}</span>{title}
      </h1>
      {subtitle && <p className="text-gray-400 text-sm mt-0.5 ml-7">{subtitle}</p>}
    </div>
  )
}

/* ── Text input ───────────────────────────────────── */
export function Field({ label, value, onChange, placeholder, type = 'text', readOnly, hint }) {
  return (
    <div>
      {label && <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-bcl-blue transition-colors bg-white read-only:bg-gray-50 read-only:cursor-default"
      />
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

/* ── Textarea ─────────────────────────────────────── */
export function TextArea({ label, value, onChange, placeholder, rows = 3, readOnly }) {
  return (
    <div>
      {label && <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>}
      <textarea
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-bcl-blue transition-colors resize-none bg-white read-only:bg-gray-50 read-only:cursor-default"
      />
    </div>
  )
}

/* ── Toggle switch ────────────────────────────────── */
export function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800 leading-snug">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  )
}

/* ── Save button ──────────────────────────────────── */
export function SaveBtn({ onClick, loading, label = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 bg-bcl-blue text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-bcl-gold hover:text-bcl-blue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
    >
      {loading
        ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
        : <>💾 {label}</>
      }
    </button>
  )
}

/* ── Toast ────────────────────────────────────────── */
export function Toast({ message, type = 'success', onClose }) {
  const palette = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error:   'bg-red-50   border-red-200   text-red-800',
    info:    'bg-blue-50  border-blue-200  text-blue-800',
  }
  const icons = { success: '✅', error: '❌', info: 'ℹ️' }
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
      className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg text-sm font-semibold ${palette[type]}`}
    >
      <span>{icons[type]}</span>
      {message}
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 text-lg leading-none">×</button>
    </motion.div>
  )
}

/* ── Stat tile ────────────────────────────────────── */
export function Stat({ icon, label, value, green, red }) {
  const bg = green ? 'from-green-500 to-emerald-600' : red ? 'from-red-500 to-rose-600' : 'from-bcl-blue to-blue-700'
  return (
    <div className={`bg-gradient-to-br ${bg} rounded-2xl p-5 text-white shadow-md`}>
      <p className="text-2xl mb-1">{icon}</p>
      <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black mt-0.5 leading-tight">{value}</p>
    </div>
  )
}

/* ── Read-only badge ──────────────────────────────── */
export function ReadOnlyBadge() {
  return (
    <div className="mb-5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm font-semibold">
      👔 Manager view — read only. Contact the Owner Admin to make changes.
    </div>
  )
}

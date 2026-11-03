// ─────────────────────────────────────────────────────────────
//  SettingsContext — real-time Firestore sync
//  Listens to  settings/main  and makes values available
//  everywhere in the app via useSettings()
// ─────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

// ── Default values (used before Firestore loads / first run) ──
export const DEFAULT_SETTINGS = {
  registrationOpen:   false,
  announcementText:   "UPWCL Season 1 – Uttar Pradesh's biggest grassroots women's cricket league is here!",
  popupText:          "Welcome to UPWCL! Registrations opening soon. Stay tuned for updates.",
  comingSoonText:     "UPWCL T20 registrations will open shortly. Stay connected and don't miss your chance to play.",
  whatsappNumber:     "919889370894",
  batsmanFormLink:    "https://forms.gle/TkUSWHGjo6NGrpG28",
  bowlerFormLink:     "https://forms.gle/QUT1S3Sa195uS4YPA",
  allRounderFormLink: "https://forms.gle/thqKgAwsuTqt4VARA",
  prizeWinner:        "₹51,000",
  prizeRunnerUp:      "₹21,000",
  prizeAuctionBase:   "₹2,000",
  trialsCityCount:    "10",
  heroTitle:          "Uttar Pradesh Women Cricket League",
  heroSubtitle:       "Built for women cricketers. Season 1 registrations coming soon.",
  auctionText:        "Minimum Base Price",
  showPrizeSection:   true,
  showTrialsSection:  true,
  showTimeline:       true,
  showTeamsSection:   true,
}

// Values saved in Firestore before the Uttar Pradesh rebrand still hold the
// old names, prizes and phone number, and they override the defaults above.
// Rewrite those known old values on the fly so the site shows the new details
// without anyone re-saving every field in the admin panel. Anything newly
// typed in the admin panel is left untouched.
const TEXT_KEYS = ['heroTitle', 'heroSubtitle', 'announcementText', 'popupText', 'comingSoonText', 'auctionText']

const OLD_TO_NEW = {
  prizeWinner:      { '₹15 Lakhs': '₹51,000' },
  prizeRunnerUp:    { '₹7 Lakhs': '₹21,000' },
  prizeAuctionBase: { '₹51K': '₹2,000', '₹51,000': '₹2,000' },
  whatsappNumber:   { '919250324379': '919889370894' },
  trialsCityCount:  { '20+': '10' },
}

function rebrand(text) {
  return text
    .replace(/Bharatiya Women Cricket League/g, 'Uttar Pradesh Women Cricket League')
    .replace(/Bharatiya Cricket League/g, 'Uttar Pradesh Women Cricket League')
    .replace(/\b(BWCL|BCL)\b/g, 'UPWCL')
    .replace(/India's biggest grassroots (women's )?cricket league/g, "Uttar Pradesh's biggest grassroots women's cricket league")
}

function modernize(data) {
  const out = { ...data }
  for (const [key, map] of Object.entries(OLD_TO_NEW)) {
    if (typeof out[key] === 'string' && map[out[key].trim()]) out[key] = map[out[key].trim()]
  }
  for (const key of TEXT_KEYS) {
    const v = out[key]
    if (typeof v !== 'string') continue
    const old = ['Season 1 Registrations Coming Soon', 'Built for women cricketers. Season 1 registrations coming soon.']
    if (key === 'heroSubtitle' && old.includes(v.trim())) {
      out[key] = DEFAULT_SETTINGS.heroSubtitle
      continue
    }
    out[key] = rebrand(v)
  }
  return out
}

const SettingsContext = createContext({ settings: DEFAULT_SETTINGS, loading: true })

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    const ref = doc(db, 'settings', 'main')

    // Auto-initialise on first run if doc doesn't exist
    getDoc(ref).then(snap => {
      if (!snap.exists()) setDoc(ref, DEFAULT_SETTINGS)
    })

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setSettings(modernize({ ...DEFAULT_SETTINGS, ...snap.data() }))
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)

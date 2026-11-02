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
  announcementText:   "BWCL Season 1 – India's biggest grassroots women's cricket league is here!",
  popupText:          "Welcome to BWCL! Registrations opening soon. Stay tuned for updates.",
  comingSoonText:     "BWCL T20 registrations will open shortly. Stay connected and don't miss your chance to play.",
  whatsappNumber:     "919250324379",
  batsmanFormLink:    "https://forms.gle/TkUSWHGjo6NGrpG28",
  bowlerFormLink:     "https://forms.gle/QUT1S3Sa195uS4YPA",
  allRounderFormLink: "https://forms.gle/thqKgAwsuTqt4VARA",
  prizeWinner:        "₹15 Lakhs",
  prizeRunnerUp:      "₹7 Lakhs",
  prizeAuctionBase:   "₹51K",
  trialsCityCount:    "20+",
  heroTitle:          "Bharatiya Women Cricket League",
  heroSubtitle:       "Built for women cricketers. Season 1 registrations coming soon.",
  auctionText:        "Minimum Base Price",
  showPrizeSection:   true,
  showTrialsSection:  true,
  showTimeline:       true,
  showTeamsSection:   true,
}

// Text values saved in Firestore before the women-only rebrand still say
// "BCL" / "Bharatiya Cricket League". Rewrite them on the fly so the site
// shows the new name without waiting for someone to re-save every field in
// the admin panel. New values saved from the admin panel are untouched.
const TEXT_KEYS = ['heroTitle', 'heroSubtitle', 'announcementText', 'popupText', 'comingSoonText', 'auctionText']

function modernize(data) {
  const out = { ...data }
  for (const key of TEXT_KEYS) {
    const v = out[key]
    if (typeof v !== 'string') continue
    if (key === 'heroSubtitle' && v.trim() === 'Season 1 Registrations Coming Soon') {
      out[key] = DEFAULT_SETTINGS.heroSubtitle
      continue
    }
    out[key] = v
      .replace(/Bharatiya Cricket League/g, 'Bharatiya Women Cricket League')
      .replace(/\bBCL\b/g, 'BWCL')
      .replace(/grassroots cricket league/gi, "grassroots women's cricket league")
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

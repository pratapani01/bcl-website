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
  announcementText:   "BCL Season 1 – India's biggest grassroots cricket league is here!",
  popupText:          "Welcome to BCL! Registrations opening soon. Stay tuned for updates.",
  comingSoonText:     "BCL T20 registrations will open shortly. Stay connected and don't miss your chance to play.",
  whatsappNumber:     "919250324379",
  batsmanFormLink:    "https://forms.gle/TkUSWHGjo6NGrpG28",
  bowlerFormLink:     "https://forms.gle/QUT1S3Sa195uS4YPA",
  allRounderFormLink: "https://forms.gle/thqKgAwsuTqt4VARA",
  prizeWinner:        "₹15 Lakhs",
  prizeRunnerUp:      "₹7 Lakhs",
  prizeAuctionBase:   "₹51K",
  trialsCityCount:    "20+",
  heroTitle:          "Bharatiya Cricket League",
  heroSubtitle:       "Season 1 Registrations Coming Soon",
  auctionText:        "Minimum Base Price",
  showPrizeSection:   true,
  showTrialsSection:  true,
  showTimeline:       true,
  showTeamsSection:   true,
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
      if (snap.exists()) setSettings({ ...DEFAULT_SETTINGS, ...snap.data() })
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

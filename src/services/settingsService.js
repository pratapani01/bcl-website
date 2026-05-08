// ─────────────────────────────────────────────────────────────
//  settingsService.js
//  Single function to save any subset of settings to Firestore.
// ─────────────────────────────────────────────────────────────
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export async function saveSettings(updates) {
  const ref = doc(db, 'settings', 'main')
  const snap = await getDoc(ref)
  if (snap.exists()) {
    await updateDoc(ref, updates)
  } else {
    await setDoc(ref, updates)
  }
}

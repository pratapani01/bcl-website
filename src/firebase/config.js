// ─────────────────────────────────────────────────────────────
//  STEP 1 ▸ Paste your Firebase config values here
//  Get them from: Firebase Console → Project Settings → Your Apps
// ─────────────────────────────────────────────────────────────
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCdq1OGighvIktRKA8Mdh766PvOkAhQZBo",
  authDomain: "bcl-v3.firebaseapp.com",
  projectId: "bcl-v3",
  storageBucket: "bcl-v3.firebasestorage.app",
  messagingSenderId: "611428800392",
  appId: "1:611428800392:web:d8d989bee4c85520448c3d"
};

const app = initializeApp(firebaseConfig)

export const auth       = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db         = getFirestore(app)

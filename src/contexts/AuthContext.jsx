// ─────────────────────────────────────────────────────────────
//  AuthContext — Google Sign-In only
//  Role is determined purely by the signed-in Google email.
//  No Firestore user docs. No UID lookup. Nothing to set up.
// ─────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/config'

// ── Authorised emails ─────────────────────────────────────────
const ADMIN_EMAIL   = 'bcl.t20.cricket@gmail.com'
const MANAGER_EMAIL = 'pratapani01@gmail.com'

export function getRoleFromEmail(email) {
  if (!email) return null
  if (email === ADMIN_EMAIL)   return 'admin'
  if (email === MANAGER_EMAIL) return 'manager'
  return 'denied'
}

// ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [role,    setRole]    = useState(null)   // 'admin' | 'manager' | 'denied' | null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        setRole(getRoleFromEmail(firebaseUser.email))
      } else {
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
  const logout           = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, role, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

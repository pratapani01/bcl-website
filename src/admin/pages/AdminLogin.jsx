import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const { user, role, loading, signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [signing, setSigning] = useState(false)

  // Already logged in → redirect
  if (!loading && user) {
    if (role === 'admin')   navigate('/admin',   { replace: true })
    if (role === 'manager') navigate('/manager', { replace: true })
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setSigning(true)
    try {
      await signInWithGoogle()
      // onAuthStateChanged in AuthContext handles redirect via role
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Sign-in failed. Please try again.')
      }
    } finally {
      setSigning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bcl-blue via-[#162f5c] to-slate-900 flex items-center justify-center p-4">
      {/* dot grid */}
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-bcl-blue to-blue-900 px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/5" />
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center shadow-xl">
                <img
                  src="/assets/logo.png"
                  alt="BCL"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-white font-black text-2xl">BCL</span>' }}
                />
              </div>
              <p className="text-bcl-gold text-[11px] font-bold uppercase tracking-[0.2em] mb-1">Admin Portal</p>
              <h1 className="text-white font-black text-2xl leading-tight">Bharatiya Cricket League</h1>
              <p className="text-white/50 text-sm mt-1">Secure Management System</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8">
            <p className="text-center text-gray-500 text-sm mb-6 leading-relaxed">
              Sign in with your authorised Google account to access the dashboard.
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl text-center"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={signing}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-bcl-blue text-gray-700 font-bold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {signing ? (
                <div className="w-5 h-5 border-2 border-bcl-blue border-t-transparent rounded-full animate-spin" />
              ) : (
                /* Google G icon */
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {signing ? 'Signing in…' : 'Continue with Google'}
            </button>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <a href="/" className="text-xs text-gray-400 hover:text-bcl-blue transition-colors">
                ← Back to BCL website
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          Access restricted to authorised BCL accounts only
        </p>
      </motion.div>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function AccessDenied() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-black text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-500 text-sm mb-2">
          The account <strong className="text-gray-700">{user?.email}</strong> is not authorised to access this panel.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          Only designated BCL admin accounts can log in here.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="bg-bcl-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-bcl-gold hover:text-bcl-blue transition-all"
          >
            Sign out & try another account
          </button>
          <a href="/" className="text-xs text-gray-400 hover:text-bcl-blue transition-colors">
            ← Back to BCL website
          </a>
        </div>
      </div>
    </div>
  )
}

import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-bcl-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-bcl-blue text-sm font-semibold">Loading…</p>
      </div>
    </div>
  )
}

/** Requires role === 'admin' */
export function AdminRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading)             return <Spinner />
  if (!user)               return <Navigate to="/admin/login" replace />
  if (role === 'denied')   return <Navigate to="/admin/denied" replace />
  if (role !== 'admin')    return <Navigate to="/manager"     replace />
  return children
}

/** Requires role === 'manager' */
export function ManagerRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading)             return <Spinner />
  if (!user)               return <Navigate to="/admin/login" replace />
  if (role === 'denied')   return <Navigate to="/admin/denied" replace />
  if (role !== 'manager')  return <Navigate to="/admin"       replace />
  return children
}

/** Requires any valid role (admin OR manager) */
export function AuthRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading)           return <Spinner />
  if (!user)             return <Navigate to="/admin/login" replace />
  if (role === 'denied') return <Navigate to="/admin/denied" replace />
  return children
}

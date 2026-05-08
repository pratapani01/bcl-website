import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { useAuth } from './contexts/AuthContext'

// Public layout
import Navbar       from './components/Navbar'
import Footer       from './components/Footer'
import ScrollToTop  from './components/ScrollToTop'
import WhatsAppFloat   from './components/WhatsAppFloat'
import BCLWelcomePopup from './components/BCLWelcomePopup'

// Public pages
import Home       from './pages/Home'
import Teams      from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import About      from './pages/About'
import Contact    from './pages/Contact'

// Admin pages
import AdminLogin          from './admin/pages/AdminLogin'
import AccessDenied        from './admin/pages/AccessDenied'
import AdminDashboard      from './admin/pages/AdminDashboard'
import RegistrationPage    from './admin/pages/RegistrationPage'
import FormsPage           from './admin/pages/FormsPage'
import PopupPage           from './admin/pages/PopupPage'
import HomepagePage        from './admin/pages/HomepagePage'
import SectionsPage        from './admin/pages/SectionsPage'
import ManagerDashboard    from './admin/pages/ManagerDashboard'
import ManagerSettingsView from './admin/pages/ManagerSettingsView'

// Route guards
import { AdminRoute, ManagerRoute } from './components/ProtectedRoute'

// Public site wrapper
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <BCLWelcomePopup />
    </div>
  )
}

// Smart redirect after login based on role
function LoginRedirect() {
  const { user, role, loading } = useAuth()
  if (loading) return null
  if (!user)             return <AdminLogin />
  if (role === 'admin')  return <Navigate to="/admin"   replace />
  if (role === 'manager')return <Navigate to="/manager" replace />
  return <AdminLogin />
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Routes>
          {/* ── Public website ─────────────────────── */}
          <Route path="/"           element={<PublicLayout><Home       /></PublicLayout>} />
          <Route path="/teams"      element={<PublicLayout><Teams      /></PublicLayout>} />
          <Route path="/team/:teamName" element={<PublicLayout><TeamDetail /></PublicLayout>} />
          <Route path="/about"      element={<PublicLayout><About      /></PublicLayout>} />
          <Route path="/contact"    element={<PublicLayout><Contact    /></PublicLayout>} />

          {/* ── Auth ───────────────────────────────── */}
          <Route path="/admin/login"  element={<LoginRedirect />} />
          <Route path="/admin/denied" element={<AccessDenied />} />

          {/* ── Owner Admin ─────────────────────────── */}
          <Route path="/admin"              element={<AdminRoute><AdminDashboard   /></AdminRoute>} />
          <Route path="/admin/registration" element={<AdminRoute><RegistrationPage /></AdminRoute>} />
          <Route path="/admin/forms"        element={<AdminRoute><FormsPage        /></AdminRoute>} />
          <Route path="/admin/popup"        element={<AdminRoute><PopupPage        /></AdminRoute>} />
          <Route path="/admin/homepage"     element={<AdminRoute><HomepagePage     /></AdminRoute>} />
          <Route path="/admin/sections"     element={<AdminRoute><SectionsPage     /></AdminRoute>} />

          {/* ── Manager ─────────────────────────────── */}
          <Route path="/manager"          element={<ManagerRoute><ManagerDashboard    /></ManagerRoute>} />
          <Route path="/manager/settings" element={<ManagerRoute><ManagerSettingsView /></ManagerRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SettingsProvider>
    </AuthProvider>
  )
}

export default App

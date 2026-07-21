import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './store/auth'
import { ThemeProvider } from './store/theme'
import { ErrorBoundary } from './components/ErrorBoundary'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'

const DashboardHome = lazy(() => import('./pages/dashboard/Home').then(m => ({ default: m.DashboardHome })))
const AICaption = lazy(() => import('./pages/dashboard/AICaption').then(m => ({ default: m.AICaption })))
const MarketingAI = lazy(() => import('./pages/dashboard/MarketingAI').then(m => ({ default: m.MarketingAI })))
const CustomerAI = lazy(() => import('./pages/dashboard/CustomerAI').then(m => ({ default: m.CustomerAI })))
const SalesInsight = lazy(() => import('./pages/dashboard/SalesInsight').then(m => ({ default: m.SalesInsight })))
const FinanceAI = lazy(() => import('./pages/dashboard/FinanceAI').then(m => ({ default: m.FinanceAI })))
const Translator = lazy(() => import('./pages/dashboard/Translator').then(m => ({ default: m.Translator })))
const AdvisorAI = lazy(() => import('./pages/dashboard/AdvisorAI').then(m => ({ default: m.AdvisorAI })))
const HistoryPage = lazy(() => import('./pages/dashboard/History').then(m => ({ default: m.HistoryPage })))
const SettingsPage = lazy(() => import('./pages/dashboard/Settings').then(m => ({ default: m.SettingsPage })))
const ProfilePage = lazy(() => import('./pages/dashboard/Profile').then(m => ({ default: m.ProfilePage })))

const LOADING_FALLBACK = (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-coffee/30 border-t-coffee rounded-full animate-spin" />
      <p className="text-sm text-gray-400 dark:text-gray-500">Memuat...</p>
    </div>
  </div>
)

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <DashboardLayout />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      >
        <Route index element={<Suspense fallback={LOADING_FALLBACK}><DashboardHome /></Suspense>} />
        <Route path="caption" element={<Suspense fallback={LOADING_FALLBACK}><AICaption /></Suspense>} />
        <Route path="marketing" element={<Suspense fallback={LOADING_FALLBACK}><MarketingAI /></Suspense>} />
        <Route path="customer" element={<Suspense fallback={LOADING_FALLBACK}><CustomerAI /></Suspense>} />
        <Route path="sales" element={<Suspense fallback={LOADING_FALLBACK}><SalesInsight /></Suspense>} />
        <Route path="finance" element={<Suspense fallback={LOADING_FALLBACK}><FinanceAI /></Suspense>} />
        <Route path="translator" element={<Suspense fallback={LOADING_FALLBACK}><Translator /></Suspense>} />
        <Route path="advisor" element={<Suspense fallback={LOADING_FALLBACK}><AdvisorAI /></Suspense>} />
        <Route path="history" element={<Suspense fallback={LOADING_FALLBACK}><HistoryPage /></Suspense>} />
        <Route path="settings" element={<Suspense fallback={LOADING_FALLBACK}><SettingsPage /></Suspense>} />
        <Route path="profile" element={<Suspense fallback={LOADING_FALLBACK}><ProfilePage /></Suspense>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import StudentDashboard from './pages/StudentDashboard'
import LessonPage from './pages/LessonPage'
import ShopPage from './pages/ShopPage'
import ParentDashboard from './pages/ParentDashboard'
import CuratorDashboard from './pages/CuratorDashboard'

// Protected Route wrapper
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-neon text-xl animate-pulse">Загрузка...</div>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute roles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />

      <Route path="/lesson/:courseId/:lessonId" element={
        <ProtectedRoute roles={['student']}>
          <LessonPage />
        </ProtectedRoute>
      } />

      <Route path="/shop" element={
        <ProtectedRoute roles={['student']}>
          <ShopPage />
        </ProtectedRoute>
      } />

      <Route path="/parent" element={
        <ProtectedRoute roles={['parent', 'admin']}>
          <ParentDashboard />
        </ProtectedRoute>
      } />

      <Route path="/curator" element={
        <ProtectedRoute roles={['curator', 'admin']}>
          <CuratorDashboard />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import HomePage from './pages/Home'
import TasksPage from './pages/Tasks'
import TaskDetailPage from './pages/TaskDetail'
import TaskCreatePage from './pages/TaskCreate'
import ChatPage from './pages/Chat'
import Header from './components/Header'
import NotificationsPage from './pages/Notifications'
import ReviewsPage from './pages/Reviews'
import ReportsPage from './pages/Reports'
import { RequireAuth, RequireTasker, RequireTaskerOrRedirect } from './components/RouteGuards'
import ProfilePage from './pages/Profile'
import ChangePasswordPage from './pages/ChangePassword'
import TaskerSkillsPage from './pages/TaskerSkills'
import PaymentDetailPage from './pages/PaymentDetail'
import TaskCompleteQRPage from './pages/TaskCompleteQR'
import TaskerRegisterPage from './pages/TaskerRegister'
import TaskerDashboardPage from './pages/TaskerDashboard'
import Toasts from './components/Toasts'
import AIChatbot from './components/AIChatbot'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#E9F0F6' }}>
        <Header />
        <main style={{ maxWidth: 1080, margin: '0 auto', padding: 16 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
            <Route path="/task/create" element={<RequireAuth><TaskCreatePage /></RequireAuth>} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/notifications" element={<RequireAuth><NotificationsPage /></RequireAuth>} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/reports" element={<RequireAuth><ReportsPage /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
            <Route path="/change-password" element={<RequireAuth><ChangePasswordPage /></RequireAuth>} />
            <Route path="/tasker/skills" element={<RequireTasker><TaskerSkillsPage /></RequireTasker>} />
            <Route path="/payment/:id" element={<RequireAuth><PaymentDetailPage /></RequireAuth>} />
            <Route path="/task/:id/complete-qr" element={<RequireAuth><TaskCompleteQRPage /></RequireAuth>} />
            <Route path="/tasker/register" element={<RequireAuth><TaskerRegisterPage /></RequireAuth>} />
            <Route path="/tasker-dashboard" element={<RequireTaskerOrRedirect><TaskerDashboardPage /></RequireTaskerOrRedirect>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Toasts />
        <AIChatbot />
      </div>
    </BrowserRouter>
  )
}

export default App

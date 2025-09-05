import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function Header() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className="header">
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', padding: '16px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginLeft: '40px' }}>
          
          <Link
            to="/"
            className="text-slate-900"
            style={{ textDecoration: 'none', fontWeight: 800 }}
          >
            <img
            src="/src/assets/images/Logo.jpg"
            alt="Stackin Logo"
            style={{ width: 120, height: 48, objectFit: 'cover', objectPosition: 'center'}}
            />
          </Link>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center', marginRight: '40px' }}>
          <Link to="/tasks" className="text-slate-700">Task</Link>
          {user && <Link to="/notifications" className="text-slate-700">Thông báo</Link>}
          {user && <Link to="/reports" className="text-slate-700">Báo cáo</Link>}
          {user ? (
            <>
              <Link to="/task/create" className="text-slate-700">Đăng task</Link>
              <Link to="/profile" className="text-slate-700">Hồ sơ</Link>
              <Link to="/change-password" className="text-slate-700">Đổi mật khẩu</Link>
              <Link to="/tasker/skills" className="text-slate-700">Kỹ năng</Link>
              {user.is_tasker ? (
                <Link to="/tasker-dashboard" className="btn">Bảng Tasker</Link>
              ) : (
                <Link to="/tasker/register" className="btn">Trở thành Tasker</Link>
              )}
              <button onClick={logout} className="btn" style={{ background: '#ef4444' }}>Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-700">Đăng nhập</Link>
              <Link to="/register" className="text-slate-700">Đăng ký</Link>
              <Link to="/tasker/register" className="btn">Trở thành Tasker</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}



import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminLayout.css'

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="admin-portal">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <Link to="/admin">TeckStack Admin</Link>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Dashboard</Link>
          <Link to="/admin/settings" className={location.pathname === '/admin/settings' ? 'active' : ''}>Settings</Link>
          <Link to="/admin/career-tracks" className={location.pathname === '/admin/career-tracks' ? 'active' : ''}>Career Tracks</Link>
          <Link to="/admin/e-learning" className={location.pathname === '/admin/e-learning' ? 'active' : ''}>E-Learning</Link>
        </nav>
        <div className="admin-user">
          <span className="admin-user-email">{user?.email}</span>
          <span className="admin-user-role">{user?.role}</span>
          <button type="button" className="admin-logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

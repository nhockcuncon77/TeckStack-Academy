import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <>
      <h1>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Welcome, {user?.name || user?.email}. Use the sidebar to manage site content and settings.
      </p>
      <div className="admin-card">
        <h2>Quick links</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/settings">Settings</Link> — Site name, contact email
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <Link to="/admin/career-tracks">Career Tracks</Link> — Edit career track content
          </li>
          <li>
            <Link to="/admin/e-learning">E-Learning</Link> — Edit e-learning feature cards
          </li>
        </ul>
      </div>
    </>
  )
}

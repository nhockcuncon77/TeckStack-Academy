import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

const roles = [
  { name: 'Student', description: 'Access courses, projects, and progress.' },
  { name: 'Mentor', description: 'Guide students and manage sessions.' },
  { name: 'Employer', description: 'View talent and post opportunities.' },
  { name: 'Admin', description: 'Manage platform and users.' },
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <section className="page-hero">
        <div className="container">
          <h1>Login</h1>
          <p>Access your personalized dashboard.</p>
        </div>
      </section>

      <div className="container">
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
              {submitting ? 'Please wait…' : 'Sign In'}
            </button>
          </form>

          <div className="login-roles">
            <h3>Dashboard access</h3>
            <ul>
              {roles.map((r, i) => (
                <li key={i}>
                  <strong>{r.name}</strong> — {r.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

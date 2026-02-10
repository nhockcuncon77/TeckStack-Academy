import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/programs', label: 'Programs' },
  { to: '/career-tracks', label: 'Career Tracks' },
  { to: '/e-learning', label: 'E-Learning' },
  { to: '/projects', label: 'Projects' },
  { to: '/careers', label: 'Careers' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
]

const socialIcons = [
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'LinkedIn', href: '#', icon: 'in' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">📍 Techstack Academy</span>
            <span className="top-bar-item">📞 +1 (555) 123-4567</span>
            <span className="top-bar-item">✉️ hello@techstackacademy.com</span>
          </div>
          <div className="top-bar-right">
            {socialIcons.map((s) => (
              <a key={s.name} href={s.href} className="top-bar-social" aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="header-inner container">
          <Link to="/" className="logo">
            <img src="/logo.jpg" alt="Techstack Academy" className="logo-img" />
          </Link>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <div className="nav-cta">
              <Link to="/apply" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

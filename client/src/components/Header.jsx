import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Header.css'

const projectsDropdown = [
  { to: '/projects?status=active', label: 'Active Projects' },
  { to: '/projects?status=in-progress', label: 'In Progress' },
  { to: '/projects?status=completed', label: 'Completed Projects' },
]

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/programs', label: 'Programs' },
  { to: '/career-tracks', label: 'Career Tracks' },
  { to: '/e-learning', label: 'E-Learning' },
  { to: '/projects', label: 'Projects', children: projectsDropdown },
  { to: '/careers', label: 'Careers' },
  { to: '/community', label: 'Community' },
]

const IconFacebook = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const IconInstagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const socialIcons = [
  { name: 'Facebook', href: '#', Icon: IconFacebook },
  { name: 'X', href: '#', Icon: IconX },
  { name: 'Instagram', href: '#', Icon: IconInstagram },
  { name: 'LinkedIn', href: '#', Icon: IconLinkedIn },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const { user, isAdmin, logout } = useAuth()

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">📍 331 Bella Vida Blvd - Orlando, FL 32828</span>
            <span className="top-bar-item">📞 321-451-0687</span>
            <span className="top-bar-item">✉️ info@tekstackacademy.com</span>
          </div>
          <div className="top-bar-right">
            {socialIcons.map(({ name, href, Icon }) => (
              <a key={name} href={href} className="top-bar-social" aria-label={name}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="main-nav">
        <div className="header-inner container">
          <Link to="/" className="logo">
            <img src="/logo.jpg" alt="Tekstack Academy" className="logo-img" />
          </Link>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => { setMenuOpen(!menuOpen); if (menuOpen) setProjectsOpen(false) }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.to}
                  className="nav-dropdown"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => (isActive ? 'nav-link nav-dropdown-trigger active' : 'nav-link nav-dropdown-trigger')}
                    onClick={(e) => {
                      if (menuOpen) { e.preventDefault(); setProjectsOpen((v) => !v) }
                      else setMenuOpen(false)
                    }}
                  >
                    {item.label}
                    <span className="nav-dropdown-arrow" aria-hidden>▾</span>
                  </NavLink>
                  <div className={`nav-dropdown-menu ${projectsOpen ? 'nav-dropdown-menu--open' : ''}`}>
                    {item.children.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        className="nav-dropdown-item"
                        onClick={() => { setMenuOpen(false); setProjectsOpen(false) }}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div className="nav-cta">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button type="button" className="nav-link link-button" onClick={() => { logout(); setMenuOpen(false) }}>
                    Log out
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              )}
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

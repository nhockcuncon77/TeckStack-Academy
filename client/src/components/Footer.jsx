import { Link } from 'react-router-dom'
import './Footer.css'

const footerColumns = {
  'About Us': [
    'Tekstack Academy bridges the gap between education and real employment. Build real-world IT experience.',
    '📍 Tekstack Academy',
  ],
  'Help Link': [
    { to: '/programs', label: 'Programs' },
    { to: '/career-tracks', label: 'Career Tracks' },
    { to: '/e-learning', label: 'E-Learning' },
    { to: '/about', label: 'About' },
  ],
  'Quick Link': [
    { to: '/apply', label: 'Apply' },
    { to: '/login', label: 'Login' },
    { to: '/careers', label: 'Careers' },
    { to: '/community', label: 'Community' },
  ],
  'Success': [
    'Our graduates get hired. Portfolio of real projects, verified skills, and job-ready confidence.',
  ],
}

const socialIcons = [
  { name: 'Facebook', href: '#', icon: 'f' },
  { name: 'Twitter', href: '#', icon: '𝕏' },
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'LinkedIn', href: '#', icon: 'in' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta-strip">
        <div className="container footer-cta-inner">
          <p className="footer-cta-tagline">Ready to build your tech career?</p>
          <h2 className="footer-cta-title">Apply to Tekstack Academy today</h2>
          <p className="footer-cta-sub">Employers: Hire trained, job-ready talent</p>
          <Link to="/apply" className="btn btn-primary footer-cta-btn">
            Apply Now →
          </Link>
        </div>
      </div>

      <div className="footer-brand-strip">
        <div className="container footer-brand-inner">
          <Link to="/" className="footer-logo">
            <img src="/logo.jpg" alt="Tekstack Academy" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            Build real-world IT experience. Get industry-ready. Get hired. A
            next-generation internship and mentoring platform.
          </p>
          <div className="footer-social">
            {socialIcons.map((s) => (
              <a key={s.name} href={s.href} className="footer-social-btn" aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-links-strip">
        <div className="container footer-links-inner">
          {Object.entries(footerColumns).map(([title, content]) => (
            <div key={title} className="footer-col">
              <h4>{title}</h4>
              {Array.isArray(content) && (typeof content[0] === 'string' || !content[0]?.to) ? (
                <div className="footer-col-text">
                  {content.map((line, i) => (
                    <p key={i}>{typeof line === 'string' ? line : line?.label}</p>
                  ))}
                </div>
              ) : Array.isArray(content) && content[0]?.to ? (
                <ul>
                  {content.map(({ to, label }) => (
                    <li key={to}>
                      <Link to={to}>{label}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} Tekstack Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import './Home.css'

const featureCards = [
  {
    icon: '🏢',
    title: 'Real Enterprise Experience',
    description:
      'Work on actual cloud & DevOps projects, not simulations. Design, build, deploy, and document solutions the way real engineering teams do.',
  },
  {
    icon: '👤',
    title: "Mentors Who've Done the Job",
    description:
      'Learn directly from industry engineers, architects, and tech leads who are actively working in the field.',
  },
  {
    icon: '💼',
    title: 'Built for Hiring Outcomes',
    description:
      'Everything you do is mapped to getting hired, not just "finishing a course."',
  },
]

const whyItems = [
  'Industry-experienced mentors',
  'Real projects, not simulations',
  'Cloud-first, automation-driven learning',
  'Career-track focused training',
  'Resume, LinkedIn & interview optimization',
  'Direct access to employers and job opportunities',
]

const tracks = [
  { name: 'Cloud Engineer', slug: 'cloud-engineer' },
  { name: 'DevOps Engineer', slug: 'devops-engineer' },
  { name: 'Full Stack Developer', slug: 'full-stack-developer' },
  { name: 'Data Engineer / Analyst', slug: 'data-engineer' },
  { name: 'Cybersecurity Analyst', slug: 'cybersecurity' },
  { name: 'AI & Automation Engineer', slug: 'ai-automation' },
]

const outcomes = [
  'Portfolio of real projects',
  'Verified skills with certification readiness',
  'Job-ready resumes with interview confidence',
]

const testimonials = [
  {
    quote:
      'This program gave me real confidence. I walked into interviews knowing I had already done the job.',
    name: 'Alex Chen',
    role: 'Cloud Engineering Graduate',
  },
  {
    quote:
      'Tekstack Academy helped me transition into DevOps with hands-on AWS and CI/CD projects.',
    name: 'Jordan Taylor',
    role: 'DevOps Track Graduate',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero with blue overlay */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <p className="hero-welcome">Welcome to Tekstack Academy</p>
          <h1 className="hero-title">
            Build Real-World IT
            <br />
            Experience. Get Industry-
            <br />
            Ready. Get Hired.
          </h1>
          <p className="hero-subtitle">
            Tekstack Academy is a next-generation internship and mentoring platform
            where experienced technology professionals train, coach, and guide students
            through real enterprise-level projects using modern cloud and automation
            technologies.
          </p>
          <Link to="/apply" className="btn btn-primary hero-cta-btn">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="feature-cards">
        <div className="container feature-cards-inner">
          {featureCards.map((card, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card-icon-wrap">
                <span className="feature-card-icon">{card.icon}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="who-we-are section">
        <div className="container who-we-are-inner">
          <div className="who-we-are-media">
            <div className="play-button" aria-hidden>
              <span className="play-triangle" />
            </div>
          </div>
          <div className="who-we-are-content">
            <p className="section-label">Who We Are</p>
            <h2 className="section-title">Where Learning Meets the Real World</h2>
            <p className="who-we-are-text">
              Tekstack Academy bridges the gap between education and real employment.
              We provide structured internships, mentorship, hands-on projects, and
              career coaching to prepare students for high-paying IT roles.
            </p>
            <p className="who-we-are-text">
              Students work in real-world environments, collaborate in teams, and
              deploy solutions across AWS, Azure, and GCP—just like they would in a
              professional enterprise setting.
            </p>
          </div>
        </div>
      </section>

      {/* Why Tekstack Academy */}
      <section className="why-section section">
        <div className="container why-inner">
          <div className="why-content">
            <p className="section-label">Why Tekstack Academy</p>
            <h2 className="section-title">The Tekstack Advantage</h2>
            <ul className="why-list">
              {whyItems.map((item, i) => (
                <li key={i}>
                  <span className="why-check" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="why-visual">
            <div className="success-rate-card">
              <div className="success-rate-circle">
                <svg viewBox="0 0 100 100" className="success-rate-svg">
                  <circle className="success-rate-bg" cx="50" cy="50" r="45" />
                  <circle
                    className="success-rate-fill"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{ strokeDasharray: '283', strokeDashoffset: '14' }}
                  />
                </svg>
                <span className="success-rate-value">95%</span>
              </div>
              <p className="success-rate-label">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tracks - dark section */}
      <section className="career-tracks-section">
        <div className="career-tracks-pattern" />
        <div className="container">
          <p className="career-tracks-label">Career Tracks</p>
          <h2 className="career-tracks-title">Explore our most in-demand tracks</h2>
          <p className="career-tracks-subtitle">
            Upon graduation, our graduates are prepared for these popular roles.
          </p>
          <div className="career-tracks-grid">
            {tracks.map(({ name, slug }) => (
              <Link key={slug} to={`/career-tracks/${slug}`} className="career-track-card">
                <div className="career-track-image" />
                <h3>{name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Program Outcomes */}
      <section className="outcomes-section section">
        <div className="container outcomes-inner">
          <p className="section-label">Program Outcomes</p>
          <h2 className="section-title">What You Will Leave With</h2>
          <div className="outcomes-grid">
            {outcomes.map((item, i) => (
              <div key={i} className="outcome-item">
                <div className="outcome-icon">
                  <span className="outcome-star">★</span>
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="testimonials-section">
        <div className="testimonials-pattern" />
        <div className="container">
          <p className="section-label testimonials-label">Student Success Stories</p>
          <h2 className="section-title">What Our Graduates Say About The Program</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <span className="testimonial-quote-icon">"</span>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" />
                  <div>
                    <strong>{t.name}</strong>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" id="hire">
        <div className="cta-banner-overlay" />
        <div className="container cta-banner-inner">
          <p className="cta-banner-tagline">Ready to build your tech career?</p>
          <h2 className="cta-banner-title">Apply to Tekstack Academy today</h2>
          <p className="cta-banner-sub">Employers: Hire trained, job-ready talent</p>
          <Link to="/apply" className="btn btn-primary cta-banner-btn">
            Apply Now →
          </Link>
        </div>
      </section>
    </div>
  )
}

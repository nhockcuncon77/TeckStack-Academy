import { Link } from 'react-router-dom'
import './Programs.css'

export default function Programs() {
  const mentorship = [
    '1:1 mentor guidance',
    'Group mentoring sessions',
    'Career coaching',
    'Interview preparation',
  ]

  const schedule = [
    'Sprint planning & standups',
    'Technical training',
    'Project assignments',
    'Code reviews & demos',
    'Weekly performance feedback',
  ]

  const tools = [
    'AWS, Azure, GCP',
    'GitHub, GitLab',
    'Docker, Kubernetes',
    'Terraform',
    'CI/CD pipelines',
    'Jira, Slack',
  ]

  const placement = [
    'Resume & LinkedIn optimization',
    'Mock interviews',
    'Employer referrals',
    'Job placement assistance',
  ]

  const admissions = [
    'Online application',
    'Career interest selection',
    'Skill assessment',
    'Interview',
    'Enrollment & onboarding',
  ]

  return (
    <div className="programs-page">
      <section className="page-hero">
        <div className="container">
          <h1>Internship Program Overview</h1>
          <p>
            Our internship program is designed to simulate real enterprise environments
            where students learn by doing.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="section program-block">
          <h2 className="section-title">Mentorship & Coaching</h2>
          <ul className="program-list">
            {mentorship.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section className="section program-block">
          <h2 className="section-title">Weekly Schedule & Deliverables</h2>
          <ul className="program-list">
            {schedule.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section className="section program-block">
          <h2 className="section-title">Tools & Technologies</h2>
          <div className="tools-grid">
            {tools.map((t, i) => (
              <span key={i} className="tool-tag">
                {t}
              </span>
            ))}
          </div>
        </section>

        <hr className="divider" />

        <section className="section program-block">
          <h2 className="section-title">Graduation & Placement Support</h2>
          <ul className="program-list">
            {placement.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section className="section program-block">
          <h2 className="section-title">Admissions Process</h2>
          <ol className="admissions-steps">
            {admissions.map((step, i) => (
              <li key={i}>
                <span className="step-num">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <hr className="divider" />

        <section className="section program-block">
          <h2 className="section-title">Pricing & Enrollment</h2>
          <p>
            Flexible payment plans available. Scholarships and partner-sponsored seats
            offered.
          </p>
          <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Apply Now
          </Link>
        </section>
      </div>
    </div>
  )
}

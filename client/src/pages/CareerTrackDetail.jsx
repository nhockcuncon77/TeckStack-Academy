import { useParams, Link } from 'react-router-dom'
import { careerTracks } from '../data/careerTracks'
import './CareerTrackDetail.css'

export default function CareerTrackDetail() {
  const { slug } = useParams()
  const track = careerTracks.find((t) => t.slug === slug)

  if (!track) {
    return (
      <div className="container section">
        <p>Track not found.</p>
        <Link to="/career-tracks">Back to Career Tracks</Link>
      </div>
    )
  }

  return (
    <div className="track-detail-page">
      <section className="page-hero">
        <div className="container">
          <span className="track-icon-hero">{track.icon}</span>
          <h1>{track.title}</h1>
          <p className="overview-lead">{track.overview}</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p>{track.skills}</p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Learning Roadmap</h2>
          <ul className="roadmap-list">
            {track.roadmap.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Sample Projects</h2>
          <ul className="roadmap-list">
            {track.projects.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Certification Alignment</h2>
          <p>{track.certifications}</p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Career Outcomes & Salary Range</h2>
          <p>
            {track.outcomes} — <strong>{track.salary}</strong>
          </p>
          <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Apply to Track
          </Link>
        </section>
      </div>
    </div>
  )
}

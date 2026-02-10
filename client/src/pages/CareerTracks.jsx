import { Link } from 'react-router-dom'
import { careerTracks } from '../data/careerTracks'
import './CareerTracks.css'

export default function CareerTracks() {
  return (
    <div className="career-tracks-page">
      <section className="page-hero">
        <div className="container">
          <h1>Career Tracks</h1>
          <p>
            Each career track includes: Skills & Tech Stack • Learning Roadmap • Sample
            Projects • Certification Alignment • Career Outcomes & Salary Range
          </p>
        </div>
      </section>

      <div className="container">
        <div className="tracks-list">
          {careerTracks.map((track) => (
            <article key={track.slug} className="track-card-full">
              <div className="track-card-header">
                <span className="track-icon">{track.icon}</span>
                <h2>{track.title}</h2>
              </div>
              <p className="track-overview">{track.overview}</p>
              <div className="track-meta">
                <p>
                  <strong>Tech:</strong> {track.skills}
                </p>
                <p>
                  <strong>Salary Range:</strong> {track.salary}
                </p>
              </div>
              <Link to={`/career-tracks/${track.slug}`} className="btn btn-primary">
                Apply to Track
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

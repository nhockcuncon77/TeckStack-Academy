import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Real projects. Real mentors. Real outcomes.</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Our Mission</h2>
          <p>
            To create industry-ready IT professionals through real experience,
            mentorship, and modern technology.
          </p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Leadership & Mentors</h2>
          <p className="section-intro">Experienced engineers, architects, and tech leaders.</p>
          <div className="profile-card">
            <img src="/stefan.jpg" alt="Stefan Nguyen" className="profile-photo" />
            <div className="profile-info">
              <h3 className="profile-name">Stefan Nguyen</h3>
              <p className="profile-title">Program Director</p>
              <p className="profile-bio">
                Leading Techstack Academy&apos;s program design and mentor network to deliver
                industry-ready training and real-world project experience.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">How We're Different</h2>
          <p>Real projects. Real mentors. Real outcomes.</p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Partners</h2>
          <p>Technology providers and hiring partners.</p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">FAQs</h2>
          <p>
            Common questions answered clearly. (See Resources for detailed FAQs.)
          </p>
        </section>

        <hr className="divider" />

        <section className="section">
          <h2 className="section-title">Contact Us</h2>
          <p>Get in touch with our team.</p>
          <Link to="/apply" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Get in Touch
          </Link>
        </section>
      </div>
    </div>
  )
}

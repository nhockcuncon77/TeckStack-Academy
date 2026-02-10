import './Careers.css'

const categories = [
  {
    title: 'Job Listings',
    description: 'Curated roles from partner employers.',
  },
  {
    title: 'Internships & Apprenticeships',
    description: 'Entry-level and transition roles.',
  },
  {
    title: 'Remote Opportunities',
    description: 'Remote-first positions worldwide.',
  },
  {
    title: 'Contract & Freelance',
    description: 'Short-term and project-based work.',
  },
  {
    title: 'Employer Directory',
    description: 'Verified companies hiring Techstack Academy talent.',
  },
]

export default function Careers() {
  return (
    <div className="careers-page">
      <section className="page-hero">
        <div className="container">
          <h1>Careers</h1>
          <p>Find your next role. Employers: discover job-ready talent.</p>
        </div>
      </section>

      <div className="container">
        <div className="careers-grid">
          {categories.map((c, i) => (
            <div key={i} className="career-card">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

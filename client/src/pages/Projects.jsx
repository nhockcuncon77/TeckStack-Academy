import './Projects.css'

export default function Projects() {
  return (
    <div className="projects-page">
      <section className="page-hero">
        <div className="container">
          <h1>Projects</h1>
          <p>
            Each project includes: Project description & objectives • Technologies used •
            Cloud deployments • Student team members • Outcomes, demos & documentation.
          </p>
          <p>Projects reflect real enterprise challenges and workflows.</p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <h2 className="section-title">Real-World Project Areas</h2>
          <ul className="project-areas">
            <li>Cloud infrastructure design</li>
            <li>CI/CD pipelines</li>
            <li>Secure application deployments</li>
            <li>Data pipelines and dashboards</li>
            <li>Automation and monitoring systems</li>
          </ul>
          <p className="projects-note">
            Projects are designed, built, deployed, and documented—end to end.
          </p>
        </section>
      </div>
    </div>
  )
}

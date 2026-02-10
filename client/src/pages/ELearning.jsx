import { Link } from 'react-router-dom'
import './ELearning.css'

const features = [
  {
    title: 'My Courses',
    description: 'Access your enrolled courses and modules.',
    icon: '📚',
  },
  {
    title: 'Career Roadmaps',
    description: 'Step-by-step learning paths aligned to your career track.',
    icon: '🗺️',
  },
  {
    title: 'Live Sessions',
    description: 'Mentor-led workshops, office hours, and project walkthroughs.',
    icon: '🎥',
  },
  {
    title: 'Labs & Sandboxes',
    description: 'Hands-on cloud labs with real infrastructure.',
    icon: '🛠️',
  },
  {
    title: 'Certification Prep',
    description: 'AWS, Azure, GCP aligned study plans and practice exams.',
    icon: '📜',
  },
  {
    title: 'Assessments',
    description: 'Skill evaluations and project reviews.',
    icon: '📋',
  },
  {
    title: 'Progress Tracker',
    description: 'Track completion, skills gained, and readiness level.',
    icon: '📈',
  },
]

export default function ELearning() {
  return (
    <div className="e-learning-page">
      <section className="page-hero">
        <div className="container">
          <h1>E-Learning</h1>
          <p>Your learning hub: courses, roadmaps, live sessions, and progress.</p>
        </div>
      </section>

      <div className="container">
        <div className="elearning-grid">
          {features.map((f, i) => (
            <div key={i} className="elearning-card">
              <span className="elearning-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
        <div className="elearning-cta">
          <Link to="/login" className="btn btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

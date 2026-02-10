import './Community.css'

const sections = [
  {
    title: 'Student Directory',
    description: 'Discover and connect with fellow students.',
  },
  {
    title: 'Blogs & Learning',
    description: 'Student-written technical blogs and insights.',
  },
  {
    title: 'Success Stories',
    description: 'Career transitions and job wins.',
  },
  {
    title: 'Events & Webinars',
    description: 'Live learning and networking events.',
  },
  {
    title: 'Discussion Boards',
    description: 'Ask questions, share knowledge, collaborate.',
  },
]

export default function Community() {
  return (
    <div className="community-page">
      <section className="page-hero">
        <div className="container">
          <h1>Community</h1>
          <p>Connect, learn, and grow with peers and mentors.</p>
        </div>
      </section>

      <div className="container">
        <div className="community-grid">
          {sections.map((s, i) => (
            <div key={i} className="community-card">
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

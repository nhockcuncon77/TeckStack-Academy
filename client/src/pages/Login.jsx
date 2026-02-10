import './Login.css'

const roles = [
  { name: 'Student', description: 'Access courses, projects, and progress.' },
  { name: 'Mentor', description: 'Guide students and manage sessions.' },
  { name: 'Employer', description: 'View talent and post opportunities.' },
  { name: 'Admin', description: 'Manage platform and users.' },
]

export default function Login() {
  return (
    <div className="login-page">
      <section className="page-hero">
        <div className="container">
          <h1>Login</h1>
          <p>Access your personalized dashboard.</p>
        </div>
      </section>

      <div className="container">
        <div className="login-card">
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Sign In
            </button>
          </form>

          <div className="login-roles">
            <h3>Dashboard access</h3>
            <ul>
              {roles.map((r, i) => (
                <li key={i}>
                  <strong>{r.name}</strong> — {r.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

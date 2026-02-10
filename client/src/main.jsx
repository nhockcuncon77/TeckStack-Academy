import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui', background: '#0a0e14', color: '#e6edf3', minHeight: '100vh' }}>
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#f97583' }}>{this.state.error?.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')
if (!root) {
  document.body.innerHTML = '<div style="padding:24px;background:#0a0e14;color:#e6edf3">Root element #root not found.</div>'
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}

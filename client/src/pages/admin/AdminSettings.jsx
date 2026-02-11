import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { apiBase } from '../../api'

export default function AdminSettings() {
  const { authHeader } = useAuth()
  const [siteName, setSiteName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch(`${apiBase}/api/admin/settings`, { headers: authHeader })
      .then((res) => res.json())
      .then((data) => {
        setSiteName(data.siteName || '')
        setContactEmail(data.contactEmail || '')
      })
      .catch(() => setMessage({ type: 'error', text: 'Failed to load settings' }))
      .finally(() => setLoading(false))
  }, [authHeader])

  function save() {
    setSaving(true)
    setMessage(null)
    fetch(`${apiBase}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ siteName, contactEmail }),
    })
      .then((res) => res.json())
      .then(() => setMessage({ type: 'success', text: 'Settings saved.' }))
      .catch(() => setMessage({ type: 'error', text: 'Failed to save.' }))
      .finally(() => setSaving(false))
  }

  if (loading) return <p>Loading…</p>

  return (
    <>
      <h1>Settings</h1>
      {message && (
        <div className={`admin-notice ${message.type}`}>{message.text}</div>
      )}
      <div className="admin-card">
        <h2>General</h2>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '6px' }}>Site name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            style={{ width: '100%', maxWidth: '400px', padding: '8px 12px' }}
          />
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '6px' }}>Contact email</label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            style={{ width: '100%', maxWidth: '400px', padding: '8px 12px' }}
          />
        </div>
        <div className="admin-actions">
          <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </div>
    </>
  )
}

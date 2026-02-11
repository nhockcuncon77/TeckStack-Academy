import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminELearning() {
  const { authHeader } = useAuth()
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch('/api/admin/elearning-features', { headers: authHeader })
      .then((res) => res.json())
      .then(setFeatures)
      .catch(() => setMessage({ type: 'error', text: 'Failed to load e-learning features' }))
      .finally(() => setLoading(false))
  }, [authHeader])

  const updateFeature = (index, field, value) => {
    setFeatures((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addFeature = () => {
    setFeatures((prev) => [...prev, { title: '', description: '', icon: '📚' }])
  }

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index))
  }

  function save() {
    setSaving(true)
    setMessage(null)
    fetch('/api/admin/elearning-features', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(features),
    })
      .then((res) => res.json())
      .then(() => setMessage({ type: 'success', text: 'E-Learning features saved.' }))
      .catch(() => setMessage({ type: 'error', text: 'Failed to save.' }))
      .finally(() => setSaving(false))
  }

  if (loading) return <p>Loading…</p>

  return (
    <>
      <h1>E-Learning Features</h1>
      {message && (
        <div className={`admin-notice ${message.type}`}>{message.text}</div>
      )}
      {features.map((f, i) => (
        <div key={i} className="admin-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={f.icon || ''}
            onChange={(e) => updateFeature(i, 'icon', e.target.value)}
            placeholder="📚"
            style={{ width: '50px', textAlign: 'center', padding: '6px' }}
          />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Title</label>
            <input
              type="text"
              value={f.title || ''}
              onChange={(e) => updateFeature(i, 'title', e.target.value)}
              placeholder="My Courses"
              style={{ width: '100%', padding: '6px 10px', marginBottom: '6px' }}
            />
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Description</label>
            <input
              type="text"
              value={f.description || ''}
              onChange={(e) => updateFeature(i, 'description', e.target.value)}
              placeholder="Access your enrolled courses..."
              style={{ width: '100%', padding: '6px 10px' }}
            />
          </div>
          <button type="button" className="btn" onClick={() => removeFeature(i)}>
            Remove
          </button>
        </div>
      ))}
      <div className="admin-actions">
        <button type="button" className="btn btn-secondary" onClick={addFeature}>
          Add feature
        </button>
        <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save e-learning features'}
        </button>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminCareerTracks() {
  const { authHeader } = useAuth()
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch('/api/admin/career-tracks', { headers: authHeader })
      .then((res) => res.json())
      .then(setTracks)
      .catch(() => setMessage({ type: 'error', text: 'Failed to load career tracks' }))
      .finally(() => setLoading(false))
  }, [authHeader])

  const updateTrack = (index, field, value) => {
    setTracks((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const addTrack = () => {
    setTracks((prev) => [
      ...prev,
      {
        slug: '',
        icon: '📚',
        title: '',
        overview: '',
        skills: '',
        roadmap: [],
        projects: [],
        certifications: '',
        outcomes: '',
        salary: '',
      },
    ])
  }

  const removeTrack = (index) => {
    setTracks((prev) => prev.filter((_, i) => i !== index))
  }

  function save() {
    setSaving(true)
    setMessage(null)
    fetch('/api/admin/career-tracks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(tracks),
    })
      .then((res) => res.json())
      .then(() => setMessage({ type: 'success', text: 'Career tracks saved.' }))
      .catch(() => setMessage({ type: 'error', text: 'Failed to save.' }))
      .finally(() => setSaving(false))
  }

  if (loading) return <p>Loading…</p>

  return (
    <>
      <h1>Career Tracks</h1>
      {message && (
        <div className={`admin-notice ${message.type}`}>{message.text}</div>
      )}
      {tracks.map((track, i) => (
        <div key={i} className="admin-card">
          <h2>Track {i + 1}</h2>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Slug</label>
            <input
              type="text"
              value={track.slug || ''}
              onChange={(e) => updateTrack(i, 'slug', e.target.value)}
              placeholder="cloud-engineer"
              style={{ width: '100%', maxWidth: '300px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Icon</label>
            <input
              type="text"
              value={track.icon || ''}
              onChange={(e) => updateTrack(i, 'icon', e.target.value)}
              placeholder="☁️"
              style={{ width: '60px', padding: '6px', textAlign: 'center' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Title</label>
            <input
              type="text"
              value={track.title || ''}
              onChange={(e) => updateTrack(i, 'title', e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Overview</label>
            <textarea
              rows={2}
              value={track.overview || ''}
              onChange={(e) => updateTrack(i, 'overview', e.target.value)}
              style={{ width: '100%', maxWidth: '500px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Skills</label>
            <input
              type="text"
              value={track.skills || ''}
              onChange={(e) => updateTrack(i, 'skills', e.target.value)}
              style={{ width: '100%', maxWidth: '500px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Roadmap (one per line)</label>
            <textarea
              rows={3}
              value={Array.isArray(track.roadmap) ? track.roadmap.join('\n') : ''}
              onChange={(e) => updateTrack(i, 'roadmap', e.target.value.split('\n').filter(Boolean))}
              style={{ width: '100%', maxWidth: '500px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Projects (one per line)</label>
            <textarea
              rows={2}
              value={Array.isArray(track.projects) ? track.projects.join('\n') : ''}
              onChange={(e) => updateTrack(i, 'projects', e.target.value.split('\n').filter(Boolean))}
              style={{ width: '100%', maxWidth: '500px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Certifications</label>
            <input
              type="text"
              value={track.certifications || ''}
              onChange={(e) => updateTrack(i, 'certifications', e.target.value)}
              style={{ width: '100%', maxWidth: '500px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Outcomes</label>
            <input
              type="text"
              value={track.outcomes || ''}
              onChange={(e) => updateTrack(i, 'outcomes', e.target.value)}
              style={{ width: '100%', maxWidth: '400px', padding: '6px 10px' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Salary</label>
            <input
              type="text"
              value={track.salary || ''}
              onChange={(e) => updateTrack(i, 'salary', e.target.value)}
              placeholder="$80,000 – $140,000+"
              style={{ width: '100%', maxWidth: '300px', padding: '6px 10px' }}
            />
          </div>
          <button type="button" className="btn" style={{ marginTop: '0.5rem' }} onClick={() => removeTrack(i)}>
            Remove track
          </button>
        </div>
      ))}
      <div className="admin-actions">
        <button type="button" className="btn btn-secondary" onClick={addTrack}>
          Add career track
        </button>
        <button type="button" className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save career tracks'}
        </button>
      </div>
    </>
  )
}

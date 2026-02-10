import { useState, useRef, useEffect } from 'react'
import { careerTracks } from '../data/careerTracks'
import './Apply.css'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

export default function Apply() {
  const [track, setTrack] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const recaptchaRef = useRef(null)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || window.grecaptcha) return
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const form = e.target

    const firstName = form.elements.firstName?.value?.trim()
    const lastName = form.elements.lastName?.value?.trim()
    const email = form.elements.email?.value?.trim()
    const phone = form.elements.phone?.value?.trim()
    const collegeName = form.elements.collegeName?.value?.trim()
    const careerTrack = form.elements.careerTrack?.value
    const statement = form.elements.statement?.value?.trim() || ''

    if (!firstName || !lastName || !email || !careerTrack) {
      setError('Please fill in required fields: First name, Last name, Email, and Career track.')
      return
    }

    const resume = form.elements.resume?.files?.[0]
    if (resume) {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      const validExt = /\.(pdf|doc|docx)$/i.test(resume.name)
      if (!validTypes.includes(resume.type) && !validExt) {
        setError('Resume must be a PDF or Word document (.pdf, .doc, .docx).')
        return
      }
      if (resume.size > 5 * 1024 * 1024) {
        setError('Resume file must be under 5 MB.')
        return
      }
    }

    let recaptchaToken = ''
    if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
      try {
        recaptchaToken = typeof window.grecaptcha.getResponse === 'function'
          ? window.grecaptcha.getResponse()
          : ''
        if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
          setError('Please complete the security verification (I\'m not a robot).')
          return
        }
      } catch (err) {
        setError('Security verification failed. Please try again.')
        return
      }
    }

    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('phone', phone || '')
    formData.append('collegeName', collegeName || '')
    formData.append('careerTrack', careerTrack)
    formData.append('statement', statement)
    formData.append('recaptchaToken', recaptchaToken)
    if (resume) formData.append('resume', resume)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || data.message || 'Submission failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <div className="apply-page">
        <section className="page-hero">
          <div className="container">
            <h1>Application Received</h1>
            <p>Thank you for applying. We'll be in touch soon.</p>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="apply-page">
      <section className="page-hero">
        <div className="container">
          <h1>Apply Now</h1>
          <p>Start your application. All fields marked with * are required.</p>
        </div>
      </section>

      <div className="container">
        <form className="apply-form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First name"
                autoComplete="given-name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last name"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="321-451-0687"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="collegeName">College / University name</label>
            <input
              id="collegeName"
              name="collegeName"
              type="text"
              placeholder="Your college or university"
            />
          </div>

          <div className="form-group">
            <label htmlFor="careerTrack">Career track *</label>
            <select
              id="careerTrack"
              name="careerTrack"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            >
              <option value="">Select a career track</option>
              {careerTracks.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statement">Why do you want to join our mentorship and internship program? *</label>
            <textarea
              id="statement"
              name="statement"
              rows={5}
              required
              placeholder="Share your goals and why you're interested in Tekstack Academy..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume (PDF or Word)</label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setResumeFile(e.target.files?.[0])}
            />
            <span className="form-hint">Accepted: .pdf, .doc, .docx (max 5 MB)</span>
          </div>

          {RECAPTCHA_SITE_KEY && (
            <div className="form-group">
              <div
                className="g-recaptcha"
                ref={recaptchaRef}
                data-sitekey={RECAPTCHA_SITE_KEY}
              />
              <span className="form-hint">Please complete the security check (I&apos;m not a robot).</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}

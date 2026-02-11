import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import contentRoutes from './routes/content.js'
import { store } from './data/store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 5002
const RECIPIENT_EMAIL = 'career@tekstackacademy.com'
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || ''

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const ext = path.extname(file.originalname || '').toLowerCase()
    if (allowed.includes(file.mimetype) || ['.pdf', '.doc', '.docx'].includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and Word documents are allowed'), false)
    }
  },
})

app.use(cors())
app.use(express.json())

// Root: show that the API is running (for when you open http://localhost:5000 in browser)
app.get('/', (req, res) => {
  res.type('html')
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>TeckStack Academy API</title></head>
      <body style="font-family: system-ui; padding: 2rem; max-width: 600px; margin: 0 auto;">
        <h1>TeckStack Academy API</h1>
        <p>Backend is running at <strong>http://localhost:${PORT}</strong></p>
        <p><a href="/api/health">/api/health</a> — health check</p>
        <p>Use the frontend at <a href="http://localhost:3000">http://localhost:3000</a> to log in and use the app.</p>
      </body>
    </html>
  `)
})

async function verifyRecaptcha(token) {
  if (!RECAPTCHA_SECRET || !token) return { ok: !RECAPTCHA_SECRET }
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    })
    const data = await res.json()
    return { ok: data.success === true }
  } catch (e) {
    return { ok: false }
  }
}

function createMailer() {
  const user = process.env.SMTP_USER || process.env.NODEMAILER_USER
  const pass = process.env.SMTP_PASS || process.env.NODEMAILER_PASS
  if (!user || !pass) return null
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tekstack Academy API' })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api', contentRoutes)

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, collegeName, careerTrack, statement, recaptchaToken } = req.body || {}
    const resume = req.file

    if (!firstName || !lastName || !email || !careerTrack) {
      return res.status(400).json({
        error: 'Required fields: First name, Last name, Email, and Career track.',
      })
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken || '')
    if (!recaptcha.ok) {
      return res.status(400).json({
        error: 'Security verification failed. Please complete the reCAPTCHA and try again.',
      })
    }

    const mailer = createMailer()
    const html = `
      <h2>New Application – Tekstack Academy</h2>
      <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
      <p><strong>Last name:</strong> ${escapeHtml(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
      <p><strong>College / University:</strong> ${escapeHtml(collegeName || '—')}</p>
      <p><strong>Career track:</strong> ${escapeHtml(careerTrack)}</p>
      <h3>Why they want to join</h3>
      <p>${escapeHtml(statement || '—').replace(/\n/g, '<br>')}</p>
      <p><em>Resume: ${resume ? resume.originalname : 'Not attached'}</em></p>
    `

    if (mailer) {
      const attachments = []
      if (resume && resume.buffer) {
        const ext = path.extname(resume.originalname || '') || '.pdf'
        attachments.push({
          filename: `resume_${firstName}_${lastName}${ext}`.replace(/\s+/g, '_'),
          content: resume.buffer,
        })
      }
      await mailer.sendMail({
        from: process.env.SMTP_USER || process.env.NODEMAILER_USER,
        to: RECIPIENT_EMAIL,
        subject: `Tekstack Academy Application – ${firstName} ${lastName}`,
        html,
        attachments,
      })
    } else {
      console.log('Application (email not configured):', {
        firstName,
        lastName,
        email,
        phone,
        collegeName,
        careerTrack,
        statement: (statement || '').slice(0, 200),
        hasResume: !!resume,
      })
    }

    res.json({ success: true, message: 'Application received' })
  } catch (err) {
    console.error('Apply error:', err)
    res.status(500).json({
      error: err.message || 'Submission failed. Please try again.',
    })
  }
})

function escapeHtml(s) {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Catch-all: so GET / always returns something (not 404 from another layer)
app.get('*', (req, res) => {
  res.type('html')
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head><title>TeckStack Academy API</title></head>
      <body style="font-family: system-ui; padding: 2rem; max-width: 600px; margin: 0 auto;">
        <h1>TeckStack Academy API</h1>
        <p>Backend is running at <strong>http://localhost:${PORT}</strong></p>
        <p><a href="/api/health">/api/health</a> — health check</p>
        <p>Use the frontend at <a href="http://localhost:3000">http://localhost:3000</a> to log in and use the app.</p>
      </body>
    </html>
  `)
})

const DEFAULT_ADMIN_EMAIL = 'admin@gmail.com'
const DEFAULT_ADMIN_PASSWORD = 'admin123'

async function start() {
  const users = store.getUsers()
  const adminHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10)
  const adminIndex = users.findIndex((u) => u && u.email && u.email.toLowerCase() === DEFAULT_ADMIN_EMAIL)
  if (adminIndex === -1) {
    users.push({
      id: users.length === 0 ? 'admin' : `admin-${Date.now()}`,
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: adminHash,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
    })
    console.log('Default admin created: admin@gmail.com')
  } else {
    users[adminIndex] = { ...users[adminIndex], passwordHash: adminHash }
    console.log('Default admin password reset: admin@gmail.com')
  }
  store.saveUsers(users)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
}
start().catch((err) => {
  console.error(err)
  process.exit(1)
})

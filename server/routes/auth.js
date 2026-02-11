import express from 'express'
import bcrypt from 'bcryptjs'
import { store } from '../data/store.js'
import { signToken, requireAuth } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
    const password = typeof req.body?.password === 'string' ? req.body.password : ''
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    const users = store.getUsers()
    const user = users.find((u) => u && u.email && String(u.email).toLowerCase() === email.toLowerCase())
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const hash = user.passwordHash
    if (!hash || !(await bcrypt.compare(password, hash))) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    return res.json({
      user: { id: user.id, email: user.email, name: user.name || user.email, role: user.role },
      token,
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: err.message || 'Login failed' })
  }
})

router.get('/me', requireAuth, (req, res) => {
  const users = store.getUsers()
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role })
})

export default router

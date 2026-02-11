import express from 'express'
import { store } from '../data/store.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()
router.use(requireAuth, requireAdmin)

router.get('/settings', (req, res) => {
  res.json(store.getSettings())
})

router.put('/settings', (req, res) => {
  const { siteName, contactEmail } = req.body || {}
  const current = store.getSettings()
  const next = {
    siteName: typeof siteName === 'string' ? siteName : current.siteName,
    contactEmail: typeof contactEmail === 'string' ? contactEmail : current.contactEmail,
  }
  store.saveSettings(next)
  res.json(next)
})

router.get('/career-tracks', (req, res) => {
  const data = store.getCareerTracks()
  res.json(data === null ? [] : data)
})

router.put('/career-tracks', (req, res) => {
  const data = Array.isArray(req.body) ? req.body : []
  store.saveCareerTracks(data)
  res.json(data)
})

router.get('/elearning-features', (req, res) => {
  const data = store.getElearningFeatures()
  res.json(data === null ? [] : data)
})

router.put('/elearning-features', (req, res) => {
  const data = Array.isArray(req.body) ? req.body : []
  store.saveElearningFeatures(data)
  res.json(data)
})

export default router

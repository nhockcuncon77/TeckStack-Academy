import express from 'express'
import { store } from '../data/store.js'

const router = express.Router()

router.get('/settings', (req, res) => {
  res.json(store.getSettings())
})

router.get('/career-tracks', (req, res) => {
  const data = store.getCareerTracks()
  res.json(data === null ? [] : data)
})

router.get('/elearning-features', (req, res) => {
  const data = store.getElearningFeatures()
  res.json(data === null ? [] : data)
})

export default router

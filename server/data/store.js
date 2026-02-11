import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'files')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJson(name, defaultValue = null) {
  ensureDir()
  const file = path.join(DATA_DIR, `${name}.json`)
  if (!fs.existsSync(file)) return defaultValue
  try {
    const raw = fs.readFileSync(file, 'utf8')
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

function writeJson(name, data) {
  ensureDir()
  const file = path.join(DATA_DIR, `${name}.json`)
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
  return data
}

export const store = {
  getUsers: () => readJson('users', []),
  saveUsers: (users) => writeJson('users', users),

  getSettings: () => readJson('settings', { siteName: 'TeckStack Academy', contactEmail: '' }),
  saveSettings: (data) => writeJson('settings', data),

  getCareerTracks: () => readJson('careerTracks', null),
  saveCareerTracks: (data) => writeJson('careerTracks', data),

  getElearningFeatures: () => readJson('elearningFeatures', null),
  saveElearningFeatures: (data) => writeJson('elearningFeatures', data),
}

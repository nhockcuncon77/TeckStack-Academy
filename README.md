# Techstack Academy

A React + Node.js website for **Techstack Academy** — a next-generation internship and mentoring platform for real-world IT experience.

## Stack

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express
- **Styling:** Custom CSS (dark theme, DM Sans + JetBrains Mono)

## Setup

1. **Install all dependencies** (root, client, and server):

   ```bash
   npm run install:all
   ```

   Or manually:

   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Run development** (frontend + backend together):

   ```bash
   npm run dev
   ```

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

3. **Run separately:**

   - Frontend only: `npm run dev:client`
   - Backend only: `npm run dev:server`

## Build & production

- Build frontend: `npm run build`
- Start API server: `npm start` (from root; runs server only)

## Pages

| Route            | Description                    |
|------------------|--------------------------------|
| `/`              | Home (hero, what we do, tracks, CTA) |
| `/programs`      | Internship program overview    |
| `/career-tracks` | All career tracks             |
| `/career-tracks/:slug` | Single track detail    |
| `/e-learning`    | E-Learning hub                 |
| `/projects`      | Real-world projects            |
| `/careers`       | Job listings & employers       |
| `/community`     | Community features             |
| `/about`         | About, mission, contact        |
| `/apply`         | Application form               |
| `/login`         | Login (Student / Mentor / Employer / Admin) |

## API

- `GET /api/health` — Health check
- `POST /api/apply` — Submit application (multipart/form-data):
  - **firstName**, **lastName**, **email**, **phone**, **collegeName**, **careerTrack**, **statement**
  - **resume** (optional file: PDF or Word, max 5 MB)
  - **recaptchaToken** (required if reCAPTCHA is configured)
  - Applications are emailed to **intrastackllc@gmail.com** when SMTP is configured.

## Apply form & email

- The Apply form collects: First name, Last name, Email, Phone, College name, Career track, Statement, and an optional Resume (PDF or Word).
- Submissions are sent to **intrastackllc@gmail.com** when the server has SMTP configured.
- **Email (Gmail):** Copy `server/.env.example` to `server/.env` and set `SMTP_USER` and `SMTP_PASS` (use a [Gmail App Password](https://support.google.com/accounts/answer/185833)).
- **reCAPTCHA (anti-spam):** Get keys from [Google reCAPTCHA](https://www.google.com/recaptcha/admin). Set `RECAPTCHA_SECRET_KEY` in `server/.env` and `VITE_RECAPTCHA_SITE_KEY` in `client/.env` (copy from `client/.env.example`). Use reCAPTCHA v2 “I’m not a robot” checkbox. If keys are not set, the form still works without the checkbox (useful for local testing).

## Notes

- Duplicate theme/page before using in production.
- For images or assets (logo, hero images, partner logos), add them under `client/public/` and reference by path (e.g. `/logo.png`).

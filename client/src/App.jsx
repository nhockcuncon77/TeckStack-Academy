import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminSettings from './pages/admin/AdminSettings'
import AdminCareerTracks from './pages/admin/AdminCareerTracks'
import AdminELearning from './pages/admin/AdminELearning'
import Home from './pages/Home'
import Programs from './pages/Programs'
import CareerTracks from './pages/CareerTracks'
import CareerTrackDetail from './pages/CareerTrackDetail'
import ELearning from './pages/ELearning'
import Projects from './pages/Projects'
import Careers from './pages/Careers'
import Community from './pages/Community'
import About from './pages/About'
import Apply from './pages/Apply'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="career-tracks" element={<CareerTracks />} />
          <Route path="career-tracks/:slug" element={<CareerTrackDetail />} />
          <Route path="e-learning" element={<ELearning />} />
          <Route path="projects" element={<Projects />} />
          <Route path="careers" element={<Careers />} />
          <Route path="community" element={<Community />} />
          <Route path="about" element={<About />} />
          <Route path="apply" element={<Apply />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="career-tracks" element={<AdminCareerTracks />} />
          <Route path="e-learning" element={<AdminELearning />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

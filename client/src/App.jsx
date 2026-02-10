import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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
      </Routes>
    </BrowserRouter>
  )
}

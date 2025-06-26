import React from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import About from './components/about/about'
import Contact from './components/contact/contact'
import Projects from './components/projects/projects'
import ProjectDetail from './components/projects/project-detail'
import AllProjects from './components/projects/all-projects'
import ScrollToTop from './ScrollToTop'
import MultiplayerPage from './components/wordlegame/multiplayer-page';
import WordleGame from './components/wordlegame/wordle.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='projects' element={<AllProjects />} />
        <Route path="/projects/:proj_url" element={<ProjectDetail />} />
        <Route path="/projects/wordle" element={<WordleGame />} />
        <Route path="/multiplayer/:roomId" element={<MultiplayerPage />} />
      </Routes>
    </Router>
  )
}

export default App
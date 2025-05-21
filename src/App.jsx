import React from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import About from './components/about/about'
import Contact from './components/contact/contact'
import Projects from './components/projects/projects'
import ProjectDetail from './components/projects/projectDetail'
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
      <Navbar />
      <Routes>
        {/* Main one-page home */}
        <Route path="/" element={<Home />} />

        {/* Dynamic project detail */}
        <Route path="/projects/:projId" element={<ProjectDetail />} />

        {/* (Optional) catch-all 404 could go here */}
      </Routes>
    </Router>
  )
}

export default App
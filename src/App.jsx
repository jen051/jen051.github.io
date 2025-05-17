import React from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import About from './components/about/about'
import Contact from './components/contact/contact'
import Projects from './components/projects/projects'

const App = () => {
  return (
    <div id='top'>
      <Navbar />
      <Hero />
      <About />
      <Projects/>
      <Contact />
    </div>
  )
}

export default App
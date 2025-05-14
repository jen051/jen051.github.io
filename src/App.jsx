import React from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import About from './components/about/about'
import Contact from './components/contact/contact'

const App = () => {
  return (
    <div id='top'>
      <Navbar/>
      <Hero/>
      <About/>
      <Contact/>
    </div>
  )
}

export default App
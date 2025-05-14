import React from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import About from './components/about/about'

const App = () => {
  return (
    <div id='top'>
      <Navbar/>
      <Hero/>
      <About/>
    </div>
  )
}

export default App
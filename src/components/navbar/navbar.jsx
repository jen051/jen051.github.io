import React, { useState } from 'react'
import './navbar.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';
const Navbar = () => {
  const [menu, setmenu] = useState('top');
  const [open, setOpen] = useState(false);
  return (
    <div className='navbar'>
      <AnchorLink className='anchor-link' href='#top'><h1>Jennifer Jiang</h1></AnchorLink>
      <button className={`hamburger${open ? ' active' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`nav-menu${open ? ' open' : ''}`}>
        <li><AnchorLink className='anchor-link' href='#top'><p onClick={() => setmenu('home')}>Home</p>{menu === 'home'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#about'><p onClick={() => setmenu('about')}>About Me</p>{menu === 'about'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#projects'><p onClick={() => setmenu('projects')}>Projects</p>{menu === 'projects'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#contact'><p onClick={() => setmenu('contact')}>Contact</p>{menu === 'contact'}</AnchorLink></li>
      </ul>
    </div>
  )
}

export default Navbar
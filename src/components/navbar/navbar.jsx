import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './navbar.css'
import AnchorLink from 'react-anchor-link-smooth-scroll';
const Navbar = () => {
  const [menu, setmenu] = useState('top');
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  const navTo = (hash) => (e) => {
    e.preventDefault();
    navigate('/', { replace: false });
    // wait a tick so the Home component is mounted
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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
        <li><AnchorLink className='anchor-link' href='#top'><p onClick={navTo('#top')}>Home</p>{menu === 'home'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#about'><p onClick={navTo('#about')}>About Me</p>{menu === 'about'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#projects'><p onClick={navTo('#projects')}>Projects</p>{menu === 'projects'}</AnchorLink></li>
        <li><AnchorLink className='anchor-link' href='#contact'><p onClick={navTo('#contact')}>Contact</p>{menu === 'contact'}</AnchorLink></li>
      </ul>
    </div>
  )
}

export default Navbar
import React from 'react'
import './hero.css'
import 'animate.css';
import profile_img from '../../assets/profile-img.png'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  return (
    <div id='top' className='hero'>
      <div className='hero-content'>
        <img class="animate__animated animate__zoomIn"
          src={profile_img} width="500px" height="500px" />
        <div className="hero-desc">
          <h1>Heyo! I'm Jen
            <span>👋🏻</span>
          </h1>
          <h2>or Jenni/Jennifer :)</h2>
          <p>I'm a computer science student at <a href="https://gatech.edu">Georgia Tech</a> graduating with my Bachelors in Computer Science in Dec 2026.</p>
          <div className="hero-action">
            <div className="hero-connect"><AnchorLink className='anchor-link' href='#contact'>Connect With Me!</AnchorLink></div>
            <div className="hero-resume"><a href="https://drive.google.com/file/d/1bceh7htFP0LEj5ZgWxlqnrv6pe7rJR_n/view?usp=drive_link" target="_blank">My Resume</a></div>
          </div>
        </div>
      </div>

      <div id='about' class="scrollButton">
        <AnchorLink className='anchor-link' href='#about'><p class="scrollIcon"> ↓ </p></AnchorLink>
      </div>
    </div>
  )
}

export default Hero
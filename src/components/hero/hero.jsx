import React, { useRef, useEffect } from 'react'
import './hero.css'
import 'animate.css';
import profile_img from '../../assets/profile-img.png'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const imgEl = imgRef.current;
    if (!imgEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // remove then re-add the class to restart the animation
          imgEl.classList.remove('animate__animated', 'animate__zoomIn');
          // force reflow
          // eslint-disable-next-line no-unused-expressions
          imgEl.offsetWidth;
          imgEl.classList.add('animate__animated', 'animate__zoomIn');
        }
      },
      { threshold: 0.5 }   // fire when 50% of image is in view
    );

    observer.observe(imgEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div id='top' className='hero'>
      <div className='hero-content'>
        <img ref={imgRef} className="animate__animated animate__zoomIn"
          src={profile_img} width="500px" height="500px" />
        <div className="hero-desc">
          <h1>Heyo! I'm Jen
            <span>👋🏻</span>
          </h1>
          <h2>or Jenni/Jennifer :)</h2>
          <p>I'm a computer science student at <a href="https://gatech.edu">Georgia Tech</a> graduating with my Bachelors in Computer Science in Dec 2026.</p>
          <div className="hero-action">
            <AnchorLink className='anchor-link' href='#contact'><div className="hero-connect">Connect With Me!</div></AnchorLink>
            <a className="hero-resume" href="https://drive.google.com/file/d/1bceh7htFP0LEj5ZgWxlqnrv6pe7rJR_n/view?usp=drive_link" target="_blank"><div>My Resume</div></a>
          </div>
        </div>
      </div>

      <div id='about' className="scrollButton">
        <AnchorLink className='anchor-link' href='#about'><p className="scrollIcon"> ↓ </p></AnchorLink>
      </div>
    </div>
  )
}

export default Hero
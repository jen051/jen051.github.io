import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './projects.css'
import projects_data from '../../assets/projects_data.js'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';

function useResponsiveThreshold() {
  const [threshold, setThreshold] = useState(() =>
    window.matchMedia('(max-width:768px)').matches ? 0.1 : 0.2
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width:768px)');
    const handler = e => setThreshold(e.matches ? 0.1 : 0.2);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return threshold;
}

const Projects = () => {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const threshold = useResponsiveThreshold();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        root: document.querySelector('#scrollarea'),
        rootMargin: '0px',
        threshold
      }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [threshold]);
  const previewProjects = projects_data.slice(0, 6);

  return (
    <div className='projects' ref={containerRef}>
      <div className="projects-heading">
        <h1>My Projects</h1>
      </div>
      <div className="projects-content">
        {previewProjects.map((work) => (
          <Link
            key={work.idx}
            to={`/projects/${work.proj_url}`}
            className={`project-card ${inView ? 'visible' : ''}`}
            style={{ '--delay': `${work.idx * 150}ms` }}
          >{work.proj_video
            ? (
              <video
                className="project-media"
                src={work.proj_video}
                autoPlay
                loop
                muted
                playsInline
              />
            )
            : (
              <img
                src={work.proj_img}
                alt={work.proj_name}
                className="project-media"
              />
            )
            }
            <h3 className="project-title">{work.proj_name}</h3>
            <p className='project-desc'>{work.proj_summary}</p>
          </Link>
        ))}
      </div>
      <Link to={`/projects`} className='projects-btn'>Show more</Link>
      <div id="contact" className="scrollButton">
        <AnchorLink className='anchor-link' href='#contact'><p className="scrollIcon"> ↓ </p></AnchorLink>
      </div>
    </div>
  )
}

export default Projects
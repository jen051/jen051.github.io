// ProjectDetail.jsx
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './projects.css'
import projects_data from '../../assets/projects_data.js'
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-router-dom';

export default function AllProjects() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className='projects' ref={containerRef}>
      <div className="projects-heading">
        <h1>My Projects</h1>
      </div>
      <div className="projects-content">
        {projects_data.map((work) => (
          <Link
            key={work.idx}
            to={`/projects/${work.proj_name}`}
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
            <p className='project-desc'>{work.proj_desc}</p>
          </Link>
        ))}
      </div>
      <Link to="/" className='home'>← Back home</Link>
    </div>
  )
}

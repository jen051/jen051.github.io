import React from 'react'
import './projects.css'
import projects_data from '../../assets/projects_data.js'
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Projects = () => {
  return (
    <div className='projects'>
      <div className="projects-heading">
        <h1>My Projects</h1>
      </div>
      <div className="projects-content">
        {projects_data.map((work) => (
          <div key={work.idx} className="project-card">
            <a href={work.proj_link} target='_blank'><img
              src={work.proj_img}
              alt={work.proj_name}
              className="project-image"
            /></a>
            <h3 className="project-title">{work.proj_name}</h3>
            <p className='project-desc'>{work.proj_desc}</p>
            
          </div>
        ))}
      </div>
      <div id="contact" className="scrollButton">
        <AnchorLink className='anchor-link' href='#contact'><p className="scrollIcon"> ↓ </p></AnchorLink>
      </div>
    </div>
  )
}

export default Projects
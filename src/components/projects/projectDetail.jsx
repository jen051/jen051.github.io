// ProjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import projects_data from '../../assets/projects_data.js';
import './project-detail.css'; // or a separate detail CSS

export default function ProjectDetail() {
  const { projId } = useParams();
  const project = projects_data.find(p => String(p.proj_name) === projId);

  if (!project) {
    return (
      <div className="project-detail">
        <h2>Project not found</h2>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <h1>{project.proj_name}</h1>
      <img src={project.proj_img} alt={project.proj_name} />
      <p>{project.proj_desc}</p>
      {/* render any other fields in project_data as you like */}
      <Link to="/">← Back home</Link>
    </div>
  );
}

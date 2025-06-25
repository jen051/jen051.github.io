import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projects_data from '../../assets/projects_data.js';
import './project-detail.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import WordleGame from '../wordlegame/wordle.jsx';

export default function ProjectDetail() {
  const { projId } = useParams();
  const project = projects_data.find(
    p => String(p.idx) === projId || p.proj_name === projId
  );

  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (!project) return;
    const mdPath = `/proj_details/${project.proj_name}.md`;
    fetch(mdPath)
      .then(res => {
        if (!res.ok) throw new Error('Markdown fetch failed');
        return res.text();
      })
      .then(text => setMarkdown(text))
      .catch(err => console.error(err));
  }, [project]);

  if (!project) {
    return (
      <div className="project-detail">
        <h2>Project not found</h2>
        <Link to="/">← Back home</Link>
      </div>
    );
  }
  const {
    proj_name,
    proj_summary,
    proj_link,
    tech_stack,
    extra_imgs,
    extra_vids,
    component
  } = project;

  return (
    <div className="project-detail">
      <h1>{proj_name}</h1>

      <p className="project-summary">{proj_summary}</p>

      <div className="project-desc">
        {project.component === "wordle" ? (
          <div className="embedded-wordle">
            <WordleGame />
          </div>
        ) : (
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noreferrer">
                  {props.children}
                </a>
              )
            }}
          />
        )}
      </div>

      <div className="tech-stack">
        <h2>Tech Stack</h2>
        <div className="tech-tags">
          {tech_stack.map((tech, i) => (
            <span key={i} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {extra_imgs && extra_imgs.length > 0 && (
        <div className="extra-media">
          <h2>More Screenshots</h2>
          <div className="extra-imgs">
            {extra_imgs.map((src, i) => (
              <img key={i} src={src} alt={`${proj_name} extra ${i}`} />
            ))}
          </div>
        </div>
      )}

      {extra_vids && extra_vids.length > 0 && (
        <div className="extra-media">
          <h2>Demos</h2>
          <div className="extra-vids">
            {extra_vids.map((src, i) => (
              <video
                key={i}
                src={src}
                autoPlay
                loop
                muted
                playsInline
              />
            ))}
          </div>
        </div>
      )}
      <Link to="/">← Back home</Link>
    </div>
  );
}

import React from 'react';

const Projects = ({ careerPath }) => {
  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Projects</h1>
      <p className="section-subtitle animate-on-scroll">Build your portfolio with hands-on projects.</p>
      
      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Recommended Projects for {careerPath}</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="projects-grid">
          {careerPath === 'Full-Stack Developer' && [
            { title: 'Task Management App', description: 'Build a full-stack task manager with React and Node.js', difficulty: 'Intermediate', duration: '2-3 weeks', skills: ['React', 'Node.js', 'MongoDB'], status: 'Not Started' },
            { title: 'E-commerce Platform', description: 'Create a complete online store with payment integration', difficulty: 'Advanced', duration: '4-6 weeks', skills: ['React', 'Express', 'Stripe API'], status: 'In Progress' },
            { title: 'Social Media Dashboard', description: 'Build a responsive social media analytics dashboard', difficulty: 'Intermediate', duration: '2-3 weeks', skills: ['React', 'Chart.js', 'REST APIs'], status: 'Completed' },
            { title: 'Real-time Chat App', description: 'Develop a real-time messaging application', difficulty: 'Advanced', duration: '3-4 weeks', skills: ['Socket.io', 'Node.js', 'MongoDB'], status: 'Not Started' }
          ].map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h4>{project.title}</h4>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <span className="project-difficulty">{project.difficulty}</span>
                <span className="project-duration">{project.duration}</span>
              </div>
              <div className="project-skills">
                {project.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="project-actions">
                <button className="step-btn primary">
                  <i className="fas fa-play"></i> {project.status === 'Not Started' ? 'Start Project' : project.status === 'In Progress' ? 'Continue' : 'View Project'}
                </button>
                <button className="step-btn secondary">
                  <i className="fas fa-external-link-alt"></i> Details
                </button>
              </div>
            </div>
          ))}
          
          {careerPath !== 'Full-Stack Developer' && [
            { title: 'Portfolio Website', description: 'Create a professional portfolio showcasing your skills', difficulty: 'Beginner', duration: '1-2 weeks', skills: ['HTML/CSS', 'JavaScript'], status: 'Completed' },
            { title: 'Industry-Specific Project', description: `Build a ${careerPath.toLowerCase()} focused application`, difficulty: 'Intermediate', duration: '3-4 weeks', skills: ['Python', 'APIs'], status: 'In Progress' },
            { title: 'Capstone Project', description: 'Comprehensive project demonstrating all learned skills', difficulty: 'Advanced', duration: '6-8 weeks', skills: ['Multiple'], status: 'Not Started' }
          ].map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h4>{project.title}</h4>
                <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-meta">
                <span className="project-difficulty">{project.difficulty}</span>
                <span className="project-duration">{project.duration}</span>
              </div>
              <div className="project-skills">
                {project.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="project-actions">
                <button className="step-btn primary">
                  <i className="fas fa-play"></i> {project.status === 'Not Started' ? 'Start Project' : project.status === 'In Progress' ? 'Continue' : 'View Project'}
                </button>
                <button className="step-btn secondary">
                  <i className="fas fa-external-link-alt"></i> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

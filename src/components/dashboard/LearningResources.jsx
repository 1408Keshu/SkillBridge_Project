import React from 'react';

const LearningResources = ({ careerPath, resources, handleResourceClick }) => {
  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Learning Resources</h1>
      <p className="section-subtitle animate-on-scroll">Explore curated resources for {careerPath}.</p>
      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Recommended for You</h3>
        </div>
        <div className="resources-grid">
          {resources.concat([
            { icon: 'fas fa-video', type: 'Video Course', title: 'Advanced JavaScript Concepts', meta: ['6h 30m', 'Free'] },
            { icon: 'fas fa-book-open', type: 'eBook', title: 'Clean Code Principles', meta: ['350 pages', 'Free'] },
            { icon: 'fas fa-graduation-cap', type: 'Course', title: 'System Design Fundamentals', meta: ['8h', 'Premium'] },
            { icon: 'fas fa-code-branch', type: 'Tutorial', title: 'Git & GitHub Mastery', meta: ['3h 15m', 'Free'] }
          ]).map((resource, index) => (
            <div key={index} className="resource-card" onClick={() => handleResourceClick(resource)}>
              <div className="resource-image">
                <i className={resource.icon}></i>
              </div>
              <div className="resource-content">
                <div className="resource-type">{resource.type}</div>
                <h4 className="resource-title">{resource.title}</h4>
                <div className="resource-meta">
                  <span>{resource.meta[0]}</span>
                  <span style={{color: resource.meta[1] === 'Free' ? 'var(--secondary)' : 'var(--warning)'}}>{resource.meta[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningResources;

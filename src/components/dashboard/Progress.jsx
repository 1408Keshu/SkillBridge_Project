import React from 'react';

const Progress = ({ completedSteps, careerPath, roadmapSteps }) => {
  const completedCount = completedSteps ? completedSteps.size : 0;
  return (
    <div className="page active">
      <h1 className="section-title animate-on-scroll">Progress</h1>
      <p className="section-subtitle animate-on-scroll">Track your learning journey and achievements.</p>
      
      <div className="widget-grid">
        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Learning Statistics</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{completedCount}</div>
              <div className="stat-label">Skills Mastered</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{completedCount * 8}h</div>
              <div className="stat-label">Time Invested</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Math.min(completedCount, 3)}</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{Math.min(completedCount * 2, 15)}</div>
              <div className="stat-label">Certificates Earned</div>
            </div>
          </div>
        </div>

        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Skill Progress</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="skill-progress-list">
            {roadmapSteps.slice(0, 5).map((skill, index) => (
              <div key={skill.name} className="skill-progress-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">Advanced</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${85 + (index * 3)}%` }}></div>
                </div>
                <span className="progress-percentage">{85 + (index * 3)}%</span>
              </div>
            ))}
            {roadmapSteps.length === 0 && (
              <p>Complete your profile to see skill progress tracking.</p>
            )}
          </div>
        </div>
      </div>

      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Learning Timeline</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker completed"></div>
            <div className="timeline-content">
              <h4>Started {careerPath} Path</h4>
              <p>Began your journey towards becoming a {careerPath}</p>
              <span className="timeline-date">2 weeks ago</span>
            </div>
          </div>
          {roadmapSteps.map((skill, index) => (
            <div key={skill.name} className="timeline-item">
              <div className="timeline-marker completed"></div>
              <div className="timeline-content">
                <h4>Completed {skill.name}</h4>
                <p>Successfully mastered {skill.name} fundamentals</p>
                <span className="timeline-date">{index + 1} week{index === 0 ? '' : 's'} ago</span>
              </div>
            </div>
          ))}
          <div className="timeline-item">
            <div className="timeline-marker current"></div>
            <div className="timeline-content">
              <h4>Currently Learning</h4>
              <p>{roadmapSteps.length > 0 ? roadmapSteps[0]?.name : 'Set up your roadmap'}</p>
              <span className="timeline-date">Now</span>
            </div>
          </div>
        </div>
      </div>

      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Achievements</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="achievements-grid">
          <div className={`achievement-badge ${completedCount >= 1 ? 'earned' : 'locked'}`}>
            <i className="fas fa-star"></i>
            <h4>First Steps</h4>
            <p>Complete your first skill</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 3 ? 'earned' : 'locked'}`}>
            <i className="fas fa-rocket"></i>
            <h4>On Fire</h4>
            <p>Master 3 skills</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 5 ? 'earned' : 'locked'}`}>
            <i className="fas fa-trophy"></i>
            <h4>Skill Collector</h4>
            <p>Learn 5 different skills</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 10 ? 'earned' : 'locked'}`}>
            <i className="fas fa-crown"></i>
            <h4>Expert</h4>
            <p>Become proficient in 10 skills</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

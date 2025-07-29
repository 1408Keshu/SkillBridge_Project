import React, { useState, useEffect } from 'react';

// Mock API function - replace with your actual Gemini API endpoint
const fetchSkillsFromAPI = async (careerPath, apiKey) => {
  // TODO: Replace this with your actual Gemini API endpoint
  // Example implementation:
  // const response = await fetch('https://your-gemini-api-endpoint.com/skills', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`
  //   },
  //   body: JSON.stringify({ careerPath })
  // });
  // return await response.json();
  
  // Mock response for demonstration - replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSkills = [
        { name: 'JavaScript', level: 'Intermediate', progress: 75 },
        { name: 'React', level: 'Advanced', progress: 90 },
        { name: 'Node.js', level: 'Beginner', progress: 45 },
        { name: 'Python', level: 'Intermediate', progress: 60 },
        { name: 'Database Design', level: 'Beginner', progress: 30 }
      ];
      resolve({ skills: mockSkills });
    }, 1000); // Simulate API delay
  });
};

// Simplified timeline generation - just week number and description
const generateTimelineFromGeneratedRoadmap = (generatedRoadmapSteps, completedSteps) => {
  if (!generatedRoadmapSteps || generatedRoadmapSteps.length === 0) {
    return [];
  }

  return generatedRoadmapSteps.map((step, index) => {
    const isCompleted = completedSteps && completedSteps.has(step.name);
    const isCurrent = !isCompleted && index === 0;
    
    // Create a simple description from main focus topics
    let simpleDescription = '';
    if (step.mainFocusTopics && step.mainFocusTopics.length > 0) {
      simpleDescription = step.mainFocusTopics.slice(0, 2).join(', ');
      if (step.mainFocusTopics.length > 2) {
        simpleDescription += ' and more';
      }
    } else {
      simpleDescription = 'Learning objectives for this week';
    }
    
    return {
      id: step.name,
      title: `Week ${index + 1}`,
      description: simpleDescription,
      completed: isCompleted,
      current: isCurrent,
      progress: isCompleted ? 100 : isCurrent ? 50 : 0
    };
  });
};

// Enhanced Skill Progress with dynamic updates
const Progress = ({ completedSteps, setCompletedSteps, careerPath, roadmapSteps, timelineEvents = [] }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState(new Set());
  const [timelineData, setTimelineData] = useState([]);
  const [generatedRoadmapSteps, setGeneratedRoadmapSteps] = useState([]);
  
  const completedCount = completedSteps ? completedSteps.size : 0;

  // Function to trigger animation for a skill
  const triggerAnimation = (skillName) => {
    setAnimatedSkills(prev => new Set([...prev, skillName]));
  };

  // Handle marking a step as completed
  const handleStepComplete = (stepId) => {
    if (setCompletedSteps) {
      setCompletedSteps(prev => new Set([...prev, stepId]));
    }
  };

  // Load generated roadmap from localStorage
  useEffect(() => {
    const savedRoadmap = localStorage.getItem('roadmapSteps');
    if (savedRoadmap) {
      try {
        const parsed = JSON.parse(savedRoadmap);
        if (Array.isArray(parsed)) {
          setGeneratedRoadmapSteps(parsed);
        }
      } catch (error) {
        console.error('Error loading generated roadmap:', error);
      }
    }
  }, []);

  // Generate dynamic skills from completed roadmap steps
  const generateDynamicSkills = (roadmapSteps, completedSteps) => {
    if (!roadmapSteps || roadmapSteps.length === 0) {
      return [];
    }

    // Create skills based on completed weeks and their topics
    const dynamicSkills = [];
    
    roadmapSteps.forEach((step, index) => {
      const isCompleted = completedSteps.has(step.name);
      const progress = isCompleted ? 100 : (index === 0 && !isCompleted) ? 50 : 0;
      
      // Add main topics as individual skills
      if (step.mainFocusTopics && step.mainFocusTopics.length > 0) {
        step.mainFocusTopics.forEach((topic, topicIndex) => {
          const skillName = `${topic} (Week ${index + 1})`;
          const skillProgress = isCompleted ? 100 : (index === 0 && !isCompleted) ? 50 : 0;
          
          dynamicSkills.push({
            name: skillName,
            level: 'Learning',
            progress: skillProgress,
            week: index + 1,
            completed: isCompleted
          });
        });
      } else {
        // Fallback if no topics defined
        dynamicSkills.push({
          name: `Week ${index + 1} Skills`,
          level: 'Learning',
          progress: progress,
          week: index + 1,
          completed: isCompleted
        });
      }
    });

    return dynamicSkills.slice(0, 5); // Show top 5 skills
  };

  // Update skills when roadmap or completion status changes
  useEffect(() => {
    const dynamicSkills = generateDynamicSkills(generatedRoadmapSteps, completedSteps);
    setSkills(dynamicSkills);
  }, [generatedRoadmapSteps, completedSteps]);

  // Generate timeline from generated roadmap
  useEffect(() => {
    const timeline = generateTimelineFromGeneratedRoadmap(generatedRoadmapSteps, completedSteps);
    setTimelineData(timeline);
  }, [generatedRoadmapSteps, completedSteps]);

  // Trigger animations when skills update
  useEffect(() => {
    if (skills.length > 0) {
      const timer = setTimeout(() => {
        skills.forEach(skill => {
          triggerAnimation(skill.name);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [skills]);

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
              <div className="stat-label">Weeks Completed</div>
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
              <div className="stat-label">Skills Learned</div>
            </div>
          </div>
        </div>

        <div className="widget animate-on-scroll">
          <div className="widget-header">
            <h3 className="widget-title">Skill Progress</h3>
            <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
          </div>
          <div className="skill-progress-list">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={skill.name} className="skill-progress-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${animatedSkills.has(skill.name) ? 'animated' : ''}`}
                      style={{ 
                        width: `${skill.progress}%`,
                        '--target-width': `${skill.progress}%`
                      }}
                      onAnimationEnd={() => triggerAnimation(skill.name)}
                    ></div>
                  </div>
                  <span className="progress-percentage">{skill.progress}%</span>
                </div>
              ))
            ) : (
              <p>Generate a roadmap to see skill progress tracking.</p>
            )}
          </div>
        </div>
      </div>

      {/* Simplified Timeline */}
      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Learning Timeline</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="timeline">
          {timelineData && timelineData.length > 0 ? (
            timelineData.map((event, idx) => (
              <div key={event.id} className="timeline-item">
                <div className={`timeline-marker ${event.completed ? 'completed' : event.current ? 'current' : ''}`}>
                  {event.completed && <i className="fas fa-check"></i>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{event.title}: {event.description}</h4>
                    <span className="timeline-percentage">{event.progress}%</span>
                  </div>
                  <div className="timeline-actions">
                    {event.completed ? (
                      <button className="step-btn completed" disabled>
                        <i className="fas fa-check-circle"></i> Completed
                      </button>
                    ) : event.current ? (
                      <button 
                        className="step-btn primary"
                        onClick={() => handleStepComplete(event.id)}
                      >
                        <i className="fas fa-check"></i> Mark Complete
                      </button>
                    ) : (
                      <button className="step-btn secondary" disabled>
                        <i className="fas fa-lock"></i> Complete previous weeks first
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="timeline-item">
              <div className="timeline-marker current"></div>
              <div className="timeline-content">
                <h4>No Generated Roadmap Available</h4>
                <p>Generate a roadmap from the Roadmap page to see your learning timeline.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Achievements section remains the same */}
      <div className="widget animate-on-scroll">
        <div className="widget-header">
          <h3 className="widget-title">Achievements</h3>
          <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
        </div>
        <div className="achievements-grid">
          <div className={`achievement-badge ${completedCount >= 1 ? 'earned' : 'locked'}`}>
            <i className="fas fa-star"></i>
            <h4>First Week</h4>
            <p>Complete your first week</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 3 ? 'earned' : 'locked'}`}>
            <i className="fas fa-rocket"></i>
            <h4>On Track</h4>
            <p>Complete 3 weeks</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 5 ? 'earned' : 'locked'}`}>
            <i className="fas fa-trophy"></i>
            <h4>Halfway There</h4>
            <p>Complete 5 weeks</p>
          </div>
          <div className={`achievement-badge ${completedCount >= 10 ? 'earned' : 'locked'}`}>
            <i className="fas fa-crown"></i>
            <h4>Roadmap Master</h4>
            <p>Complete 10 weeks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;

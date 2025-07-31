import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';

const Dashboard = () => {
  const { token, userEmail, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [careerPath, setCareerPath] = useState('Full-Stack Developer');
  const [userName, setUserName] = useState('John Doe');
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [resources, setResources] = useState([]);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { text: "Hi! I'm your AI career assistant. How can I help you with your tech career journey today?", isUser: false }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [showInterviewAnswer, setShowInterviewAnswer] = useState(false);

  // Skill and Career Path Data
  const skills2025 = [
    { name: 'HTML & CSS', description: 'Master semantic HTML, CSS layouts, and responsive design', duration: '3 months', priority: 'High', careerPaths: ['Full-Stack Developer', 'UI/UX Designer'] },
    { name: 'JavaScript & DOM', description: 'Learn ES6+, asynchronous JavaScript, and DOM interactions', duration: '4 months', priority: 'High', careerPaths: ['Full-Stack Developer'] },
    { name: 'React', description: 'Build dynamic UIs with React components and hooks', duration: '4 months', priority: 'High', careerPaths: ['Full-Stack Developer'] },
    { name: 'Node.js', description: 'Learn server-side development with Node.js and Express', duration: '4 months', priority: 'High', careerPaths: ['Full-Stack Developer'] },
    { name: 'Database Management', description: 'Work with SQL/NoSQL databases like MongoDB and PostgreSQL', duration: '4 months', priority: 'High', careerPaths: ['Full-Stack Developer', 'Data Scientist'] },
    { name: 'Python', description: 'Master Python for scripting, automation, and data analysis', duration: '4 months', priority: 'High', careerPaths: ['Data Scientist', 'AI Engineer'] },
    { name: 'Machine Learning', description: 'Learn supervised and unsupervised learning with Scikit-learn', duration: '5 months', priority: 'High', careerPaths: ['Data Scientist', 'AI Engineer'] },
    { name: 'Deep Learning', description: 'Explore neural networks with TensorFlow and PyTorch', duration: '5 months', priority: 'Medium', careerPaths: ['AI Engineer'] },
    { name: 'Data Visualization', description: 'Create visualizations with Tableau and Power BI', duration: '3 months', priority: 'Medium', careerPaths: ['Data Scientist'] },
    { name: 'Cloud Computing', description: 'Gain expertise in AWS, Azure, or GCP', duration: '5 months', priority: 'Medium', careerPaths: ['DevOps Engineer', 'AI Engineer'] },
    { name: 'Cybersecurity', description: 'Understand threat detection and response', duration: '4 months', priority: 'Medium', careerPaths: ['Cybersecurity Specialist'] },
    { name: 'Blockchain', description: 'Learn smart contracts and decentralized apps', duration: '4 months', priority: 'Medium', careerPaths: ['Blockchain Developer'] },
    { name: 'Figma', description: 'Master Figma for UI/UX design', duration: '3 months', priority: 'High', careerPaths: ['UI/UX Designer'] },
    { name: 'Docker', description: 'Learn containerization with Docker', duration: '3 months', priority: 'High', careerPaths: ['DevOps Engineer'] },
    { name: 'Kubernetes', description: 'Orchestrate containers with Kubernetes', duration: '4 months', priority: 'Medium', careerPaths: ['DevOps Engineer'] }
  ];

  const careerResources = {
    'Full-Stack Developer': [
      { icon: 'fas fa-database', type: 'Video Course', title: 'MongoDB for Beginners', meta: ['4h 10m', 'Free'] },
      { icon: 'fas fa-book', type: 'Documentation', title: 'Node.js Official Docs', meta: ['Reading', 'Free'] },
      { icon: 'fas fa-laptop-code', type: 'Tutorial', title: 'Build a REST API with Express', meta: ['2h 30m', 'Free'] },
      { icon: 'fas fa-code', type: 'Practice', title: 'React Coding Challenges', meta: ['20 Problems', 'Free'] }
    ],
    'Data Scientist': [
      { icon: 'fas fa-chart-line', type: 'Video Course', title: 'Python for Data Science', meta: ['5h', 'Free'] },
      { icon: 'fas fa-calculator', type: 'Tutorial', title: 'Statistics & Probability', meta: ['3h 45m', 'Free'] },
      { icon: 'fas fa-brain', type: 'Course', title: 'Machine Learning Basics', meta: ['8h', 'Premium'] },
      { icon: 'fas fa-table', type: 'Practice', title: 'Pandas Exercises', meta: ['15 Problems', 'Free'] }
    ],
    'UI/UX Designer': [
      { icon: 'fas fa-palette', type: 'Course', title: 'Design Principles', meta: ['4h', 'Free'] },
      { icon: 'fas fa-mobile-alt', type: 'Tutorial', title: 'Mobile UI Design', meta: ['3h', 'Free'] },
      { icon: 'fas fa-users', type: 'Course', title: 'User Research Methods', meta: ['6h', 'Premium'] },
      { icon: 'fas fa-pencil-ruler', type: 'Tool', title: 'Figma Advanced Techniques', meta: ['2h 30m', 'Free'] }
    ],
    'DevOps Engineer': [
      { icon: 'fas fa-cloud', type: 'Course', title: 'AWS Fundamentals', meta: ['6h', 'Free'] },
      { icon: 'fas fa-docker', type: 'Tutorial', title: 'Docker Essentials', meta: ['4h', 'Free'] },
      { icon: 'fas fa-cogs', type: 'Course', title: 'CI/CD with Jenkins', meta: ['5h', 'Premium'] },
      { icon: 'fas fa-server', type: 'Practice', title: 'Kubernetes Labs', meta: ['10 Labs', 'Free'] }
    ],
    'AI Engineer': [
      { icon: 'fas fa-robot', type: 'Course', title: 'Deep Learning with PyTorch', meta: ['8h', 'Premium'] },
      { icon: 'fas fa-brain', type: 'Tutorial', title: 'Neural Networks from Scratch', meta: ['6h', 'Free'] },
      { icon: 'fas fa-language', type: 'Course', title: 'Natural Language Processing', meta: ['7h', 'Premium'] },
      { icon: 'fas fa-eye', type: 'Practice', title: 'Computer Vision Projects', meta: ['5 Projects', 'Free'] }
    ],
    'Cybersecurity Specialist': [
      { icon: 'fas fa-shield-alt', type: 'Course', title: 'Ethical Hacking Basics', meta: ['5h', 'Free'] },
      { icon: 'fas fa-bug', type: 'Tutorial', title: 'Penetration Testing', meta: ['4h', 'Premium'] },
      { icon: 'fas fa-lock', type: 'Course', title: 'Network Security', meta: ['6h', 'Premium'] },
      { icon: 'fas fa-search', type: 'Practice', title: 'Vulnerability Assessment', meta: ['8 Labs', 'Free'] }
    ],
    'Blockchain Developer': [
      { icon: 'fas fa-link', type: 'Video Course', title: 'Blockchain Basics', meta: ['3h 30m', 'Free'] },
      { icon: 'fas fa-book', type: 'Documentation', title: 'Solidity Official Docs', meta: ['Reading', 'Free'] },
      { icon: 'fas fa-laptop-code', type: 'Tutorial', title: 'Build a Smart Contract', meta: ['2h', 'Free'] },
      { icon: 'fas fa-code', type: 'Practice', title: 'Blockchain Coding Challenges', meta: ['10 Problems', 'Free'] }
    ]
  };

  const careerWeeklyGoals = {
    'Full-Stack Developer': 'Complete Node.js basics and build a REST API.',
    'Data Scientist': 'Create a data visualization dashboard with Tableau.',
    'UI/UX Designer': 'Design a mobile app prototype in Figma.',
    'DevOps Engineer': 'Set up a basic AWS EC2 instance.',
    'AI Engineer': 'Build a simple neural network with PyTorch.',
    'Cybersecurity Specialist': 'Complete a penetration testing lab.',
    'Blockchain Developer': 'Write a basic smart contract in Solidity.'
  };

  const interviewQuestions = {
    'Full-Stack Developer': {
      question: 'What is the difference between SQL and NoSQL databases?',
      answer: 'SQL databases are relational, use structured schemas, and support SQL for querying, ideal for structured data. NoSQL databases are non-relational, flexible with dynamic schemas, and better for unstructured or semi-structured data.'
    },
    'Data Scientist': {
      question: 'What is the difference between supervised and unsupervised learning?',
      answer: 'Supervised learning uses labeled data to predict outcomes, while unsupervised learning finds patterns in unlabeled data.'
    },
    'UI/UX Designer': {
      question: 'What are the key principles of user-centered design?',
      answer: 'User-centered design focuses on understanding user needs, iterative testing, and creating intuitive, accessible interfaces.'
    },
    'DevOps Engineer': {
      question: 'What is the difference between Docker and Kubernetes?',
      answer: 'Docker is a platform for containerizing applications, while Kubernetes is an orchestration tool for managing containers at scale.'
    },
    'AI Engineer': {
      question: 'What is the role of activation functions in neural networks?',
      answer: 'Activation functions introduce non-linearity to neural networks, enabling them to model complex patterns.'
    },
    'Cybersecurity Specialist': {
      question: 'What is a zero-day vulnerability?',
      answer: 'A zero-day vulnerability is a software flaw unknown to the vendor, exploited by attackers before a patch is available.'
    },
    'Blockchain Developer': {
      question: 'What is a smart contract?',
      answer: 'A smart contract is a self-executing contract with terms written in code, running on a blockchain.'
    }
  };

  // Initialize from localStorage and setup animations
  useEffect(() => {
    if (!token) {
      setRoadmapSteps([]);
      setCompletedSteps(new Set());
      setUserSkills([]);
      setUserName('John Doe');
      setCareerPath('Full-Stack Developer');
      setResources([]);
      // ...reset any other user-specific state if needed
      return;
    }
    // Fetch roadmap and progress from backend
    const fetchData = async () => {
      try {
        // Fetch roadmap
        const roadmapRes = await fetch('http://localhost:5000/api/roadmap', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const roadmapData = await roadmapRes.json();
        if (roadmapData.roadmap && Array.isArray(roadmapData.roadmap.steps)) {
          setRoadmapSteps(roadmapData.roadmap.steps);
        }
        // Fetch progress
        const progressRes = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const progressData = await progressRes.json();
        if (progressData.progress && Array.isArray(progressData.progress.completedSteps)) {
          setCompletedSteps(new Set(progressData.progress.completedSteps));
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchData();

    // Initialize scroll animations
    const initializeAnimations = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, observerOptions);

      setTimeout(() => {
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => observer.observe(el));
      }, 100);

      return observer;
    };

    const observer = initializeAnimations();
    return () => observer?.disconnect();
  }, [token]);

  // Re-trigger animations when switching between pages
  useEffect(() => {
    // Show content immediately, then add animations
    const activePageElements = document.querySelectorAll('.page.active .animate-on-scroll');
    activePageElements.forEach(el => {
      el.classList.add('is-visible');
    });
    
    // Small delay to ensure smooth transitions
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.page.active .animate-on-scroll');
      animateElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 100}ms`;
        el.classList.remove('is-visible');
        el.offsetHeight; // Force reflow
        el.classList.add('is-visible');
      });
    }, 100);
  }, [currentPage]);

  // Generate roadmap based on career path
  const generateRoadmap = (career, skills) => {
    const userSkillsLower = skills.map(s => s.toLowerCase());
    const recommendedSkills = skills2025.filter(skill => 
      (skill.careerPaths.includes(career) || skill.careerPaths.includes('All')) &&
      !userSkillsLower.includes(skill.name.toLowerCase())
    ).sort((a, b) => {
      const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    setRoadmapSteps(recommendedSkills);
    setResources(careerResources[career] || []);
  };

  const progressPercentage = userSkills.length === 0 ? 0 : Math.round((completedSteps.size / Math.max(roadmapSteps.length, 1)) * 100);

  const handleStepComplete = (skillName) => {
    setCompletedSteps(prev => new Set([...prev, skillName]));
    setUserSkills(prev => [...prev, skillName]);
  };

  const handleRefreshRoadmap = () => {
    generateRoadmap(careerPath, userSkills);
  };

  const resetDashboard = () => {
    localStorage.clear();
    setUserName('John Doe');
    setCareerPath('Full-Stack Developer');
    setUserSkills([]);
    setCompletedSteps(new Set());
    generateRoadmap('Full-Stack Developer', []);
  };

  const handleLogout = () => {
    logout();
  };

  const handleResourceClick = (resource) => {
    alert(`Opening ${resource.title}... (This is a demo)`);
  };

  const updateProfile = (name, skills, path) => {
    setUserName(name);
    setUserSkills(skills);
    setCareerPath(path);
    localStorage.setItem('userName', name);
    localStorage.setItem('userSkills', JSON.stringify(skills));
    localStorage.setItem('careerPath', path);
    generateRoadmap(path, skills);
    setShowProfileModal(false);
  };

  const handleSaveProfile = () => {
    const name = document.getElementById('modalNameInput')?.value || userName;
    const skillsText = document.getElementById('modalSkillsInput')?.value || '';
    const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
    const path = document.getElementById('modalCareerPath')?.value || careerPath;
    updateProfile(name, skills, path);
  };

  const sendAiMessage = () => {
    if (aiInput.trim()) {
      setAiMessages(prev => [...prev, { text: aiInput, isUser: true }]);
      const responses = [
        "I can help with that! Here are some resources you might find useful...",
        "Try focusing on your current roadmap step. I can suggest tutorials or exercises!",
        "Great question! Let me analyze your progress and provide a tailored recommendation.",
        "Need help with a specific topic? I can provide explanations or practice problems."
      ];
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setAiMessages(prev => [...prev, { text: randomResponse, isUser: false }]);
      }, 1000);
      setAiInput('');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal active" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <label htmlFor="modalNameInput">Name</label>
              <input type="text" id="modalNameInput" maxLength="20" defaultValue={userName} />
              <label htmlFor="modalSkillsInput">Current Skills (comma-separated)</label>
              <textarea id="modalSkillsInput" rows="3" placeholder="e.g., HTML, CSS, JavaScript" defaultValue={userSkills.join(', ')} />
              <label htmlFor="modalCareerPath">Career Path</label>
              <select id="modalCareerPath" defaultValue={careerPath}>
                <option value="Full-Stack Developer">Full-Stack Developer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Cybersecurity Specialist">Cybersecurity Specialist</option>
                <option value="Blockchain Developer">Blockchain Developer</option>
              </select>
              <button onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => window.location.href = '/'}>SkillBridge</div>
        </div>
        <div className="user-profile" onClick={() => setShowProfileModal(true)}>
          <div className="user-avatar">
            {userName.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="user-info">
            <h4>{userName}</h4>
            <p>{careerPath} Path</p>
          </div>
        </div>
        <nav className="nav-menu">
          <a href="#" className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('dashboard'); }}>
            <i className="fas fa-home"></i><span>Dashboard</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'roadmap' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('roadmap'); }}>
            <i className="fas fa-road"></i><span>My Roadmap</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'resources' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('resources'); }}>
            <i className="fas fa-book"></i><span>Learning Resources</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'projects' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('projects'); }}>
            <i className="fas fa-project-diagram"></i><span>Projects</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'progress' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('progress'); }}>
            <i className="fas fa-chart-line"></i><span>Progress</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'interview' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('interview'); }}>
            <i className="fas fa-comments"></i><span>Interview Prep</span>
          </a>
          <a href="#" className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('settings'); }}>
            <i className="fas fa-cog"></i><span>Settings</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            <i className="fas fa-sign-out-alt"></i><span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Dashboard Page */}
        {currentPage === 'dashboard' && (
          <div className="page active">
            <header className="dashboard-header">
              <div className="dashboard-title animate-on-scroll">
                <h1>Welcome Back, {userName}!</h1>
                <p>Here's your personalized learning dashboard</p>
              </div>
              <div className="header-actions">
                <button 
                  onClick={toggleTheme} 
                  className="theme-toggle"
                  aria-label="Toggle theme"
                >
                  <i className="fas fa-sun"></i>
                  <i className="fas fa-moon"></i>
                </button>
                <button className="step-btn secondary" onClick={resetDashboard}>
                  <i className="fas fa-refresh"></i> Reset Demo
                </button>
                <button className="step-btn secondary" onClick={handleRefreshRoadmap}>
                  <i className="fas fa-sync-alt"></i> Refresh Roadmap
                </button>
                <button className="step-btn primary" onClick={() => alert('Exporting PDF... (This is a demo)')}>
                  <i className="fas fa-download"></i> Export PDF
                </button>
              </div>
            </header>

            <div className="widget-grid">
              <div className="widget progress-widget animate-on-scroll">
                <div className="widget-header">
                  <h3 className="widget-title">Your Progress</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="progress-stats">
                  <div className="progress-stat"><span>{progressPercentage}%</span><br/><span>Completed</span></div>
                  <div className="progress-stat"><span>{userSkills.length}</span><br/><span>Skills Learned</span></div>
                  <div className="progress-stat"><span>{Math.min(userSkills.length, 3)}</span><br/><span>Projects Done</span></div>
                </div>
              </div>

              <div className="widget animate-on-scroll" style={{transitionDelay: '100ms'}}>
                <div className="widget-header">
                  <h3 className="widget-title">Weekly Goal</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <p>{careerWeeklyGoals[careerPath] || 'Set your career path to generate a weekly goal.'}</p>
                <div className="progress-bar" style={{marginTop: '15px'}}>
                  <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
                </div>
              </div>

              <div className="widget animate-on-scroll" style={{transitionDelay: '200ms'}}>
                <div className="widget-header">
                  <h3 className="widget-title">Time Investment</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <p>You've spent {userSkills.length * 8} hours learning this month. Target: 50 hours.</p>
                <div className="progress-bar" style={{marginTop: '15px'}}>
                  <div className="progress-fill" style={{ width: `${Math.min((userSkills.length * 8 / 50) * 100, 100)}%`, background: 'var(--secondary)' }}></div>
                </div>
              </div>
            </div>

            <div className="widget roadmap-widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">Your AI-Powered Roadmap</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="roadmap-steps">
                {roadmapSteps.length > 0 ? roadmapSteps.slice(0, 4).map((skill, index) => (
                  <div key={skill.name} className="roadmap-step">
                    <div className="step-indicator">
                      <div className={`step-dot ${completedSteps.has(skill.name) ? 'completed' : index === 0 ? 'current' : ''}`}>
                        {completedSteps.has(skill.name) ? <i className="fas fa-check"></i> : index + 1}
                      </div>
                      {index < 3 && <div className={`step-connector ${completedSteps.has(skill.name) ? 'completed' : ''}`}></div>}
                    </div>
                    <div className="step-content">
                      <h4 className="step-title">{skill.name}</h4>
                      <p className="step-description">{skill.description}</p>
                      <div className="step-actions">
                        {completedSteps.has(skill.name) ? (
                          <button className="step-btn completed" disabled>
                            <i className="fas fa-check-circle"></i> Completed
                          </button>
                        ) : index === 0 || completedSteps.has(roadmapSteps[index - 1]?.name) ? (
                          <>
                            <button className="step-btn primary">
                              <i className="fas fa-play"></i> Start Learning
                            </button>
                            <button className="step-btn secondary" onClick={() => handleStepComplete(skill.name)}>
                              <i className="fas fa-check"></i> Mark Complete
                            </button>
                          </>
                        ) : (
                          <button className="step-btn secondary" disabled>
                            <i className="fas fa-lock"></i> Locked
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="roadmap-step">
                    <div className="step-indicator">
                      <div className="step-dot current">1</div>
                    </div>
                    <div className="step-content">
                      <h4 className="step-title">Set Up Your Profile</h4>
                      <p className="step-description">Complete your profile to generate a personalized learning roadmap tailored to your career goals.</p>
                      <div className="step-actions">
                        <button className="step-btn primary" onClick={() => setShowProfileModal(true)}>
                          <i className="fas fa-user-edit"></i> Complete Profile
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Resources Section */}
            <div className="widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">Recommended Resources</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="resources-grid">
                {resources.slice(0, 4).map((resource, index) => (
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

            {/* Daily Interview Question Section */}
            <div className="widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">Daily Interview Question</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="interview-card">
                <div className="interview-question">{interviewQuestions[careerPath]?.question}</div>
                {showInterviewAnswer && (
                  <div className="interview-answer">
                    <p>{interviewQuestions[careerPath]?.answer}</p>
                  </div>
                )}
                <div className="interview-actions">
                  <button className="step-btn secondary" onClick={() => setShowInterviewAnswer(!showInterviewAnswer)}>
                    <i className={`fas ${showInterviewAnswer ? 'fa-eye-slash' : 'fa-eye'}`}></i> {showInterviewAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button className="step-btn primary">
                    <i className="fas fa-thumbs-up"></i> Got It
                  </button>
                  <button className="step-btn secondary">
                    <i className="fas fa-thumbs-down"></i> Need Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Roadmap Page */}
        {currentPage === 'roadmap' && (
          <div className="page active">
            <h1 className="section-title animate-on-scroll">My Roadmap</h1>
            <p className="section-subtitle animate-on-scroll">Your complete AI-powered career roadmap.</p>
            <div className="widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">{careerPath} Learning Path</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="roadmap-steps">
                {roadmapSteps.map((skill, index) => (
                  <div key={skill.name} className="roadmap-step">
                    <div className="step-indicator">
                      <div className={`step-dot ${completedSteps.has(skill.name) ? 'completed' : index === 0 ? 'current' : ''}`}>
                        {completedSteps.has(skill.name) ? <i className="fas fa-check"></i> : index + 1}
                      </div>
                      {index < roadmapSteps.length - 1 && <div className={`step-connector ${completedSteps.has(skill.name) ? 'completed' : ''}`}></div>}
                    </div>
                    <div className="step-content">
                      <h4 className="step-title">{skill.name} <span style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}> - {skill.duration}</span></h4>
                      <p className="step-description">{skill.description}</p>
                      <div className="step-actions">
                        {completedSteps.has(skill.name) ? (
                          <button className="step-btn completed" disabled>
                            <i className="fas fa-check-circle"></i> Completed
                          </button>
                        ) : index === 0 || completedSteps.has(roadmapSteps[index - 1]?.name) ? (
                          <>
                            <button className="step-btn primary">
                              <i className="fas fa-play"></i> Start Learning
                            </button>
                            <button className="step-btn secondary" onClick={() => handleStepComplete(skill.name)}>
                              <i className="fas fa-check"></i> Mark Complete
                            </button>
                          </>
                        ) : (
                          <button className="step-btn secondary" disabled>
                            <i className="fas fa-lock"></i> Complete previous step first
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Learning Resources Page */}
        {currentPage === 'resources' && (
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
        )}

        {/* Projects Page */}
        {currentPage === 'projects' && (
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
        )}

        {/* Progress Page */}
        {currentPage === 'progress' && (
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
                    <div className="stat-value">{userSkills.length}</div>
                    <div className="stat-label">Skills Mastered</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{userSkills.length * 8}h</div>
                    <div className="stat-label">Time Invested</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{Math.min(userSkills.length, 3)}</div>
                    <div className="stat-label">Projects Completed</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{Math.min(userSkills.length * 2, 15)}</div>
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
                  {userSkills.slice(0, 5).map((skill, index) => (
                    <div key={skill} className="skill-progress-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill}</span>
                        <span className="skill-level">Advanced</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${85 + (index * 3)}%` }}></div>
                      </div>
                      <span className="progress-percentage">{85 + (index * 3)}%</span>
                    </div>
                  ))}
                  {userSkills.length === 0 && (
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
                {userSkills.map((skill, index) => (
                  <div key={skill} className="timeline-item">
                    <div className="timeline-marker completed"></div>
                    <div className="timeline-content">
                      <h4>Completed {skill}</h4>
                      <p>Successfully mastered {skill} fundamentals</p>
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
                <div className={`achievement-badge ${userSkills.length >= 1 ? 'earned' : 'locked'}`}>
                  <i className="fas fa-star"></i>
                  <h4>First Steps</h4>
                  <p>Complete your first skill</p>
                </div>
                <div className={`achievement-badge ${userSkills.length >= 3 ? 'earned' : 'locked'}`}>
                  <i className="fas fa-rocket"></i>
                  <h4>On Fire</h4>
                  <p>Master 3 skills</p>
                </div>
                <div className={`achievement-badge ${userSkills.length >= 5 ? 'earned' : 'locked'}`}>
                  <i className="fas fa-trophy"></i>
                  <h4>Skill Collector</h4>
                  <p>Learn 5 different skills</p>
                </div>
                <div className={`achievement-badge ${userSkills.length >= 10 ? 'earned' : 'locked'}`}>
                  <i className="fas fa-crown"></i>
                  <h4>Expert</h4>
                  <p>Become proficient in 10 skills</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interview Prep Page */}
        {currentPage === 'interview' && (
          <div className="page active">
            <h1 className="section-title animate-on-scroll">Interview Prep</h1>
            <p className="section-subtitle animate-on-scroll">Prepare for your next interview.</p>
            <div className="widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">Practice Question for {careerPath}</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="interview-card">
                <div className="interview-question">{interviewQuestions[careerPath]?.question}</div>
                {showInterviewAnswer && (
                  <div className="interview-answer">
                    <p>{interviewQuestions[careerPath]?.answer}</p>
                  </div>
                )}
                <div className="interview-actions">
                  <button className="step-btn secondary" onClick={() => setShowInterviewAnswer(!showInterviewAnswer)}>
                    <i className={`fas ${showInterviewAnswer ? 'fa-eye-slash' : 'fa-eye'}`}></i> {showInterviewAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
                  <button className="step-btn primary">
                    <i className="fas fa-thumbs-up"></i> Got It
                  </button>
                  <button className="step-btn secondary">
                    <i className="fas fa-thumbs-down"></i> Need Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Page */}
        {currentPage === 'settings' && (
          <div className="page active">
            <h1 className="section-title animate-on-scroll">Settings</h1>
            <p className="section-subtitle animate-on-scroll">Manage your account and preferences.</p>
            
            <div className="widget-grid">
              <div className="widget animate-on-scroll">
                <div className="widget-header">
                  <h3 className="widget-title">Profile Settings</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <form className="settings-form" onSubmit={(e) => { e.preventDefault(); alert('Profile updated! (This is a demo)'); }}>
                  <div className="form-group">
                    <label htmlFor="settingsNameInput">Full Name</label>
                    <input type="text" id="settingsNameInput" maxLength="50" defaultValue={userName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="settingsEmailInput">Email Address</label>
                    <input type="email" id="settingsEmailInput" defaultValue={userEmail} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="settingsPhoneInput">Phone Number</label>
                    <input type="tel" id="settingsPhoneInput" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="settingsBioInput">Bio</label>
                    <textarea id="settingsBioInput" rows="3" placeholder="Tell us about yourself..." defaultValue={`Aspiring ${careerPath} passionate about technology and continuous learning.`}></textarea>
                  </div>
                  <button type="submit" className="step-btn primary">Update Profile</button>
                </form>
              </div>

              <div className="widget animate-on-scroll">
                <div className="widget-header">
                  <h3 className="widget-title">Account Security</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <form className="settings-form" onSubmit={(e) => { e.preventDefault(); alert('Password updated! (This is a demo)'); }}>
                  <div className="form-group">
                    <label htmlFor="currentPasswordInput">Current Password</label>
                    <input type="password" id="currentPasswordInput" placeholder="Enter current password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPasswordInput">New Password</label>
                    <input type="password" id="newPasswordInput" placeholder="Enter new password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPasswordInput">Confirm New Password</label>
                    <input type="password" id="confirmPasswordInput" placeholder="Confirm new password" />
                  </div>
                  <button type="submit" className="step-btn secondary">Change Password</button>
                </form>
                
                <div className="security-options">
                  <h4>Two-Factor Authentication</h4>
                  <div className="toggle-option">
                    <label className="toggle-label">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                      Enable 2FA for enhanced security
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget-grid">
              <div className="widget animate-on-scroll">
                <div className="widget-header">
                  <h3 className="widget-title">Preferences</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <div className="preferences-list">
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4>Theme</h4>
                      <p>Choose your preferred theme</p>
                    </div>
                    <button className="step-btn secondary" onClick={toggleTheme}>
                      <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                      {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </button>
                  </div>
                  
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates about your progress</p>
                    </div>
                    <label className="toggle-label">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4>Weekly Digest</h4>
                      <p>Get weekly summary of your learning</p>
                    </div>
                    <label className="toggle-label">
                      <input type="checkbox" defaultChecked />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4>Push Notifications</h4>
                      <p>Receive reminders and updates</p>
                    </div>
                    <label className="toggle-label">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="preference-item">
                    <div className="preference-info">
                      <h4>Privacy Mode</h4>
                      <p>Hide your profile from public view</p>
                    </div>
                    <label className="toggle-label">
                      <input type="checkbox" />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="widget animate-on-scroll">
                <div className="widget-header">
                  <h3 className="widget-title">Learning Preferences</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <form className="settings-form">
                  <div className="form-group">
                    <label htmlFor="learningGoalInput">Daily Learning Goal (hours)</label>
                    <select id="learningGoalInput" defaultValue="2">
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4+ hours</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="difficultyLevel">Preferred Difficulty Level</label>
                    <select id="difficultyLevel" defaultValue="intermediate">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="reminderTime">Daily Reminder Time</label>
                    <input type="time" id="reminderTime" defaultValue="09:00" />
                  </div>
                  
                  <button type="submit" className="step-btn primary">Save Preferences</button>
                </form>
              </div>
            </div>

            <div className="widget animate-on-scroll">
              <div className="widget-header">
                <h3 className="widget-title">Data & Privacy</h3>
                <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
              </div>
              <div className="data-actions">
                <button className="step-btn secondary" onClick={() => alert('Exporting data... (This is a demo)')}>
                  <i className="fas fa-download"></i> Export My Data
                </button>
                <button className="step-btn secondary" onClick={resetDashboard}>
                  <i className="fas fa-refresh"></i> Reset Progress
                </button>
                <button className="step-btn danger" onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    alert('Account deletion requested. (This is a demo)');
                  }
                }}>
                  <i className="fas fa-trash"></i> Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Assistant */}
      <div className="ai-assistant">
        {showAiPanel && (
          <div className="ai-panel active">
            <div className="ai-header">
              <h4>AI Career Assistant</h4>
              <button className="ai-close" onClick={() => setShowAiPanel(false)}>×</button>
            </div>
            <div className="ai-messages">
              {aiMessages.map((message, index) => (
                <div key={index} className={`ai-message ${message.isUser ? 'user' : 'bot'}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="ai-input-container">
              <input 
                type="text" 
                className="ai-input" 
                placeholder="Ask me anything..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
              />
              <button className="ai-send" onClick={sendAiMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
        <button className="ai-toggle" onClick={() => setShowAiPanel(!showAiPanel)}>
          <i className="fas fa-robot"></i>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

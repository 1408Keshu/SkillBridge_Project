import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import Roadmap from './Roadmap';
import LearningResources from './LearningResources';
import Projects from './Projects';
import Progress from './Progress';
import InterviewPrep from './InterviewPrep';
import Settings from './Settings';

function formatAiResponse(text) {
  if (!text || text.split(' ').length <= 20) return text;

  // Try to split by newlines first
  let lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  // If only one line, try splitting by sentences
  if (lines.length === 1) {
    lines = text.split('. ').map(s => s.trim()).filter(Boolean);
  }

  // If still only one line, return as is
  if (lines.length === 1) return text;

  // Format as bullet points
  return (
    <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
      {lines.map((line, idx) => (
        <li key={idx} style={{ marginBottom: 6 }}>{line}</li>
      ))}
    </ul>
  );
}

const Dashboard = () => {
  const { token, userEmail, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userSkills, setUserSkills] = useState([]);
  const [careerPath, setCareerPath] = useState('Full-Stack Developer');
  const [userName, setUserName] = useState('John Doe');
  const [resources, setResources] = useState([]);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { text: "Hi! I'm your AI career assistant. How can I help you with your tech career journey today?", isUser: false }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [showInterviewAnswer, setShowInterviewAnswer] = useState(false);
  // Remove localStorage logic for completedSteps
  // useState for completedSteps:
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [roadmapResetKey, setRoadmapResetKey] = useState(0);

  // Fetch roadmap/progress from backend and reset state on logout/token change
  useEffect(() => {
    if (!token) {
      setUserName('John Doe');
      setCareerPath('Full-Stack Developer');
      setUserSkills([]);
      setCompletedSteps(new Set());
      setResources([]);
      setRoadmapSteps([]);
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
          setUserSkills(roadmapData.roadmap.steps.map(step => step.name));
        } else {
          setRoadmapSteps([]);
          setUserSkills([]);
        }
        // Fetch progress
        const progressRes = await fetch('http://localhost:5000/api/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const progressData = await progressRes.json();
        if (progressData.progress && Array.isArray(progressData.progress.completedSteps)) {
          setCompletedSteps(new Set(progressData.progress.completedSteps));
        } else {
          setCompletedSteps(new Set());
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchData();
  }, [token]);

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
      { icon: 'fas fa-database', type: 'Video Course', title: 'MongoDB for Beginners', meta: ['4h 10m', 'Free'], url: 'https://www.youtube.com/watch?v=J6mDkcqU_ZE' },
      { icon: 'fas fa-book', type: 'Documentation', title: 'Node.js Official Docs', meta: ['Reading', 'Free'], url: 'https://nodejs.org/en/docs/' },
      { icon: 'fas fa-laptop-code', type: 'Tutorial', title: 'Build a REST API with Express', meta: ['2h 30m', 'Free'], url: 'https://www.youtube.com/watch?v=pKd0Rpw7O48' },
      { icon: 'fas fa-code', type: 'Practice', title: 'React Coding Challenges', meta: ['20 Problems', 'Free'], url: 'https://www.geeksforgeeks.org/reactjs-tutorial/' }
    ],
    'Data Scientist': [
      { icon: 'fas fa-chart-line', type: 'Video Course', title: 'Python for Data Science', meta: ['5h', 'Free'], url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI' },
      { icon: 'fas fa-calculator', type: 'Tutorial', title: 'Statistics & Probability', meta: ['3h 45m', 'Free'], url: 'https://www.geeksforgeeks.org/statistics-for-data-science/' },
      { icon: 'fas fa-brain', type: 'Course', title: 'Machine Learning Basics', meta: ['8h', 'Free'], url: 'https://www.youtube.com/watch?v=PPLop4L2eGk' },
      { icon: 'fas fa-table', type: 'Practice', title: 'Pandas Exercises', meta: ['15 Problems', 'Free'], url: 'https://www.w3schools.com/python/pandas/default.asp' }
    ],
    'UI/UX Designer': [
      { icon: 'fas fa-palette', type: 'Course', title: 'Design Principles', meta: ['4h', 'Free'], url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
      { icon: 'fas fa-mobile-alt', type: 'Tutorial', title: 'Mobile UI Design', meta: ['3h', 'Free'], url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' },
      { icon: 'fas fa-users', type: 'Course', title: 'User Research Methods', meta: ['6h', 'Free'], url: 'https://www.geeksforgeeks.org/ui-ux-design/' },
      { icon: 'fas fa-pencil-ruler', type: 'Tool', title: 'Figma Advanced Techniques', meta: ['2h 30m', 'Free'], url: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8' }
    ],
    'DevOps Engineer': [
      { icon: 'fas fa-cloud', type: 'Course', title: 'AWS Fundamentals', meta: ['6h', 'Free'], url: 'https://www.youtube.com/watch?v=ulprqHHWlng' },
      { icon: 'fas fa-docker', type: 'Tutorial', title: 'Docker Essentials', meta: ['4h', 'Free'], url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI' },
      { icon: 'fas fa-cogs', type: 'Course', title: 'CI/CD with Jenkins', meta: ['5h', 'Free'], url: 'https://www.youtube.com/watch?v=89yWXXIOisk' },
      { icon: 'fas fa-server', type: 'Practice', title: 'Kubernetes Labs', meta: ['10 Labs', 'Free'], url: 'https://www.geeksforgeeks.org/devops-tutorial/' }
    ],
    'AI Engineer': [
      { icon: 'fas fa-robot', type: 'Course', title: 'Deep Learning with PyTorch', meta: ['8h', 'Free'], url: 'https://www.youtube.com/watch?v=c36lUUr864M' },
      { icon: 'fas fa-brain', type: 'Tutorial', title: 'Neural Networks from Scratch', meta: ['6h', 'Free'], url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
      { icon: 'fas fa-language', type: 'Course', title: 'Natural Language Processing', meta: ['7h', 'Free'], url: 'https://www.youtube.com/watch?v=X2vAabgKiuM' },
      { icon: 'fas fa-eye', type: 'Practice', title: 'Computer Vision Projects', meta: ['5 Projects', 'Free'], url: 'https://www.geeksforgeeks.org/artificial-intelligence-tutorial/' }
    ],
    'Cybersecurity Specialist': [
      { icon: 'fas fa-shield-alt', type: 'Course', title: 'Ethical Hacking Basics', meta: ['5h', 'Free'], url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' },
      { icon: 'fas fa-bug', type: 'Tutorial', title: 'Penetration Testing', meta: ['4h', 'Free'], url: 'https://www.youtube.com/watch?v=U_P23SqJaDc' },
      { icon: 'fas fa-lock', type: 'Course', title: 'Network Security', meta: ['6h', 'Free'], url: 'https://www.geeksforgeeks.org/cyber-security-tutorial/' },
      { icon: 'fas fa-search', type: 'Practice', title: 'Vulnerability Assessment', meta: ['8 Labs', 'Free'], url: 'https://www.w3schools.com/cybersecurity/' }
    ],
    'Blockchain Developer': [
      { icon: 'fas fa-link', type: 'Video Course', title: 'Blockchain Basics', meta: ['3h 30m', 'Free'], url: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ' },
      { icon: 'fas fa-book', type: 'Documentation', title: 'Solidity Official Docs', meta: ['Reading', 'Free'], url: 'https://docs.soliditylang.org/' },
      { icon: 'fas fa-laptop-code', type: 'Tutorial', title: 'Build a Smart Contract', meta: ['2h', 'Free'], url: 'https://www.youtube.com/watch?v=ipwxYa-F1uY' },
      { icon: 'fas fa-code', type: 'Practice', title: 'Blockchain Coding Challenges', meta: ['10 Problems', 'Free'], url: 'https://www.geeksforgeeks.org/blockchain-tutorial/' }
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
    const savedName = localStorage.getItem('userName') || 'John Doe';
    const savedCareer = localStorage.getItem('careerPath') || 'Full-Stack Developer';
    const savedSkills = JSON.parse(localStorage.getItem('userSkills') || '[]');
    
    setUserName(savedName);
    setCareerPath(savedCareer);
    setUserSkills(savedSkills);
    generateResources(savedCareer);

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
  }, []);

  // Re-trigger animations when switching between pages
  useEffect(() => {
    const activePageElements = document.querySelectorAll('.page.active .animate-on-scroll');
    activePageElements.forEach(el => {
      el.classList.add('is-visible');
    });
    
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.page.active .animate-on-scroll');
      animateElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 100}ms`;
        el.classList.remove('is-visible');
        el.offsetHeight;
        el.classList.add('is-visible');
      });
    }, 100);
  }, [currentPage]);

  // Generate roadmap based on career path
  const generateResources = (career) => {
    setResources(careerResources[career] || []);
  };

  const progressPercentage = completedSteps.size === 0 ? 0 : Math.round((completedSteps.size / Math.max(skills2025.length, 1)) * 100);

  const handleStepComplete = (skillName) => {
    setUserSkills(prev => [...prev, skillName]);
  };

  const handleRefreshResources = () => {
    generateResources(careerPath);
  };

  const resetDashboard = async () => {
    // Keep profile info (userName, careerPath, userEmail) but reset all progress/roadmap data
    setUserSkills([]);
    setCompletedSteps(new Set());
    // setRoadmapSteps(skills2025.filter(step => step.careerPaths?.includes(careerPath))); // <-- FIXED
    // setResources([]);
    
    // Reset backend data if user is logged in
    if (token) {
      try {
        // Reset roadmap to empty
        await fetch('http://localhost:5000/api/roadmap', {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Reset progress to empty
        await fetch('http://localhost:5000/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ completedSteps: [] })
        });
      } catch (err) {
        console.error('Error resetting backend data:', err);
      }
    }
    
    // Reset AI messages
    setAiMessages([
      { text: "Hi! I'm your AI career assistant. How can I help you with your tech career journey today?", isUser: false }
    ]);
    setAiInput('');
    setShowInterviewAnswer(false);
    
    // Navigate to roadmap page to show the input form
    setCurrentPage('roadmap');
    setRoadmapResetKey(prev => prev + 1); // Add this line
  };

  const handleLogout = () => {
    logout();
  };

  const handleResourceClick = (resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Opening ${resource.title}... (This is a demo)`);
    }
  };

  const updateProfile = (name, skills, path) => {
    setUserName(name);
    setUserSkills(skills);
    setCareerPath(path);
    localStorage.setItem('userName', name);
    localStorage.setItem('userSkills', JSON.stringify(skills));
    localStorage.setItem('careerPath', path);
    generateResources(path);
    setShowProfileModal(false);
  };

  const handleSaveProfile = () => {
    const name = document.getElementById('modalNameInput')?.value || userName;
    const skillsText = document.getElementById('modalSkillsInput')?.value || '';
    const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
    const path = document.getElementById('modalCareerPath')?.value || careerPath;
    updateProfile(name, skills, path);
  };

  const sendAiMessage = async () => {
    if (aiInput.trim()) {
      setAiMessages(prev => [...prev, { text: aiInput, isUser: true }]);
      setAiInput('');
      setAiMessages(prev => [...prev, { text: "Thinking...", isUser: false, loading: true }]);

      try {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        if (!apiKey) {
          setAiMessages(prev => [
            ...prev.filter(m => !m.loading),
            { text: "Error: OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in your .env file.", isUser: false }
          ]);
          return;
        }
        const educationalPrompt = `Only answer if the following question is about education or computer science/engineering (CSE) or greetings. If it is not, politely reply: 'I can help you with educational or CSE topics. Please ask something related to those.' Here is the user's question: ${aiInput}`;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini",
            messages: [
              { role: "system", content: "You are a helpful career assistant." },
              ...aiMessages.filter(m => m.text && !m.loading).map(m => ({
                role: m.isUser ? "user" : "assistant",
                content: m.text
              })),
              { role: "user", content: educationalPrompt }
            ]
          })
        });
        const data = await response.json();
        console.log("OpenRouter API response:", data); // <-- Add this line
        if (data.error) {
          setAiMessages(prev => [
            ...prev.filter(m => !m.loading),
            { text: "API Error: " + (data.error.message || JSON.stringify(data.error)), isUser: false }
          ]);
          return;
        }
        const aiReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
        setAiMessages(prev => [
          ...prev.filter(m => !m.loading),
          { text: aiReply, isUser: false }
        ]);
      } catch (err) {
        setAiMessages(prev => [
          ...prev.filter(m => !m.loading),
          { text: "Error: Could not reach OpenRouter API.", isUser: false }
        ]);
      }
    }
  };

  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userName)}`;

  const currentStep = roadmapSteps.find(step => !completedSteps.has(step.name));
  const weeklyGoal = currentStep?.description || (roadmapSteps.length > 0 ? 'All roadmap steps completed! 🎉' : 'No roadmap generated yet.');

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
            <img
              src={avatarUrl}
              alt="Profile Avatar"
              style={{ width: 48, height: 48, borderRadius: '50%' }}
            />
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

      <main className="main-content">
        {/* Dashboard Main Page */}
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
                  <i className="fas fa-refresh"></i> Reset Progress
                </button>
                {/* <button className="step-btn secondary" onClick={handleRefreshResources}>
                  <i className="fas fa-sync-alt"></i> Refresh Resources
                </button> */}
                {/* <button className="step-btn primary" onClick={() => alert('Exporting PDF... (This is a demo)')}>
                  <i className="fas fa-download"></i> Export PDF
                </button> */}
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
                  <div className="progress-stat"><span>{completedSteps.size}</span><br/><span>Skills Learned</span></div>
                  <div className="progress-stat"><span>{Math.min(completedSteps.size, 3)}</span><br/><span>Projects Done</span></div>
                </div>
              </div>

              <div className="widget animate-on-scroll" style={{transitionDelay: '100ms'}}>
                <div className="widget-header">
                  <h3 className="widget-title">Weekly Goal</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <p>{weeklyGoal}</p>
                <div className="progress-bar" style={{marginTop: '15px'}}>
                  <div className="progress-fill" style={{ width: `${Math.min(progressPercentage, 100)}%` }}></div>
                </div>
              </div>

              <div className="widget animate-on-scroll" style={{transitionDelay: '200ms'}}>
                <div className="widget-header">
                  <h3 className="widget-title">Time Investment</h3>
                  <div className="widget-actions"><i className="fas fa-ellipsis-h"></i></div>
                </div>
                <p>You've spent {completedSteps.size * 8} hours learning this month. Target: 50 hours.</p>
                <div className="progress-bar" style={{marginTop: '15px'}}>
                  <div className="progress-fill" style={{ width: `${Math.min((completedSteps.size * 8 / 50) * 100, 100)}%`, background: 'var(--secondary)' }}></div>
                </div>
              </div>
            </div>

            {/* Resources Preview */}
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

            {/* Interview Question Preview */}
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

        {/* Feature Pages */}
        {currentPage === 'roadmap' && (
          <Roadmap
            key={roadmapResetKey}
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            careerPath={careerPath}
            roadmapSteps={skills2025}
            handleStepComplete={handleStepComplete}
          />
        )}

        {currentPage === 'resources' && (
          <LearningResources 
            careerPath={careerPath}
            resources={resources}
            handleResourceClick={handleResourceClick}
          />
        )}

        {currentPage === 'projects' && (
          <Projects careerPath={careerPath} />
        )}

        {currentPage === 'progress' && (
          <Progress
            completedSteps={completedSteps}
            setCompletedSteps={setCompletedSteps}
            careerPath={careerPath}
            roadmapSteps={roadmapSteps}
          />
        )}

        {currentPage === 'interview' && (
          <InterviewPrep 
            careerPath={careerPath}
            interviewQuestions={interviewQuestions}
            showInterviewAnswer={showInterviewAnswer}
            setShowInterviewAnswer={setShowInterviewAnswer}
          />
        )}

        {currentPage === 'settings' && (
          <Settings 
            userName={userName}
            userEmail={userEmail}
            careerPath={careerPath}
            theme={theme}
            toggleTheme={toggleTheme}
            resetDashboard={resetDashboard}
          />
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
                  {message.isUser
                    ? message.text
                    : formatAiResponse(message.text)
                  }
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

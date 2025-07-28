import React, { useState } from 'react';

const Projects = ({ careerPath }) => {
  const [showDetails, setShowDetails] = useState(null);

  const fullStackProjects = [
    {
      title: 'Task Management App',
      description: 'Build a full-stack task manager with React and Node.js.',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'Not Started',
      youtube: 'https://youtu.be/fZK57PxKC-0?si=WYD-zUEKthDtd6Sm',
      references: [
        { label: 'React Docs', url: 'https://react.dev' },
        { label: 'Node.js Docs', url: 'https://nodejs.org/en/docs/' },
        { label: 'MongoDB Guide', url: 'https://www.mongodb.com/docs/' },
      ],
      steps: [
        'Set up backend with Node.js and MongoDB.',
        'Build frontend using React.',
        'Implement CRUD features.',
        'Deploy the app.',
      ],
    },
    {
      title: 'E-commerce Platform',
      description: 'Create a complete online store with payment integration.',
      difficulty: 'Advanced',
      duration: '4-6 weeks',
      skills: ['React', 'Express', 'Stripe API'],
      status: 'In Progress',
      youtube: 'https://www.youtube.com/watch?v=377AQ0y6LPA',
      references: [
        { label: 'Stripe API Docs', url: 'https://stripe.com/docs/api' },
        { label: 'Express.js Guide', url: 'https://expressjs.com/' },
      ],
      steps: [
        'Design product & user model.',
        'Create product listing page.',
        'Add Stripe checkout.',
        'Handle orders and confirmations.',
      ],
    },
    {
      title: 'Real-time Chat App',
      description: 'Develop a real-time messaging application.',
      difficulty: 'Advanced',
      duration: '3-4 weeks',
      skills: ['Socket.io', 'Node.js', 'MongoDB'],
      status: 'Not Started',
      youtube: 'https://youtu.be/jD7FnbI76Hg?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Socket.io Docs', url: 'https://socket.io/docs/v4/' },
      ],
      steps: [
        'Set up real-time server using Socket.io.',
        'Build UI for sending & receiving messages.',
        'Store messages in database.',
      ],
    },
  ];

  const otherProjects =
  careerPath === 'Data Scientist'
    ? [
        {
          title: 'Data Analysis with Pandas',
          description: 'Analyze real-world datasets using Python and Pandas.',
          difficulty: 'Intermediate',
          duration: '2-3 weeks',
          skills: ['Python', 'Pandas', 'Data Visualization'],
          status: 'In Progress',
          youtube: 'https://www.youtube.com/watch?v=vmEHCJofslg',
          references: [
            { label: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' },
          ],
          steps: [
            'Import and clean data.',
            'Perform exploratory analysis.',
            'Create visualizations with Seaborn or Matplotlib.',
          ],
        },
        {
          title: 'Machine Learning Model',
          description: 'Train a model to predict housing prices.',
          difficulty: 'Advanced',
          duration: '4-5 weeks',
          skills: ['Scikit-learn', 'Python'],
          status: 'Not Started',
          youtube: 'https://www.youtube.com/watch?v=ZJ7o0OD3obg',
          references: [
            { label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/' },
          ],
          steps: [
            'Prepare dataset.',
            'Train/test a regression model.',
            'Evaluate accuracy and deploy.',
          ],
        },
      ]
    : careerPath === 'UI/UX Designer'
    ? [
        {
          title: 'Redesign a Mobile App',
          description: 'Create wireframes and mockups for a popular app.',
          difficulty: 'Beginner',
          duration: '1-2 weeks',
          skills: ['Figma', 'User Research'],
          status: 'In Progress',
          youtube: 'https://www.youtube.com/watch?v=FTFaQWZBqQ8',
          references: [
            { label: 'Figma Guide', url: 'https://help.figma.com/' },
          ],
          steps: [
            'Conduct heuristic evaluation.',
            'Design wireframes.',
            'Test with users and iterate.',
          ],
        },
        {
          title: 'Build a Design System',
          description: 'Create reusable components for a product.',
          difficulty: 'Intermediate',
          duration: '3-4 weeks',
          skills: ['Design Tokens', 'Accessibility'],
          status: 'Not Started',
          youtube: '',
          references: [],
          steps: ['Audit existing UI.', 'Define color/spacing tokens.', 'Build component library.'],
        },
      ]
    : careerPath === 'DevOps Engineer'
    ? [
        {
          title: 'CI/CD Pipeline',
          description: 'Set up a CI/CD pipeline with GitHub Actions.',
          difficulty: 'Intermediate',
          duration: '2-3 weeks',
          skills: ['GitHub Actions', 'Docker'],
          status: 'In Progress',
          youtube: 'https://www.youtube.com/watch?v=ML744B7UZIA',
          references: [
            { label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
          ],
          steps: [
            'Write workflows.',
            'Test builds and deployments.',
            'Integrate Docker and test automation.',
          ],
        },
        {
          title: 'Infrastructure as Code',
          description: 'Use Terraform to manage cloud infrastructure.',
          difficulty: 'Advanced',
          duration: '4-6 weeks',
          skills: ['Terraform', 'AWS'],
          status: 'Not Started',
          youtube: 'https://www.youtube.com/watch?v=SLB_c_ayRMo',
          references: [
            { label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
          ],
          steps: ['Set up IAM roles.', 'Define EC2 and S3.', 'Deploy with Terraform CLI.'],
        },
      ]
    : careerPath === 'AI Engineer'
    ? [
        {
          title: 'Image Classifier',
          description: 'Train a neural net to classify images using TensorFlow.',
          difficulty: 'Advanced',
          duration: '4-6 weeks',
          skills: ['TensorFlow', 'Python', 'Deep Learning'],
          status: 'In Progress',
          youtube: 'https://www.youtube.com/watch?v=RznKVRTFkBY',
          references: [
            { label: 'TensorFlow Docs', url: 'https://www.tensorflow.org/tutorials' },
          ],
          steps: [
            'Prepare image dataset.',
            'Train CNN model.',
            'Test and deploy as web app.',
          ],
        },
        {
          title: 'AI Chatbot',
          description: 'Build a basic chatbot using NLP models.',
          difficulty: 'Intermediate',
          duration: '3-4 weeks',
          skills: ['NLP', 'Rasa', 'Python'],
          status: 'Not Started',
          youtube: '',
          references: [],
          steps: ['Define intents.', 'Train with Rasa.', 'Deploy locally.'],
        },
      ]
    : careerPath === 'Cybersecurity Specialist'
    ? [
        {
          title: 'Vulnerability Scanner',
          description: 'Write a tool to scan web apps for common flaws.',
          difficulty: 'Advanced',
          duration: '4-5 weeks',
          skills: ['Python', 'Security Tools'],
          status: 'Not Started',
          youtube: 'https://www.youtube.com/watch?v=8T2b2qzjNqA',
          references: [
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          steps: [
            'Research OWASP issues.',
            'Write scanners for XSS, SQLi.',
            'Generate report.',
          ],
        },
        {
          title: 'Secure Login System',
          description: 'Implement a secure authentication system.',
          difficulty: 'Intermediate',
          duration: '2-3 weeks',
          skills: ['JWT', 'Hashing'],
          status: 'In Progress',
          youtube: '',
          references: [],
          steps: ['Implement salted password hash.', 'Add JWT.', 'Test for flaws.'],
        },
      ]
    : careerPath === 'Blockchain Developer'
    ? [
        {
          title: 'NFT Marketplace',
          description: 'Create a platform to mint and trade NFTs.',
          difficulty: 'Advanced',
          duration: '6 weeks',
          skills: ['Solidity', 'React', 'Web3'],
          status: 'Not Started',
          youtube: 'https://www.youtube.com/watch?v=3681ZYbDSSk',
          references: [
            { label: 'OpenZeppelin Docs', url: 'https://docs.openzeppelin.com/' },
          ],
          steps: [
            'Write smart contract.',
            'Connect Web3 frontend.',
            'Deploy to testnet.',
          ],
        },
        {
          title: 'Token Swap DApp',
          description: 'Build a decentralized exchange for token swaps.',
          difficulty: 'Advanced',
          duration: '5 weeks',
          skills: ['Solidity', 'Uniswap SDK'],
          status: 'Not Started',
          youtube: '',
          references: [],
          steps: ['Use Uniswap SDK.', 'Deploy to local blockchain.', 'Connect via Metamask.'],
        },
      ]
    : [
        {
          title: 'Portfolio Website',
          description: 'Create a professional portfolio showcasing your skills.',
          difficulty: 'Beginner',
          duration: '1-2 weeks',
          skills: ['HTML/CSS', 'JavaScript'],
          status: 'Completed',
          youtube: 'https://www.youtube.com/watch?v=gYzHS-n2gqU',
          references: [
            {
              label: 'HTML Reference',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            },
          ],
          steps: [
            'Create basic layout with HTML & CSS.',
            'Add projects section and contact form.',
            'Deploy on GitHub Pages or Netlify.',
          ],
        },
        {
          title: 'Industry-Specific Project',
          description: `Build a ${careerPath.toLowerCase()} focused application.`,
          difficulty: 'Intermediate',
          duration: '3-4 weeks',
          skills: ['Python', 'APIs'],
          status: 'In Progress',
          youtube: 'https://www.youtube.com/watch?v=GMppyAPbLYk',
          references: [
            {
              label: 'Python API Guide',
              url: 'https://realpython.com/api-integration-in-python/',
            },
          ],
          steps: [
            'Choose a problem in the domain.',
            'Fetch data via APIs.',
            'Analyze/display data using Python frameworks.',
          ],
        },
        {
          title: 'Capstone Project',
          description: 'Comprehensive project demonstrating all learned skills.',
          difficulty: 'Advanced',
          duration: '6-8 weeks',
          skills: ['Multiple'],
          status: 'Not Started',
          youtube: '',
          references: [],
          steps: ['Plan your idea.', 'Build, test and deploy.', 'Document & present.'],
        },

  ];

  const handleProjectClick = (project) => {
    if (project.youtube) {
      window.open(project.youtube, '_blank');
    }
  };

  const toggleDetails = (index) => {
    setShowDetails(showDetails === index ? null : index);
  };

  const renderProjects = (projects) =>
    projects.map((project, index) => (
      <div key={index} className="project-card">
        <div className="project-header">
          <h4>{project.title}</h4>
          <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
            {project.status}
          </span>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-meta">
          <span className="project-difficulty">{project.difficulty}</span>
          <span className="project-duration">{project.duration}</span>
        </div>
        <div className="project-skills">
          {project.skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
        <div className="project-actions">
          <button className="step-btn primary" onClick={() => handleProjectClick(project)}>
            {project.status === 'Not Started'
              ? 'Start Project'
              : project.status === 'In Progress'
              ? 'Continue'
              : 'View Project'}
          </button>
          <button className="step-btn secondary" onClick={() => toggleDetails(index)}>
            Details
          </button>
        </div>

        {showDetails === index && (
          <div className="project-details">
            <h4>📋 Steps:</h4>
            <ol>
              {project.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            {project.references.length > 0 && (
              <>
                <h4>🔗 References:</h4>
                <ul>
                  {project.references.map((ref, i) => (
                    <li key={i}>
                      <a href={ref.url} target="_blank" rel="noopener noreferrer">
                        {ref.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    ));

  return (
    <div className="page active">
      <h1 className="section-title">Projects</h1>
      <p className="section-subtitle">
        Build your portfolio with hands-on projects.
      </p>

      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Recommended Projects for {careerPath}</h3>
        </div>
        <div className="projects-grid">
          {careerPath === 'Full-Stack Developer'
            ? renderProjects(fullStackProjects)
            : renderProjects(otherProjects)}
        </div>
      </div>
    </div>
  );
};

export default Projects;

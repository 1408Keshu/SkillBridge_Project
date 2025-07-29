import React, { useState } from 'react';

const Projects = ({ careerPath }) => {
  const [showDetails, setShowDetails] = useState(null);

  const fullStackProjects = [
    {
      title: 'Task Management App',
      description: 'Build a full-stack task manager with React and Node.js.',
      time: 'Duration',
      duration: '2-3 weeks',
      skills: ['React', 'Node.js', 'MongoDB'],
      status: 'Intermediate',
      youtube: 'https://youtu.be/fZK57PxKC-0?si=WYD-zUEKthDtd6Sm',
      references: [
        { label: 'React Docs', url: 'https://react.dev' },
        { label: 'Node.js Docs', url: 'https://nodejs.org/en/docs/' },
        { label: 'MongoDB Guide', url: 'https://www.mongodb.com/docs/' },
      ],
      steps: [
        '•Built with React, Node.js, Express, and MongoDB (MERN stack).',
        '•Supports task creation, editing, deletion, and status updates.',
        '•Includes optional user authentication with JWT.',
        '•Demonstrates full-stack development and REST API integration.',
      ],
    },
    {
      title: 'E-commerce Platform',
      description: 'Create a complete online store with payment integration.',
      time: 'Duration',
      duration: '4-6 weeks',
      skills: ['React', 'Express', 'Stripe API'],
      status: 'Advanced',
      youtube: 'https://www.youtube.com/watch?v=377AQ0y6LPA',
      references: [
        { label: 'Stripe API Docs', url: 'https://stripe.com/docs/api' },
        { label: 'Express.js Guide', url: 'https://expressjs.com/' },
      ],
      steps: [
        '• Full-stack application with product listings, shopping cart, and checkout system.',
        '• Built using React for frontend and Node.js/Express with MongoDB/MySQL backend.',
        '• Integrates payment gateways like Stripe or Razorpay for secure transactions.',
        '• Demonstrates skills in authentication, CRUD operations, and responsive design.',
      ],
    },
    {
      title: 'Real-time Chat App',
      description: 'Develop a real-time messaging application.',
      time: 'Duration',
      duration: '3-4 weeks',
      skills: ['Socket.io', 'Node.js', 'MongoDB'],
      status: 'Intermediate',
      youtube: 'https://youtu.be/jD7FnbI76Hg?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Socket.io Docs', url: 'https://socket.io/docs/v4/' },
      ],
      steps: [
        '• Developed using Node.js, Express, and Socket.io for real-time communication.',
        '• Enables users to send and receive messages instantly in chat rooms or one-to-one.',
        '• Frontend built with React or Vanilla JS for a dynamic UI experience.',
        '• Demonstrates skills in WebSockets, event-driven programming, and full-stack development.',
      ],
    },
  ];

  const otherProjects =
  careerPath === 'Data Scientist'
    ? [
        {
          title: 'Data Analyst Portfolio with Pandas',
          description: 'Analyze real-world datasets using Python and Pandas.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Python', 'Pandas', 'Data Visualization'],
          status: 'Beginner',
          youtube: 'https://youtu.be/4sZFkPw87ng?si=1z1p3CYWH8tlKN3u',
          references: [
            { label: 'Pandas Docs', url: 'https://pandas.pydata.org/docs/' },
          ],
          steps: [
            '• Built using Python and Pandas to analyze real-world datasets.',
            '• Showcases data cleaning, transformation, and exploratory data analysis (EDA).',
            '• Includes visualizations with Matplotlib or Seaborn to present insights.',
            '• Demonstrates skills in data wrangling, statistical analysis, and portfolio building.',
          ],
        },
        {
          title: 'Movie Recommendation System',
          description: 'Train a model to predict housing prices.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Scikit-learn', 'Python'],
          status: 'Advanced',
          youtube: 'https://youtu.be/eyEabQRBMQA?si=kHxNwwH1KxR-K1tI',
          references: [
            { label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/' },
          ],
          steps: [
            '• Built using Python and machine learning libraries like Scikit-learn or Surprise.',
            '• Recommends movies based on user preferences using collaborative or content-based filtering.',
            '• Involves data preprocessing, model training, and evaluation metrics like RMSE.',
            '• Demonstrates skills in ML model development, data analysis, and recommendation algorithms.',
          ],
        },
      ]
    : careerPath === 'UI/UX Designer'
    ? [
        {
          title: 'Food Delivery Application',
          description: 'Create wireframes and mockups for a popular app.',
          time: 'Duration',
          duration: '1-2 weeks',
          skills: ['Figma', 'User Research'],
          status: 'Beginner',
          youtube: 'https://youtu.be/ZcqbRSLLyvk?si=htI2J8aePCx48XBc',
          references: [
            { label: 'Figma Guide', url: 'https://help.figma.com/' },
          ],
          steps: [
            '• Designed using UI/UX tools like Figma to create wireframes and prototypes.',
            '• Focuses on user flows for browsing restaurants, ordering food, and tracking delivery.',
            '• Incorporates user research, personas, and usability testing.',
            '• Demonstrates skills in interaction design, visual hierarchy, and responsive layouts.',
          ],
        },
        {
          title: 'To-Do List',
          description: 'Create reusable components for a product.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Design Tokens', 'Accessibility'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/-0LE5X9SYsE?si=2JJpTuPyfJsWKWfF',
          references: [],
          steps: ['• Built using HTML, CSS, and JavaScript or frameworks like React.', '• Allows users to add, edit, mark as complete, and delete tasks.', '• Stores tasks locally or using browser storage (e.g., LocalStorage).',
            '• Demonstrates skills in UI/UX design, component reuse, and state management.',
          ],
        },
      ]
    : careerPath === 'DevOps Engineer'
    ? [
        {
          title: 'Dockerize and Deploy React JS App',
          description: 'Containerize a simple web application using Docker and Docker Compose.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['GitHub Actions', 'Docker'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/dfTco9hmXEM?si=ge4S17RBE2ZOBWPa',
          references: [
            { label: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
          ],
          steps: [
            '• Containerizes a React application using Docker and defines services with Docker Compose.',
            '• Ensures consistent environment across development and production.',
            '• Supports deployment to platforms like AWS, Heroku, or Render.',
            '• Demonstrates skills in containerization, deployment, and DevOps workflows.',
          ],
        },
        {
          title: 'CI/CD Pipeline with GitHub Actions',
          description: ' Automate build, test, and deployment for a simple web application using GitHub Actions.',
          time: 'Duration',
          duration: '1-2 weeks',
          skills: ['Automation', 'testing'],
          status: 'Beginner',
          youtube: 'https://youtu.be/R8_veQiYBjI?si=JCDOAX9w6IU2pz2V',
          references: [
            { label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
          ],
          steps: ['• Automates code build, test, and deployment processes using GitHub Actions workflows.',
             '• Triggers on events like push or pull requests to ensure code quality and integration.', 
             '• Supports environments like Node.js, React, Docker, and cloud platforms.',
             '• Demonstrates skills in DevOps, automation, and continuous integration/deployment practices',],
        },
      ]
    : careerPath === 'AI Engineer'
    ? [
        {
          title: 'Image Classifier',
          description: 'Train a neural net to classify images using TensorFlow.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['TensorFlow', 'Python', 'Deep Learning'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/V61xy1ZnVTM?si=6f2qv7o5lYfF26tv',
          references: [
            { label: 'TensorFlow Docs', url: 'https://www.tensorflow.org/tutorials' },
          ],
          steps: [
            '• Built using Python and TensorFlow or Keras to train a Convolutional Neural Network (CNN).',
            '• Classifies images into categories (e.g., cats vs. dogs) using supervised learning.',
            '• Includes steps like data preprocessing, model training, and evaluation.',
            '• Demonstrates skills in deep learning, image processing, and model deployment.',
          ],
        },
        {
          title: 'AI Chatbot',
          description: 'Build a basic chatbot using NLP models.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['NLP', 'Python'],
          status: 'Advanced',
          youtube: 'https://youtu.be/2e5pQqBvGco?si=7XQU8ejAatTxwH0s',
          references: [],
          steps: ['• Built using Python with Natural Language Processing (NLP) libraries like NLTK or spaCy.', 
            '• Understands user input and responds using predefined intents or ML models.',
          '• Can be deployed on web or messaging platforms for real-time interaction.',
          '• Demonstrates skills in NLP, intent classification, and chatbot logic design.',
        ],
        },
      ]
    : careerPath === 'Cybersecurity Specialist'
    ? [
        {
          title: 'Password Strength Checker',
          description: 'Create a tool to evaluate the strength of passwords and provide suggestions for improvement.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Python', 'Security Tools'],
          status: 'Beginner',
          youtube: 'https://youtu.be/ueIb_EtFHhA?si=gQWnWxVMI3P2_3Pm',
          references: [
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          steps: [
            '• Built with Python and basic web technologies or CLI for user input.',
            '• Evaluates password strength based on length, character variety, and common patterns.',
            '• Provides real-time feedback and improvement suggestions.',
            '• Demonstrates understanding of cybersecurity basics and input validation.',
          ],
        },
        {
          title: 'Secure Login System',
          description: 'Implement a secure authentication system.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['JWT', 'Hashing'],
          status: 'Beginner',
          youtube: 'https://youtu.be/OmLdoEMcr_Y?si=8PL9Nfmpv0foC3-J',
          references: [],
          steps: ['•Built using Node.js, Express, and MongoDB with React for frontend.',
             '• Implements secure user authentication with JWT and bcrypt hashing.',
             '• Protects routes with token-based access control.',
             '• Demonstrates best practices in web security and session management.'],
        },
      ]
    : careerPath === 'Blockchain Developer'
    ? [
        {
          title: 'NFT Marketplace',
          description: 'Create a platform to mint and trade NFTs.',
          time: 'Duration',
          duration: '6 weeks',
          skills: ['Solidity', 'React', 'Web3'],
          status: 'Advanced',
          youtube: 'https://youtu.be/FZIb1LQ1ICY?si=WUV6h8yQhKnvP84I',
          references: [
            { label: 'OpenZeppelin Docs', url: 'https://docs.openzeppelin.com/' },
          ],
          steps: [
            '• Built using Solidity, React, and Web3.js for minting and trading NFTs.',
            '• Implements ERC-721 smart contracts with OpenZeppelin standards.',
            '• Allows users to mint, list, buy, and sell NFTs on the Ethereum blockchain.',
            '• Demonstrates skills in blockchain development, smart contract deployment, and dApp integration.',
          ],
        },
        {
          title: 'Cryptocurrency Wallet Interface',
          description: 'Simple interface to send and receive Ethereum',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Wallet integration', 'Web3.js'],
          status: 'Beginner',
          youtube: 'https://youtu.be/k_rMyxWBBY4?si=Z6WK45C2ETINoELu',
          references: [],
          steps: ['• Built with React and Web3.js for seamless blockchain interaction',
                     '• Integrates MetaMask to enable secure send/receive of Ethereum',
                     '• Displays real‑time balance and transaction history',
                     '• Demonstrates wallet integration, smart‑contract calls, and UI state management.',],
        },
      ]
    : [
        {
          title: 'Portfolio Website',
          description: 'Create a professional portfolio showcasing your skills.',
          time: 'Duration',
          duration: '1-2 weeks',
          skills: ['HTML/CSS', 'JavaScript'],
          status: 'Beginner',
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
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'APIs'],
          status: 'Intermediate',
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
          time: 'Duration',
          duration: '6-8 weeks',
          skills: ['Multiple'],
          status: 'Advanced',
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
          <span className="project-time">{project.time}</span>
                <span className="project-duration">{project.duration}</span>
              </div>
              <div className="project-skills">
          {project.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="project-actions">
          <button className="step-btn primary" onClick={() => handleProjectClick(project)}>
            {project.status === 'Beginner'
              ? 'Project Tutorial'
              : project.status === 'Intermediate'
              ? 'Project Tutorial'
              : 'Project Tutorial'}
                </button>
          <button className="step-btn secondary" onClick={() => toggleDetails(index)}>
            Details
                </button>
              </div>

        {showDetails === index && (
          <div className="project-details">
            <h4>📋 Overview:</h4>
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

import React, { useState } from 'react';

const Projects = ({ careerPath }) => {
  const [showDetails, setShowDetails] = useState(null);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

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
    {
      title: 'Social Media Dashboard',
      description: 'Build an analytics dashboard for social media management.',
      time: 'Duration',
      duration: '3-4 weeks',
      skills: ['React', 'Node.js', 'Chart.js'],
      status: 'Intermediate',
      youtube: 'https://youtu.be/3PHXvlpOkf4?si=8BqXqXqXqXqXqXqX',
      references: [
        { label: 'Chart.js Docs', url: 'https://www.chartjs.org/docs/' },
        { label: 'Social Media APIs', url: 'https://developer.twitter.com/en/docs' },
      ],
      steps: [
        '• Dashboard with real-time analytics and social media metrics visualization.',
        '• Integrates with social media APIs (Twitter, Instagram, LinkedIn) for data fetching.',
        '• Features include post scheduling, engagement tracking, and performance analytics.',
        '• Demonstrates API integration, data visualization, and dashboard development skills.',
      ],
    },
    {
      title: 'Weather App with Maps',
      description: 'Create a weather application with interactive maps.',
      time: 'Duration',
      duration: '2-3 weeks',
      skills: ['React', 'OpenWeather API', 'Leaflet Maps'],
      status: 'Beginner',
      youtube: 'https://youtu.be/GuA7_Z5KvG8?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'OpenWeather API', url: 'https://openweathermap.org/api' },
        { label: 'Leaflet Maps', url: 'https://leafletjs.com/' },
      ],
      steps: [
        '• Weather app with current conditions, forecasts, and interactive maps.',
        '• Integrates OpenWeather API for real-time weather data and location services.',
        '• Features include location search, weather alerts, and 7-day forecasts.',
        '• Demonstrates API integration, geolocation, and responsive design skills.',
      ],
    },
    {
      title: 'Recipe Management System',
      description: 'Build a recipe app with image upload and search.',
      time: 'Duration',
      duration: '3-4 weeks',
      skills: ['React', 'Node.js', 'Cloudinary'],
      status: 'Intermediate',
      youtube: 'https://youtu.be/1OfFS0v0F1M?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Cloudinary Docs', url: 'https://cloudinary.com/documentation' },
        { label: 'Multer Middleware', url: 'https://github.com/expressjs/multer' },
      ],
      steps: [
        '• Recipe management system with image upload, search, and categorization.',
        '• Features include recipe creation, ingredient lists, cooking instructions, and ratings.',
        '• Integrates Cloudinary for image storage and Multer for file uploads.',
        '• Demonstrates file handling, search functionality, and user-generated content.',
      ],
    },
    {
      title: 'Job Board Platform',
      description: 'Create a job posting and application platform.',
      time: 'Duration',
      duration: '4-5 weeks',
      skills: ['React', 'Node.js', 'Email Service'],
      status: 'Advanced',
      youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Nodemailer', url: 'https://nodemailer.com/' },
        { label: 'PDF Generation', url: 'https://www.npmjs.com/package/pdfkit' },
      ],
      steps: [
        '• Job board with posting, application, and candidate management features.',
        '• Includes user roles (employer/employee), job search, and application tracking.',
        '• Features email notifications, resume upload, and interview scheduling.',
        '• Demonstrates role-based access, file handling, and complex business logic.',
      ],
    },
    {
      title: 'Blog Platform with CMS',
      description: 'Build a content management system for blogging.',
      time: 'Duration',
      duration: '3-4 weeks',
      skills: ['React', 'Node.js', 'Rich Text Editor'],
      status: 'Intermediate',
      youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Draft.js', url: 'https://draftjs.org/' },
        { label: 'SEO Best Practices', url: 'https://developers.google.com/search/docs' },
      ],
      steps: [
        '• Blog platform with rich text editor, categories, and SEO optimization.',
        '• Features include post creation, editing, publishing, and comment system.',
        '• Implements SEO-friendly URLs, meta tags, and sitemap generation.',
        '• Demonstrates content management, SEO implementation, and user engagement.',
      ],
    },
    {
      title: 'Portfolio Website',
      description: 'Create a professional portfolio with animations.',
      time: 'Duration',
      duration: '1-2 weeks',
      skills: ['React', 'Framer Motion', 'Three.js'],
      status: 'Beginner',
      youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Framer Motion', url: 'https://www.framer.com/motion/' },
        { label: 'Three.js', url: 'https://threejs.org/' },
      ],
      steps: [
        '• Animated portfolio website with smooth transitions and 3D elements.',
        '• Features include project showcase, skills section, and contact forms.',
        '• Implements smooth animations, responsive design, and performance optimization.',
        '• Demonstrates modern web design, animation libraries, and portfolio presentation.',
      ],
    },
    {
      title: 'API Gateway & Microservices',
      description: 'Build a microservices architecture with API gateway.',
      time: 'Duration',
      duration: '5-6 weeks',
      skills: ['Docker', 'Kubernetes', 'Redis'],
      status: 'Advanced',
      youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
      references: [
        { label: 'Docker Docs', url: 'https://docs.docker.com/' },
        { label: 'Kubernetes', url: 'https://kubernetes.io/docs/' },
      ],
      steps: [
        '• Microservices architecture with API gateway, service discovery, and load balancing.',
        '• Includes Docker containerization, Kubernetes orchestration, and Redis caching.',
        '• Features include authentication, rate limiting, and service monitoring.',
        '• Demonstrates distributed systems, containerization, and scalable architecture.',
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
        {
          title: 'Stock Price Predictor',
          description: 'Build a time series model to predict stock prices.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'LSTM', 'Yahoo Finance API'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'TensorFlow Time Series', url: 'https://www.tensorflow.org/tutorials/structured_data/time_series' },
            { label: 'Yahoo Finance API', url: 'https://pypi.org/project/yfinance/' },
          ],
          steps: [
            '• Time series analysis using LSTM neural networks for stock price prediction.',
            '• Integrates Yahoo Finance API for historical stock data and real-time updates.',
            '• Features include technical indicators, moving averages, and volatility analysis.',
            '• Demonstrates skills in time series modeling, deep learning, and financial data analysis.',
          ],
        },
        {
          title: 'Customer Segmentation Analysis',
          description: 'Perform clustering analysis to segment customers.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Python', 'K-means', 'Scikit-learn'],
          status: 'Beginner',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'Scikit-learn Clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html' },
            { label: 'K-means Algorithm', url: 'https://en.wikipedia.org/wiki/K-means_clustering' },
          ],
          steps: [
            '• Customer segmentation using K-means clustering and other unsupervised learning algorithms.',
            '• Analyzes customer behavior patterns, purchase history, and demographic data.',
            '• Features include RFM analysis, customer lifetime value, and segment visualization.',
            '• Demonstrates skills in unsupervised learning, data preprocessing, and business analytics.',
          ],
        },
        {
          title: 'Sentiment Analysis Tool',
          description: 'Analyze text sentiment using NLP techniques.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'NLTK', 'Transformers'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'NLTK Documentation', url: 'https://www.nltk.org/' },
            { label: 'Hugging Face Transformers', url: 'https://huggingface.co/transformers/' },
          ],
          steps: [
            '• Sentiment analysis tool using NLP libraries and pre-trained transformer models.',
            '• Analyzes social media posts, reviews, and customer feedback for sentiment classification.',
            '• Features include aspect-based sentiment analysis, emotion detection, and trend analysis.',
            '• Demonstrates skills in natural language processing, text mining, and model deployment.',
          ],
        },
        {
          title: 'Sales Forecasting Dashboard',
          description: 'Create a predictive model for sales forecasting.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'Prophet', 'Streamlit'],
          status: 'Advanced',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'Facebook Prophet', url: 'https://facebook.github.io/prophet/' },
            { label: 'Streamlit', url: 'https://streamlit.io/' },
          ],
          steps: [
            '• Sales forecasting dashboard using time series models and interactive visualizations.',
            '• Integrates multiple forecasting models including Prophet, ARIMA, and ensemble methods.',
            '• Features include seasonality analysis, trend detection, and confidence intervals.',
            '• Demonstrates skills in predictive modeling, dashboard development, and business intelligence.',
          ],
        },
        {
          title: 'Data Pipeline Project',
          description: 'Build an ETL pipeline for data processing.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'Apache Airflow', 'PostgreSQL'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'Apache Airflow', url: 'https://airflow.apache.org/' },
            { label: 'PostgreSQL', url: 'https://www.postgresql.org/docs/' },
          ],
          steps: [
            '• ETL pipeline for automated data extraction, transformation, and loading processes.',
            '• Uses Apache Airflow for workflow orchestration and PostgreSQL for data storage.',
            '• Features include data validation, error handling, and monitoring dashboards.',
            '• Demonstrates skills in data engineering, workflow automation, and database management.',
          ],
        },
        {
          title: 'A/B Testing Analysis',
          description: 'Design and analyze A/B tests for business decisions.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Python', 'Statistics', 'Hypothesis Testing'],
          status: 'Beginner',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'SciPy Statistics', url: 'https://docs.scipy.org/doc/scipy/reference/stats.html' },
            { label: 'A/B Testing Guide', url: 'https://www.optimizely.com/optimization-glossary/ab-testing/' },
          ],
          steps: [
            '• A/B testing framework for website optimization and marketing campaign analysis.',
            '• Implements statistical tests including t-tests, chi-square tests, and power analysis.',
            '• Features include sample size calculation, confidence intervals, and effect size analysis.',
            '• Demonstrates skills in experimental design, statistical analysis, and business decision making.',
          ],
        },
        {
          title: 'Image Classification Model',
          description: 'Build a CNN model for image classification.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'TensorFlow', 'Computer Vision'],
          status: 'Advanced',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
            { label: 'OpenCV', url: 'https://opencv.org/' },
          ],
          steps: [
            '• Convolutional Neural Network for image classification using TensorFlow/Keras.',
            '• Trains on custom datasets or pre-trained models for transfer learning.',
            '• Features include data augmentation, model evaluation, and deployment to web API.',
            '• Demonstrates skills in computer vision, deep learning, and model deployment.',
          ],
        },
        {
          title: 'Real-time Analytics Dashboard',
          description: 'Create a real-time data streaming dashboard.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'Kafka', 'Elasticsearch'],
          status: 'Advanced',
          youtube: 'https://youtu.be/7CqJlxBYj-M?si=QkTSnerRmHzStMm4',
          references: [
            { label: 'Apache Kafka', url: 'https://kafka.apache.org/documentation/' },
            { label: 'Elasticsearch', url: 'https://www.elastic.co/guide/index.html' },
          ],
          steps: [
            '• Real-time analytics dashboard using Apache Kafka for data streaming and processing.',
            '• Integrates Elasticsearch for data storage and Kibana for visualization.',
            '• Features include real-time metrics, alerting systems, and interactive dashboards.',
            '• Demonstrates skills in real-time data processing, streaming analytics, and system architecture.',
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
          steps: [
            '• Built using HTML, CSS, and JavaScript or frameworks like React.',
            '• Allows users to add, edit, mark as complete, and delete tasks.',
            '• Stores tasks locally or using browser storage (e.g., LocalStorage).',
            '• Demonstrates skills in UI/UX design, component reuse, and state management.',
          ],
        },
        {
          title: 'Mobile Banking App Redesign',
          description: 'Redesign a mobile banking app for better usability and accessibility.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Figma', 'Accessibility', 'User Testing'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/7kKR9QKzQ7w',
          references: [
            { label: 'Mobile UX Best Practices', url: 'https://www.smashingmagazine.com/2018/02/mobile-ux-design-principles-applications/' },
          ],
          steps: [
            '• Analyze an existing banking app and identify usability issues.',
            '• Create user personas and journey maps.',
            '• Design wireframes and interactive prototypes in Figma.',
            '• Conduct user testing and iterate based on feedback.',
          ],
        },
        {
          title: 'E-commerce Product Page',
          description: 'Design a high-converting product page for an online store.',
          time: 'Duration',
          duration: '1-2 weeks',
          skills: ['Sketch', 'Conversion Optimization'],
          status: 'Beginner',
          youtube: 'https://youtu.be/3t6L-FlpQbA',
          references: [
            { label: 'E-commerce UX', url: 'https://baymard.com/blog/ecommerce-product-page-ux' },
          ],
          steps: [
            '• Research best practices for e-commerce product pages.',
            '• Design a visually appealing and conversion-focused layout.',
            '• Include product images, descriptions, reviews, and CTAs.',
            '• Test your design with users and refine based on feedback.',
          ],
        },
        {
          title: 'Accessibility Audit & Redesign',
          description: 'Audit an existing website for accessibility and redesign key screens.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['WCAG', 'Figma', 'Accessibility'],
          status: 'Advanced',
          youtube: 'https://youtu.be/20SHvU2PKsM',
          references: [
            { label: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/' },
          ],
          steps: [
            '• Select a website and perform an accessibility audit using WCAG guidelines.',
            '• Document issues and propose improvements.',
            '• Redesign key screens in Figma to address accessibility barriers.',
            '• Present before/after comparisons and rationale.',
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
        {
          title: 'Kubernetes Cluster Setup',
          description: 'Deploy a multi-container application using Kubernetes.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Kubernetes', 'Docker', 'YAML'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=X48VuDVv0do', // TechWorld with Nana: Kubernetes Tutorial
          references: [
            { label: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/' },
          ],
          steps: [
            '• Set up a local or cloud Kubernetes cluster.',
            '• Write deployment and service YAML files.',
            '• Deploy and scale a multi-container app.',
            '• Demonstrates orchestration, scaling, and service discovery.',
          ],
        },
        {
          title: 'Infrastructure as Code with Terraform',
          description: 'Provision cloud infrastructure using Terraform scripts.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Terraform', 'AWS', 'IaC'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=SLB_c_ayRMo', // freeCodeCamp: Terraform on AWS
          references: [
            { label: 'Terraform Docs', url: 'https://developer.hashicorp.com/terraform/docs' },
          ],
          steps: [
            '• Write Terraform scripts to provision AWS resources.',
            '• Use variables, outputs, and modules for reusability.',
            '• Apply and destroy infrastructure safely.',
            '• Demonstrates IaC, automation, and cloud provisioning.',
          ],
        },
        {
          title: 'Monitoring with Prometheus & Grafana',
          description: 'Set up monitoring and alerting for applications.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Prometheus', 'Grafana', 'Monitoring'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=h4Sl21AKiDg', // TechWorld with Nana: Prometheus & Grafana
          references: [
            { label: 'Prometheus Docs', url: 'https://prometheus.io/docs/' },
            { label: 'Grafana Docs', url: 'https://grafana.com/docs/' },
          ],
          steps: [
            '• Install and configure Prometheus for metrics collection.',
            '• Visualize metrics with Grafana dashboards.',
            '• Set up alerting rules for critical events.',
            '• Demonstrates observability and proactive monitoring.',
          ],
        },
        {
          title: 'Log Management with ELK Stack',
          description: 'Centralize and analyze logs using Elasticsearch, Logstash, and Kibana.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['ELK Stack', 'Log Management'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=1BfCnjr_Vjg', // freeCodeCamp: ELK Stack Tutorial
          references: [
            { label: 'ELK Stack Docs', url: 'https://www.elastic.co/what-is/elk-stack' },
          ],
          steps: [
            '• Set up Elasticsearch, Logstash, and Kibana.',
            '• Ingest and parse logs from applications.',
            '• Create dashboards and search logs efficiently.',
            '• Demonstrates centralized logging and troubleshooting.',
          ],
        },
        {
          title: 'Blue-Green Deployment Pipeline',
          description: 'Implement zero-downtime deployments using blue-green strategy.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['CI/CD', 'Deployment Strategies'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=U2nYJpGehk8', // TechWorld with Nana: Blue-Green Deployment
          references: [
            { label: 'Blue-Green Deployment', url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html' },
          ],
          steps: [
            '• Set up two identical production environments (blue and green).',
            '• Automate traffic switching between environments.',
            '• Roll back quickly in case of failure.',
            '• Demonstrates advanced deployment and rollback strategies.',
          ],
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
        {
          title: 'Speech Recognition System',
          description: 'Build a model that converts speech to text using deep learning.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'SpeechRecognition', 'Deep Learning'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=FLZvOKSCkxY', // freeCodeCamp: Speech Recognition
          references: [
            { label: 'SpeechRecognition Docs', url: 'https://pypi.org/project/SpeechRecognition/' },
            { label: 'DeepSpeech', url: 'https://deepspeech.readthedocs.io/en/latest/' },
          ],
          steps: [
            '• Collect and preprocess audio data.',
            '• Train a neural network for speech-to-text conversion.',
            '• Evaluate model accuracy and handle noisy inputs.',
            '• Demonstrates skills in audio processing and sequence modeling.',
          ],
        },
        {
          title: 'Face Detection & Recognition',
          description: 'Detect and recognize faces in images or video streams.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['OpenCV', 'Python', 'Computer Vision'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=PmZ29Vta7Vc', // Murtaza's Workshop: Face Recognition
          references: [
            { label: 'OpenCV Docs', url: 'https://docs.opencv.org/' },
          ],
          steps: [
            '• Use OpenCV to detect faces in images or video.',
            '• Implement face recognition using pre-trained models.',
            '• Build a simple attendance or security system.',
            '• Demonstrates skills in computer vision and real-time processing.',
          ],
        },
        {
          title: 'Text Summarization Tool',
          description: 'Automatically summarize long articles using NLP.',
          time: 'Duration',
          duration: '2-3 weeks',
          skills: ['Python', 'Transformers', 'NLP'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=G7bG6j6xQkE', // freeCodeCamp: NLP Transformers
          references: [
            { label: 'Hugging Face Transformers', url: 'https://huggingface.co/transformers/' },
          ],
          steps: [
            '• Use transformer models to summarize news articles or documents.',
            '• Compare extractive and abstractive summarization.',
            '• Build a web interface for users to input text.',
            '• Demonstrates skills in NLP and model deployment.',
          ],
        },
        {
          title: 'Object Detection App',
          description: 'Detect multiple objects in images using YOLO or SSD.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'YOLO', 'TensorFlow'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=MPU2HistivI', // Nicholas Renotte: YOLOv8
          references: [
            { label: 'YOLO Docs', url: 'https://docs.ultralytics.com/' },
          ],
          steps: [
            '• Train or use a pre-trained YOLO model for object detection.',
            '• Test on custom images or video streams.',
            '• Visualize bounding boxes and class labels.',
            '• Demonstrates skills in deep learning and computer vision.',
          ],
        },
        {
          title: 'AI-Powered Recommendation System',
          description: 'Build a recommendation engine for products or content.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'Scikit-learn', 'Recommender Systems'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=9gBC9R-msAk', // freeCodeCamp: Recommendation Systems
          references: [
            { label: 'Scikit-learn Docs', url: 'https://scikit-learn.org/stable/' },
          ],
          steps: [
            '• Collect and preprocess user-item interaction data.',
            '• Implement collaborative and content-based filtering.',
            '• Evaluate recommendations with precision and recall.',
            '• Demonstrates skills in ML algorithms and personalization.',
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
        {
          title: 'Vulnerability Scanner',
          description: 'Build a tool to scan web applications for common vulnerabilities.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'OWASP', 'Security Testing'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=5Zg-C8AAIGg', // Python Web Vulnerability Scanner
          references: [
            { label: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
          ],
          steps: [
            '• Use Python to scan for SQL injection, XSS, and other vulnerabilities.',
            '• Generate a report of findings and suggested remediations.',
            '• Demonstrates skills in ethical hacking and web security.',
          ],
        },
        {
          title: 'Network Packet Sniffer',
          description: 'Create a tool to capture and analyze network packets.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Python', 'Scapy', 'Networking'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=V6kRqu1H6Fk', // Network Packet Sniffer Python
          references: [
            { label: 'Scapy Docs', url: 'https://scapy.readthedocs.io/en/latest/' },
          ],
          steps: [
            '• Capture network packets using Python and Scapy.',
            '• Analyze packet contents for suspicious activity.',
            '• Demonstrates skills in network security and traffic analysis.',
          ],
        },
        {
          title: 'Web Application Firewall (WAF) Prototype',
          description: 'Develop a basic WAF to filter malicious HTTP requests.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'Regex', 'Web Security'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=2e6e6yZ6q5w', // Build a WAF in Python
          references: [
            { label: 'OWASP WAF', url: 'https://owasp.org/www-project-web-application-firewall-evaluation-criteria/' },
          ],
          steps: [
            '• Intercept and inspect HTTP requests.',
            '• Block requests matching malicious patterns (SQLi, XSS, etc.).',
            '• Demonstrates skills in web security and defensive programming.',
          ],
        },
        {
          title: 'Phishing Detection Tool',
          description: 'Detect phishing URLs using machine learning.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Python', 'Machine Learning', 'Security'],
          status: 'Advanced',
          youtube: 'https://www.youtube.com/watch?v=6j6M6ytKQ0I', // Phishing URL Detection ML
          references: [
            { label: 'Phishing Detection Paper', url: 'https://ieeexplore.ieee.org/document/8253601' },
          ],
          steps: [
            '• Collect a dataset of phishing and legitimate URLs.',
            '• Train a classifier to detect phishing attempts.',
            '• Demonstrates skills in ML and cybersecurity.',
          ],
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
        {
          title: 'Decentralized Voting System',
          description: 'Build a secure and transparent voting platform using smart contracts.',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Solidity', 'React', 'Smart Contracts'],
          status: 'Advanced',
          youtube: 'https://youtu.be/v-Fa4Es9rDE?si=ZNAaUTELaEK6r9vm', // Solidity Voting DApp Tutorial
          references: [
            { label: 'Solidity Docs', url: 'https://docs.soliditylang.org/' },
            { label: 'Ethereum Voting DApp', url: 'https://ethereum.org/en/developers/tutorials/voting/' },
          ],
          steps: [
            '• Design and deploy a voting smart contract on Ethereum.',
            '• Build a React frontend for users to vote and view results.',
            '• Ensure transparency and immutability of votes.',
            '• Demonstrates blockchain security and dApp integration.',
          ],
        },
        {
          title: 'Token Crowdsale Platform',
          description: 'Create a platform to launch and manage token sales (ICOs).',
          time: 'Duration',
          duration: '4-5 weeks',
          skills: ['Solidity', 'Web3.js', 'Smart Contracts'],
          status: 'Advanced',
          youtube: 'https://youtu.be/wfzTtbZEJP8?si=3SJCgpcLmw1gazui', // ICO Smart Contract Tutorial
          references: [
            { label: 'OpenZeppelin Crowdsale', url: 'https://docs.openzeppelin.com/contracts/4.x/crowdsale' },
          ],
          steps: [
            '• Write and deploy ERC-20 token and crowdsale contracts.',
            '• Allow users to buy tokens with Ether.',
            '• Add sale stages, caps, and refund logic.',
            '• Demonstrates smart contract development and tokenomics.',
          ],
        },
        {
          title: 'Decentralized File Storage',
          description: 'Implement a file storage dApp using IPFS and Ethereum.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['IPFS', 'Solidity', 'React'],
          status: 'Intermediate',
          youtube: 'https://www.youtube.com/watch?v=5Uj6uR3fp-U', // IPFS File Upload DApp
          references: [
            { label: 'IPFS Docs', url: 'https://docs.ipfs.tech/' },
          ],
          steps: [
            '• Integrate IPFS for decentralized file storage.',
            '• Store file hashes on Ethereum smart contracts.',
            '• Build a React interface for uploading and retrieving files.',
            '• Demonstrates decentralized storage and blockchain integration.',
          ],
        },
        {
          title: 'Blockchain Explorer',
          description: 'Build a simple explorer to view blocks, transactions, and addresses.',
          time: 'Duration',
          duration: '3-4 weeks',
          skills: ['Web3.js', 'React', 'APIs'],
          status: 'Intermediate',
          youtube: 'https://youtu.be/Q-X4MgoKGPg?si=IcraEOO3SYLF-Dzo', // Build a Blockchain Explorer
          references: [
            { label: 'Etherscan API', url: 'https://docs.etherscan.io/' },
          ],
          steps: [
            '• Fetch and display blockchain data using Web3.js or Etherscan API.',
            '• Show block details, transaction history, and address balances.',
            '• Demonstrates blockchain data analysis and UI development.',
          ],
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

  const renderProjects = (projects) => {
    const filteredProjects = projects.filter(project => 
      difficultyFilter === 'All' || project.status === difficultyFilter
    );
    
    return filteredProjects.map((project, index) => (
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
  };

  return (
    <div className="page active">
      <h1 className="section-title">Projects</h1>
      <p className="section-subtitle">
        Build your portfolio with hands-on projects.
      </p>

      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Recommended Projects for {careerPath}</h3>
          <div className="filter-container">
            <select 
              value={difficultyFilter} 
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="difficulty-filter"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
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
